import { SgdsCheckbox } from "./sgds-checkbox";

//sideEffect
customElements.define("sgds-checkbox", SgdsCheckbox);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-checkbox": SgdsCheckbox;
  }
}
