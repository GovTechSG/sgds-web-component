import { SgdsDataTable } from "./sgds-data-table";
import SgdsDataTableRow from "./sgds-data-table-row";
import SgdsDataTableCell from "./sgds-data-table-cell";
import SgdsDataTableHead from "./sgds-data-table-head";
import { register } from "../../utils/ce-registry";

register("sgds-data-table", SgdsDataTable);
register("sgds-data-table-row", SgdsDataTableRow);
register("sgds-data-table-cell", SgdsDataTableCell);
register("sgds-data-table-head", SgdsDataTableHead);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-data-table": SgdsDataTable;
    "sgds-data-table-row": SgdsDataTableRow;
    "sgds-data-table-cell": SgdsDataTableCell;
    "sgds-data-table-head": SgdsDataTableHead;
  }
}
