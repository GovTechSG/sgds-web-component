import { SgdsSubnav } from "./sgds-subnav";
import { SgdsSubnavItem } from "./sgds-subnav-item";

customElements.define("sgds-subnav", SgdsSubnav);
customElements.define("sgds-subnav-item", SgdsSubnavItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-subnav": SgdsSubnav;
    "sgds-subnav-item": SgdsSubnavItem;
  }
}
