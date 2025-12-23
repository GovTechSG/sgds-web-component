import { SgdsSearchInput } from "./sgds-search-input";
import SgdsSearchInputOption from "./sgds-search-input-option";

customElements.define("sgds-search-input", SgdsSearchInput);
customElements.define("sgds-search-input-option", SgdsSearchInputOption);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-search-input": SgdsSearchInput;
    "sgds-search-input-option": SgdsSearchInputOption;
  }
}
