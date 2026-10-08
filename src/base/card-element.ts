import { property, state } from "lit/decorators.js";
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

  /** Extends the link passed in either `footer` or `link`(deprecated) slot.
   */
  @property({ type: Boolean, reflect: true }) stretchedLink = false;

  /** Disables the card  */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** When true, hides the default border of the card. */
  @property({ type: Boolean, reflect: true }) hideBorder = false;

  /** When true, applies a tinted background color to the card. */
  @property({ type: Boolean, reflect: true }) tinted = false;

  /** Sets the orientation of the card. Available options: `vertical`, `horizontal` */
  @property({ type: String, reflect: true }) orientation: CardOrientation = "vertical";

  /** @internal The href for the stretched link anchor rendered in shadow DOM */
  @state() protected _stretchedHref = "";

  /** @internal The accessible label for the stretched link */
  @state() protected _stretchedLabel = "";

  handleTitleSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLElement>;

    if (this.stretchedLink && childNodes[0] instanceof HTMLAnchorElement) {
      const hyperlink = childNodes[0].querySelector("a") || childNodes[0];
      hyperlink.removeAttribute("href");
    }
    return;
  }

  protected _forwardAnchorAttributes(anchor: HTMLAnchorElement | null) {
    if (
      !anchor?.href ||
      anchor.href.startsWith("javascript:") ||
      anchor.href.startsWith("data:") ||
      anchor.href.startsWith("vbscript:")
    ) {
      return;
    }

    this._stretchedHref = anchor.href;

    // Derive accessible name from visible title text first, then anchor text
    this._stretchedLabel =
      this.querySelector("[slot='title']")?.textContent?.trim() || anchor.textContent?.trim() || "";
  }

  warnLinkSlotMisused(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as
      | Array<HTMLLinkElement>
      | Array<HTMLAnchorElement>
      | Array<SgdsLink>;

    if (childNodes.length > 1) {
      return console.error("Multiple elements passed into SgdsCard's link slot");
    }
  }
}
