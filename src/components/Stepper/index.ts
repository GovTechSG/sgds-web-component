import { SgdsStepper } from "./sgds-stepper";

customElements.define("sgds-stepper", SgdsStepper);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-stepper": SgdsStepper;
  }
}
