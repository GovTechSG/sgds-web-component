import { SgdsInput } from "./sgds-input";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsInput]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-input": SgdsInput;
  }
}
