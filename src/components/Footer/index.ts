import { SgdsFooter } from "./sgds-footer";
import { SgdsFooterTitle } from "./sgds-footer-title";
import { SgdsFooterLink } from "./sgds-footer-link";

customElements.define("sgds-footer", SgdsFooter);
customElements.define("sgds-footer-title", SgdsFooterTitle);
customElements.define("sgds-footer-link", SgdsFooterLink);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-footer": SgdsFooter;
    "sgds-footer-title": SgdsFooterTitle;
    "sgds-footer-link": SgdsFooterLink;
  }
}
