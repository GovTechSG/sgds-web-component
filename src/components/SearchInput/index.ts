import { SgdsSearchInput } from "./sgds-search-input";

customElements.define("sgds-search-input", SgdsSearchInput);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-search-input": SgdsSearchInput;
  }
}
