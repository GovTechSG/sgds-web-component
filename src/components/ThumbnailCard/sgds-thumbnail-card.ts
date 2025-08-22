import { nothing } from "lit";
import { html, literal } from "lit/static-html.js";
import { property, queryAssignedNodes } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { CardElement } from "../../base/card-element";
import thumbnailCardStyle from "./thumbnail-card.css";

/**
 * @summary Thumbnail cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot default - The content area of the card, placed directly under the title. Accepts any HTML or custom elements.
 * @slot thumbnail - Accepts a small image or visual element typically displayed alongside the card's title or content to provide quick visual context.
 * @slot upper - Accepts any content to be displayed at the top of the subtitle. Commonly used for badges, status indicators, or decorative elements.
 * @slot subtitle - The subtitle of the card
 * @slot title - The title of the card
 * @slot description - The paragrapher text of the card
 * @slot lower - Accepts any additional content to be displayed below the card description, such as badges, metadata, or supplementary information.
 * @slot link - Accepts an anchor element. Only a single element is allowed to be passed in.
 */
export class SgdsThumbnailCard extends CardElement {
  static styles = [...CardElement.styles, thumbnailCardStyle];

  /** @internal */
  @queryAssignedNodes({ slot: "thumbnail", flatten: true })
  _thumbnailNode!: Array<Node>;
  /** @internal */
  @queryAssignedNodes({ slot: "upper", flatten: true })
  _upperNode!: Array<Node>;

  /** Removes the card's internal padding when set to true.  */
  @property({ type: Boolean, reflect: true }) noPadding = false;

  protected firstUpdated() {
    if (this._thumbnailNode.length === 0) {
      const thumbnail = this.shadowRoot.querySelector(".card-thumbnail") as HTMLDivElement;
      thumbnail.style.display = "none";

      if ((this.orientation === "vertical" && this._upperNode.length === 0) || this.orientation === "horizontal") {
        const media = this.shadowRoot.querySelector(".card-media") as HTMLDivElement;
        media.style.display = "none";

        const body = this.shadowRoot.querySelector(".card-body") as HTMLDivElement;
        if (this.noPadding) body.style.padding = "0px";
      }
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
        <div class="card-media">
					<div class="card-thumbnail">
            <slot name="thumbnail"></slot>
          </div>
					${this.orientation === "vertical" ? html`<slot name="upper"></slot>` : nothing}
        </div>
        <div class="card-body">
					${this.orientation === "horizontal" ? html`<slot name="upper"></slot>` : nothing}
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

export default SgdsThumbnailCard;
