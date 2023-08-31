import { SgdsDropdown } from "./sgds-dropdown";
import { SgdsDropdownItem } from "./sgds-dropdown-item";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsDropdown, SgdsDropdownItem]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-dropdown": SgdsDropdown;
    "sgds-dropdown-item": SgdsDropdownItem;
  }
}
