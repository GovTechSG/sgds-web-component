import { SgdsIcon } from "./sgds-icon";
import { register } from "../../utils/ce-registry";

register("sgds-icon", SgdsIcon);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon": SgdsIcon;
  }
}
