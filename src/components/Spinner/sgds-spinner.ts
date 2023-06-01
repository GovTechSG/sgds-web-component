import { customElement, property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { classMap } from "lit/directives/class-map.js";
import styles from "./sgds-spinner.scss";

export type Type = "border" | "grow";

export type Color = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

@customElement("sgds-spinner")
export class SgdsSpinner extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  @property({ reflect: true }) type: Type = "border";
  @property({ reflect: true }) color: Color = "primary";
  @property({ reflect: true }) spinnerClasses?: string;
  render() {
    return html`
      <div
        class="
            ${classMap({
          [`spinner-${this.type}`]: this.type,
          [`text-${this.color}`]: this.color,
          [`${this.spinnerClasses}`]: this.spinnerClasses
        })}"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
}

export default SgdsSpinner;
