import { SgdsSelect } from "./sgds-select";

customElements.define("sgds-select", SgdsSelect);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-select": SgdsSelect;
  }
}
