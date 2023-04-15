import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import styles from "./sgds-checkbox.scss";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../base/sgds-element";
import { classMap } from "lit/directives/class-map.js";
import genId from "../utils/generateId";
import { defaultValue } from "../utils/defaultvalue";
import { FormSubmitController } from "../utils/form";
import { watch } from "../utils/watch";

@customElement("sgds-checkbox")
export class SgdsCheckbox extends SgdsElement {
  static styles = styles;

  @query('input[type="checkbox"]') input: HTMLInputElement;

  private readonly formSubmitController = new FormSubmitController(this, {
    value: (control: SgdsCheckbox) =>
      control.checked ? control.value : undefined,
    defaultValue: (control: SgdsCheckbox) => control.defaultChecked,
    setValue: (control: SgdsCheckbox, checked: boolean) =>
      (control.checked = checked),
  });

  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property({reflect: true }) name: string;

  /** For Id/For pair of the HTML form control. */
  @property({ type: String, reflect: true }) checkboxId = genId("checkbox");

  /** For aria-label when there is no appropriate text label visible */
  @property({ type: String, reflect: true }) ariaLabel = "checkbox";

  /** Manually style the input as valid */
  @property({ type: Boolean, reflect: true }) valid = false;

  /** Manually style the input as invalid */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Value of the HTML form control. Primarily used to differentiate a list of related checkboxes that have the same name. */
  @property() value: string;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Disables the checkbox (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue("checked")
  defaultChecked = false;


  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (!this.input.reportValidity()) {
      this.invalid = !this.input.checkValidity();
    }
    return this.input.reportValidity();
  }

  handleChange() {
    // console.log(
    //   "when this.click() is fired, input detects a change --> handleChange runs"
    // );
    this.checked = !this.checked;
    this.value = this.input.value;
    this.emit("sgds-change");
  }

  handleKeyDown(event: KeyboardEvent) {
    const hasModifier =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      // console.log(
      //   "so here we are trying to mimick keydown enter event like a mousclick event"
      // );
      this.click();
    }
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  @watch("checked", { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
    if (this.required) this.valid = this.input.checkValidity();
  }

  render() {
    return html`
      <div part="base" class="form-check">
        <input
          part="control"
          class=${classMap({
            "form-check-input": true,
            "is-invalid": this.invalid,
            "is-valid": this.valid,
          })}
          type="checkbox"
          id=${ifDefined(this.checkboxId)}
          aria-invalid=${this.invalid ? "true" : "false"}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
        />
        <label
          part="label"
          for="${ifDefined(this.checkboxId)}"
          aria-label=${ifDefined(this.ariaLabel)}
          class="form-check-label"
          ><slot></slot
        ></label>
        ${this.invalid
          ? html`<slot
              name="feedback"
              part="feedback"
              class=${classMap({
                "invalid-feedback": true,
              })}
            ></slot>`
          : undefined}
      </div>
    `;
  }
}

export default SgdsCheckbox;
