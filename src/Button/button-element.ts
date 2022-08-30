import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./button-element.scss";

@customElement("button-element")
export class ButtonElement extends LitElement {
  static styles = styles;

  @property()
  variant = "primary";

  @property()
  classes = "";

  render() {
    return html`
      <button class="btn btn-${this.variant} ${this.classes}"><slot></slot></button>
    `;
  }
}
