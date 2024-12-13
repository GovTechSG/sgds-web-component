import { SgdsInput } from "./sgds-input";
import { register } from "../../utils/ce-registry";

register("sgds-input", SgdsInput);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-input": SgdsInput;
  }
}
