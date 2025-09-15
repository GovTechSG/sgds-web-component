import { nothing } from "lit";
import { html, literal } from "lit/static-html.js";
import { property, queryAssignedElements, queryAssignedNodes } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { CardElement } from "../../base/card-element";
import SgdsLink from "../Link/sgds-link";
import IconCardStyle from "./icon-card.css";

/**
 * @summary Icon cards can be used for headers and footers, a wide variety of content, contain contextual background colors and images.
 * @slot default - The content area of the card, placed directly under the title. Accepts any HTML or custom elements.
 * @slot icon - Accepts an icon element to visually represent the card. Only a single element is allowed to be passed in.
 * @slot upper - Accepts any content to be displayed at the top of the subtitle. Commonly used for badges, status indicators, or decorative elements.
 * @slot subtitle - The subtitle of the card
 * @slot title - The title of the card
 * @slot description - The paragrapher text of the card
 * @slot lower - Accepts any additional content to be displayed below the card description, such as badges, metadata, or supplementary information.
 * @slot link - Accepts an anchor element. Only a single element is allowed to be passed in.
 */
export class SgdsIconCard extends CardElement {
  static styles = [...CardElement.styles, IconCardStyle];

  /** @internal */
  @queryAssignedNodes({ slot: "icon", flatten: true })
  _iconNode!: Array<Node>;
  /** @internal */
  @queryAssignedNodes({ slot: "upper", flatten: true })
  _upperNode!: Array<Node>;
  @queryAssignedElements({ slot: "link" })
  private linkNode!: HTMLAnchorElement[] | SgdsLink[];

  /** Removes the card's internal padding when set to true.  */
  @property({ type: Boolean, reflect: true }) noPadding = false;

  private get linkSlotItems(): HTMLAnchorElement {
    const element = this.linkNode[0] as HTMLElement;
    return (element.querySelector("a") || element) as HTMLAnchorElement;
  }

  protected firstUpdated() {
    if (this._iconNode.length === 0) {
      if ((this.orientation === "vertical" && this._upperNode.length === 0) || this.orientation === "horizontal") {
        const media = this.shadowRoot.querySelector(".card-media") as HTMLDivElement;
        media.style.display = "none";

        const body = this.shadowRoot.querySelector(".card-body") as HTMLDivElement;
        if (this.noPadding) body.style.padding = "0px";
      }
    }

    if (this.stretchedLink) {
      this.card.setAttribute("href", this.linkSlotItems.href);
    }
  }

  render() {
    const tag = this.stretchedLink ? literal`a` : literal`div`;
    const cardTabIndex = !this.stretchedLink || this.disabled ? -1 : 0;

    return html`
      <${tag} 
        class="${classMap({
          card: true,
          disabled: this.disabled
        })}"
        tabindex=${cardTabIndex}
      >
        ${this.tinted && !this.noPadding ? html`<div class="card-tinted-bg"></div>` : nothing}
        <div class="card-media">
          <slot name="icon"></slot>
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
          <slot name="description"></slot>
          <slot name="lower"></slot>
          <slot name="link" @slotchange=${this.handleLinkSlotChange}></slot>
        </div>
      </${tag}>
    `;
  }
}

export default SgdsIconCard;
