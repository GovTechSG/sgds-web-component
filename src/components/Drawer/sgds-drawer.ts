import { html, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, stopAnimations } from "../../utils/animate.js";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry.js";
import { waitForEvent } from "../../utils/event.js";
import { lockBodyScrolling, unlockBodyScrolling } from "../../utils/scroll.js";
import { HasSlotController } from "../../utils/slot.js";
import { watch } from "../../utils/watch.js";
import drawerStyles from "./drawer.css";

/**
 * @summary Drawers slide in from a container to expose additional options and information.
 *
 * @slot - The drawer's main content.
 * @slot label - The drawer's label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @event sgds-show - Emitted when the drawer opens.
 * @event sgds-after-show - Emitted after the drawer opens and all animations are complete.
 * @event sgds-hide - Emitted when the drawer closes.
 * @event sgds-after-hide - Emitted after the drawer closes and all animations are complete.
 * @event sgds-initial-focus - Emitted when the drawer opens and is ready to receive focus. Calling
 *   `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} sgds-request-close - Emitted when the user attempts to
 *   close the drawer by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the drawer open. Avoid using this unless closing the drawer will result in
 *   destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay that covers the screen behind the drawer.
 * @csspart panel - The drawer's panel (where the drawer and its content are rendered).
 * @csspart header - The drawer's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header.
 * @csspart title - The drawer's title.
 * @csspart close-button - The close button.
 * @csspart body - The drawer's body.
 * @csspart footer - The drawer's footer.
 *
 * @cssproperty --sgds-drawer-size - The preferred size of the drawer. This will be applied to the drawer's width or height
 *   depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty --sgds-drawer-padding - The amount of padding to use for the header.
 * @cssproperty --sgds-drawer-background-color - The drawer's background color.
 * @cssproperty --sgds-drawer-button-gap - The drawer's flex gap between buttons.
 */
export class SgdsDrawer extends SgdsElement {
  static styles = [drawerStyles];

  /** @internal */
  private readonly hasSlotController = new HasSlotController(this, "footer");
  /** @internal */
  private originalTrigger: HTMLElement | null;
  /** @internal */
  @query(".drawer") drawer: HTMLElement;
  /** @internal */
  @query(".drawer-panel") panel: HTMLElement;
  /** @internal */
  @query(".drawer-overlay") overlay: HTMLElement;

  /**
   * Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The drawer's label as displayed in the header. You should always include a relevant label even when using
   * `noHeader`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.
   */
  @property({ reflect: true }) label = "";

  /** The direction from which the drawer will open. */
  @property({ reflect: true }) placement: "top" | "end" | "bottom" | "start" = "end";

  /**
   * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
   * its parent element, set this attribute and add `position: relative` to the parent.
   */
  @property({ type: Boolean, reflect: true }) contained = false;

  /**
   * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
   * accessible way for users to dismiss the drawer.
   */
  @property({ type: Boolean, reflect: true }) noHeader = false;

  firstUpdated() {
    this.drawer.hidden = !this.open;

    if (this.open) {
      this.addOpenListeners();

      if (!this.contained) {
        lockBodyScrolling(this);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }

  private uppercaseFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private requestClose(source: "close-button" | "keyboard" | "overlay") {
    const slRequestClose = this.emit("sgds-request-close", {
      cancelable: true,
      detail: { source }
    });

    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "drawer.denyClose");
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }

    this.hide();
  }

