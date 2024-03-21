import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { FormSubmitController, SgdsFormControl } from "../../utils/form";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import styles from "./sgds-textarea.scss?inline";

/**
 * @summary Text areas allow for the collection of input longer than a single line.
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 * @event sgds-focus - Emitted when textarea is in focus.
 * @event sgds-blur - Emitted when textarea loses focus.
 */
export class SgdsTextarea extends SgdsElement implements SgdsFormControl {
  static styles = [SgdsElement.styles, styles];
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
  /**Forwarded to the HTML native textarea element. Can be used to insert any bootstrap classes such as mt-2 */
  @property({ type: String, reflect: true }) textareaClasses?: string;
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
  @property() resize: "none" | "vertical" | "auto" = "vertical";
  /** The native textarea's inputmode attribute. It hints at the type of data that might be entered by the user while editing the element or its contents. This allows a browser to display an appropriate virtual keyboard. */
  @property() inputmode: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
  /** The native textarea's autocorrect attribute. */
  @property() autocorrect: string;
  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";
  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /**@internal */
  @state() invalid = false;
  /**@internal */
  @state() valid = false;

  /** @internal The textarea's unique id */
  private textareaId = genId("textarea", "input");

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());

    this.updateComplete.then(() => {
      this.setTextareaHeight();
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
  handleInvalid(e: Event) {
    e.preventDefault();
    this.invalid = true;
  }

  handleChange(event: string) {
    this.value = this.textarea.value;
    this.emit(event);
  }

  handleFocus() {
    this.emit("sgds-focus");
  }

  handleBlur() {
    this.emit("sgds-blur");
  }

  handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
    // submitting to allow users to cancel the keydown event if they need to
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented) {
          this.formSubmitController.submit();
        }
      });
    }
  }

  @watch("rows", { waitUntilFirstUpdate: true })
  handleRowsChange() {
    this.setTextareaHeight();
  }

  setTextareaHeight() {
    if (this.resize === "auto") {
      this.textarea.style.height = "auto";
      this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    } else {
      (this.textarea.style.height as string | undefined) = undefined;
    }
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.textarea.disabled = this.disabled;
    this.invalid = !this.textarea.checkValidity();
  }

  @watch("value", { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.invalid = !this.textarea.checkValidity();
    this.valid = this.textarea.checkValidity();
    this.updateComplete.then(() => this.setTextareaHeight());
    if (!this.required && this.value === "") {
      this.valid = false;
    }
  }

  render() {
    // if maxlength is defined
    const wordCount = html` <div class="form-text">${this.value.length}/${this.maxlength}</div> `;

    return html`
      <div class="text-area-label-wrapper d-flex justify-content-between">
        <label for=${this.textareaId} class="form-label">${this.label}</label>
        ${this.maxlength > 0 ? wordCount : undefined}
      </div>

      <textarea
        class=${classMap({
          "form-control": true,
          "is-invalid": this.hasFeedback && this.invalid,
          "is-valid": this.hasFeedback && this.valid,
          "textarea-resize-none": this.resize === "none",
          "textarea-resize-vertical": this.resize === "vertical",
          "textarea-resize-auto": this.resize === "auto",
          [`${this.textareaClasses}`]: this.textareaClasses
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
        @keyup=${this.handleValueChange}
        @input=${() => this.handleChange("sgds-input")}
        @change=${() => this.handleChange("sgds-change")}
        @invalid=${(e: Event) => this.handleInvalid(e)}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
      </textarea>

      ${this.hasFeedback
        ? html`<div id="${this.textareaId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>`
        : ""}
    `;
  }
}

export default SgdsTextarea;
