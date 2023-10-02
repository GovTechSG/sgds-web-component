import { SgdsCheckbox } from "./sgds-checkbox";

customElements.define("sgds-checkbox", SgdsCheckbox);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-checkbox": SgdsCheckbox;
  }
}
