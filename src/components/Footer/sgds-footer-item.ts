import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import footerLinkStyle from "./footer-item.css";

export class SgdsFooterItem extends SgdsElement {
  static styles = [...SgdsElement.styles, footerLinkStyle];

  render() {
    return html`
      <div class="footer-item">
        <slot name="footer-item-title"></slot>
        <div class="links">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsFooterItem;
