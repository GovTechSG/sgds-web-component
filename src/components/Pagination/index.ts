import { SgdsPagination } from "./sgds-pagination";

customElements.define("sgds-pagination", SgdsPagination);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-pagination": SgdsPagination;
  }
}
