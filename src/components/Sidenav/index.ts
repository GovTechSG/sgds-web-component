import { SgdsSidenav } from "./sgds-sidenav";
import { SgdsSidenavItem } from "./sgds-sidenav-item";
import { SgdsSidenavLink } from "./sgds-sidenav-link";

customElements.define("sgds-sidenav", SgdsSidenav);
customElements.define("sgds-sidenav-item", SgdsSidenavItem);
customElements.define("sgds-sidenav-link", SgdsSidenavLink);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-sidenav": SgdsSidenav;
    "sgds-sidenav-item": SgdsSidenavItem;
    "sgds-sidenav-link": SgdsSidenavLink;
  }
}
