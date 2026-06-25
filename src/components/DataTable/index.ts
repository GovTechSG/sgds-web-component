import { SgdsDataTable } from "./sgds-data-table";
import SgdsDataTableRow from "./sgds-data-table-row";
import SgdsDataTableCell from "./sgds-data-table-cell";
import SgdsDataTableHead from "./sgds-data-table-head";

customElements.define("sgds-data-table", SgdsDataTable);
customElements.define("sgds-data-table-row", SgdsDataTableRow);
customElements.define("sgds-data-table-cell", SgdsDataTableCell);
customElements.define("sgds-data-table-head", SgdsDataTableHead);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-data-table": SgdsDataTable;
    "sgds-data-table-row": SgdsDataTableRow;
    "sgds-data-table-cell": SgdsDataTableCell;
    "sgds-data-table-head": SgdsDataTableHead;
  }
}
