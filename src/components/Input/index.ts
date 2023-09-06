import { SgdsInput } from "./sgds-input";

//sideEffect
customElements.define("sgds-input", SgdsInput);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-input": SgdsInput;
  }
}
