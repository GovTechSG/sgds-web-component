import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import spinnerStyle from "./spinner.css";
import textStyles from "../../styles/text-variants.css";
import { nothing } from "lit";
/**
 * @summary Spinners notify the users that their request is being processed.
 *
 */
export class SgdsSpinner extends SgdsElement {
  static styles = [...SgdsElement.styles, textStyles, spinnerStyle];
  /** The variant of spinner */
  @property({ type: String, reflect: true }) variant: SpinnerVariant = "primary";
  /** Specifies a small, medium or large button, the size is medium by default. */
  @property({ reflect: true }) size: "sm" | "md" | "lg" = "md";
  /** Text label of the spinner */
  @property({ reflect: true, type: String }) label: string;

  render() {
    return html`
      <div class="spinner-wrapper">
        <div
          class="spinner ${classMap({
            [`spinner-${this.size}`]: this.size
          })}"
          role="status"
        >
          ${this.label ? nothing : html`<span class="sr-only">Loading...</span>`}
        </div>
        ${this.label ? html`<span class="spinner-label">${this.label}</span>` : nothing}
      </div>
    `;
  }
}

export type SpinnerVariant = "primary" | "neutral";

export default SgdsSpinner;
