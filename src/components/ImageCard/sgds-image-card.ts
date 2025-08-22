import { nothing } from "lit";
import { html, literal } from "lit/static-html.js";
import { property, queryAssignedNodes } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { CardElement } from "../../base/card-element";
import { CardImageAdjustment, CardImagePosition } from "../Card/types";
import imageCardStyle from "./image-card.css";

/**
 * @summary Image cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot default - The content area of the card, placed directly under the title. Accepts any HTML or custom elements.
 * @slot image - Accepts an image or svg element of the card. Only a single element is allowed to be passed in.
 * @slot image-badge - Accepts an element for a badge, positioned at the top-left corner of the image.
 * @slot image-action - Accepts an element for an overflow or contextual menu, positioned at the top-right corner of the image. Typically used for action menu.
 * @slot upper - Accepts any content to be displayed at the top of the subtitle. Commonly used for badges, status indicators, or decorative elements.
 * @slot subtitle - The subtitle of the card
 * @slot title - The title of the card
 * @slot description - The paragrapher text of the card
 * @slot lower - Accepts any additional content to be displayed below the card description, such as badges, metadata, or supplementary information.
 * @slot link - Accepts an anchor element. Only a single element is allowed to be passed in.
 */
export class SgdsImageCard extends CardElement {
  static styles = [...CardElement.styles, imageCardStyle];

  /** @internal */
  @queryAssignedNodes({ slot: "image", flatten: true })
  _imageNode!: Array<Node>;

  /** Removes the card's internal padding when set to true.  */
  @property({ type: Boolean, reflect: true }) noPadding = false;

  /** Sets the image position of the card. Available options: `before`, `after` */
  @property({ type: String, reflect: true }) imagePosition: CardImagePosition = "before";

  /** Controls how the image is sized and aligned within the card. Available options: `default`, `padding around`, `aspect ratio` */
  @property({ type: String, reflect: true }) imageAdjustment: CardImageAdjustment = "default";

  protected firstUpdated() {
    if (this._imageNode.length === 0) {
      const image = this.shadowRoot.querySelector(".card-image") as HTMLDivElement;
      const body = this.shadowRoot.querySelector(".card-body") as HTMLDivElement;
      image.style.display = "none";
      if (this.noPadding) body.style.padding = "0px";
    }
  }

  handleImgSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;

    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's image slot");
    }
  }

  render() {
    const tag = this.stretchedLink ? literal`a` : literal`div`;
    const cardTabIndex = !this.stretchedLink || this.disabled ? -1 : 0;

    return html`
      <${tag} 
        class="card ${classMap({
          disabled: this.disabled
        })}"
        tabindex=${cardTabIndex}
      >
        ${this.tinted && !this.noPadding ? html`<div class="card-tinted-bg"></div>` : nothing}
        <div class="card-image">
					<slot name="image" @slotchange=${this.handleImgSlotChange}></slot>
					<slot name="image-badge"></slot>
					<slot name="image-action"></slot>
        </div>
        <div class="card-body">
					<slot name="upper"></slot>
          <div class="card-header-container">
            <div class="card-header">
              <slot name="subtitle"></slot>
              <h3 class="card-title"><slot name="title" @slotchange=${this.handleTitleSlotChange}></slot></h3>
            </div>
            <slot></slot>
          </div>
          <p class="card-text">
            <slot name="description"></slot>
          </p>
          <slot name="lower"></slot>
          <slot name="link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </${tag}>
    `;
  }
}

export default SgdsImageCard;
