import { SgdsPagination } from "./sgds-pagination";
import { register } from "../../utils/ce-registry";

register("sgds-pagination", SgdsPagination);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-pagination": SgdsPagination;
  }
}
