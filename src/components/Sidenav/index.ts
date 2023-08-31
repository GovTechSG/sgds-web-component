import { SgdsSidenav } from "./sgds-sidenav";
import { SgdsSidenavItem } from "./sgds-sidenav-item";
import { SgdsSidenavLink } from "./sgds-sidenav-link";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsSidenav, SgdsSidenavItem, SgdsSidenavLink]);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-sidenav": SgdsSidenav;
    "sgds-sidenav-item": SgdsSidenavItem;
    "sgds-sidenav-link": SgdsSidenavLink;
  }
}
