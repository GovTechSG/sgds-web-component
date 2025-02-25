import { html } from "lit";
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
  size: "sm" | "md" | "lg" = "md";
  /** when true, sets the active stylings of the link */
  @property({ type: String, reflect: true })
  variant: "primary" | "danger" | "light" | "dark" = "primary";

  private _handleSlotChange(e: Event) {
    const anchor = this.querySelector("a");
    if (anchor) {
      if (anchor.hasAttribute("disabled")) {
        anchor.setAttribute("href", "javascript:void(0)");
        anchor.setAttribute("tabindex", "-1");
      } else {
        anchor.setAttribute("tabindex", "0");
      }
    }
  }

  render() {
    /** When removing href, link is no longer focusable */
    return html`<slot class="nav-link" @slotchange=${this._handleSlotChange}></slot>`;
  }
}

export default SgdsLink;
