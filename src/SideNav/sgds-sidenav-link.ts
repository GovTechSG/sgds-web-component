import { html } from "lit";
import SgdsElement from "../utils/sgds-element";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-sidenav-link.scss";

@customElement("sgds-sidenav-link")
export class SgdsSidenavLink extends SgdsElement {
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
