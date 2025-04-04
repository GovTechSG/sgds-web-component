import { SgdsProgressBar } from "./sgds-progress-bar";
import { register } from "../../utils/ce-registry";

register("sgds-progress-bar", SgdsProgressBar);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-progress-bar": SgdsProgressBar;
  }
}
