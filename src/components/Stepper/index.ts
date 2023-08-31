import { SgdsStepper } from "./sgds-stepper";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsStepper]);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-stepper": SgdsStepper;
  }
}
