import { html } from "lit";
import { property, queryAssignedNodes } from "lit/decorators.js";
import { CardElement } from "../../base/card-element";
import cardStyle from "./card.css";

export type CardImageAdjustment = "default" | "padding around" | "aspect ratio";
export type CardImagePosition = "before" | "after";
export type CardOrientation = "vertical" | "horizontal";

/**
 * @summary Cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot image - Accepts an image or svg element of the card. Only a single element is allowed to be passed in.
 * @slot metadata - The metadata of the card
 * @slot title - The title of the card
 * @slot description - The paragrapher text of the card
 * @slot link - Accepts an anchor element. Only a single element is allowed to be passed in.
 */
export class SgdsCard extends CardElement {
  static styles = [...CardElement.styles, cardStyle];

  /** @internal */
  @queryAssignedNodes({ slot: "image", flatten: true })
  _imageNode!: Array<Node>;
  /** @internal */
  @queryAssignedNodes({ slot: "icon", flatten: true })
  _iconNode!: Array<Node>;

  /** Sets the orientation of the card */
  @property({ type: String, reflect: true }) orientation: CardOrientation = "vertical";

  /** Sets the orientation of the card */
  @property({ type: String, reflect: true }) imagePosition: CardImagePosition = "before";

  /** Sets the orientation of the card */
  @property({ type: String, reflect: true }) imageAdjustment: CardImageAdjustment = "default";

  protected firstUpdated() {
    if (this._imageNode.length === 0) {
      const icon = this.shadowRoot.querySelector(".card-image") as HTMLDivElement;
      icon.style.display = "none";
    }
    if (this._iconNode.length === 0) {
      const icon = this.shadowRoot.querySelector(".card-icon") as HTMLDivElement;
      icon.style.display = "none";
    }
  }

  handleLinkSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLLinkElement>;
    console.log(childNodes);
    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's link slot");
    }
    return;
  }

  handleImgSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;
    console.log(childNodes);
    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's image slot");
    }
  }

  render() {
    return html`
      <div class="card">
        <div class="card-image">
          <slot name="image" @slotchange=${this.handleImgSlotChange}></slot>
        </div>
        <div class="card-icon">
          <slot name="icon"></slot>
        </div>
        <div class="card-body">
          <div class="card-header">
            <slot name="metadata"></slot>
            <h3 class="card-title"><slot name="title"></slot></h3>
          </div>
          <p class="card-text">
            <slot name="description"></slot>
          </p>
          <slot name="link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsCard;
