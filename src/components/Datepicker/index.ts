import { SgdsDatepicker } from "./sgds-datepicker";
import { register } from "../../utils/ce-registry";

register("sgds-datepicker", SgdsDatepicker);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-datepicker": SgdsDatepicker;
  }
}
