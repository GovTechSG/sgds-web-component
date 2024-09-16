import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { FormSubmitController, SgdsFormControl } from "../../utils/form";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import textareaStyle from "./textarea.css";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
import formHintStyles from "../../styles/form-hint.css";

/**
 * @summary Text areas allow for the collection of input longer than a single line.
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 * @event sgds-focus - Emitted when textarea is in focus.
 * @event sgds-blur - Emitted when textarea loses focus.
 */
export class SgdsTextarea extends SgdsElement implements SgdsFormControl {
  static styles = [...SgdsElement.styles, feedbackStyles, formHintStyles, formLabelStyles, textareaStyle];
  /**@internal */
  @query("textarea.form-control") textarea: HTMLTextAreaElement;
  /**@internal */
  private readonly formSubmitController = new FormSubmitController(this);
  /**@internal */
  private resizeObserver: ResizeObserver;
  /**The textarea's label */
  @property({ type: String, reflect: true }) label = "label";
  /**The textarea's name attribute */
  @property({ type: String, reflect: true }) name: string;
  /**The textarea's value attribute. */
  @property({ type: String, reflect: true }) value = "";
  /**Sets the minimum length of the textarea */
  @property({ type: Number, reflect: true }) minlength: number;
  /**Sets the maximum length of the textarea */
  @property({ type: Number, reflect: true }) maxlength: number;
  /**Enables spell checking on the textarea */
  @property({ type: Boolean, reflect: true }) spellcheck = false;
  /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;
  /**The textarea's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "Placeholder";
  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";
  /**Autofocus the textarea */
  @property({ type: Boolean, reflect: true }) autofocus = false;
  /**Disables the textarea. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /**Makes the textarea a required field. */
  @property({ type: Boolean, reflect: true }) required = false;
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

  /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** When set, the character count will be hidden */
  @property({ type: Boolean, reflect: true }) hideCharacterCount = false;

  /** @internal The textarea's unique id */
  private textareaId = genId("textarea", "input");

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this._setTextareaHeight());

    this.updateComplete.then(() => {
      this._setTextareaHeight();
      this.resizeObserver.observe(this.textarea);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.textarea);
  }

  /** Sets focus on the textarea. */
  public focus(options?: FocusOptions) {
    this.textarea.focus(options);
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity() {
    return this.textarea.reportValidity();
  }
  /** Selects all the text in the textarea. */
  public select() {
    this.textarea.select();
  }
  private _handleInvalid(e: Event) {
    e.preventDefault();
    this.invalid = true;
  }

  private _handleChange(event: string) {
    this.value = this.textarea.value;
    this.emit(event);
  }

  private _handleFocus() {
    this.emit("sgds-focus");
  }

  private handleBlur() {
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
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.textarea.disabled = this.disabled;
    this.invalid = !this.textarea.checkValidity();
  }

  /** @internal */
  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this.invalid = !this.textarea.checkValidity();
    this.updateComplete.then(() => this._setTextareaHeight());
  }

  render() {
    // if maxlength is defined
    const wordCount = html` <div class="form-text">${this.value.length}/${this.maxlength}</div> `;

    return html`
      <div
        class="form-control-container ${classMap({
          disabled: this.disabled
        })}"
      >
        <label for=${this.textareaId} class="form-label">${this.label}</label>
        <textarea
          class=${classMap({
            "form-control": true,
            "is-invalid": this.hasFeedback && this.invalid,
            "textarea-resize-none": this.resize === "none",
            "textarea-resize-vertical": this.resize === "vertical",
            "textarea-resize-auto": this.resize === "auto"
          })}
          id=${this.textareaId}
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
          @input=${() => this._handleChange("sgds-input")}
          @change=${() => this._handleChange("sgds-change")}
          @invalid=${(e: Event) => this._handleInvalid(e)}
          @focus=${this._handleFocus}
          @blur=${this.handleBlur}
        >
        </textarea>
        <div class="textarea-info-container">
          ${this.invalid && this.hasFeedback
            ? html`
                <div class="invalid-feedback-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                      fill="#B90000"
                    />
                  </svg>
                  <div id="${this.textareaId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>
                </div>
              `
            : html`<div class="form-text"><slot name="hint-text"></slot></div>`}
          ${this.maxlength > 0 && !this.hideCharacterCount ? wordCount : undefined}
        </div>
      </div>
    `;
  }
}

export default SgdsTextarea;
