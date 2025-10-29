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
  /** @deprecated The variant of spinner. Deprecated in favor of `tone` */
  @property({ type: String, reflect: true }) variant: SpinnerVariant = "primary";
  /** @deprecated The variant of spinner. Deprecated in favor of `tone` */
  @property({ type: String, reflect: true }) tone: SpinnerTone = "brand";
  /** Specifies a small, medium or large button, the size is medium by default. */
  @property({ type: String, reflect: true }) size: "xs" | "sm" | "md" | "lg" | "xl" = "md";
  /** Text label of the spinner */
  @property({ reflect: true, type: String }) label: string;
  /** Orientation of label relative to the spinner */
  @property({ type: String, reflect: true }) orientation: "horizontal" | "vertical" = "vertical";

  render() {
    return html`
      <div
        class="spinner-wrapper ${classMap({
          horizontal: this.orientation === "horizontal"
        })}"
      >
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
export type SpinnerTone = "brand" | "neutral" | "inverse" | "fixed-light" | "fixed-dark";
export type SpinnerVariant = "primary" | "neutral";

export default SgdsSpinner;
