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
  static formAssociated = true;
  protected inputValidationController = new InputValidationController(this);
 
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

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;
  /**The input's value attribute. */
  @property({ reflect: true }) value = "";

  @state() protected _isTouched = false;

  protected labelId: string = genId("label");

  protected inputId = genId("input", "input");

  protected inputEl: HTMLInputElement;

  // get form() {
  //   return this._internals.form;
  // }

  // get validity() {
  //   return this._internals.validity;
  // }

  // get validationMessage() {
  //   return this._internals.validationMessage;
  // }

  // get willValidate() {
  //   return this._internals.willValidate;
  // }

  // checkValidity() {
  //   return this._internals.checkValidity();
  // }
  // /** Checks for validity and shows the browser's validation message if the control is invalid. */
  // reportValidity() {
  //   return this._internals.reportValidity();
  // }

  protected _handleFocus() {
    this.emit("sgds-focus");
  }

  protected _handleBlur() {
    this._isTouched = true
    this.emit("sgds-blur");
  }
  protected _handleClick() {
    this.focus();
  }

  protected _handleChange(e: Event) {
    this.value = this.inputEl.value;
    this.emit("sgds-change");
    // set the element’s validity whenever the value of the  <input> changes. Visually does nothing
    this.inputValidationController.handleChange(e)

  }
  protected _handleInputChange() {
    this.value = this.inputEl.value;
    this.emit("sgds-input");
    // set the element’s validity whenever the value of the  <input> changes. Visually does nothing
    this.inputValidationController.handleInput()
  }


  firstUpdated() {
    this.inputEl = this.shadowRoot.querySelector("input");
    this.addEventListener("focus", () => this.inputEl.focus());

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    // validate input on first load 
    this.inputValidationController.validateInput(this.inputEl)
  }

  @watch("_isTouched", { waitUntilFirstUpdate: true})
  _handleIsTouched(){
    if(this._isTouched && this.required && this.value === "") {
      this.invalid = true
    }
  }
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.inputEl.disabled = this.disabled;
    this.invalid = !this.inputEl.checkValidity();
  }

}
