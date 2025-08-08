import SgdsTable from "./sgds-table";
import { register } from "../../utils/ce-registry";
import SgdsTableHead from "./sgds-table-head";
import SgdsTableRow from "./sgds-table-row";
import SgdsTableCell from "./sgds-table-cell";

register("sgds-table", SgdsTable);
register("sgds-table-head", SgdsTableHead);
register("sgds-table-row", SgdsTableRow);
register("sgds-table-cell", SgdsTableCell);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table": SgdsTable;
    "sgds-table-head": SgdsTableHead;
    "sgds-table-row": SgdsTableRow;
    "sgds-table-cell": SgdsTableCell;
  }
}
