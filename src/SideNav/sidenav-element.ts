import { LitElement, html, PropertyDeclaration, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref, RefOrCallback } from "lit/directives/ref.js";
import "./sidenav-item";

@customElement("sidenav-element")
export class SideNavElement extends LitElement {
  static styles = styles;

  // createRenderRoot() {
  //   return this;
  // }

  render() {
    return html`
      <nav class="sidenav" id="${this.id}">
        <slot></slot>
      </nav>
    `;
  }
}
