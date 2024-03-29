import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-spinner.scss";

/**
 * @summary Spinners notify the users that their request is being processed.
 */
export class SgdsSpinner extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  /** The type of spinner */
  @property({ type: String, reflect: true }) type: SpinnerType = "border";
  /** The color of spinner */
  @property({ type: String, reflect: true }) color: SpinnerColor = "primary";
  /** Optional for spinner wrapper. Can be used to insert any utility classes such as me-auto */
  @property({ type: String, reflect: true }) spinnerClasses: string;
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

export type SpinnerColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export type SpinnerType = "border" | "grow";

export default SgdsSpinner;
