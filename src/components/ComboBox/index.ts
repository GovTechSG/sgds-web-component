import { SgdsComboBox } from "./sgds-combo-box";

customElements.define("sgds-combo-box", SgdsComboBox);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-combo-box": SgdsComboBox;
  }
}
