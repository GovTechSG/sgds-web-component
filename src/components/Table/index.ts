import { SgdsTable } from "./sgds-table";

customElements.define("sgds-table", SgdsTable);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table": SgdsTable;
  }
}
