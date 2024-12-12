import { SgdsDescriptionList } from "./sgds-description-list";

customElements.define("sgds-description-list", SgdsDescriptionList);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-description-list": SgdsDescriptionList;
  }
}
