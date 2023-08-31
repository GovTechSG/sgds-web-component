import { SgdsDatepicker } from "./sgds-datepicker";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsDatepicker]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-datepicker": SgdsDatepicker;
  }
}
