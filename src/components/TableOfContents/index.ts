import { SgdsTableOfContents } from "./sgds-table-of-contents";

customElements.define("sgds-table-of-contents", SgdsTableOfContents);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-table-of-contents": SgdsTableOfContents;
  }
}
