import { SgdsTable } from "./sgds-table";
import { register } from "../../utils/ce-registry";

register("sgds-table", SgdsTable);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table": SgdsTable;
  }
}
