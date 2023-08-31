import { SgdsQuantityToggle } from "./sgds-quantity-toggle";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsQuantityToggle]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-quantity-toggle": SgdsQuantityToggle;
  }
}
