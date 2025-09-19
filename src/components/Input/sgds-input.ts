import { nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import FormControlElement from "../../base/form-control-element";
import formPlaceholderStyles from "../../styles/form-placeholder.css";
import { defaultValue } from "../../utils/defaultvalue";
import type { SgdsFormControl } from "../../utils/formSubmitController";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import { SgdsSpinner } from "../Spinner/sgds-spinner";
import inputStyle from "./input.css";
import SgdsIcon from "../Icon/sgds-icon";
/**
 * @summary Text inputs allow your users to enter letters, numbers and symbols on a single line.
 *
 * @slot icon - The slot for leading icon of text input
 * @slot trailing-icon - The slot for trailing icon of text input. When present, it overrides valid icon and loading spinner rendered when valid prop or loading prop are true
 * @slot action - The slot for call to action of the text input. It is recommended to use sgds-icon-button within this slot
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 * @event sgds-focus - Emitted when input is in focus.
 * @event sgds-blur - Emitted when input is not in focus.
 * @event sgds-invalid - Emitted when input is invalid
 * @event sgds-valid - Emitted when input is valid
 *
 */
export class SgdsInput extends SgdsFormValidatorMixin(FormControlElement) implements SgdsFormControl {
  static styles = [...FormControlElement.styles, formPlaceholderStyles, inputStyle];
  /** @internal */
  static dependencies = {
    "sgds-spinner": SgdsSpinner,
    "sgds-icon": SgdsIcon
  };

  @property({ reflect: true }) type: "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" =
    "text";

  /** The prefix of the input */
  @property({ type: String }) prefix: string;

  /** The suffix of the input */
  @property({ type: String }) suffix: string;

  /** Sets the minimum length of the input */
  @property({ type: Number, reflect: true }) minlength: number;

  /** Sets the maximum length of the input */
  @property({ type: Number, reflect: true }) maxlength: number;

  /** The input's minimum value. Only applies number input types. */
  @property() min: number;

  /** The input's maximum value. Only applies number input types. */
  @property() max: number;

  /** The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "placeholder";

  /** A pattern to validate input against. */
  @property({ type: String }) pattern: string;

  /** Autofocus the input */
  @property({ type: Boolean, reflect: true }) autofocus = false;

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /**
   * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
   * implied, allowing any numeric value. Only applies to number input types.
   */
  @property() step: number | "any";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: String, reflect: true }) hasFeedback: "style" | "text" | "both";

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback: string;

  /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";

  /** Marks the component as valid. */
  @property({ type: Boolean, reflect: true }) valid = false;

  /** Marks the component as loading. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  @property({ type: Boolean, reflect: true }) noSgdsValidate = false;

  /**The input's value attribute. */
  @property({ reflect: true }) value = "";

  @state() protected _isTouched = false;

  @state() private _showPassword = false;

  /** Sets focus on the input. */
  public focus(options?: FocusOptions) {
    this.input.focus(options);
  }
  /** Sets blur on the input. */
  public blur() {
    this.input.blur();
  }

  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  public reportValidity(): boolean {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  public checkValidity(): boolean {
    return this._mixinCheckValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  public setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    return this._mixinSetValidity(flags, message, anchor);
  }

  /**
   * Returns the ValidityState object
   */
  public get validity(): ValidityState {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  public get validationMessage() {
    return this._mixinGetValidationMessage();
  }

  protected _handleFocus() {
    this.emit("sgds-focus");
  }

  protected _handleBlur() {
    const sgdsBlur = this.emit("sgds-blur", { cancelable: true });
    if (this._mixinShouldSkipSgdsValidation()) return;
    if (sgdsBlur.defaultPrevented) return;

    this.setInvalid(!this._mixinCheckValidity());
    this._isTouched = true;
  }
  private _handleClick() {
    this.focus();
  }

  protected _handleChange(e: Event) {
    this.value = this.input.value;
    const sgdsChange = this.emit("sgds-change", { cancelable: true });

    if (this._mixinShouldSkipSgdsValidation()) return;
    if (sgdsChange.defaultPrevented) return;

    super._mixinHandleChange(e);
  }
  protected _handleInputChange(e: Event) {
    this.value = this.input.value;
    const sgdsInput = this.emit("sgds-input", { cancelable: true });

    if (this._mixinShouldSkipSgdsValidation()) return;
    if (sgdsInput.defaultPrevented) return;
    super._mixinHandleInputChange(e);
  }
  /** @internal */
  @watch("_isTouched", { waitUntilFirstUpdate: true })
  _handleIsTouched() {
    if (this._mixinShouldSkipSgdsValidation()) return;
    if (this._isTouched) {
      this.setInvalid(!this._mixinCheckValidity());
    }
  }
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.setInvalid(false);
  }

  protected _renderInput() {
    const wantFeedbackStyle = this.hasFeedback === "both" || this.hasFeedback === "style";
    return html`
      <div
        class="form-control-group ${classMap({
          disabled: this.disabled,
          readonly: this.readonly,
          "is-invalid": this.invalid && wantFeedbackStyle
        })}"
        @click=${this._handleClick}
      >
        <slot name="icon"></slot>
        ${this.prefix ? html`<span class="form-control-prefix">${this.prefix}</span>` : nothing}
        <input
          class="form-control"
          type=${this._inputType()}
          id=${this._controlId}
          name=${ifDefined(this.name)}
          placeholder=${ifDefined(this.placeholder)}
          aria-invalid=${this.invalid ? "true" : "false"}
          pattern=${ifDefined(this.pattern)}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          .value=${live(this.value)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step as number)}
          @input=${(e: Event) => this._handleInputChange(e)}
          @change=${(e: Event) => this._handleChange(e)}
          @invalid=${() => this.setInvalid(true)}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          aria-describedby=${ifDefined(this.invalid && this.hasFeedback ? `${this._controlId}-invalid` : undefined)}
          aria-labelledby="${this._labelId} ${this._controlId}Help ${this.invalid && this.hasFeedback
            ? `${this._controlId}-invalid`
            : ""}"
        />
        ${this.type === "password" ? this._renderPasswordToggle() : nothing}
        ${this.suffix ? html`<span class="form-control-suffix">${this.suffix}</span>` : nothing}
        <slot name="trailing-icon">
          ${this.loading ? html`<sgds-spinner size="sm"></sgds-spinner>` : nothing}
          ${this.valid ? html`<sgds-icon name="check-circle-fill" class="valid-icon"></sgds-icon>` : nothing}
        </slot>
      </div>
    `;
  }
  protected _renderPasswordToggle() {
    return html`<sgds-icon
      tabIndex="0"
      role="button"
      name=${this._showPassword ? "eye-slash-fill" : "eye-fill"}
      @click=${() => (this._showPassword = !this._showPassword)}
    ></sgds-icon>`;
  }
  protected _inputType() {
    if (this.type === "password" && this._showPassword) {
      return "text";
    }
    return this.type;
  }
  protected _renderFeedback() {
    const wantFeedbackText = this.hasFeedback === "both" || this.hasFeedback === "text";

    return this.invalid && wantFeedbackText
      ? html` <div class="invalid-feedback-container">
          <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
          <div id="${this._controlId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
          </div>
        </div>`
      : html`${this._renderHintText()}`;
  }
  protected _renderLabel() {
    const labelTemplate = html`
      <label
        for=${this._controlId}
        id=${this._labelId}
        class=${classMap({
          "form-label": true,
          required: this.required
        })}
        >${this.label}</label
      >
    `;
    return this.label && labelTemplate;
  }
  protected _renderHintText() {
    const hintTextTemplate = html` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }
  render() {
    return html`
      <div
        class="form-control-container ${classMap({
          disabled: this.disabled
        })}"
      >
        ${this._renderLabel()}
        <div class="form-control-row">
          ${this._renderInput()}
          <slot name="action"></slot>
        </div>
        ${this._renderFeedback()}
      </div>
    `;
  }
}

export default SgdsInput;
