import { SgdsLink } from "./sgds-link";

customElements.define("sgds-link", SgdsLink);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-link": SgdsLink;
  }
}
