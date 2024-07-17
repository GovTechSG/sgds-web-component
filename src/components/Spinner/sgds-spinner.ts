import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import spinnerStyle from "./spinner.css";
import textStyles from "../../styles/text-variants.css";
/**
 * @summary Spinners notify the users that their request is being processed.
 *
 * @cssproperty --sgds-spinner-color - The color of spinner
 * @cssproperty --sgds-spinner-size - The width and height of spinner
 * @cssproperty --sgds-spinner-border-width - The width of the border of spinner
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
      <div class="spinner-${this.type}" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
}

export type SpinnerColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

export type SpinnerType = "border" | "grow";

export default SgdsSpinner;
