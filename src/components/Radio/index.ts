import { SgdsRadio } from "./sgds-radio";
import { SgdsRadioGroup } from "./sgds-radio-group";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsRadio, SgdsRadioGroup]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-radio": SgdsRadio;
    "sgds-radio-group": SgdsRadioGroup;
  }
}
