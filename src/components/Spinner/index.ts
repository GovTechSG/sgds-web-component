import { SgdsSpinner } from "./sgds-spinner";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsSpinner]);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-spinner": SgdsSpinner;
  }
}
