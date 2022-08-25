import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./container-element.scss";

@customElement("container-element")
export class ContainerElement extends LitElement {
  static styles = styles;

  @property()
  classes = "container"

  render() {
    return html`
      <div class=" ${this.classes}">
        <slot></slot>
      </div>
    `;
  }
}
