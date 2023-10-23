import { SgdsMainnav } from "./sgds-mainnav";
import { SgdsMainnavDropdown } from "./sgds-mainnav-dropdown";
import { SgdsMainnavItem } from "./sgds-mainnav-item";

customElements.define("sgds-mainnav", SgdsMainnav);
customElements.define("sgds-mainnav-dropdown", SgdsMainnavDropdown);
customElements.define("sgds-mainnav-item", SgdsMainnavItem);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-mainnav": SgdsMainnav;
    "sgds-mainnav-dropdown": SgdsMainnavDropdown;
    "sgds-mainnav-item": SgdsMainnavItem;
  }
}
