import { SgdsDatepicker } from "./sgds-datepicker";

//sideEffect
customElements.define("sgds-datepicker", SgdsDatepicker);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-datepicker": SgdsDatepicker;
  }
}
