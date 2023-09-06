import { SgdsModal } from "./sgds-modal";

//sideEffect
customElements.define("sgds-modal", SgdsModal);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-modal": SgdsModal;
  }
}
