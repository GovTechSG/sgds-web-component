import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./row-element.scss";

@customElement("row-element")
export class RowElement extends LitElement {
  static styles = styles;

  @property()
  classes = "row"

  render() {
    return html`
      <div class="${this.classes}">
        <slot></slot>
      </div>
    `;
  }
}
