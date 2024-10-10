import { SgdsIconList } from "./sgds-icon-list";

customElements.define("sgds-icon-list", SgdsIconList);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon-list": SgdsIconList;
  }
}
