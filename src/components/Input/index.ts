import { SgdsInput } from "./sgds-input";

customElements.define("sgds-input", SgdsInput);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-input": SgdsInput;
  }
}
