import { SgdsTableOfContents } from "./sgds-table-of-contents";
import { register } from "../../utils/ce-registry";

register("sgds-table-of-contents", SgdsTableOfContents);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table-of-contents": SgdsTableOfContents;
  }
}
