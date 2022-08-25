import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./row-element.scss";

@customElement("column-element")
export class ColumnElement extends LitElement {
  static styles = styles;

  @property()
  classes = "col"

  render() {
    return html`
      <div class="${this.classes}">
        <slot></slot>
      </div>
    `;
  }
}
