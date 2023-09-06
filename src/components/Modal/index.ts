import { SgdsModal } from "./sgds-modal";

customElements.define("sgds-modal", SgdsModal);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-modal": SgdsModal;
  }
}
