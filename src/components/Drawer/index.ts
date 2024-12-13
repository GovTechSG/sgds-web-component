import { SgdsDrawer } from "./sgds-drawer";
import { register } from "../../utils/ce-registry";

register("sgds-drawer", SgdsDrawer);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-drawer": SgdsDrawer;
  }
}
