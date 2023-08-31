import { SgdsToast } from "./sgds-toast";
import { SgdsToastContainer } from "./sgds-toast-container";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsToast, SgdsToastContainer]);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-toast-container": SgdsToastContainer;
    "sgds-toast": SgdsToast;
  }
}
