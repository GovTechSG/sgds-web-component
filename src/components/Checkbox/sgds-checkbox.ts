import FormCheckElement from "../../base/form-check-element";
import genId from "../../utils/generateId";
import checkboxStyle from "./checkbox.css";
/**
 * @summary Checkbox component is used when you require users to select multiple items from a list.
 *
 * @slot default - The label of checkbox.
 *
 * @event sgds-change - Emitted when the checked state changes.
 */

/**@internal */

export class SgdsCheckbox extends FormCheckElement {
  static styles = [...FormCheckElement.styles, checkboxStyle];

  constructor() {
    super();
    /** @internal */
    this._inputId = genId("checkbox");
  }
}

export default SgdsCheckbox;
