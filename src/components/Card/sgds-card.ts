import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html, literal } from "lit/static-html.js";
import { CardElement } from "../../base/card-element";
import { HasSlotController } from "../../utils/slot";
import cardStyle from "./card.css";
import { CardImageAdjustment, CardImagePosition } from "./types";

/**
 * @summary Cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot default - The content area of the card, placed directly under the title. Accepts any HTML or custom elements.
 * @slot menu - Accepts an element for an overflow or contextual menu, positioned at the top-right corner of the card. Typically used for action menus or dropdowns.
 * @slot upper - Accepts an element to be displayed above the card content. When used, it overrides image and icon slot content.
 * @slot image - Accepts an image or svg element of the card. Only a single element is allowed to be passed in.
 * @slot icon - Accepts an icon element to visually represent the card. Only a single element is allowed to be passed in.
 * @slot subtitle - The subtitle of the card
 * @slot title - The title of the card
 * @slot description - The paragrapher text of the card
 * @slot lower - Accepts any additional content to be displayed below the card description, such as badges, metadata, or supplementary information.
 * @slot link - Accepts an anchor element. Only a single element is allowed to be passed in.
 */
export class SgdsCard extends CardElement {
  static styles = [...CardElement.styles, cardStyle];

  /** Sets the image position of the card. Available options: `before`, `after` */
  @property({ type: String, reflect: true }) imagePosition: CardImagePosition = "before";

  /** Controls how the image is sized and aligned within the card. Available options: `default`, `padding around`, `aspect ratio` */
  @property({ type: String, reflect: true }) imageAdjustment: CardImageAdjustment = "default";

  private readonly hasSlotController = new HasSlotController(this, "image", "icon", "menu");

  handleImgSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;

    if (childNodes.length > 1) {
      console.error("Multiple elements passed into SgdsCard's image slot");
    }

    if (this.hasSlotController.test("icon") && this.hasSlotController.test("image")) {
      console.error("Both image and icon slots cannot be used together in SgdsCard");
    }
  }

  render() {
    const tag = this.stretchedLink ? literal`a` : literal`div`;
    const cardTabIndex = !this.stretchedLink || this.disabled ? -1 : 0;

    const hasImageSlot = this.hasSlotController.test("image");
    const hasIconSlot = this.hasSlotController.test("icon");
    const hasMenuSlot = this.hasSlotController.test("menu");
    const hasUpperSlot = this.hasSlotController.test("upper");

    return html`
      <${tag}
        class="card ${classMap({
          disabled: this.disabled
        })}"
        tabindex=${cardTabIndex}
      >
        <div class="card-tinted-bg"></div>
        
        ${hasMenuSlot ? html` <slot name="menu"></slot> ` : nothing}
        <div class=${classMap({
          "card-image": hasImageSlot,
          "card-media": hasIconSlot || hasUpperSlot
        })}>
          <slot name="upper">
          ${hasImageSlot ? html` <slot name="image" @slotchange=${this.handleImgSlotChange}></slot> ` : nothing}
          ${hasIconSlot ? html` <slot name="icon"></slot> ` : nothing}
          </slot>
        </div>

        <div class="card-body">
          <div class="card-header-container">
            <div class="card-header">
              <slot name="subtitle"></slot>
              <h3 class="card-title"><slot name="title" @slotchange=${this.handleTitleSlotChange}></slot></h3>
            </div>
            <slot></slot>
          </div>
          <slot name="description"></slot>
          <slot name="lower"></slot>
          <slot name="link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </${tag}>
    `;
  }
}

export default SgdsCard;
