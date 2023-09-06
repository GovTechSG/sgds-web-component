import { SgdsFooter } from "./sgds-footer";

//sideEffect
customElements.define("sgds-footer", SgdsFooter);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-footer": SgdsFooter;
  }
}
