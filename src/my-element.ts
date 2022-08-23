import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./my-element.scss";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = styles;

  @property()
  variant = "primary";

  render() {
    return html`
      <button class="btn btn-${this.variant}">Hello World</button>
    `;
  }
}
