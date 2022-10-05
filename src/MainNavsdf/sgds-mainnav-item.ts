import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-mainnav-item.scss";

@customElement("sgds-mainnav-item")
export class SgdsMainnavItem extends SgdsElement {
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
