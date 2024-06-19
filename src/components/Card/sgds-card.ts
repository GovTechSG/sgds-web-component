import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { CardElement } from "../../base/card-element";
import cardStyle from "./card.css";

/**
 * @summary Cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot card-title - The title of the card
 * @slot card-text - The paragrapher text of the card
 * @slot card-image - Accepts an image or svg element of the card. Only a single element is allowed to be passed in.
 * @slot card-link - Accepts an anchor element. Only a single element is allowed to be passed in.
 *
 *
 * @csspart base - The card base wrapper
 * @csspart body - The card body
 * @csspart title - The card title
 * @csspart text - The card text
 *
 * @cssprop --card-background - The background color of the card
 * @cssprop --card-height - The height of the card. By default, height of card depends on the size of its children
 * @cssprop --card-border-width - The border width of card
 * @cssprop --card-border-color - The border color of card
 * @cssprop --card-border-radius - The border radius of card
 * @cssprop --card-box-shadow - The box-shadow of card
 * @cssprop --card-inner-border-radius - The inner border radius of card. Useful in cases where card image is applied to prevent image border from exceeding the outer borders of the card
 * @cssprop --card-body-color - The text color of the items in card body. This includes title, subtitle and excludes link.
 * @cssprop --card-body-spacer-y - The y-axis spacer of card body
 * @cssprop --card-body-spacer-x - The x-axis spacer of card body.
 * @cssprop --card-title-color - The text color of card title
 * @cssprop --card-title-spacer-y - The y-axis spacer of card title.
 *
 */
export class SgdsCard extends CardElement {
  static styles = [...CardElement.styles, cardStyle];

  /** Extends the link passed in slot[name="link"] to the entire card */
  @property({ type: Boolean }) stretchedLink = false;

  handleLinkSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLLinkElement>;
    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's link slot");
    }
    if (this.stretchedLink) {
      childNodes[0].classList.add("stretched-link");
    }
    return;
  }

  handleImgSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;
    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's image slot");
    }
  }
  render() {
    return html`
      <div
        class="${classMap({
          sgds: true,
          card: true,
          [`text-${this.textColor}`]: this.textColor,
          [`bg-${this.bgColor}`]: this.bgColor,
          [`border-${this.borderColor}`]: this.borderColor
        })}
        "
        part="base"
      >
        <slot name="card-image" @slotchange=${this.handleImgSlotChange}></slot>
        <div class="card-body" part="body">
          <h3 class="card-title" part="title"><slot name="card-title"></slot></h3>
          <p class="card-text" part="text">
            <slot name="card-text"></slot>
          </p>
          <slot name="card-link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsCard;
