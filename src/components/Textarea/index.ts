import { SgdsTextarea } from "./sgds-textarea";

customElements.define("sgds-textarea", SgdsTextarea);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-textarea": SgdsTextarea;
  }
}
