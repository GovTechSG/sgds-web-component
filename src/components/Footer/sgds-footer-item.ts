import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import footerLinkStyle from "./footer-item.css";

/**
 * @summary The footer item component organizes links under a clear, descriptive title within the footer. It helps users easily navigate to related resources or information, ensuring clarity and accessibility.
 *
 * @slot default - The slot for the list of link items
 * @slot title - The slot for the title of the list of items
 *
 */
export class SgdsFooterItem extends SgdsElement {
  static styles = [...SgdsElement.styles, footerLinkStyle];

  render() {
    return html`
      <div class="footer-item">
        <slot name="title"></slot>
        <div class="links">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsFooterItem;
