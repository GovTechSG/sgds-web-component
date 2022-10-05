import { html } from "lit";
import SgdsElement from "../utils/sgds-element";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-sidenav.scss";

@customElement("sgds-sidenav")
export class SgdsSidenav extends SgdsElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true })
  alwaysOpen = false;

  render() {
    this.alwaysOpen
      ? null
      : this.addEventListener("sgds-toggle", (e: CustomEvent) => {
          const children = this.querySelectorAll("sgds-sidenav-item");
          for (let i = 0; i < children.length; i++) {
            if (e.detail.index != i) {
              (children[i] as any).closeItem();
            }
          }
        });

    return html`
      <nav class="sidenav" id="${this.id}">
        <ul>
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}