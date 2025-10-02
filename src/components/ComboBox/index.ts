import { SgdsComboBox } from "./sgds-combo-box";
import { SgdsComboBoxOption } from "./sgds-combo-box-option";
import { register } from "../../utils/ce-registry";

register("sgds-combo-box", SgdsComboBox);
register("sgds-combo-box-option", SgdsComboBoxOption);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-combo-box": SgdsComboBox;
  }
}
