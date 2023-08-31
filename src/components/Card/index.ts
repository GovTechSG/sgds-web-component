import { SgdsCard } from "./sgds-card";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsCard]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-card": SgdsCard;
  }
}
