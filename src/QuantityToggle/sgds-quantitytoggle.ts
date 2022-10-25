import { customElement, property,query, state } from "lit/decorators.js";
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import SgdsElement from "../utils/sgds-element";
import { defaultValue } from "../utils/defaultvalue";
import { FormSubmitController } from "../utils/form";
import genId from "../utils/generateId";
import { watch } from "../utils/watch";

import styles from "./sgds-quantitytoggle.scss";

@customElement("sgds-quantitytoggle")
export class SgdsQuantityToggle extends SgdsElement {
  @query('input.form-control') input: HTMLInputElement;

  @state() private hasFocus = false;

  private readonly formSubmitController = new FormSubmitController(this);
  
  static styles = styles;

  render() {
    return html`
    <div class="sgds input-group" variant="quantity-toggle">
      <sgds-button iconName="dash" type="button"></sgds-button>
      <input id="quantityLeftDisabled" type="number" class="form-control text-center" value="0">
      <sgds-button iconName="plus" type="button"></sgds-button>
    </div>
    `;
  }
}

export default SgdsQuantityToggle;
