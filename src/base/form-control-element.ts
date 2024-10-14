import { property, query } from "lit/decorators.js";
import genId from "../utils/generateId";
import feedbackStyles from "../styles/feedback.css";
import formHintStyles from "../styles/form-hint.css";
import formLabelStyles from "../styles/form-label.css";
import formPlaceholderStyles from "../styles/form-placeholder.css";
import SgdsElement from "./sgds-element";
import { FormSubmitController } from "../utils/form";

interface ValidityStateMessages {
  badInput: string;
  customError: string;
  patternMismatch: string;
  rangeOverflow: string;
  rangeUnderflow: string;
  stepMismatch: string;
  tooLong: string;
  tooShort: string;
  typeMismatch: string;
  valid: string;
  valueMissing: boolean;
}
type InvalidFeedback = ValidityStateMessages | string;
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
  @property({ reflect: true }) invalidFeedback: InvalidFeedback;

  /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  protected labelId: string = genId("label");

  protected inputId = genId("input", "input");

  protected input: HTMLInputElement;

  static formAssociated = true;
  protected _internals: ElementInternals;
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  get form() {
    return this._internals.form;
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  checkValidity() {
    return this._internals.checkValidity();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this._internals.reportValidity();
  }

  protected validationError: keyof ValidityState;

  protected _validateInput() {
    // get the validity of the internal <input>
    const validState = this.input.validity;

    // if the input is invalid, show the correct error
    if (!validState.valid) {
      // loop through the error reasons
      for (const state in validState) {
        // get the name of the data attribute that holds the
        //error message
        const attr = `data-${state.toString()}`;

        // if there is an error and corresponding attribute holding
        // the message
        if (validState[state]) {
          this.validationError = state.toString() as keyof ValidityState;

          // get the correct error message
          const errorMessage = this.invalidFeedback
            ? this.invalidFeedback[state.toString()]
            : this.input.validationMessage;
          console.log({ errorMessage });
          // set the validity error reason and the corresponding
          // message
          this._internals.setValidity({ [this.validationError]: true }, errorMessage);
        }
      }
    } else {
      this._internals.setValidity({});
    }
  }

  firstUpdated() {
    this.input = this.shadowRoot.querySelector("input");

    this.addEventListener("focus", () => this.input.focus());

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }

    // set the initial validity of the component
    this._validateInput();
  }
}
