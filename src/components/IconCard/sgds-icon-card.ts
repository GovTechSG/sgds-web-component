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
 * @slot footer - Footer area of the card. Accepts links, actions, or any custom content.
 * @slot link - (@deprecated) Deprecated since 3.3.2 in favour of `footer` slot.
 *  Legacy slot for anchor elements. Use `footer` instead.
 */
export class SgdsIconCard extends CardElement {
  static styles = [...CardElement.styles, IconCardStyle];

  /** @internal */
  @queryAssignedNodes({ slot: "icon", flatten: true })
  _iconNode!: Array<Node>;
  /** @internal */
  @queryAssignedNodes({ slot: "upper", flatten: true })
  _upperNode!: Array<Node>;
  @queryAssignedElements({ slot: "footer" })
  private footerNode!: HTMLElement[];
  @queryAssignedElements({ slot: "link" })
  private linkNode!: HTMLAnchorElement[] | SgdsLink[];

  /** Removes the card's internal padding when set to true.  */
  @property({ type: Boolean, reflect: true }) noPadding = false;

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

  protected firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    if (this._iconNode.length === 0) {
      if ((this.orientation === "vertical" && this._upperNode.length === 0) || this.orientation === "horizontal") {
        const media = this.shadowRoot.querySelector(".card-media") as HTMLDivElement;
        media.style.display = "none";

        const body = this.shadowRoot.querySelector(".card-body") as HTMLDivElement;
        if (this.noPadding) body.style.padding = "0px";
      }
    }

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
          <slot name="footer">
            <slot name="link" @slotchange=${this.warnLinkSlotMisused}></slot>
          </slot>
        </div>
      </${tag}>
    `;
  }
}

export default SgdsIconCard;
