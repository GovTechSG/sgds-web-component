import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-dropdown.scss";
import {classMap} from 'lit/directives/class-map.js';

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

  @query('a')
  anchor: HTMLElement
  firstUpdated(){
     //required when navigate with ArrowDown/ArrowUp
    this.addEventListener('keydown', (e:KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.anchor.click()
      }
    })
  }

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
          tabindex=${this.disabled ? '-1': '0'}
          ><slot></slot
        ></a>
      </li>
    `;
  }
}
