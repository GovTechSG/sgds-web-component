import { html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import Modal from "../../utils/modal";
import { lockBodyScrolling, unlockBodyScrolling } from "../../utils/scroll";
import { HasSlotController } from "../../utils/slot";
import { watch } from "../../utils/watch";
import modalStyle from "./modal.css";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
import headerStyles from "../../styles/header-class.css";
import svgStyles from "../../styles/svg.css";
/**
 * @summary The modal component inform users about a specific task and may contain critical information which users then have to make a decision.
 *
 * @slot default - The content of the Modal's body.
 * @slot footer - The content of the Modal's footer, typically used to pass in buttons for call to action.
 *
 * @event sgds-close - Emitted when the modal is called to close via mouseclick of close button, overlay or via keyboard esc key
 * @event sgds-show - Emitted when the modal opens
 * @event sgds-hide - Emitted when the modal closes
 * @event sgds-after-show - Emitted after modal opens and the animations has completed
 * @event sgds-after-hide - Emitted after modal closes and the animations has completed
 *
 * @csspart base - The component's base wrapper
 * @csspart overlay - The overlay that covers the screen behind the dialog
 * @csspart panel - The modal's dialog panel
 * @csspart header - The modal's header that wraps the title, titleIcon and close button
 * @csspart title - The h3 element wrapping title and titleIcon
 * @csspart body - The modal's body where the content lies
 * @csspart footers - The modal's footer
 *
 * @cssproperty --sgds-modal-panel-padding - The general modal padding of modal component. Applied to body, footer and header.
 * @cssproperty --sgds-modal-panel-z-index - The z-index of modal panel
 * @cssproperty --sgds-modal-panel-width - The width of modal panel.
 * @cssproperty --sgds-modal-panel-height - The height of modal panel.
 * @cssproperty --sgds-modal-panel-bg - The background color of modal panel
 * @cssproperty --sgds-modal-panel-border-radius - The border radius of modal panel
 * @cssproperty --sgds-modal-header-border-bottom - The bottom border of header
 * @cssproperty --sgds-modal-overlay-bg - The overlay's background color
 */
export class SgdsModal extends ScopedElementsMixin(SgdsElement) {
  static styles = [...SgdsElement.styles, headerStyles, svgStyles, modalStyle];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-close-button": SgdsCloseButton
    };
  }
  /**@internal */
  @query(".modal") dialog: HTMLElement;
  /**@internal */
  @query(".modal-panel") panel: HTMLElement;
  /**@internal */
  @query(".modal-overlay") overlay: HTMLElement;
  /**@internal */
  @query(".modal-title") heading: HTMLElement;
  /**@internal */
  private readonly hasSlotController = new HasSlotController(this, "footer");
  /**@internal */
  private modal: Modal;
  /**@internal */
  private originalTrigger: HTMLElement | null;

  /**Indicates whether or not the modal is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;
  /**The modal's title as displayed in the header */
  @property({ reflect: true }) title = "";
  /**The modal's icon as displayed in the header. Pass in SVG format icons as string directly  */
  @property({ reflect: true }) titleIcon = "";
  /** Disables the header. This will also remove the default close button */
  @property({ type: Boolean, reflect: true }) noHeader = false;
  /** Centers the modal vertically in page */
  @property({ type: Boolean, reflect: true }) centered = false;
  /** Centers the contents inside the modal */
  @property({ type: Boolean, reflect: true }) centeredAlignVariant = false;
  /** Removes the default animation when opening and closing of modal */
  @property({ type: Boolean, reflect: true }) noAnimation = false;
  /** Removes the close button from modal header */
  @property({ type: Boolean, reflect: true }) noCloseButton = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.modal = new Modal(this);
  }

  firstUpdated() {
    this.dialog.hidden = !this.open;

    if (this.open) {
      this.addOpenListeners();
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }

  /** Shows the dialog. */
  public async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hides the dialog */
  public async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  private requestClose(source: "close-button" | "keyboard" | "overlay") {
    const sgdsRequestClose = this.emit("sgds-close", {
      cancelable: true,
      detail: { source }
    });

    if (sgdsRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "modal.denyClose");
      animateTo(this.panel, animation.keyframes);
      return;
    }

    this.hide();
  }

  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }

  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  handleDocumentKeyDown(event: KeyboardEvent) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  }

  @watch("open", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      this.emit("sgds-show");
      this.addOpenListeners();
      this.originalTrigger = document.activeElement as HTMLElement;
      this.modal.activate();

      lockBodyScrolling(this);

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;

      const panelAnimation = getAnimation(this, "modal.show");
      const overlayAnimation = getAnimation(this, "modal.overlay.show");
      !this.noAnimation &&
        (await Promise.all([
          animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
          animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
        ]));

      this.emit("sgds-after-show");

      // Add focus on modal heading after opening it
      this.heading.focus();
    } else {
      // Hide
      this.emit("sgds-hide");
      this.removeOpenListeners();
      this.modal.deactivate();

      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "modal.hide");
      const overlayAnimation = getAnimation(this, "modal.overlay.hide");

      // Animate the overlay and the panel at the same time. Because animation durations might be different, we need to
      // hide each one individually when the animation finishes, otherwise the first one that finishes will reappear
      // unexpectedly. We'll unhide them after all animations have completed.
      !this.noAnimation &&
        (await Promise.all([
          animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
            this.overlay.hidden = true;
          }),
          animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
            this.panel.hidden = true;
          })
        ]));

      this.dialog.hidden = true;

      // Now that the dialog is hidden, restore the overlay and panel for next time
      this.overlay.hidden = false;
      this.panel.hidden = false;

      unlockBodyScrolling(this);

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (typeof trigger?.focus === "function") {
        setTimeout(() => trigger.focus());
      }

      this.emit("sgds-after-hide");
    }
  }

  render() {
    const withLabelIcon = html`${unsafeSVG(this.titleIcon)}`;
    return html`
      <div
        part="base"
        class=${classMap({
          modal: true,
          "modal--open": this.open,
          "modal--has-footer": this.hasSlotController.test("footer"),
          centered: this.centered
        })}
      >
        <div part="overlay" class="modal-overlay" @click=${() => this.requestClose("overlay")}></div>

        <div
          part="panel"
          class="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${ifDefined(this.noHeader ? this.title : undefined)}
          aria-labelledby=${ifDefined(!this.noHeader ? "title" : undefined)}
          tabindex="-1"
        >
          ${!this.noHeader
            ? html`
                <div
                  part="header"
                  class=${classMap({
                    "modal-header": true,
                    centered: this.centeredAlignVariant
                  })}
                >
                  <h3
                    part="title"
                    class=${classMap({
                      "modal-title": true,
                      centered: this.centeredAlignVariant
                    })}
                    id="title"
                    tabindex="-1"
                  >
                    ${this.titleIcon ? withLabelIcon : ""} ${this.title}
                  </h3>
                  ${this.noCloseButton
                    ? nothing
                    : html`<sgds-close-button
                        class=${classMap({
                          "modal-close": true,
                          centered: this.centeredAlignVariant
                        })}
                        @click="${() => this.requestClose("close-button")}"
                        ariaLabel="close modal"
                      ></sgds-close-button>`}
                </div>
              `
            : ""}

          <div
            part="body"
            class=${classMap({
              "modal-body": true,
              centered: this.centeredAlignVariant
            })}
          >
            <slot></slot>
          </div>

          <footer
            part="footer"
            class=${classMap({
              "modal-footer": true,
              centered: this.centeredAlignVariant
            })}
          >
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation("modal.show", {
  keyframes: [
    { opacity: 0, transform: "scale(1) translate(0, -100%)" },
    { opacity: 1, transform: "scale(1) translate(0, 0%)" }
  ],
  options: { duration: 400, easing: "ease" }
});

setDefaultAnimation("modal.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1) translate(0, 0)" },
    { opacity: 0, transform: "scale(1) translate(0, -100%)" }
  ],
  options: { duration: 400, easing: "ease" }
});

setDefaultAnimation("modal.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: { duration: 400 }
});

setDefaultAnimation("modal.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400 }
});

setDefaultAnimation("modal.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 400 }
});

export default SgdsModal;
