import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import SlMenu from "@shoelace-style/shoelace/dist/components/menu/menu.js";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-test.scss";

@customElement("dropdown-menu")
export class DropdownMenu extends SlMenu {
  static styles = css`
    ${styles}/* :host(:focus) {
      outline: none;
      background-color: red;
      color: red;
    } */
  `;

  render() {
    return html`
      <sl-menu
      >
      </sl-menu>
    `;
  }
}
