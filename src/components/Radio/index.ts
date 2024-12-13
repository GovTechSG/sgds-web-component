import { SgdsRadio } from "./sgds-radio";
import { SgdsRadioGroup } from "./sgds-radio-group";
import { register } from "../../utils/ce-registry";

register("sgds-radio", SgdsRadio);
register("sgds-radio-group", SgdsRadioGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-radio": SgdsRadio;
    "sgds-radio-group": SgdsRadioGroup;
  }
}
