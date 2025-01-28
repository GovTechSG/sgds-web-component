import { SgdsComboBox } from "./sgds-combo-box";
import { register } from "../../utils/ce-registry";
import SgdsComboBoxItem from "./sgds-combo-box-item";

register("sgds-combo-box", SgdsComboBox);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-combo-box": SgdsComboBox;
    "sgds-combo-box-item": SgdsComboBoxItem;
  }
}
