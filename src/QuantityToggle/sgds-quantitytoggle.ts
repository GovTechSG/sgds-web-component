import { customElement, property,query, state } from "lit/decorators.js";
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SgdsElement from "../utils/sgds-element";
import { defaultValue } from "../utils/defaultvalue";
import genId from "../utils/generateId";
import { live } from 'lit/directives/live.js';
import { watch } from "../utils/watch";
import {SgdsButton} from "../Button";
import styles from "./sgds-quantitytoggle.scss";

@customElement("sgds-quantitytoggle")
export class SgdsQuantityToggle extends SgdsElement {
  @query('input.form-control') input: HTMLInputElement;
  @query('sgds-button.button-group_button-first') leftBtn: SgdsButton;
  @query('sgds-button.button-group_button-last') lastBtn: SgdsButton;
  static styles = styles;

  @property({ reflect: true, type: String}) quantToggleId = genId("quantToggle", "toggle");
  
  @property({reflect: true}) name : string;
  
   /** The input's minimum value. */
  @property() min: number | string;

   /** The input's maximum value. */
  @property() max: number | string;

  @property ({reflect: true}) count : number | string;

  @property({ type: Boolean, reflect: true }) disabled = false;
 
  /**
  * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
  * implied, allowing any numeric value.
  */
  @property() step: number;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = '';

  handleChange(event: string){
    this.emit(event);
    this.count = this.input.value;
  }
  handleClick(event:MouseEvent){
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if(this.leftBtn){
      if (this.count < this.step) {
        this.count = 0;
      }
      else {
        this.count = parseInt(this.input.value) - parseInt(this.input.step);
      }
    }
    if(this.lastBtn){
      this.count = parseInt(this.input.value) + parseInt(this.input.step);
    }
  }
  onPlus(event:MouseEvent){
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.count = parseInt(this.input.value) + parseInt(this.input.step);
    

  };
  onMinus(event:MouseEvent){
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.count < this.step) {
      this.count = 0;
    }
    else {
      this.count = parseInt(this.input.value) - parseInt(this.input.step);
    }
    
  };

  @watch('count', { waitUntilFirstUpdate: true })

  render() {
    return html`
    <div 
      part="base"
      class="sgds input-group" 
      variant="quantity-toggle"
      id=${this.quantToggleId}
      
    >
      <sgds-button 
        part="button" 
        variant="primary" 
        class="button-group_button-first"
        @click=${this.onMinus}
        ?disabled=${this.disabled}
      >
        <sl-icon name="dash-lg"></sl-icon>
      </sgds-button>
      <input 
        type="number" 
        class="form-control text-center"
        name=${ifDefined(this.name)}
        step=${ifDefined(this.step as number)}
        min=${ifDefined(this.min)}
        max=${ifDefined(this.max)}
        .value=${live(this.count as string)}
        @change=${()=> this.handleChange('sgds-change')}
        @input=${()=> this.handleChange('sgds-input')}
        ?disabled=${this.disabled}
      >
      <sgds-button 
        part="button" 
        variant="primary" 
        class="button-group_button-last"
        @click=${this.onPlus}
        ?disabled=${this.disabled}
      >
        <sl-icon name="plus-lg"></sl-icon>
      </sgds-button>
    </div>
    `;
  }
}

export default SgdsQuantityToggle;
