import { property, state } from "lit/decorators.js";
import feedbackStyles from "../styles/feedback.css";
import formHintStyles from "../styles/form-hint.css";
import formLabelStyles from "../styles/form-label.css";
import formPlaceholderStyles from "../styles/form-placeholder.css";
import genId from "../utils/generateId";
import { InputValidationController } from "../utils/inputValidationController";
import { watch } from "../utils/watch";
import SgdsElement from "./sgds-element";

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

  /** The input's minimum value. Only applies number input types. */
  @property() min: number;

  /** The input's maximum value. Only applies number input types. */
  @property() max: number;

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback: string;

  /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;
}
