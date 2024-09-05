import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import spinnerStyle from "./spinner.css";
import textStyles from "../../styles/text-variants.css";
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

  handleSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }) as Array<HTMLOrSVGImageElement>;
    if (childNodes.length > 0) {
      this.shadowRoot?.querySelector(".sr-only").remove();
    }
  }

  render() {
    return html`
      <div class="spinner-wrapper">
        <div
          class="spinner ${classMap({
            [`spinner-${this.size}`]: this.size
          })}"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <span>
          <slot @slotchange=${this.handleSlotChange}></slot>
        </span>
      </div>
    `;
  }
}

export type SpinnerVariant = "primary" | "neutral";

export default SgdsSpinner;
