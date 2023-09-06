import { SgdsStepper } from "./sgds-stepper";

//sideEffect
customElements.define("sgds-stepper", SgdsStepper);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-stepper": SgdsStepper;
  }
}
