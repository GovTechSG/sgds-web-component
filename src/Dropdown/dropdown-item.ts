import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown.scss";

@customElement("dropdown-item")
export class DropdownItem extends LitElement {
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

  public _focus() {
    (this.shadowRoot.querySelector(".dropdown-item") as HTMLElement).focus();
  }

  render() {
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
