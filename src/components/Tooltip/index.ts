import { SgdsTooltip } from "./sgds-tooltip";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsTooltip]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tooltip": SgdsTooltip;
  }
}
