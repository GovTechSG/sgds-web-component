import { SgdsFooter } from "./sgds-footer";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsFooter]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-footer": SgdsFooter;
  }
}
