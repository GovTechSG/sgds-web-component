import { property } from "lit/decorators.js";
import feedbackStyles from "../styles/feedback.css";
import formHintStyles from "../styles/form-hint.css";
import formLabelStyles from "../styles/form-label.css";
import formPlaceholderStyles from "../styles/form-placeholder.css";
import SgdsElement from "./sgds-element";
import generateId from "../utils/generateId";

export default class FormControlElement extends SgdsElement {
  static styles = [...SgdsElement.styles, feedbackStyles, formHintStyles, formLabelStyles, formPlaceholderStyles];

  /** The input's label  */
  @property({ reflect: true }) label = "";

  /** The input's hint text */
  @property({ reflect: true }) hintText = "";

  /** The input's name attribute */
  @property({ reflect: true }) name: string;

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  protected _controlId = generateId("input");
  protected _labelId = generateId("label");
}
