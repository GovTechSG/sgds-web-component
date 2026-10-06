import { property } from "lit/decorators.js";
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

  /** @internal The anchor element from the footer/link slot, used for navigation */
  private _stretchedAnchor: HTMLAnchorElement | null = null;

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

    this._stretchedAnchor = anchor;

    // Set host-level link semantics
    this.setAttribute("role", "link");
    this.setAttribute("tabindex", "0");

    // Derive accessible name from anchor text or card title
    const label = anchor.textContent?.trim() || this.querySelector("[slot='title']")?.textContent?.trim();
    if (label) {
      this.setAttribute("aria-label", label);
    }

    this.addEventListener("click", this._handleStretchedClick);
    this.addEventListener("keydown", this._handleStretchedKeydown);
  }

  private _handleStretchedClick = () => {
    if (this.disabled || !this._stretchedAnchor) return;
    this._stretchedAnchor.click();
  };

  private _handleStretchedKeydown = (e: KeyboardEvent) => {
    if (this.disabled || !this._stretchedAnchor) return;
    if (e.key === "Enter") {
      this._stretchedAnchor.click();
    }
  };

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
