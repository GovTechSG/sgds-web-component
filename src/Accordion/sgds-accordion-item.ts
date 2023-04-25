import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../utils/animate";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property, query } from "lit/decorators.js";
import { getAnimation, setDefaultAnimation } from "../utils/animation-registry";
import { html } from "lit";
import { waitForEvent } from "../utils/event";
import { watch } from "../utils/watch";
import SgdsElement from "../base/sgds-element";
import styles from "./sgds-accordion-item.scss";

/**
 * @slot default - content of the accordion item
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 * @csspart base - The accordion-item base wrapper
 * @csspart header - The accordion-item button header
 * @csspart content - The accordion-item content
 */
@customElement("sgds-accordion-item")
export class SgdsAccordionItem extends SgdsElement {
  static styles = styles;
  /** @internal */
  @query(".accordion-item") accordion: HTMLElement;
  /** @internal */
  @query(".accordion-button") header: HTMLElement;
  /** @internal */
  @query(".accordion-body") body: HTMLElement;

  /** Controls whether accordion-item is open or close */
  @property({ type: Boolean, reflect: true }) open = false;
  /** Title of the accordion */
  @property() summary: string;
  /** Disables the accordion-item. When true, accordion-item cannot open */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Optional for accordion item. Can be used to insert any utility classes such as `me-auto` */
  @property({ reflect: true }) accordionItemClasses?: string;

  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? "auto" : "0";
  }

  private handleSummaryClick() {
    if (!this.disabled) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }

      this.header.focus();
    }
  }

  private handleSummaryKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }

  @watch("open", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      const sgdsShow = this.emit("sgds-show", { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.open = false;
        return;
      }

      await stopAnimations(this.body);
      this.body.hidden = false;

      const { keyframes, options } = getAnimation(this, "accordion.show");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = "auto";

      this.emit("sgds-after-show");
    } else {
      // Hide
      const slHide = this.emit("sgds-hide", { cancelable: true });
      if (slHide.defaultPrevented) {
        this.open = true;
        return;
      }

      await stopAnimations(this.body);

      const { keyframes, options } = getAnimation(this, "accordion.hide");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = "auto";

      this.emit("sgds-after-hide");
    }
  }

  /** Shows the accordion. */
  public async show() {
    if (this.open || this.disabled) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the accordion */
  public async hide() {
    if (!this.open || this.disabled) {
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
          sgds: true,
          "accordion-item": true,
          //TODO: Remove unnecessary classes
          "accordion--open": this.open,
          "accordion--disabled": this.disabled,
          [`${this.accordionItemClasses}`]: this.accordionItemClasses
        })}
      >
        <button
          part="header"
          class=${classMap({
            "accordion-button": true,
            collapsed: !this.open
          })}
          id="header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="content"
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          ${this.summary}
        </button>
        <div class="accordion-body">
          <slot part="content" id="content" class="accordion-content" role="region" aria-labelledby="header"></slot>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation("accordion.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

setDefaultAnimation("accordion.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

export default SgdsAccordionItem;
