import { register } from "../../utils/ce-registry";
import { SgdsSelect } from "./sgds-select";
import { SgdsSelectOption } from "./sgds-select-option";

register("sgds-select", SgdsSelect);
register("sgds-select-option", SgdsSelectOption);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-select": SgdsSelect;
  }
}
