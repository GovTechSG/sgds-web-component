import { SgdsStepper } from "./sgds-stepper";
import { register } from "../../utils/ce-registry";

register("sgds-stepper", SgdsStepper);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-stepper": SgdsStepper;
  }
}
