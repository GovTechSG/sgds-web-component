import { html, PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import linkStyles from "./link.css";
/**
 * @summary Link allows users to click and navigate their way from page to page
 *
 * @slot default - Pass in a single anchor tag here
 */
export class SgdsLink extends SgdsElement {
  static styles = [...SgdsElement.styles, linkStyles];
  /** Determines the size of the link */
  @property({ type: String, reflect: true })
  size: "xs" | "sm" | "md" | "lg" = "md";
  /** Sets the colour of the link.
   * @deprecated since v3.6.0 — use `tone` instead.
   */
  @property({ type: String, reflect: true })
  variant: "primary" | "danger" | "neutral" | "light" | "dark" = "primary";
  /** Sets the colour of the link, replaces variant prop  */
  @property({ type: String, reflect: true })
  tone: "primary" | "danger" | "neutral" | "fixed-light" | "fixed-dark" = "primary";
  /** When true, sets the active stylings of the link */
  @property({ type: Boolean, reflect: true })
  active = false;
  /** Disables the link */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _processAnchor(anchor: HTMLAnchorElement) {
    if (this.disabled) {
      anchor.setAttribute("disabled", "true");
    }
    if (anchor.hasAttribute("disabled")) {
      anchor.removeAttribute("href");
    }
  }

  private _handleSlotChange(e: Event) {
    // Let SSR apps handle anchor disabled state directly to avoid hydration mismatch
    if (this.ssr) return;
    const anchor = (e.target as HTMLSlotElement)
      .assignedElements()
      .find(el => el.tagName.toLowerCase() === "a") as HTMLAnchorElement;

    if (anchor) {
      this._processAnchor(anchor);
    }
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    // Let SSR apps handle anchor disabled state directly to avoid hydration mismatch
    if (this.ssr) return;

    const anchor = this.querySelector("a");
    if (anchor) {
      this._processAnchor(anchor);
    }
  }

  render() {
    /** When removing href, link is no longer focusable */
    return html`<slot class="nav-link " @slotchange=${this._handleSlotChange}></slot> `;
  }
}

export default SgdsLink;
