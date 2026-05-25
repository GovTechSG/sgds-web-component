import { html, nothing, PropertyValueMap } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsCheckbox from "./sgds-checkbox";
import FormControlElement from "../../base/form-control-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import checkboxGroupStyles from "./checkbox-group.css";
/**
 * @summary CheckboxGroup is a form component for multiselection of checkboxes.
 *
 * @event sgds-change - Emitted when the value of the CheckboxGroup changes. This happens when checkboxes are checked or unchecked.
 *
 * @slot default - Pass in `sgds-checkbox` into the default slot
 * @slot invalidIcon - The slot for invalid icon
 *
 */
export class SgdsCheckboxGroup extends SgdsFormValidatorMixin(FormControlElement) {
  static styles = [...FormControlElement.styles, checkboxGroupStyles];

  /**@internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** The checkbox group's label  */
  @property({ reflect: true }) label = "";

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "Please tick at least one box if you want to proceed";

  /** Allows invalidFeedback, invalid styles to be visible. When SgdsCheckboxGroup is used, it overrides the value of hasFeedback on SgdsCheckbox with its own value. */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** The checkbox group's hint text */
  @property({ reflect: true }) hintText = "";

  /** Makes the checkbox group a required field. Only available for when multiselect is true */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Consolidates the values of its child checked checkboxes into a single string with semi-colon delimiter. Only available when required is true  */
  @property({ reflect: true }) value = "";

  @state() private _isTouched = false;

  @defaultValue()
  defaultValue = "";

  @state()
  private _blurredCheckboxes = new Set<SgdsCheckbox>();

  @state()
  private formEvent: FormEvent;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("sgds-check", (e: CustomEvent) => {
      const { value } = e.detail;
      !this.value.includes(value) && this._addValue(value);
    });
    this.addEventListener("sgds-uncheck", (e: CustomEvent) => {
      const { value } = e.detail;
      this._removeValue(value);
    });
    /** Blurring when all checkboxes are blurred */
    this.addEventListener("sgds-blur", e => {
      const checkbox = e.target as SgdsCheckbox;
      this._blurredCheckboxes.add(checkbox);
      if (Array.from(this._blurredCheckboxes).length === this._checkboxes.length) {
        this._isTouched = true;
        this._blurredCheckboxes.clear();
      }
    });
  }
  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    if (this.value) {
      this._updateInputValue();
    }

    if (this.invalid) {
      this._updateInvalid();
    }
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div class="form-text" id="${this._controlId}Help">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  @queryAssignedElements()
  private _checkboxes!: Array<SgdsCheckbox>;

  private _addValue(newValue: string) {
    const valueArray = this.value ? this.value.split(";") : [];
    valueArray.push(newValue);
    this.value = valueArray.join(";");
  }
  private _removeValue(oldValue: string) {
    const valueArray = this.value ? this.value.split(";") : [];
    const newValueArray = valueArray.filter(v => v !== oldValue);
    this.value = newValueArray.join(";");
  }

  private _sanitizeSlot() {
    const checkboxes = this._checkboxes;
    checkboxes.forEach(checkbox => {
      checkbox.checked = checkbox.defaultChecked = this.value.includes(checkbox.value);

      checkbox.hasFeedback = this.hasFeedback ? "style" : null;
      if (checkbox.required) {
        console.error("Checkboxes in a group cannot have required or hasFeedback prop set to true");
        checkbox.remove();
      }
    });
    this._disabledChildCheckboxes();
  }

  private _disabledChildCheckboxes() {
    if (this.disabled) {
      const checkboxes = this._checkboxes;
      checkboxes.forEach(checkbox => (checkbox.disabled = this.disabled));
    }
  }

  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    if (this.formEvent === "reset" && this.value === this.defaultValue) {
      this.formEvent = null;
      return;
    }

    this.emit("sgds-change");
    const checkboxes = this._checkboxes;
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.value.includes(checkbox.value);
    });
    this._updateInputValue();
    this._updateInvalid();
  }

  @watch("_isTouched", { waitUntilFirstUpdate: true })
  _handleIsTouched() {
    if (this._isTouched) {
      this.invalid = !this.input.checkValidity();
      this._updateInvalid();
    }
  }
  @watch("invalid", { waitUntilFirstUpdate: true })
  _updateInvalid() {
    const checkboxes = this._checkboxes;
    checkboxes.forEach(ch => (ch.invalid = this.invalid));
  }

  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  public reportValidity(): boolean {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  public checkValidity(): boolean {
    return this._mixinCheckValidity();
  }

  /**
   * Returns the ValidityState object
   */
  public get validity(): ValidityState {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  public get validationMessage() {
    return this._mixinGetValidationMessage();
  }
  /**
   * checkbox requries a custom _mixinResetFormControl as the update of input value
   * requires to fire a reset event manually
   * */
  private _mixinResetFormControl() {
    this.value = this.input.value = this.defaultValue;
    this._updateInputValue("reset");
    this._mixinResetValidity(this.input);
  }
  /**
   * when input value is set programatically, need to manually dispatch a change event
   * In order to prevent race conditions and ensure sequence of events, set input's value here instead of binding to value prop of input
   */
  private async _updateInputValue(eventName: FormEvent = "change") {
    this.input.value = this.value;

    this.input.dispatchEvent(new InputEvent(eventName));
    this.formEvent = eventName;
  }

  render() {
    return html`
      <fieldset>
        <div class="label-hint-container">
          <label class="form-label">${this.label}</label>
          ${this._renderHintText()}
        </div>
        <div class="checkbox-container">
          <slot @slotchange=${this._sanitizeSlot}></slot>
        </div>
        <input
          type="text"
          class="checkbox-group-validation-input"
          ?required=${this.required}
          tabindex="-1"
          @change=${(e: Event) => {
            super._mixinHandleChange(e);
          }}
          .value=${live(this.value)}
          aria-describedby=${this.invalid && this.hasFeedback ? "checkbox-group-feedback" : `${this._controlId}Help`}
        />
        ${this.invalid && this.hasFeedback
          ? html`
              <div class="invalid-feedback-container">
                <slot name="invalidIcon">
                  <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
                </slot>
                <div id="checkbox-group-feedback" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
                </div>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}

export default SgdsCheckboxGroup;

type FormEvent = "reset" | "change" | null;
