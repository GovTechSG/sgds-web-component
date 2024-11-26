import { SgdsFooter } from "./sgds-footer";
import { SgdsFooterItem } from "./sgds-footer-item";

customElements.define("sgds-footer", SgdsFooter);
customElements.define("sgds-footer-item", SgdsFooterItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-footer": SgdsFooter;
    "sgds-footer-item": SgdsFooterItem;
  }
}
