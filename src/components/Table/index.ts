import { SgdsTable } from "./sgds-table";
import { SgdsTable as SgdsTable2, SgdsTableBody, SgdsTableCell, SgdsTableHead, SgdsTableRow } from "./sgds-table-2";
import { register } from "../../utils/ce-registry";

register("sgds-table", SgdsTable);
register("sgds-table-2", SgdsTable2);
register("sgds-table-head", SgdsTableHead);
register("sgds-table-body", SgdsTableBody);
register("sgds-table-row", SgdsTableRow);
register("sgds-table-cell", SgdsTableCell);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table": SgdsTable;
    "sgds-table-2": SgdsTable2;
    "sgds-table-head": SgdsTableHead;
    "sgds-table-body": SgdsTableBody;
    "sgds-table-row": SgdsTableRow;
    "sgds-table-cell": SgdsTableCell;
  }
}
