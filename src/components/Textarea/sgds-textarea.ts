import { nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import FormControlElement from "../../base/form-control-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsFormControl } from "../../utils/formSubmitController";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import textareaStyle from "./textarea.css";

/**
 * @summary Text areas allow for the collection of input longer than a single line.
 *
 * @slot invalidIcon - The slot for invalid icon
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 * @event sgds-focus - Emitted when textarea is in focus.
 * @event sgds-blur - Emitted when textarea loses focus.
 */
export class SgdsTextarea extends SgdsFormValidatorMixin(FormControlElement) implements SgdsFormControl {
  static styles = [...FormControlElement.styles, textareaStyle];
  /**@internal */
  @query("textarea.form-control") textarea: HTMLTextAreaElement;
  /**@internal */
  private resizeObserver: ResizeObserver;
  /**The textarea's name attribute */
  @property({ type: String, reflect: true }) name: string;
  /**The textarea's value attribute. */
  @property({ type: String, reflect: true }) value = "";
  /**Sets the minimum length of the textarea */
  @property({ type: Number, reflect: true }) minlength: number;
  /**Sets the maximum length of the textarea. When maxlength is defined, a word count appears on bottom right of the input*/
  @property({ type: Number, reflect: true }) maxlength: number;
  /**Enables spell checking on the textarea */
  @property({ type: Boolean, reflect: true }) spellcheck = false;
  /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;
  /**The textarea's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "Placeholder";
  /** Custom feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";
  /**Autofocus the textarea */
  @property({ type: Boolean, reflect: true }) autofocus = false;
  /** Makes the textarea readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Controls how the textarea can be resized. */
  @property({ type: String, reflect: true }) resize: "none" | "vertical" | "auto" = "vertical";
  /** The native textarea's inputmode attribute. It hints at the type of data that might be entered by the user while editing the element or its contents. This allows a browser to display an appropriate virtual keyboard. */
  @property({ type: String, reflect: true }) inputmode:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  /** The native textarea's autocorrect attribute. */
  @property({ type: String, reflect: true }) autocorrect: string;
  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";
  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** Makes the textarea as a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** The textarea's hint text */
  @property({ reflect: true }) hintText = "";

  @state() private _isTouched = false;

  /** Sets focus on the textarea. */
  public focus(options?: FocusOptions) {
    this.textarea.focus(options);
  }
  /** Sets blur on the textarea. */
  public blur() {
    this.textarea.blur();
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

  /** Selects all the text in the textarea. */
  public select() {
    this.textarea.select();
  }
  private _handleInvalid(e: Event) {
    e.preventDefault();
    this.invalid = true;
  }

  protected _handleChange(e: Event) {
    this.value = this.input.value;
    this.emit("sgds-change");
    super._mixinHandleChange(e);
  }
  private _handleInputChange(e: Event) {
    this.value = this.input.value;
    this.emit("sgds-input");
    super._mixinHandleInputChange(e);
  }

  private _handleFocus() {
    this.emit("sgds-focus");
  }

  private _handleBlur() {
    this._isTouched = true;
    this.emit("sgds-blur");
  }

  /** @internal */
  @watch("rows", { waitUntilFirstUpdate: true })
  _handleRowsChange() {
    this._setTextareaHeight();
  }

  private _setTextareaHeight() {
    if (this.resize === "auto") {
      this.textarea.style.height = "auto";
      this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    } else {
      (this.textarea.style.height as string | undefined) = undefined;
    }
  }
  /** @internal */
  @watch("_isTouched", { waitUntilFirstUpdate: true })
  _handleIsTouched() {
    if (this._isTouched) {
      this.invalid = !this.textarea.checkValidity();
    }
  }

  /** @internal */
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.setInvalid(false);
  }

  /** @internal */
  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this.updateComplete.then(() => this._setTextareaHeight());
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  private _wordCount() {
    return html`
      <div
        class="form-text word-count ${classMap({
          "invalid-feedback": this.invalid && this.hasFeedback
        })}"
      >
        ${this.value.length}/${this.maxlength}
      </div>
    `;
  }
  render() {
    return html`
      <div
        class="form-control-container ${classMap({
          disabled: this.disabled
        })}"
      >
        <label for=${this._controlId} class="form-label">${this.label}</label>
        <textarea
          class=${classMap({
            "form-control": true,
            "is-invalid": this.hasFeedback && this.invalid,
            "textarea-resize-none": this.resize === "none",
            "textarea-resize-vertical": this.resize === "vertical",
            "textarea-resize-auto": this.resize === "auto"
          })}
          id=${this._controlId}
          name=${ifDefined(this.name)}
          rows=${ifDefined(this.rows)}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          .value=${live(this.value)}
          aria-invalid=${this.invalid ? "true" : "false"}
          spellcheck=${ifDefined(this.spellcheck)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          ?autofocus=${this.autofocus}
          autocorrect=${ifDefined(this.autocorrect)}
          inputmode=${ifDefined(this.inputmode)}
          @input=${(e: Event) => this._handleInputChange(e)}
          @change=${(e: Event) => this._handleChange(e)}
          @invalid=${(e: Event) => this._handleInvalid(e)}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        ></textarea>
        <div class="textarea-info-container">
          ${this.invalid && this.hasFeedback
            ? html`
                <div class="invalid-feedback-container">
                  <slot name="invalidIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                        fill="currentColor"
                      />
                    </svg>
                  </slot>
                  <div id="${this._controlId}-invalid" class="invalid-feedback">
                    ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
                  </div>
                </div>
              `
            : html`${this._renderHintText()}`}
          ${this.maxlength > 0 ? this._wordCount() : nothing}
        </div>
      </div>
    `;
  }
}

export default SgdsTextarea;
