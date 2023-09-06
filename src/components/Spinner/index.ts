import { SgdsSpinner } from "./sgds-spinner";

customElements.define("sgds-spinner", SgdsSpinner);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-spinner": SgdsSpinner;
  }
}
