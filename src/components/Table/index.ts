import { SgdsTable } from "./sgds-table";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsTable]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table": SgdsTable;
  }
}
