import { html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../utils/watch";
import styles from "./sgds-radiogroup.scss";
import SgdsElement from "../utils/sgds-element";
import SgdsRadio from "./sgds-radio";
import { FormSubmitController } from "../utils/form";

@customElement("sgds-radiogroup")
export class SgdsRadioGroup extends SgdsElement {
  static styles = styles;

  protected readonly formSubmitController = new FormSubmitController(this, {
    defaultValue: (control: SgdsRadioGroup) => control.defaultValue,
  });

  @query("slot:not([name])") defaultSlot: HTMLSlotElement;
  @query(".radio-group__validation-input") input: HTMLInputElement;

  @state() private defaultValue = "";

  /**
   * The radio group label. Required for proper accessibility. If you need to display HTML, you can use the `label` slot
   * instead.
   */
  @property() label = "";

  /** The selected value of the control. */
  @property({ reflect: true }) value = "";

  /** The name assigned to the radio controls. */
  @property({ reflect: true }) name = "option";

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * This will be true when the control is in an invalid state.
   */
  @property({ type: Boolean, reflect: true }) invalid = false;

  @property({ type: String, reflect: true }) invalidFeedback =
    "default feedback";

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

  // firstUpdated() {
  //   this.invalid = !this.validity.valid;
  // }

 

  get validity(): ValidityState {
    const hasMissingData = !((this.value && this.required) || !this.required);

    return {
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: hasMissingData ? false : true,
      valueMissing: !hasMissingData,
    };
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity(): boolean {
    const validity = this.validity;

    // this.errorMessage = this.customErrorMessage || validity.valid ? '' : this.input.validationMessage;
    // this.invalid = !this.input.checkValidity();
    this.invalid = !validity.valid;

    if (!validity.valid) {
      this.showNativeErrorMessage();
    }

    return !this.invalid;
  }

  // reportValidity() {
  //   if (!this.input.reportValidity()) {
  //     this.showNativeErrorMessage();
  //     this.invalid = !this.input.reportValidity();
  //   }
  //   return this.input.reportValidity();
  // }

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
    radios.forEach((radio) => (radio.checked = radio === target));
  }

  handleKeyDown(event: KeyboardEvent) {
    if (
      !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(
        event.key
      )
    ) {
      return;
    }

    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
    const incr =
      event.key === " "
        ? 0
        : ["ArrowUp", "ArrowLeft"].includes(event.key)
        ? -1
        : 1;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }

    this.getAllRadios().forEach((radio) => {
      radio.checked = false;
      radio.tabIndex = -1;
      // if (!this.hasButtonGroup) {
      //   radio.tabIndex = -1;
      // }
    });

    this.value = radios[index].value;
    radios[index].checked = true;
    radios[index].tabIndex = 0;
    radios[index].focus();
    // if (!this.hasButtonGroup) {
    //   radios[index].tabIndex = 0;
    //   radios[index].focus();
    // } else {
    //   radios[index].shadowRoot!.querySelector('button')!.focus();
    // }

    event.preventDefault();
  }

  handleLabelClick() {
    const radios = this.getAllRadios();
    const checked = radios.find((radio) => radio.checked);
    const radioToFocus = checked || radios[0];

    // Move focus to the checked radio (or the first one if none are checked) when clicking the label
    if (radioToFocus) {
      radioToFocus.focus();
    }
  }

  // handleSlotChange() {
  //   const radios = this.getAllRadios();

  //   radios.forEach((radio) => (radio.checked = radio.value === this.value));

  // this.hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'sl-radio-button');

  // if (!radios.some((radio) => radio.checked)) {
  //   radios[0].tabIndex = 0;
  // if (this.hasButtonGroup) {
  //   const buttonRadio = radios[0].shadowRoot!.querySelector('button')!;
  //   buttonRadio.tabIndex = 0;
  // } else {
  //   radios[0].tabIndex = 0;
  // }
  // }

  // if (this.hasButtonGroup) {
  //   const buttonGroup = this.shadowRoot?.querySelector('sl-button-group');

  //   if (buttonGroup) {
  //     buttonGroup.disableRole = true;
  //   }
  // }
  // }

  handleInvalid() {
    this.invalid = true;
  }

  showNativeErrorMessage() {
    this.input.hidden = false;
    this.input.reportValidity();
    setTimeout(() => (this.input.hidden = true), 10000);
  }

  updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach((radio) => (radio.checked = radio.value === this.value));
    this.invalid = !this.validity.valid;
  }

  render() {
    const defaultSlot = html`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        role="presentation"
      ></slot>
    `;
    return html`
      <fieldset role="radiogroup">
        <label @click=${this.handleLabelClick}>
          <slot name="label">${this.label}</slot>
        </label>
        ${defaultSlot}
        <input
          type="text"
          class="radio-group__validation-input visually-hidden ${classMap({
            "is-invalid": this.invalid,
          })}"
          ?required=${this.required}
          tabindex="-1"
          @invalid=${this.handleInvalid}
          hidden
        />
        <div class="invalid-feedback">${this.invalidFeedback}</div>
      </fieldset>
    `;
  }
}

export default SgdsRadioGroup;
