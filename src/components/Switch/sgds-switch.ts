import FormCheckElement from "../../base/form-check-element";
import genId from "../../utils/generateId";
import switchStyle from "./switch.css";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit";
import { FormSubmitController, SgdsFormControl } from "../../utils/form";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import { defaultValue } from "../../utils/defaultvalue";


/**
 * @summary Switch component is used to toggle on and off or yes or no. It shares the same parent class as Checkbox component.
 *
 * @slot default - The label of switch.
 *
 * @event sgds-change - Emitted when the checked state changes.
 *
 */
export class SgdsSwitch extends SgdsElement implements SgdsFormControl {
  static styles = [...FormCheckElement.styles, feedbackStyles, formLabelStyles, switchStyle];

  /** The size of the switch. By default, it is small size */
  @property({ reflect: true, type: String }) size: "sm" | "md" | "lg" = "md";

  @property({ reflect: true, type: Boolean }) icon = false;

  /**@internal */
  @query('input[type="checkbox"]') input: HTMLInputElement;
  /**@internal */
  private readonly formSubmitController = new FormSubmitController(this, {
    value: (control: FormCheckElement) => (control.checked ? control.value : undefined),
    defaultValue: (control: FormCheckElement) => control.defaultChecked,
    setValue: (control: FormCheckElement, checked: boolean) => (control.checked = checked)
  });

  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property({ type: String, reflect: true }) name: string;

  /** For aria-label when there is no appropriate text label visible */
  @property({ type: String, reflect: true }) ariaLabel = "checkbox";

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
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity() {
    if (!this.input.reportValidity()) {
      this.invalid = !this.input.checkValidity();
    }
    return this.input.reportValidity();
  }

  protected _handleChange() {
    this.checked = !this.checked;
    this.value = this.input.value;
    this.emit("sgds-change", { detail: { checked: this.checked, value: this.value } });
  }

  protected _handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      this.click();
    }
  }

  protected _handleInvalid(e: Event) {
    e.preventDefault();
    this.invalid = true;
  }
  /** @internal For Id/For pair of the HTML form control and label. */
  protected _inputId = genId("switch");

  /**@internal */
  @property({ type: String }) protected _size: string;
  /** @internal */
  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }
  /** @internal */
  @watch("checked", { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.invalid = !this.input.checkValidity();
  }

  @queryAssignedNodes({ slot: "leftLabel", flatten: true })
  _leftIconNodes!: Array<Node>;

  firstUpdated() {
    if (this._leftIconNodes.length === 0) {
      return this.shadowRoot.querySelector(".form-check-label.left-label")?.classList.add("d-none");
    } 
  }

  render() {
    return html`
      <div
        class="form-check"
      >
      <label for="${this._inputId}" aria-label=${ifDefined(this.ariaLabel)} class="form-check-label left-label"
          ><slot name="leftLabel"></slot
        ></label>
        <input
          class=${classMap({
            "form-check-input": true,
            "is-invalid": this.hasFeedback && this.invalid,
          })}
          type="checkbox"
          id=${this._inputId}
          aria-invalid=${this.invalid ? "true" : "false"}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
          @invalid=${(e: Event) => this._handleInvalid(e)}
        />
        <label for="${this._inputId}" aria-label=${ifDefined(this.ariaLabel)} class="form-check-label"
          ><slot></slot
        ></label>
      </div>
    `;
  }
}

export default SgdsSwitch;
