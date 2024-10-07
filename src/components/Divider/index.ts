import { SgdsDivider } from "./sgds-divider";

customElements.define("sgds-divider", SgdsDivider);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-divider": SgdsDivider;
  }
}
