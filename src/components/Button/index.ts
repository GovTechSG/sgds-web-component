import { SgdsButton } from "./sgds-button";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsButton]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-button": SgdsButton;
  }
}
