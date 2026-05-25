import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import footerLinkStyle from "./footer-item.css";
import type SgdsLink from "../Link/sgds-link";

/**
 * @summary The footer item component organizes links under a clear, descriptive title within the footer. It helps users easily navigate to related resources or information, ensuring clarity and accessibility.
 *
 * @slot default - The slot for the list of link items
 * @slot title - The slot for the title of the list of items
 *
 */
export class SgdsFooterItem extends SgdsElement {
  static styles = [...SgdsElement.styles, footerLinkStyle];

  /** Sets the color tone of the footer item. Inherited from the parent sgds-footer. */
  @property({ type: String, reflect: true }) tone: "fixed-dark" | "neutral" = "fixed-dark";

  /**@internal */
  @watch("tone", { waitUntilFirstUpdate: true })
  _handleToneChange() {
    const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
    defaultSlot?.assignedElements().forEach(el => {
      if (el.tagName === "SGDS-LINK") {
        (el as SgdsLink).tone = this.tone === "neutral" ? "neutral" : "fixed-light";
      }
    });
  }

  private _handleSlotChange(e: Event) {
    const linkTone = this.tone === "neutral" ? "neutral" : "fixed-light";
    const assignedElements = (e.target as HTMLSlotElement).assignedElements();
    assignedElements.forEach(el => {
      if (el.tagName === "SGDS-LINK") {
        const sgdsLink = el as SgdsLink;
        sgdsLink.tone = linkTone;
        sgdsLink.size = "sm";
      }
    });
  }
  render() {
    return html`
      <div class="footer-item">
        <slot name="title"></slot>
        <div class="links">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsFooterItem;
