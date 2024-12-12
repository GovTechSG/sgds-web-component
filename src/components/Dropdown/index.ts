import { SgdsDropdown } from "./sgds-dropdown";
import { SgdsDropdownItem } from "./sgds-dropdown-item";
import { register } from "../../utils/ce-registry";

register("sgds-dropdown", SgdsDropdown);
register("sgds-dropdown-item", SgdsDropdownItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-dropdown": SgdsDropdown;
    "sgds-dropdown-item": SgdsDropdownItem;
  }
}
