import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sidenav-link.scss";


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
