import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
// import accordionStyle from "./accordion.css";
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
 *
 * @cssprop --accordion-item-padding-y - The top and bottom padding for the container of accordion item's content
 * @cssprop --accordion-item-padding-x - The right and left padding for the container of accordion item's content
 * @cssprop --accordion-item-border-radius - The border radius of the accordion item
 * @cssprop --accordion-item-font-weight - The font weight of accordion-button when it is not collapsed
 * @cssprop --accordion-item-line-height - The line height of accordion
 * @cssprop --accordion-item-button-color - The text colour of the button in accordion-item
 * @cssprop --accordion-item-button-border-radius - The border radius of button in accordion-item
 * @cssprop --accordion-item-button-bg - The background colour of the button in accordion-item
 * @cssprop --accordion-item-button-icon - The caret icon of the button in accordion-item
 * @cssprop --accordion-item-button-icon-width - The width of the caret icon
 * @cssprop --accordion-item-button-icon-transform - The transform value of caret icon when accordion is toggled open and close
 * @cssprop --accordion-item-button-icon-transition - The transition value of caret icon when accordion is toggled open and close
 * @cssprop --accordion-item-button-focus-border-color - The border colour of accordion button on focus state
 * @cssprop --accordion-item-button-focus-border-color - The border colour of accordion button on focus state
 * @cssprop --accordion-item-button-focus-box-shadow - The box-shadow of accordion button on focus state
 * @cssprop --accordion-item-content-color - The content text colour of the accordion-item
 */
export class SgdsAccordionItem extends SgdsElement {
  static styles = [...SgdsElement.styles, accordionItemStyle];
  /** @internal */
  @query(".accordion-item") accordion: HTMLElement;
  /** @internal */
  @query(".accordion-button") header: HTMLElement;
  /** @internal */
  @query(".accordion-body") body: HTMLElement;

  /** Controls whether accordion-item is open or close */
  @property({ type: Boolean, reflect: true }) open = false;

  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? "auto" : "0";
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
          "sgds accordion-item": true
        })}
      >
        <button
          class=${classMap({
            "accordion-btn": true,
            collapsed: !this.open
          })}
          part="header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="content"
          tabindex="0"
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="accordion-header"></slot>
        </button>
        <div class="accordion-body">
          <slot name="accordion-content" class="accordion-content" role="region" aria-labelledby="header"></slot>
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
