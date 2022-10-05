import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import styles from "./sgds-checkbox.scss";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../utils/sgds-element";
import { watch } from "../utils/watch";
import { classMap } from "lit/directives/class-map.js";

@customElement("sgds-checkbox")
export class SgdsCheckbox extends SgdsElement {
  static styles = styles;

  @query('input[type="checkbox"]') input: HTMLInputElement;

  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property() name: string;

  /** Value of the HTML form control. Primarily used to differentiate a list of related checkboxes that have the same name. */
  @property() value: string;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Disables the checkbox (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  handleClick() {
    this.checked = !this.checked;
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
  }

  @watch("checked", { waitUntilFirstUpdate: true })
  render() {
    return html`
      <label part="base" class="form-check">
        <input
          class=${classMap({
            "form-check-input": true,
          })}
          type="checkbox"
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
        />
        <span part="label" class="form-check-label"><slot></slot></span>
      </label>
    `;
  }
}

export default SgdsCheckbox;
