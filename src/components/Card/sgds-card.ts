import { PropertyValueMap } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html, literal } from "lit/static-html.js";
import { CardElement } from "../../base/card-element";
import { HasSlotController } from "../../utils/slot";
import { CardImageAdjustment, CardImagePosition } from "./types";
import type SgdsLink from "../Link/sgds-link";
import cardStyle from "./card.css";

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
 * @slot footer - Footer area of the card. Accepts links, actions, or any custom content.
 * @slot link - (@deprecated) Deprecated since 3.3.2 in favour of `footer` slot.
 *  Legacy slot for anchor elements. Use `footer` instead.
 */
export class SgdsCard extends CardElement {
  static styles = [...CardElement.styles, cardStyle];

  @queryAssignedElements({ slot: "footer" })
  private footerNode!: HTMLElement[];
  @queryAssignedElements({ slot: "link" })
  private linkNode!: HTMLAnchorElement[] | SgdsLink[];

  /** Sets the image position of the card. Available options: `before`, `after` */
  @property({ type: String, reflect: true }) imagePosition: CardImagePosition = "before";

  /** Controls how the image is sized and aligned within the card. Available options: `default`, `padding around`, `aspect ratio` */
  @property({ type: String, reflect: true }) imageAdjustment: CardImageAdjustment = "default";

  /** Used only for SSR to indicate the presence of the `image` slot. */
  @property({ type: Boolean }) hasImageSlot = false;

  /** Used only for SSR to indicate the presence of the `icon` slot. */
  @property({ type: Boolean }) hasIconSlot = false;

  /** Used only for SSR to indicate the presence of the `upper` slot. */
  @property({ type: Boolean }) hasUpperSlot = false;

  private get linkSlotItems(): HTMLAnchorElement | null {
    if (!this.linkNode || this.linkNode.length === 0) return null;
    const element = this.linkNode[0] as HTMLElement;
    return (element.querySelector("a") || element) as HTMLAnchorElement;
  }

  private get footerSlotItems(): HTMLAnchorElement | null {
    if (!this.footerNode || this.footerNode.length === 0) return null;
    const element = this.footerNode[0] as HTMLElement;
    return (element.querySelector("a") || element) as HTMLAnchorElement;
  }

  private readonly hasSlotController = new HasSlotController(this, "image", "icon", "upper");

  protected firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    if (this.stretchedLink) {
      const footerHref = this.footerSlotItems?.href;
      const linkHref = this.linkSlotItems?.href;

      if (footerHref) {
        this.card.setAttribute("href", footerHref);
      } else if (linkHref) {
        this.card.setAttribute("href", linkHref);
      }
    }
  }

  updated() {
    if (!this.hasImageSlot) this.hasImageSlot = this.hasSlotController.test("image");
    if (!this.hasIconSlot) this.hasIconSlot = this.hasSlotController.test("icon");
    if (!this.hasUpperSlot) this.hasUpperSlot = this.hasSlotController.test("upper");
  }

  handleImgSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;

    if (childNodes.length > 1) {
      console.error("Multiple elements passed into SgdsCard's image slot");
    }

    if (this.hasSlotController.test("image") && this.hasSlotController.test("icon")) {
      console.error("Both image and icon slots cannot be used together in SgdsCard");
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
        <div class="card-tinted-bg"></div>
        
        <slot name="menu"></slot>
        <div class=${classMap({
          "card-image": this.hasImageSlot,
          "card-media": this.hasIconSlot || this.hasUpperSlot
        })}>
          <slot name="upper">
            <slot name="image" @slotchange=${this.handleImgSlotChange}></slot>
            <slot name="icon"></slot>
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
          <slot name="footer">
            <slot name="link" @slotchange=${this.warnLinkSlotMisused}></slot>
          </slot>
        </div>
      </${tag}>
    `;
  }
}

export default SgdsCard;
