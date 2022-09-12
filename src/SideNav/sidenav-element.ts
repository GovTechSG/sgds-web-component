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
  activeKey = "";

  @state()
  activeLinkKey = ""

  constructor() {
    super();
    this.addEventListener("active.sidenav", (e: CustomEvent) => {
      console.log("i heard the active", e.detail.activeTarget);
      this.activeKey = e.detail.activeTarget;
    });

    this.addEventListener("active.link.key", (e: CustomEvent) => {
        this.activeLinkKey = e.detail.activeLinkKey
    })
  }

  firstUpdated() {
    console.log(this.shadowRoot);
  }

  render() {
    return html`
      <nav class="sidenav" id="test-id">
        <slot></slot>
      </nav>
    `;
  }
}
