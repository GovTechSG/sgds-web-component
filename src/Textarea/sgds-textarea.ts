import { customElement, property,query, state } from "lit/decorators.js";
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import styles from "./sgds-textarea.scss";
import SgdsElement from "../utils/sgds-element";
import { defaultValue } from "../utils/defaultvalue";
import { FormSubmitController } from "../utils/form";
import genId from "../utils/generateId";
import { watch } from "../utils/watch";

@customElement("sgds-textarea")
export class SgdsTextArea extends SgdsElement {
  static styles = styles;

  @query('textarea.form-control') textarea: HTMLTextAreaElement;
  @state() private hasFocus = false;

  private readonly formSubmitController = new FormSubmitController(this);
  private resizeObserver: ResizeObserver;
  
  
  @property({ type: String, reflect: true }) label = "label";
  @property({ type: String, reflect: true }) textareaId = genId("textarea","input");
  @property({ type: String, reflect: true }) name;
  @property({ type: String, reflect: true }) textareaClasses?;
  @property({ type: String, reflect: true }) value = '';
  @property({ type: String, reflect: true}) minlength;
  @property({ type: Number, reflect: true}) maxlength;
  @property({ type: Boolean, reflect: true}) spellcheck = false;
   /** The number of rows to display by default. */
  @property({ type: Number }) rows = 4;
  @property({ type: String, reflect: true }) placeholder = "Placeholder";
  @property({ type: String, reflect: true }) invalidFeedback = "default feedback";
  @property({ type: Boolean, reflect: true }) autofocus = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) invalid = false;
  /** Controls how the textarea can be resized. */
  @property() resize: 'none' | 'vertical' | 'auto' = 'vertical';
  /** The textarea's inputmode attribute. */
  @property() inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /* The textarea's autocorrect attribute. */
  @property() autocorrect: string;
  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = '';

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

  firstUpdated() {
    this.invalid = !this.textarea.checkValidity();
  }

  /** Sets focus on the textarea. */
  focus(options?: FocusOptions) {
    this.textarea.focus(options);
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.textarea.reportValidity();
  }

  handleInvalid() {
    this.invalid = true;
  }

  handleChange(event: string){
    this.value = this.textarea.value;
    this.emit(event);
  }

  handleFocus() {
    this.hasFocus = true;
    this.emit('sgds-focus');
  }

  handleBlur() {
    this.hasFocus = false;
    this.emit('sgds-blur');
  }

   /** Selects all the text in the textarea. */
   select() {
    this.textarea.select();
  }

  handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
    // submitting to allow users to cancel the keydown event if they need to
    if (event.key === 'Enter' && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented) {
          this.formSubmitController.submit();
        }
      });
    }
  }

  @watch('rows', { waitUntilFirstUpdate: true })
  handleRowsChange() {
    this.setTextareaHeight();
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = `${this.textarea.scrollHeight}px`;
    } else {
      (this.textarea.style.height as string | undefined) = undefined;
    }
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.textarea.disabled = this.disabled;
    this.invalid = !this.textarea.checkValidity();
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.invalid = !this.textarea.checkValidity();
    this.updateComplete.then(() => this.setTextareaHeight());
  }

  render() {

    // if maxlength is defined
    const wordCount = html`
    <div class="form-text">${this.value.length}/${this.maxlength}</div>
    `

    return html`
      <div 
        class="${classMap({
          'sgds': true,
          'form-group': true,
          [`${this.textareaClasses}`]: this.textareaClasses
        })}">
        <div class="d-flex justify-content-between">
          <label for=${ifDefined(this.textareaId)} class="form-label">${this.label}</label>
          ${this.maxlength > "0" ? wordCount : undefined}
        </div>
        
        <textarea 
          class="${classMap(
          { 
            'form-control': true,
            'is-invalid' : this.required && this.invalid,
            'is-valid' : this.required && !this.invalid
          })}"
          id=${ifDefined(this.textareaId)}
          name=${ifDefined(this.name)}
          rows=${ifDefined(this.rows)}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          .value=${live(this.value)}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          spellcheck=${ifDefined(this.spellcheck)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          ?autofocus=${this.autofocus}
          autocorrect=${ifDefined(this.autocorrect)}
          inputmode=${ifDefined(this.inputmode)}
          @keyup=${this.handleValueChange}
          @input=${()=> this.handleChange('sgds-input')}
          @change=${()=> this.handleChange('sgds-change')}
          @invalid=${this.handleInvalid}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
        </textarea>
        
        <div id="${this.textareaId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>
      </div>
    `;

  }
}

export default SgdsTextArea;
