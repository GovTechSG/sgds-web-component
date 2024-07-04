import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import progressBarStyle from "./progress-bar.css";
export type ProgressBarVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
/**
 * @cssproperty --sgds-progress-bar-color - Sets the text color on the progress bar
 * @cssproperty --sgds-progress-bar-font-size - Sets the font size of the text on the progress bar
 * @cssproperty --sgds-progress-bar-bg - Sets the fill color of the progress bar
 * @cssproperty --sgds-progress-bar-transition - Sets the transition of the progress bar
 */

export class SgdsProgressBar extends SgdsElement {
  static styles = [progressBarStyle];

  /** The background color of the progress bar */
  @property({ type: String, reflect: true }) variant: ProgressBarVariant;
  /**
   * The current progress as a percentage, from 0 to 100.
   */
  @property({ type: Number, reflect: true }) value: number;

  /**
   * Sets the minimun aria range for assistive devices.
   *
   * The aria-valuemin attribute defines the minimun allowed value for a range widget.
   */
  @property({ type: Number, reflect: true }) ariamin: number;
  /**
   * Sets the maximum aria range for assistive devices.
   *
   * The aria-valuemax attribute defines the maximum allowed value for a range widget.
   */
  @property({ type: Number, reflect: true }) ariamax: number;
  /**
   * Sets the aria label for assistive devices.
   */
  @property({ type: String, reflect: true }) arialabel = "";

  /** Apply a stripe over the progress bar */
  @property({ type: Boolean, reflect: true }) striped = false;
  /**
   * Animated stripes over the progress bar.
   *
   * Use in conjunction with striped property
   */
  @property({ type: Boolean, reflect: true }) animated = false;

  /** Add label on top of progress bar */
  @property({ type: String, reflect: true }) label = "";

  render() {
    return html`
      <div
        class=${classMap({
          "progress-bar": true,
          "progress-bar-striped": this.striped,
          "progress-bar-animated": this.animated
        })}
        role="progressbar"
        style=${styleMap({ width: `${this.value}%` })}
        aria-label=${this.arialabel}
        aria-valuenow=${this.value}
        aria-valuemin=${this.ariamin}
        aria-valuemax=${this.ariamax}
      >
        ${this.label ? html`${this.label}` : undefined}
      </div>
    `;
  }
}

export default SgdsProgressBar;
