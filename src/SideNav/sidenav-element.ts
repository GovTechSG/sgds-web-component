import { LitElement, html, PropertyDeclaration, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref, RefOrCallback } from "lit/directives/ref.js";
import "./sidenav-item";
import { SideNavItem } from "./sidenav-item";

@customElement("sidenav-element")
export class SideNavElement extends LitElement {
  static styles = styles;

  @property({ type: Boolean, attribute: true })
  alwaysOpen = false;

  render() {
    this.alwaysOpen
      ? null
      : this.addEventListener("openEventOnClick", (e: CustomEvent) => {
        console.log(e.detail.index)
          const children = this.querySelectorAll("sidenav-item");
          for (let i = 0; i < children.length; i++) {
            if (e.detail.index != i) {
              (children[i] as any).closeItem();
            }
          }
        });

    return html`
      <nav class="sidenav" id="${this.id}">
        <slot></slot>
      </nav>
    `;
  }
}
