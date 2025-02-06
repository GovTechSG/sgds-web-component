import { SgdsComboBox } from "./sgds-combo-box";
import { register } from "../../utils/ce-registry";

register("sgds-combo-box", SgdsComboBox);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-combo-box": SgdsComboBox;
  }
}
