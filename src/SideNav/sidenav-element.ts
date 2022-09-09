import { LitElement, html, PropertyDeclaration, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref, RefOrCallback } from "lit/directives/ref.js";
import "./sidenav-item";

@customElement("sidenav-element")
export class SideNavElement extends LitElement {
  static styles = styles;

  @state()
  activeKey = ''

  constructor() {
    super();
    this.addEventListener('active.sidenav', (e: CustomEvent) => {
        console.log('i heard the active', e.detail.activeTarget)
        this.activeKey = e.detail.activeTarget
    })
  }

    firstUpdated() {
      console.log(this.shadowRoot)
  }


  render() {
    return html`
      <nav class="sidenav accordion" id="test-id">
     <slot></slot>
      </nav>
    `;
  }
}
