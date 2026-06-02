import { SgdsStepper } from "./sgds-stepper";
import { SgdsStep } from "./sgds-step";
import { register } from "../../utils/ce-registry";

register("sgds-stepper", SgdsStepper);
register("sgds-step", SgdsStep);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-stepper": SgdsStepper;
    "sgds-step": SgdsStep;
  }
}