  private addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }

  private removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (this.open && !this.contained && event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  };

  @watch("open", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      this.emit("sgds-show");
      this.addOpenListeners();
      this.originalTrigger = document.activeElement as HTMLElement;

      // Lock body scrolling only if the drawer isn't contained
      if (!this.contained) {
        lockBodyScrolling(this);
      }

      // When the drawer is shown, Safari will attempt to set focus on whatever element has autofocus. This causes the
      // drawer's animation to jitter, so we'll temporarily remove the attribute, call `focus({ preventScroll: true })`
      // ourselves, and add the attribute back afterwards.
      //
      // Related: https://github.com/shoelace-style/shoelace/issues/693
      //
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }

      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      this.drawer.hidden = false;

      // Set initial focus
      requestAnimationFrame(() => {
        const slInitialFocus = this.emit("sgds-initial-focus", { cancelable: true });

        if (!slInitialFocus.defaultPrevented) {
          // Set focus to the autofocus target and restore the attribute
          if (autoFocusTarget) {
            (autoFocusTarget as HTMLInputElement).focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }

        // Restore the autofocus attribute
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });

      const panelAnimation = getAnimation(this, `drawer.show${this.uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, "drawer.overlay.show");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      this.emit("sgds-after-show");
    } else {
      // Hide
      this.emit("sgds-hide");
      this.removeOpenListeners();

      if (!this.contained) {
        unlockBodyScrolling(this);
      }

      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, `drawer.hide${this.uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, "drawer.overlay.hide");

      // Animate the overlay and the panel at the same time. Because animation durations might be different, we need to
      // hide each one individually when the animation finishes, otherwise the first one that finishes will reappear
      // unexpectedly. We'll unhide them after all animations have completed.
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);

      this.drawer.hidden = true;

      // Now that the dialog is hidden, restore the overlay and panel for next time
      this.overlay.hidden = false;
      this.panel.hidden = false;

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (typeof trigger?.focus === "function") {
        setTimeout(() => trigger.focus());
      }

      this.emit("sgds-after-hide");
    }
  }

  @watch("contained", { waitUntilFirstUpdate: true })
  handleNoModalChange() {
    if (this.open && !this.contained) {
      lockBodyScrolling(this);
    }

    if (this.open && this.contained) {
      unlockBodyScrolling(this);
    }
  }

  /** Shows the drawer. */
  public async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hides the drawer */
  public async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          drawer: true,
          "drawer-open": this.open,
          "drawer-top": this.placement === "top",
          "drawer-end": this.placement === "end",
          "drawer-bottom": this.placement === "bottom",
          "drawer-start": this.placement === "start",
          "drawer-contained": this.contained,
          "drawer-fixed": !this.contained,
          "drawer-has-footer": this.hasSlotController.test("footer")
        })}
      >
        <div part="overlay" class="drawer-overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${ifDefined(this.noHeader ? this.label : undefined)}
          aria-labelledby=${ifDefined(!this.noHeader ? "title" : undefined)}
          tabindex="0"
        >
          ${!this.noHeader
            ? html`
                <header part="header" class="drawer-header">
                  <h2 part="title" class="drawer-title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="drawer-header-actions">
                    <slot name="header-actions"></slot>
                    <button
                      part="close-button"
                      class=${classMap({
                        "drawer-close": true,
                        "btn-close": true
                      })}
                      @click="${() => this.requestClose("close-button")}"
                    ></button>
                  </div>
                </header>
              `
            : nothing}

          <slot part="body" class="drawer-body"></slot>

          <footer part="footer" class="drawer-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
}

// Top
setDefaultAnimation("drawer.showTop", {
  keyframes: [
    { opacity: 0, translate: "0 -100%" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideTop", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 -100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// End
setDefaultAnimation("drawer.showEnd", {
  keyframes: [
    { opacity: 0, translate: "100%" },
    { opacity: 1, translate: "0" }
  ],
  rtlKeyframes: [
    { opacity: 0, translate: "-100%" },
    { opacity: 1, translate: "0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideEnd", {
  keyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "100%" }
  ],
  rtlKeyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "-100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// Bottom
setDefaultAnimation("drawer.showBottom", {
  keyframes: [
    { opacity: 0, translate: "0 100%" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideBottom", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// Start
setDefaultAnimation("drawer.showStart", {
  keyframes: [
    { opacity: 0, translate: "-100%" },
    { opacity: 1, translate: "0" }
  ],
  rtlKeyframes: [
    { opacity: 0, translate: "100%" },
    { opacity: 1, translate: "0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideStart", {
  keyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "-100%" }
  ],
  rtlKeyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// Deny close
setDefaultAnimation("drawer.denyClose", {
  keyframes: [{ scale: 1 }, { scale: 1.01 }, { scale: 1 }],
  options: { duration: 250 }
});

// Overlay
setDefaultAnimation("drawer.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});

setDefaultAnimation("drawer.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

export default SgdsDrawer;
