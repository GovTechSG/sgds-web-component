import FormCheckElement from "../../base/form-check-element";
import genId from "../../utils/generateId";
import checkboxStyle from "./checkbox.css";
import feedbackStyle from "../../styles/feedback.css";
import formLabelStyle from "../../styles/form-label.css";
/**
 * @summary Checkbox component is used when you require users to select multiple items from a list.
 *
 * @slot default - The label of checkbox.
 *
 * @event sgds-change - Emitted when the checked state changes.
 *
 * @cssprop --sgds-checkbox-margin-bottom - The margin-bottom of each checkbox.
 * @cssprop --sgds-checkbox-inline-margin-right - The margin-right of each checkbox when it is inlined
 * @cssprop --sgds-checkbox-input-border-radius - The border radius of the checkbox input
 *
 */

  /**@internal */

export class SgdsCheckbox extends FormCheckElement {
  static styles = [...FormCheckElement.styles, feedbackStyle, formLabelStyle, checkboxStyle];

  constructor() {
    super();
    /** @internal */
    this._inputId = genId("checkbox");
  }
}

export default SgdsCheckbox;
