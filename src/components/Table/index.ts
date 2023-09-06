import { SgdsTable } from "./sgds-table";

//sideEffect
customElements.define("sgds-table", SgdsTable);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table": SgdsTable;
  }
}
