import { SgdsIcon } from "./sgds-icon";

customElements.define("sgds-icon", SgdsIcon);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon": SgdsIcon;
  }
}
