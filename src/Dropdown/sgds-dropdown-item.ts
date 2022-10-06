import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-dropdown.scss";

@customElement("sgds-dropdown-item")
export class SgdsDropdownItem extends LitElement {
  static styles = css`
    ${styles}
    /* :host(:focus) {
      outline: none;
      background-color: red;
      color: red;
    } */
  `;

  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  href = "";
  @property({ type: Boolean })
  disabled = false;
  @property({ type: String })
  value = undefined;

  render() {
    console.log('render')
    return html`
      <li>
        <a
          disabled="${this.disabled}"
          href="${this.href}"
          class="dropdown-item ${this.active ? "active" : null}"
          ><slot></slot
        ></a>
      </li>
    `;
  }
}
