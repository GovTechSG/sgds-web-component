import { SgdsOverflowMenu } from "./sgds-overflow-menu";
import { register } from "../../utils/ce-registry";

register("sgds-overflow-menu", SgdsOverflowMenu);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-overflow-menu": SgdsOverflowMenu;
  }
}
