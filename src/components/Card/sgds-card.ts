import { html, literal } from "lit/static-html.js";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { CardElement } from "../../base/card-element";
import SgdsLink from "../Link/sgds-link";
import cardStyle from "./card.css";

export type CardImageAdjustment = "default" | "padding around" | "aspect ratio";
export type CardImagePosition = "before" | "after";
export type CardOrientation = "vertical" | "horizontal";

/**
 * @summary Cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot image - Accepts an image or svg element of the card. Only a single element is allowed to be passed in.
 * @slot icon - Accepts an icon element to visually represent the card. Only a single element is allowed to be passed in.
 * @slot subtitle - The subtitle of the card
 * @slot title - The title of the card
 * @slot description - The paragrapher text of the card
 * @slot link - Accepts an anchor element. Only a single element is allowed to be passed in.
 */
export class SgdsCard extends CardElement {
  static styles = [...CardElement.styles, cardStyle];

  /** @internal */
  @query("a.card") card: HTMLAnchorElement;

  /** @internal */
  @queryAssignedNodes({ slot: "image", flatten: true })
  _imageNode!: Array<Node>;
  /** @internal */
  @queryAssignedNodes({ slot: "icon", flatten: true })
  _iconNode!: Array<Node>;
  /** @internal */
  @queryAssignedNodes({ slot: "link", flatten: true })
  _linkNode!: Array<Node>;

  /** Extends the link passed in slot[name="link"] to the entire card */
  @property({ type: Boolean, reflect: true }) stretchedLink = false;

  /** Disables the card  */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Sets the orientation of the card. Available options: `vertical`, `horizontal` */
  @property({ type: String, reflect: true }) orientation: CardOrientation = "vertical";

  /** Sets the image position of the card. Available options: `before`, `after` */
  @property({ type: String, reflect: true }) imagePosition: CardImagePosition = "before";

  /** Controls how the image is sized and aligned within the card. Available options: `default`, `padding around`, `aspect ratio` */
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
    if (this.disabled && this._linkNode.length > 0) {
      const hyperlink = (this._linkNode[0] as HTMLLinkElement).querySelector("a");
      hyperlink.setAttribute("disabled", "true");
      hyperlink.removeAttribute("href");
    }
  }

  handleTitleSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLElement>;

    if (this.stretchedLink && childNodes[0] instanceof HTMLAnchorElement) {
      const hyperlink = childNodes[0].querySelector("a") || childNodes[0];
      hyperlink.removeAttribute("href");
    }
    return;
  }

  handleLinkSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as
      | Array<HTMLLinkElement>
      | Array<HTMLAnchorElement>
      | Array<SgdsLink>;

    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's link slot");
    }

    if (this.stretchedLink && childNodes[0] instanceof HTMLAnchorElement) {
      const hyperlink = childNodes[0].querySelector("a") || childNodes[0];
      this.card.setAttribute("href", hyperlink.href);
      const linkSlot = this.shadowRoot.querySelector("slot[name='link']") as HTMLSlotElement;
      linkSlot.style.display = "none";
    }

    if (this.stretchedLink && childNodes[0] instanceof SgdsLink) {
      const hyperlink = (childNodes[0].querySelector("a") || childNodes[0]) as HTMLAnchorElement;
      this.card.setAttribute("href", hyperlink.href);
      const linkSlot = this.shadowRoot.querySelector("slot[name='link']") as HTMLSlotElement;
      linkSlot.style.display = "none";
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
    const tag = this.stretchedLink ? literal`a` : literal`div`;
    const cardTabIndex = !this.stretchedLink || this.disabled ? -1 : 0;

    return html`
      <${tag} 
        class="card ${classMap({
          disabled: this.disabled
        })}"
        tabindex=${cardTabIndex}
      >
        <div class="card-image">
          <slot name="image" @slotchange=${this.handleImgSlotChange}></slot>
        </div>
        <div class="card-icon">
          <slot name="icon"></slot>
        </div>
        <div class="card-body">
          <div class="card-header">
            <slot name="subtitle"></slot>
            <h3 class="card-title"><slot name="title" @slotchange=${this.handleTitleSlotChange}></slot></h3>
          </div>
          <p class="card-text">
            <slot name="description"></slot>
          </p>
          <slot name="link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </${tag}>
    `;
  }
}

export default SgdsCard;
