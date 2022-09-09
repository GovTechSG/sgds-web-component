import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sidenav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref, RefOrCallback } from "lit/directives/ref.js";
import "./sidenav-item";

@customElement("sidenav-element")
export class SideNavElement extends LitElement {
  static styles = styles;

  constructor() {
    super();
  }

 


  render() {
    const id = 'test-id'
    return html`
      <nav class="sidenav accordion" id="${id}">
     <slot></slot>
      </nav>
    `;
  }
}
