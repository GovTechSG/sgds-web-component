import { SgdsCheckbox } from "./sgds-checkbox";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsCheckbox]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-checkbox": SgdsCheckbox;
  }
}
