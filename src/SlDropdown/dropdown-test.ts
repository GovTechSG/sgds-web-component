import "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-test.scss";
import "@shoelace-style/shoelace/dist/components/menu/menu.js";
import "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
@customElement("dropdown-test")
export class DropdownTest extends SlDropdown {
  static styles = css`
    ${styles}/* :host(:focus) {
      outline: none;
      background-color: red;
      color: red;
    } */
  `;

  render() {
    return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace/dist/themes/light.css" />
      <sl-dropdown
        ?open=${this.open}
        placement=${this.placement}
        ?disabled=${this.disabled}
        ?stayOpenOnSelect=${this.stayOpenOnSelect}
        .containingElement=${this.containingElement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?hoist=${this.hoist}
      >
      <sl-button slot="trigger" caret>Hoist</sl-button>
      <sl-menu>
      <sl-menu-item>Item 1</sl-menu-item>
      <sl-menu-item>Item 2</sl-menu-item>
      <sl-menu-item>Item 3</sl-menu-item>
      </sl-menu>
      </sl-dropdown>
    `;
  }
}
