import { SgdsMasthead } from "./sgds-masthead";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsMasthead]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-masthead": SgdsMasthead;
  }
}
