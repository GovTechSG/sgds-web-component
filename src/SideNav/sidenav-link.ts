import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav-link.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Collapse } from "bootstrap";

@customElement("sidenav-link")
export class SideNavLink extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  href = "";

  render() {
    return html`
      <li>
        <a href="${this.href}" class="nav-link ${this.active ? "active" : null}"
          ><slot></slot
        ></a>
      </li>
    `;
  }
}
