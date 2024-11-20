import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
import accordionItemStyle from "./accordion-item.css";

/**
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 * @csspart base - The accordion-item base wrapper.
 * @csspart header - The accordion-item button header.
 * @csspart content - The accordion-item content.
 *
 * @slot accordion-header - The accordion-item button header slot.
 * @slot accordion-content - The accordion-item content slot.
 * @slot accordion-caret - The caret icon of accordion-item.
 *
 */
export class SgdsAccordionItem extends SgdsElement {
  static styles = [...SgdsElement.styles, accordionItemStyle];
  /** @internal */
  @query(".accordion-item") accordion: HTMLElement;
  /** @internal */
  @query(".accordion-btn") header: HTMLElement;
  /** @internal */
  @query(".accordion-body") body: HTMLElement;

  /** Controls whether accordion-item is open or close */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Disables the accordion item */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    if (!this.open) this.body.classList.add("hidden");
  }

  private handleSummaryClick() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }

    this.header.focus();
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
      this.body.classList.remove("hidden");

      const { keyframes, options } = getAnimation(this, "accordion.show");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
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
      const animationDuration = options.duration as number;
      // Workaround to fix GSIB delay after animateTo.
      //Setting a timeout of duration slightly less than animation's duraton to prevent case where animation runs faster than .hidden class is added
      setTimeout(() => {
        this.body.classList.add("hidden");
      }, animationDuration - 20);

      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.emit("sgds-after-hide");
    }
  }

  /** Shows the accordion. */
  public async show() {
    if (this.open) {
      return;
    }

    this.open = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the accordion */
  public async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          "accordion-item": true
        })}
      >
        <button
          class=${classMap({
            "accordion-btn": true,
            disabled: this.disabled,
            collapsed: !this.open
          })}
          ?disabled=${this.disabled}
          part="header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-controls="content"
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="accordion-header"></slot>
          <slot name="accordion-caret">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.20337 7.35657C3.26767 7.2921 3.34406 7.24095 3.42816 7.20606C3.51226 7.17116 3.60241 7.1532 3.69346 7.1532C3.78452 7.1532 3.87467 7.17116 3.95877 7.20606C4.04287 7.24095 4.11926 7.2921 4.18356 7.35657L12.0002 15.1746L19.8168 7.35657C19.8812 7.29221 19.9576 7.24115 20.0417 7.20632C20.1258 7.17149 20.2159 7.15356 20.3069 7.15356C20.3979 7.15356 20.488 7.17149 20.5721 7.20632C20.6562 7.24115 20.7326 7.29221 20.797 7.35657C20.8614 7.42093 20.9124 7.49733 20.9472 7.58142C20.9821 7.66551 21 7.75564 21 7.84666C21 7.93768 20.9821 8.02781 20.9472 8.1119C20.9124 8.19599 20.8614 8.2724 20.797 8.33676L12.4903 16.6435C12.426 16.7079 12.3496 16.7591 12.2655 16.794C12.1814 16.8289 12.0912 16.8468 12.0002 16.8468C11.9091 16.8468 11.819 16.8289 11.7349 16.794C11.6508 16.7591 11.5744 16.7079 11.5101 16.6435L3.20337 8.33676C3.1389 8.27246 3.08776 8.19607 3.05286 8.11197C3.01796 8.02787 3 7.93771 3 7.84666C3 7.75561 3.01796 7.66545 3.05286 7.58135C3.08776 7.49726 3.1389 7.42087 3.20337 7.35657Z"
                fill="currentColor"
              />
            </svg>
          </slot>
        </button>
        <div class="accordion-body">
          <slot
            id="content"
            name="accordion-content"
            class="accordion-content"
            role="region"
            aria-labelledby="header"
          ></slot>
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
  options: { duration: 350, easing: "ease-in-out" }
});

setDefaultAnimation("accordion.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 350, easing: "ease-in-out" }
});

export default SgdsAccordionItem;
