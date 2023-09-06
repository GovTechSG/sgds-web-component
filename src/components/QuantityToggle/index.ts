import { SgdsQuantityToggle } from "./sgds-quantity-toggle";

//sideEffect
customElements.define("sgds-quantity-toggle", SgdsQuantityToggle);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-quantity-toggle": SgdsQuantityToggle;
  }
}
