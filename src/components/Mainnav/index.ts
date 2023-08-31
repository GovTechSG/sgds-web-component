import { SgdsMainnav } from "./sgds-mainnav";
import { SgdsMainnavDropdown } from "./sgds-mainnav-dropdown";
import { SgdsMainnavItem } from "./sgds-mainnav-item";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsMainnav, SgdsMainnavDropdown, SgdsMainnavItem]);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-mainnav": SgdsMainnav;
    "sgds-mainnav-dropdown": SgdsMainnavDropdown;
    "sgds-mainnav-item": SgdsMainnavItem;
  }
}
