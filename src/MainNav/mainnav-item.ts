import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./mainnav-item.scss";

@customElement("mainnav-item")
export class MainNavItem extends LitElement {
  static styles = styles;

  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  href = "";

  render() {
    return html`
      <li class="nav-item">
        <a href="${this.href}" class="nav-link ${this.active ? "active" : null}"
          ><slot></slot
        ></a>
      </li>
    `;
  }
}
