import { SgdsActionCard } from "./sgds-action-card";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsActionCard]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-action-card": SgdsActionCard;
  }
}
