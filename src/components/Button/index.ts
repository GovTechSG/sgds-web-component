import { SgdsButton } from "./sgds-button";

//sideEffect
customElements.define("sgds-button", SgdsButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-button": SgdsButton;
  }
}
