import { SgdsSwitch } from "./sgds-switch";
import { register } from "../../utils/ce-registry";

register("sgds-switch", SgdsSwitch);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-switch": SgdsSwitch;
  }
}
