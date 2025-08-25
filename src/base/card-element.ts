import { property, query } from "lit/decorators.js";
import { SgdsLink } from "../components/Link/sgds-link";
import { CardOrientation } from "../components/Card/types";
import SgdsElement from "./sgds-element";
import cardStyle from "./card.css";
import textStyles from "../styles/text-variants.css";
import bgStyles from "../styles/bg-variants.css";
import borderStyles from "../styles/border-variants.css";
import headerStyles from "../styles/header-class.css";
import paragraphStyles from "../styles/paragraph.css";

export class CardElement extends SgdsElement {
  static styles = [...SgdsElement.styles, textStyles, bgStyles, borderStyles, headerStyles, paragraphStyles, cardStyle];

  /** @internal */
  @query("a.card") card: HTMLAnchorElement;

  /** Extends the link passed in slot[name="link"] to the entire card */
  @property({ type: Boolean, reflect: true }) stretchedLink = false;

  /** Disables the card  */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** When true, hides the default border of the card. */
  @property({ type: Boolean, reflect: true }) hideBorder = false;

  /** When true, applies a tinted background color to the card. */
  @property({ type: Boolean, reflect: true }) tinted = false;

  /** Sets the orientation of the card. Available options: `vertical`, `horizontal` */
  @property({ type: String, reflect: true }) orientation: CardOrientation = "vertical";

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

    if (!this.stretchedLink) return;

    if (childNodes[0] instanceof HTMLAnchorElement || childNodes[0] instanceof SgdsLink) {
      const hyperlink = (childNodes[0].querySelector("a") || childNodes[0]) as HTMLAnchorElement;
      this.card.setAttribute("href", hyperlink.href);
      const linkSlot = this.shadowRoot.querySelector("slot[name='link']") as HTMLSlotElement;
      linkSlot.style.display = "none";
    }
  }
}
