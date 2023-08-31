import { SgdsTextarea } from "./sgds-textarea";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsTextarea]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-textarea": SgdsTextarea;
  }
}
