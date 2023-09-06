import { SgdsDrawer } from "./sgds-drawer";

customElements.define("sgds-drawer", SgdsDrawer);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-drawer": SgdsDrawer;
  }
}
