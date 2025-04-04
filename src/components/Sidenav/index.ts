import { SgdsSidenav } from "./sgds-sidenav";
import { SgdsSidenavItem } from "./sgds-sidenav-item";
import { SgdsSidenavLink } from "./sgds-sidenav-link";
import { register } from "../../utils/ce-registry";

register("sgds-sidenav", SgdsSidenav);
register("sgds-sidenav-item", SgdsSidenavItem);
register("sgds-sidenav-link", SgdsSidenavLink);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-sidenav": SgdsSidenav;
    "sgds-sidenav-item": SgdsSidenavItem;
    "sgds-sidenav-link": SgdsSidenavLink;
  }
}
