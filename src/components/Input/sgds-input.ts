import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsSpinner } from "../Spinner/sgds-spinner";
import { defaultValue } from "../../utils/defaultvalue";
import type { SgdsFormControl } from "../../utils/form";
import { FormSubmitController } from "../../utils/form";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import inputStyle from "./input.css";
import feedbackStyles from "../../styles/feedback.css";
import formHintStyles from "../../styles/form-hint.css";
import formLabelStyles from "../../styles/form-label.css";
import fromPlaceholderStyles from "../../styles/form-placeholder.css";
import { nothing } from "lit";
/**
 * @summary Text inputs allow your users to enter letters, numbers and symbols on a single line.
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 * @event sgds-focus - Emitted when input is in focus.
 * @event sgds-blur - Emitted when input is not in focus.
 *
 */
export class SgdsInput extends SgdsElement implements SgdsFormControl {
  static styles = [
    ...SgdsElement.styles,
    feedbackStyles,
    formHintStyles,
    formLabelStyles,
    fromPlaceholderStyles,
    inputStyle
  ];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-spinner": SgdsSpinner
    };
  }
  /**@internal */
  @query("input.form-control") input: HTMLInputElement;
  /**@internal */
  protected readonly formSubmitController = new FormSubmitController(this);
  /** The type of input which works the same as HTMLInputElement */
  @property({ reflect: true }) type: "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" =
    "text";
  /** The input's label  */
  @property({ reflect: true }) label = "";

  /** The input's hint text */
  @property({ reflect: true }) hintText = "";

  /** The input's name attribute */
  @property({ reflect: true }) name: string;

  /** The prefix of the input */
  @property({ type: String }) prefix: string;

  /** The suffix of the input */
  @property({ type: String }) suffix: string;

  /** Optional. Pass svg html of icons in string form*/
  @property({ type: String }) icon: string;

  /** Sets the minimum length of the input */
  @property({ type: Number, reflect: true }) minlength: number;

  /** Sets the maximum length of the input */
  @property({ type: Number, reflect: true }) maxlength: number;

  /** The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "placeholder";

  /** A pattern to validate input against. */
  @property({ type: String }) pattern: string;

  /** Autofocus the input */
  @property({ type: Boolean, reflect: true }) autofocus = false;

  /** Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** The input's minimum value. Only applies number input types. */
  @property() min: number | string;

  /** The input's maximum value. Only applies number input types. */
  @property() max: number | string;

  /**
   * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
   * implied, allowing any numeric value. Only applies to number input types.
   */
  @property() step: number | "any";

  /**The input's value attribute. */
  @property({ reflect: true }) value = "";
  /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;
  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Marks the component as valid. */
  @property({ type: Boolean, reflect: true }) valid = false;

  /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Marks the component as loading. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /**@internal */
  protected inputId: string = genId("input", this.type);

  protected labelId: string = genId("label");

  /** Sets focus on the input. */
  public focus(options?: FocusOptions) {
    this.input.focus(options);
  }
  /** Sets blur on the input. */
  public blur() {
    this.input.blur();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity */
  public setCustomValidity(err: string) {
    return this.input.setCustomValidity(err);
  }
  /** Programatically sets the invalid state of the input. Pass in boolean value in the argument */
  public setInvalid(bool: boolean) {
    this.invalid = bool;
  }

  protected _handleClick() {
    this.shadowRoot.querySelector("input")?.focus();
  }

  protected _handleChange(event: string) {
    this.value = this.input.value;
    this.emit(event);
  }

  protected _handleFocus() {
    this.emit("sgds-focus");
  }

  protected _handleBlur() {
    this.emit("sgds-blur");
  }

  protected _handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
    // submitting to allow users to cancel the keydown event if they need to
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        // Prevent submission when enter is click on a submission in an Input Method Editor with isComposing
        if (!event.defaultPrevented && !event.isComposing) {
          this.formSubmitController.submit();
        }
      });
    }
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this.invalid = !this.input.checkValidity();
  }
  protected _renderInput() {
    return html`
      <div
        class="form-control-group ${classMap({
          disabled: this.disabled,
          readonly: this.readonly,
          "is-invalid": this.invalid && this.hasFeedback
        })}"
        @click=${this._handleClick}
      >
        ${this.icon ? html`<span class="form-control-icon">${unsafeSVG(this.icon)}</span>` : nothing}
        ${this.prefix ? html`<span class="form-control-prefix">${this.prefix}</span>` : nothing}
        <input
          class="form-control"
          type=${this.type}
          id=${this.inputId}
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
          @input=${() => this._handleChange("sgds-input")}
          @change=${() => this._handleChange("sgds-change")}
          @keydown=${this._handleKeyDown}
          @invalid=${() => this.setInvalid(true)}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          aria-describedby=${ifDefined(this.invalid && this.hasFeedback ? `${this.inputId}-invalid` : undefined)}
          aria-labelledby="${this.labelId} ${this.inputId}Help ${this.invalid && this.hasFeedback
            ? `${this.inputId}-invalid`
            : ""}"
        />
        ${this.loading ? html`<sgds-spinner size="sm"></sgds-spinner>` : nothing}
        ${this.valid
          ? html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path
                d="M21 12.5C21 17.4706 16.9706 21.5 12 21.5C7.02944 21.5 3 17.4706 3 12.5C3 7.52944 7.02944 3.5 12 3.5C16.9706 3.5 21 7.52944 21 12.5ZM16.5341 9.09088C16.2046 8.76137 15.6704 8.76137 15.3409 9.09088C15.3329 9.09884 15.3254 9.10726 15.3185 9.11612L11.4121 14.0938L9.05686 11.7386C8.72736 11.4091 8.19312 11.4091 7.86362 11.7386C7.53411 12.0681 7.53411 12.6024 7.86362 12.9319L10.8409 15.9091C11.1704 16.2386 11.7046 16.2386 12.0341 15.9091C12.0415 15.9018 12.0484 15.894 12.0549 15.8859L16.5461 10.2719C16.8636 9.94154 16.8596 9.41634 16.5341 9.09088Z"
                fill="#006B00"
              />
            </svg>`
          : nothing}
        ${this.suffix ? html`<span class="form-control-suffix">${this.suffix}</span>` : nothing}
      </div>
    `;
  }
  protected _renderFeedback() {
    return this.invalid && this.hasFeedback
      ? html` <div class="invalid-feedback-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
              fill="#B90000"
            />
          </svg>
          <div id="${this.inputId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>
        </div>`
      : html`${this._renderHintText()}`;
  }
  protected _renderLabel() {
    const labelTemplate = html`
      <label
        for=${this.inputId}
        id=${this.labelId}
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
    const hintTextTemplate = html` <div id="${this.inputId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }
  render() {
    return html`
      <div
        class="form-control-container ${classMap({
          disabled: this.disabled
        })}"
      >
        ${this._renderLabel()} ${this._renderInput()} ${this._renderFeedback()}
      </div>
    `;
  }
}

export default SgdsInput;
