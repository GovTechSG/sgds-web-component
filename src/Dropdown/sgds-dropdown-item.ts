import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-dropdown.scss";
import {classMap} from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement("sgds-dropdown-item")
export class SgdsDropdownItem extends SgdsElement {
  static styles = styles

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: String, reflect: true })
  href = "";
  @property({ type: Boolean, reflect: true })
  disabled = false;
  @property({ type: String, reflect: true })
  value = undefined;
  @property({type: String, reflect: true})
  tabindex = '-1'

  render() {
    return html`
      <li>
        <a
          href="${this.href}"
          class="dropdown-item ${classMap({
            'disabled': this.disabled,
            'active': this.active
          })}"
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ><slot></slot
        ></a>
      </li>
    `;
  }
}
