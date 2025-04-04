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
 * @slot header - The accordion-item button header slot.
 * @slot content - The accordion-item content slot.
 * @slot caret - The caret icon of accordion-item.
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
      <div class="accordion-item">
        <button
          class=${classMap({
            "accordion-btn": true,
            disabled: this.disabled,
            collapsed: !this.open
          })}
          ?disabled=${this.disabled}
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-controls="content"
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="header"></slot>
          <slot name="caret">
            <sgds-icon name="chevron-down" size=${this.getAttribute("density") === "compact" ? "md" : "lg"}></sgds-icon>
          </slot>
        </button>
        <div class="accordion-body">
          <slot id="content" name="content" class="content" role="region" aria-labelledby="header"></slot>
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
