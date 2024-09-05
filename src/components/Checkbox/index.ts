import { SgdsCheckbox } from "./sgds-checkbox";
import { SgdsCheckboxGroup } from "./sgds-checkbox-group";

customElements.define("sgds-checkbox", SgdsCheckbox);
customElements.define("sgds-checkbox-group", SgdsCheckboxGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-checkbox": SgdsCheckbox;
    "sgds-checkbox-group": SgdsCheckboxGroup;
  }
}
