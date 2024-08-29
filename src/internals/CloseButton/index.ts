import { SgdsCloseButton } from "./sgds-close-button";

customElements.define("sgds-close-button", SgdsCloseButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-close-button": SgdsCloseButton;
  }
}
