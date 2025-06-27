import { html, nothing } from "lit";
import { queryAssignedElements, state, property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
import checkboxGroupStyles from "./checkbox-group.css";
import formHintStyles from "../../styles/form-hint.css";
import SgdsCheckbox from "./sgds-checkbox";
/**
 * @summary CheckboxGroup is the container that group multiple checkboxes under a single question field.
 * It handles the display of validation feedback of its checkboxes children.
 *
 * @slot default - Pass in `sgds-checkbox` into the default slot
 * @slot invalidIcon - The slot for invalid icon
 *
 */
export class SgdsCheckboxGroup extends SgdsElement {
  static styles = [...SgdsElement.styles, feedbackStyles, formLabelStyles, checkboxGroupStyles, formHintStyles];
  /**@internal */
  @queryAssignedElements({ flatten: true }) private checkboxes!: NodeListOf<SgdsCheckbox>;
  @state() private hasInvalidCheckbox = false;
  @state() private validationMessage: string;
  @state() private _touched = false;

  /** The checkbox group's label  */
  @property({ reflect: true }) label = "";

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Allows invalidFeedback, invalid styles to be visible. When SgdsCheckboxGroup is used, it overrides the value of hasFeedback on SgdsCheckbox with its own value. */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** The checkbox group's hint text */
  @property({ reflect: true }) hintText = "";

  /** The checkbox group's hint text */
  @property({ type: Boolean, reflect: true }) required = false;

  constructor() {
    super();
    this.addEventListener("sgds-validity-change", (e: CustomEvent) => {
      this.hasInvalidCheckbox = e.detail.invalid;
      this.validationMessage = e.detail.validationMessage;
    });

    this.addEventListener("sgds-change", () => {
      this._updateCheckboxInvalidStates();
    });

    this.addEventListener("sgds-blur", () => {
      if (!this._touched) {
        this._touched = true;
      }
    });
  }

  private _checkInvalidState() {
    this.hasInvalidCheckbox = Array.from(this.checkboxes).some(checkbox => checkbox.invalid);
  }

  private _updateCheckboxInvalidStates() {
    if (!this.required) return;

    const isValid = Array.from(this.checkboxes).some(checkbox => checkbox.checked);

    const shouldShowInvalid = !isValid && this._touched;

    Array.from(this.checkboxes).forEach(checkbox => {
      checkbox.invalid = shouldShowInvalid;
    });

    if (shouldShowInvalid) {
      this.validationMessage = this.invalidFeedback || "Please select at least one option.";
    }
  }

  /** Overrides hasFeedback from individual SgdsCheckbox  */
  private _forwardHasFeedback() {
    Array.from(this.checkboxes).forEach(checkbox => (checkbox.hasFeedback = this.hasFeedback));
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  firstUpdated() {
    this._forwardHasFeedback();
  }
  updated() {
    this._checkInvalidState();
    this._updateCheckboxInvalidStates();
  }
  render() {
    return html`
      <fieldset>
        <div class="label-hint-container">
          <label class="form-label">${this.label}</label>
          ${this._renderHintText()}
        </div>
        <div class="checkbox-container">
          <slot></slot>
        </div>
        ${this.hasInvalidCheckbox && this.hasFeedback
          ? html`
              <div class="invalid-feedback-container">
                <slot name="invalidIcon">
                  <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
                </slot>
                <div id="checkbox-feedback" tabindex="0" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
                </div>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}

export default SgdsCheckboxGroup;
