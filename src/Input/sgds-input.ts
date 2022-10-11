
import { customElement, property,query } from "lit/decorators.js";
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from "./sgds-input.scss";
import SgdsElement from "../utils/sgds-element";
import { live } from 'lit/directives/live.js';

@customElement("sgds-input")
export class SgdsInput extends SgdsElement {
  @query('input') input: HTMLInputElement;
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
  @property({ type:String, reflect: true }) id = 'defaultID';
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
  

  //TODO get value from input
  handleInput() {
    this.value = this.input.value;
    this.emit('sgds-input');
  }
  handleChange(){
    this.value = this.input.value;
    this.emit('sgds-change');
  }

  render() {
    const input = html`
      <input type="text"
        class="form-control ${this.inputClasses}" 
        type=${this.type}
        id=${ifDefined(this.id)}
        name=${ifDefined(this.name)}
        placeholder=${this.placeholder}
        @input=${this.handleInput}
        @change=${this.handleChange}
        pattern=${ifDefined(this.pattern)}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        .value=${live(this.value)}
        minlength=${ifDefined(this.minlength)}
        maxlength=${ifDefined(this.maxlength)}
      >
      <div id="${ifDefined(this.id)}Invalid" class="invalid-feedback">${this.feedback}</div>
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
    <div id="${ifDefined(this.id)}Help" class="form-text">${this.hintText}</div>
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
