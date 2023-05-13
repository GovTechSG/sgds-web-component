import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { FormSubmitController } from "../../utils/form";
import { watch } from "../../utils/watch";
import SgdsRadio from "./sgds-radio";
import styles from "./sgds-radio-group.scss";
import { SgdsFormControl } from "../../utils/form"

/**
 * @summary test
 */
@customElement("sgds-radio-group")
export class SgdsRadioGroup extends SgdsElement implements SgdsFormControl {
  static styles = [SgdsElement.styles, styles];
  /**@internal */
  protected readonly formSubmitController = new FormSubmitController(this, {
    defaultValue: (control: SgdsRadioGroup) => control.defaultValue
  });
  /**@internal */
  @query("slot:not([name])") defaultSlot: HTMLSlotElement;
  /**@internal */
  @query(".radio-group__validation-input") input: HTMLInputElement;
  /**@internal */
  @state() defaultValue = "";
  /**@internal */
  @state() private customErrorMessage = "";
  /** @internal This will be true when the control is in an invalid state. */
  @state() invalid = false;

  /** The selected value of the control. */
  @property({ reflect: true }) value = "";

  /** The name assigned to the radio controls. */
  @property({ reflect: true }) name = "option";

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";
  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;
  

  @watch("value")
  handleValueChange() {
    if (this.hasUpdated) {
      this.emit("sgds-change");
      this.updateCheckedRadio();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  /** Gets the validity state object */
  get validity(): ValidityState {
    const hasMissingData = !((this.value && this.required) || !this.required);
    const hasCustomError = this.customErrorMessage !== "";
    return {
      badInput: false,
      customError: hasCustomError,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: hasMissingData ? false : true,
      valueMissing: !hasMissingData
    };
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  public reportValidity(): boolean {
    const validity = this.validity;

    // this.errorMessage = this.customErrorMessage || validity.valid ? '' : this.input.validationMessage;
    // this.invalid = !this.input.checkValidity();
    this.invalid = !validity.valid;

    if (!validity.valid) {
      this.showNativeErrorMessage();
    }

    return !this.invalid;
  }

  private getAllRadios() {
    return [...this.querySelectorAll<SgdsRadio>("sgds-radio")];
  }

  handleRadioClick(event: MouseEvent) {
    const target = event.target as SgdsRadio;

    if (target.disabled) {
      return;
    }

    this.value = target.value;
    const radios = this.getAllRadios();
    radios.forEach(radio => (radio.checked = radio === target));
  }

  handleKeyDown(event: KeyboardEvent) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
      return;
    }

    const radios = this.getAllRadios().filter(radio => !radio.disabled);
    const checkedRadio = radios.find(radio => radio.checked) ?? radios[0];
    //if eventkey is space, index increment is 0, if eventkey arrowup/arrowleft, index is -1, arrowright/arrowdown, index incr is 1
    const incr = event.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }

    this.getAllRadios().forEach(radio => {
      radio.checked = false;
      radio.tabIndex = -1;
    });

    this.value = radios[index].value;
    radios[index].checked = true;
    radios[index].tabIndex = 0;
    radios[index].focus();

    event.preventDefault();
  }

  handleLabelClick() {
    const radios = this.getAllRadios();
    const checked = radios.find(radio => radio.checked);
    const radioToFocus = checked || radios[0];

    // Move focus to the checked radio (or the first one if none are checked) when clicking the label
    if (radioToFocus) {
      radioToFocus.focus();
    }
  }

  handleSlotChange() {
    const radios = this.getAllRadios();

    radios.forEach(radio => (radio.checked = radio.value === this.value));

    if (!radios.some(radio => radio.checked)) {
      if (radios[0]) radios[0].tabIndex = 0;
    }
  }

  handleInvalid(e: Event) {
    e.preventDefault()
    this.invalid = true;
  }

  showNativeErrorMessage() {
    this.input.hidden = false;
    this.input.reportValidity();
    setTimeout(() => (this.input.hidden = true), 10000);
  }

  updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach(radio => (radio.checked = radio.value === this.value));
    this.invalid = !this.validity.valid;
  }

  render() {
    const defaultSlot = html`
      <div>
        <slot
          @click=${this.handleRadioClick}
          @keydown=${this.handleKeyDown}
          @slotchange=${this.handleSlotChange}
          role="presentation"
        ></slot>
      </div>
    `;
    return html`
      <fieldset role="radio-group" name=${this.name}>
        <label @click=${this.handleLabelClick} class="form-label">
          <slot name="label"></slot>
        </label>
        ${defaultSlot}
        <input
          type="text"
          class="radio-group__validation-input visually-hidden ${classMap({
            "is-invalid": this.hasFeedback && this.invalid
          })}"
          ?required=${this.required}
          tabindex="-1"
          @invalid=${(e: Event) => this.handleInvalid(e)}
          hidden
        />
        ${this.hasFeedback
        ? html`<div class="invalid-feedback">${this.invalidFeedback}</div>`
        : ""}
        
      </fieldset>
    `;
  }
}

export default SgdsRadioGroup;
