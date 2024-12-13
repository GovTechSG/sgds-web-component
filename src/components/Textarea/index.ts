import { SgdsTextarea } from "./sgds-textarea";
import { register } from "../../utils/ce-registry";

register("sgds-textarea", SgdsTextarea);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-textarea": SgdsTextarea;
  }
}
