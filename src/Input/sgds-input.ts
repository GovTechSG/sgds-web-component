
import { customElement, property,query, state } from "lit/decorators.js";
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import styles from "./sgds-input.scss";
import SgdsElement from "../utils/sgds-element";
import { FormSubmitController } from "../utils/form";
import genId from "../utils/generateId";
import { watch } from "../utils/watch";


@customElement("sgds-input")
export class SgdsInput extends SgdsElement {
  @query('input.form-control') input: HTMLInputElement;

  @state() private hasFocus = false;

  private readonly formSubmitController = new FormSubmitController(this);
  
  static styles = styles;
  @property({ reflect: true }) type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url' = 'text';
  @property({ type: String, reflect: true }) label = "label";
  @property({ type: String, reflect: true}) hintText;
  @property({ type:String, reflect: true }) id = genId("input");
  @property({ type:String, reflect: true }) name;
  @property({ type: String, reflect: true }) inputClasses?;
  @property({ type: String, reflect: true }) iconName;

  @property({ type: String, reflect: true }) value = '';
  @property({ type: String, reflect: true}) minlength;
  @property({ type: String, reflect: true}) maxlength;

  @property({ type: String, reflect: true }) placeholder = "Placeholder";
  
  @property({ type: String, reflect: true }) pattern;
  @property({ type: String, reflect: true }) feedback = "default feedback";
  
  @property({ type: Boolean, reflect: true }) autofocus = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  /** Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  @property({ type: Boolean, reflect: true }) invalid = false;

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  handleInvalid() {
    this.invalid = true;
  }

  handleChange(event: string){
    this.value = this.input.value;
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

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    this.invalid = !this.input.checkValidity();
  }

  render() {
    const input = html`
      <input type="text"
        class="form-control 
        ${classMap(
          { 
            'is-invalid' : this.required && this.invalid,
            'is-valid' : this.required && !this.invalid,
            [`${this.inputClasses}`]: this.inputClasses
          })}
        " 
        type=${this.type}
        id=${this.id}
        name=${ifDefined(this.name)}
        placeholder=${ifDefined(this.placeholder)}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        pattern=${ifDefined(this.pattern)}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        .value=${live(this.value)}
        minlength=${ifDefined(this.minlength)}
        maxlength=${ifDefined(this.maxlength)}
        @input=${()=> this.handleChange('sgds-input')}
        @change=${()=> this.handleChange('sgds-change')}
        @keydown=${this.handleKeyDown}
        @invalid=${this.handleInvalid}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        
      >
      <div id="${this.id}-invalid" class="invalid-feedback">${this.feedback}</div>
    `
    // if iconName is defined
    const inputWithIcon = html`
      <div class="sgds form-control-group">
        <span class="form-control-icon">
          <sl-icon name=${this.iconName}></sl-icon> 
        </span>
        ${input}
      </div>
    `
    // if hintText is defined
    const withHintText = html`
    <small id="${ifDefined(this.id)}Help" class="text-muted form-text">${this.hintText}</small>
    `

    return html`
      <div class="sgds form-group ${this.inputClasses}">
        <label for=${ifDefined(this.id)} class="form-label">${this.label}</label>
        ${this.hintText ? withHintText : undefined }
        ${this.iconName ? inputWithIcon : input}
      </div>
    `;
  }
}

export default SgdsInput;
