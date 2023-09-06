import { SgdsFooter } from "./sgds-footer";

customElements.define("sgds-footer", SgdsFooter);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-footer": SgdsFooter;
  }
}
