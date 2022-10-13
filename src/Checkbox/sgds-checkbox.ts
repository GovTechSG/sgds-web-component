import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import styles from "./sgds-checkbox.scss";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../utils/sgds-element";
import { classMap } from "lit/directives/class-map.js";
import genId from "../utils/generateId";

@customElement("sgds-checkbox")
export class SgdsCheckbox extends SgdsElement {
  static styles = styles;

  @query('input[type="checkbox"]') input: HTMLInputElement;

  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property() name: string;

  /** For Id/For pair of the HTML form control. */
  @property({ type: String, reflect: true }) id = genId("checkbox");

  /** For aria-label when there is no appropriate text label visible */
  @property({ type: String, reflect: true }) ariaLabel = "checkbox";

  /** Manually style the input as valid */
  @property({ type: Boolean, reflect: true }) isValid = false;

  /** Manually style the input as invalid */
  @property({ type: Boolean, reflect: true }) isInvalid = false;

  /** Value of the HTML form control. Primarily used to differentiate a list of related checkboxes that have the same name. */
  @property() value: string;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Disables the checkbox (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Toggles display feedback */
  @property({ type: Boolean, reflect: true }) showFeedback = false;

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  handleClick() {
    this.checked = !this.checked;
    if (this.checked == true) this.emit("sgds-checkbox");
  }

  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
  }

  render() {
    return html`
      <div part="base" class="form-check">
        <input
          class=${classMap({
            "form-check-input": true,
            "is-invalid": this.isInvalid,
            "is-valid": this.isValid,
          })}
          type="checkbox"
          id=${ifDefined(this.id)}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
        />
        <label
          part="label"
          for="${ifDefined(this.id)}"
          aria-label=${ifDefined(this.ariaLabel)}
          class="form-check-label"
          ><slot></slot
        ></label>
        ${this.showFeedback
          ? html`<slot
              name="feedback"
              part="feedback"
              class=${classMap({
                "invalid-feedback": this.isInvalid,
                "valid-feedback": this.isValid,
              })}
            ></slot>`
          : undefined}
      </div>
    `;
  }
}

export default SgdsCheckbox;
