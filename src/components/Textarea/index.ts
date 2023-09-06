import { SgdsTextarea } from "./sgds-textarea";

//sideEffect
customElements.define("sgds-textarea", SgdsTextarea);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-textarea": SgdsTextarea;
  }
}
