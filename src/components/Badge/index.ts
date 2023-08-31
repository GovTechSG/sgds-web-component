import { SgdsBadge } from "./sgds-badge";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsBadge]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-badge": SgdsBadge;
  }
}
