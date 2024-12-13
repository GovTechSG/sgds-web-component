import { SgdsCheckbox } from "./sgds-checkbox";
import { SgdsCheckboxGroup } from "./sgds-checkbox-group";
import { register } from "../../utils/ce-registry";

register("sgds-checkbox", SgdsCheckbox);
register("sgds-checkbox-group", SgdsCheckboxGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-checkbox": SgdsCheckbox;
    "sgds-checkbox-group": SgdsCheckboxGroup;
  }
}
