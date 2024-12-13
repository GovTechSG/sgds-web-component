import { SgdsFooter } from "./sgds-footer";
import { SgdsFooterItem } from "./sgds-footer-item";
import { register } from "../../utils/ce-registry";

register("sgds-footer", SgdsFooter);
register("sgds-footer-item", SgdsFooterItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-footer": SgdsFooter;
    "sgds-footer-item": SgdsFooterItem;
  }
}
