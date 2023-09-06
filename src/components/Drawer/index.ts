import { SgdsDrawer } from "./sgds-drawer";

//sideEffect
customElements.define("sgds-drawer", SgdsDrawer);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-drawer": SgdsDrawer;
  }
}
