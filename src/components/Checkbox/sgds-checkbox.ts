import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import FormCheckElement from "../../base/form-check-element";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsFormControl } from "../../utils/form";
import genId from "../../utils/generateId";
import { InputValidationController } from "../../utils/inputValidationController";
import { watch } from "../../utils/watch";
import checkboxStyle from "./checkbox.css";

/**
 * @summary Checkbox component is used when you require users to select multiple items from a list.
 *
 * @slot default - The label of checkbox.
 *
 * @event sgds-change - Emitted when the checked state changes.
 * @event sgds-validity-change - Emitted when the invalid state changes. This event is used by sgds-checkbox-group to check the invalid state change of its children
 */
export class SgdsCheckbox extends SgdsElement implements SgdsFormControl {
  static styles = [...FormCheckElement.styles, checkboxStyle];
  /**@internal */
  @query('input[type="checkbox"]') input: HTMLInputElement;
  /**@internal */
  static formAssociated = true;
  protected inputValidationController = new InputValidationController(this);
  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property({ type: String, reflect: true }) name: string;

  /** Value of the HTML form control. Primarily used to differentiate a list of related checkboxes that have the same name. */
  @property({ type: String, reflect: true }) value: string;

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Draws the checkbox in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Disables the checkbox (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue("checked")
  defaultChecked = false;
  /** Marks the checkbox input as invalid. Replace the pseudo :invalid selector for absent in custom elements */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** Marks the checkbox input as indeterminate , with indeterminate logo  */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  @watch("invalid", { waitUntilFirstUpdate: true })
  _handleInvalidChange() {
    this.emit("sgds-validity-change", {
      detail: { invalid: this.invalid, validationMessage: this.inputValidationController.validationMessage }
    });
  }

  /** Simulates a click on the checkbox. */
  public click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  public focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  public blur() {
    this.input.blur();
  }

  private _handleChange(e: Event) {
    if (this.indeterminate) {
      this.indeterminate = !this.indeterminate;
    }

    this.checked = !this.checked;
    this.value = this.input.value;
    this.inputValidationController.handleChange(e);
    this.emit("sgds-change", { detail: { checked: this.checked, value: this.value } });
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      this.click();
    }
  }

  private _handleInvalid(e: Event) {
    e.preventDefault();
    this.invalid = true;
  }
  /** @internal For Id/For pair of the HTML form control and label. */
  private _inputId = genId("checkbox");

  /** @internal */
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }

  firstUpdated() {
    // this.input = this.shadowRoot.querySelector("input");
    this.addEventListener("focus", () => this.input.focus());

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    // validate input on first load
    this.inputValidationController.validateInput(this.input);
  }
  render() {
    return html`
      <div class="form-check">
        <div class="form-check-input-container">
          <input
            class=${classMap({
              "form-check-input": true,
              "is-invalid": this.hasFeedback && this.invalid
            })}
            type="checkbox"
            id=${this._inputId}
            aria-invalid=${this.invalid ? "true" : "false"}
            name=${ifDefined(this.name)}
            value=${ifDefined(this.value)}
            ?checked=${this.checked}
            ?indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-checked=${this.checked ? "true" : "false"}
            @change=${(e: Event) => this._handleChange(e)}
            @keydown=${this._handleKeyDown}
            @invalid=${(e: Event) => this._handleInvalid(e)}
          />
        </div>
        <label for="${this._inputId}" class="form-check-label"><slot></slot></label>
      </div>
    `;
  }
}

export default SgdsCheckbox;
