import { SgdsDropdown } from "./sgds-dropdown";
import { SgdsDropdownItem } from "./sgds-dropdown-item";

customElements.define("sgds-dropdown", SgdsDropdown);
customElements.define("sgds-dropdown-item", SgdsDropdownItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-dropdown": SgdsDropdown;
    "sgds-dropdown-item": SgdsDropdownItem;
  }
}
