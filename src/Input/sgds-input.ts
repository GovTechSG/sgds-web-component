
import { customElement, property,query } from "lit/decorators.js";
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from "./sgds-input.scss";
import SgdsElement from "../utils/sgds-element";
import { live } from 'lit/directives/live.js';

export type ButtonVariant = 
"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" |
"outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark"

@customElement("sgds-input")
export class SgdsInput extends SgdsElement {
  @query('input') input: HTMLInputElement;
  static styles = styles;

  @property() value = '';
  @property({ type: String, reflect: true,  }) inputClasses?;
  @property({ type: String, reflect: true }) label = "label";
  @property({ type: String, reflect: true}) hintText = "hint text";
  @property({ type: String, reflect: true }) placeHolder = "Placeholder";
  @property({ type: Boolean, reflect: true }) autofocus = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  //TODO get value from input
  handleChange(){
    this.value = this.input.value;
    this.emit('sgds-change');
  }
  //TODO set value to input
  //TODO Validation


  render() {

    return html`
      <div class="sgds form-group ${this.inputClasses}">
        <label for="defaultWith" class="form-label">${this.label}</label>
        
        <div id="defaultWithHelp" class="form-text">${this.hintText}</div>
        <div class="sgds form-control-group">
            <input type="text" 
              class="form-control" 
              id="defaultWith" 
              aria-describedby="defaultWith" 
              placeholder="${this.placeHolder}" 
              ?autofocus=${this.autofocus}
              @change=${this.handleChange}
              .value=${live(this.value)}
            >
            <i class="bi bi-search form-control-icon"></i>
        </div>
    </div>
    `;
  }
}

export default SgdsInput;
