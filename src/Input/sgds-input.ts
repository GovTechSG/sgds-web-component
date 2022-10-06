import { LitElement} from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import styles from "./sgds-input.scss";

export type ButtonVariant = 
"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" |
"outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark"

@customElement("sgds-input")
export class SgdsInput extends LitElement {
  static styles = styles;

  @property({ reflect: true, type: String }) inputClasses?;
  @property({reflect: true, type: String }) label : string = "label";
  @property({reflect: true, type: String }) hintText : string = "hint text";
  @property({reflect: true, type: String }) placeHolder: string = "Placeholder";
  @property({reflect: true, type: Boolean }) autofocus;

  //TODO get value from input
  //TODO set value to input
  //TODO Validation


  render() {

    return html`
      <div class="sgds form-group ${this.inputClasses}">
        <label for="defaultWith" class="form-label">${this.label}</label>
        
        <div id="defaultWithHelp" class="form-text">${this.hintText}</div>
        <div class="sgds form-control-group">
            <input type="text" class="form-control" id="defaultWith" aria-describedby="defaultWith" placeholder="${this.placeHolder}" ${this.autofocus}>
            <i class="bi bi-search form-control-icon"></i>
        </div>
    </div>
    `;
  }
}

export default SgdsInput;
