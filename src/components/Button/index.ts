import { SgdsButton } from "./sgds-button";

customElements.define("sgds-button", SgdsButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-button": SgdsButton;
  }
}
