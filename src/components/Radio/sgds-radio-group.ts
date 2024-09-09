import { html, nothing } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { FormSubmitController } from "../../utils/form";
import { watch } from "../../utils/watch";
import radioGroupStyles from "./radio-group.css";
import SgdsRadio from "./sgds-radio";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";

/**
 * @summary RadioGroup group multiple radios so they function as a single form control.
 *
 * @slot default - The default slot where sgds-radio are placed.
 *
 * @event sgds-change - Emitted when the radio group's selected value changes.
 *
 *
 */
export class SgdsRadioGroup extends SgdsElement {
  static styles = [...SgdsElement.styles, feedbackStyles, formLabelStyles, radioGroupStyles];
  /**@internal */
  protected readonly formSubmitController = new FormSubmitController(this, {
    defaultValue: (control: SgdsRadioGroup) => control.defaultValue
  });
  /**@internal */
  @query("slot:not([name])") defaultSlot: HTMLSlotElement;
  /**@internal */
  @query(".radio-group-validation-input") input: HTMLInputElement;
  /**@internal */
  @state() defaultValue = "";
  /**@internal */
  @state() private customErrorMessage = "";
  /**  This will be true when the control is in an invalid state. */
  @property({ type: Boolean, reflect: true }) invalid = false;

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

  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this.emit("sgds-change", { detail: { value: this.value } });
    this._updateCheckedRadio();
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  firstUpdated() {
    const radios = this._radios;
    radios.forEach((item, index) => {
      if (radios.length > 1) {
        switch (index) {
          case 0:
            item.setAttribute("first-of-type", "");
            break;

          case radios.length - 1:
            item.setAttribute("last-of-type", "");
            break;

          default:
            item.setAttribute("nth-of-type", "");
        }
      }
    });
  }

  /** Gets and return the ValidityState object.  */
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

    this.invalid = !validity.valid;

    if (!validity.valid) {
      this._showNativeErrorMessage();
    }

    return !this.invalid;
  }
  /**@internal */
  @queryAssignedElements()
  private _radios!: Array<SgdsRadio>;

  private _handleRadioClick(event: MouseEvent) {
    event.preventDefault();
    const target = event.target as SgdsRadio;

    if (target.disabled) {
      return;
    }

    this.value = target.value;
    const radios = this._radios;

    radios.forEach(radio => {
      return (radio.checked = radio === target);
    });
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
      return;
    }

    const radios = this._radios.filter(radio => !radio.disabled);
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

    this._radios.forEach(radio => {
      radio.checked = false;
      radio.tabIndex = -1;
    });

    this.value = radios[index].value;
    radios[index].checked = true;
    radios[index].tabIndex = 0;
    // preventDefault at the end to allow Tab
    event.preventDefault();
  }

  private _handleSlotChange() {
    const radios = this._radios;

    radios.forEach(radio => (radio.checked = radio.value === this.value));

    if (!radios.some(radio => radio.checked)) {
      if (radios[0]) radios[0].tabIndex = 0;
    }
  }

  private _handleInvalid(e: Event) {
    e.preventDefault();
    this.invalid = true;
    this._radios.forEach(radio => (radio.invalid = true));
  }

  private _showNativeErrorMessage() {
    this.input.reportValidity();
  }

  private _updateCheckedRadio() {
    const radios = this._radios;
    radios.forEach(radio => (radio.checked = radio.value === this.value));
    this.invalid = !this.validity.valid;
    this._radios.forEach(radio => (radio.invalid = this.invalid));
  }

  render() {
    const defaultSlot = html`
      <slot
        class="radio-container"
        @click=${this._handleRadioClick}
        @keydown=${this._handleKeyDown}
        @slotchange=${this._handleSlotChange}
        role="presentation"
      ></slot>
    `;
    return html`
      <fieldset name=${this.name}>
        <label
          class=${classMap({
            "form-label": true,
            required: this.required
          })}
        >
          <slot name="label"></slot>
        </label>
        ${defaultSlot}
        <input
          type="text"
          class="radio-group-validation-input ${classMap({
            "is-invalid": this.hasFeedback && this.invalid
          })}"
          ?required=${this.required}
          tabindex="-1"
          @invalid=${(e: Event) => this._handleInvalid(e)}
        />
        ${this.invalid && this.hasFeedback
          ? html`
              <div class="invalid-feedback-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                    fill="#B90000"
                  />
                </svg>
                <div id="radio-group-feedback" tabindex="0" class="invalid-feedback">${this.invalidFeedback}</div>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}

export default SgdsRadioGroup;
