import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sidenav.scss";

@customElement("sidenav-element")
export class SideNavElement extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true })
  alwaysOpen = false;

  render() {
    this.alwaysOpen
      ? null
      : this.addEventListener("toggle-onclick", (e: CustomEvent) => {
          const children = this.querySelectorAll("sidenav-item");
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
