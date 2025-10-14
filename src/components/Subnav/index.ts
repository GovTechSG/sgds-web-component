import { SgdsSubnav } from "./sgds-subnav";
import { SgdsSubnavItem } from "./sgds-subnav-item";
import { register } from "../../utils/ce-registry";

register("sgds-subnav", SgdsSubnav);
register("sgds-subnav-item", SgdsSubnavItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-subnav": SgdsSubnav;
    "sgds-subnav-item": SgdsSubnavItem;
  }
}
