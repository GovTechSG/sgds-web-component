import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import spinnerStyle from "./spinner.css";
import textStyles from "../../styles/text-variants.css";
/**
 * @summary Spinners notify the users that their request is being processed.
 *
 */
export class SgdsSpinner extends SgdsElement {
  static styles = [...SgdsElement.styles, textStyles, spinnerStyle];
  /** The type of spinner */
  @property({ type: String, reflect: true }) type: SpinnerType = "border";
  /** The color of spinner */
  @property({ type: String, reflect: true }) color: SpinnerColor = "primary";

  render() {
    return html`
      <div class="spinner-${this.type} spinner" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
}

export type SpinnerColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export type SpinnerType = "border" | "grow";

export default SgdsSpinner;
