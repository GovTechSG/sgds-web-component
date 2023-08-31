import { SgdsDrawer } from "./sgds-drawer";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsDrawer]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-drawer": SgdsDrawer;
  }
}
