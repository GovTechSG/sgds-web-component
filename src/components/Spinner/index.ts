import { SgdsSpinner } from "./sgds-spinner";

//sideEffect
customElements.define("sgds-spinner", SgdsSpinner);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-spinner": SgdsSpinner;
  }
}
