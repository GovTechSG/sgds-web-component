import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import SlMenuItem from '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';'@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-test.scss";

@customElement("dropdown-menuitem")
export class DropdownMenuItem extends SlMenuItem {
  static styles = css`
    ${styles}/* :host(:focus) {
      outline: none;
      background-color: red;
      color: red;
    } */
  `;

  render() {
    return html`
      <sl-menu-item
      .value=${this.value}
      .disabled=${this.disabled}
      >
      </sl-menu-item>
    `;
  }
}
