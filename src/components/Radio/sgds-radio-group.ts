import { html, nothing } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import feedbackStyles from "../../styles/feedback.css";
import formHintStyles from "../../styles/form-hint.css";
import formLabelStyles from "../../styles/form-label.css";
import { SgdsFormValidatorMixin } from "../../utils/validator";
import { watch } from "../../utils/watch";
import radioGroupStyles from "./radio-group.css";
import SgdsRadio from "./sgds-radio";
import { live } from "lit/directives/live.js";

/**
 * @summary RadioGroup group multiple radios so they function as a single form control.
 *
 * @slot default - The default slot where sgds-radio are placed.
 *
 * @event sgds-change - Emitted when the radio group's selected value changes.
 *
 *
 */
export class SgdsRadioGroup extends SgdsFormValidatorMixin(SgdsElement) {
  static styles = [...SgdsElement.styles, feedbackStyles, formLabelStyles, radioGroupStyles, formHintStyles];

  /**@internal */
  @query("slot:not([name])") defaultSlot: HTMLSlotElement;

  /**@internal */
  @state() defaultValue = "";

  /** The radio group's label  */
  @property({ reflect: true }) label = "";

  /**  This will be true when the control is in an invalid state. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /** The selected value of the control. */
  @property({ reflect: true }) value = "";

  /** The name assigned to the radio controls. */
  @property({ reflect: true }) name: string;

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** The radio group's hint text */
  @property({ reflect: true }) hintText = "";

  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this.emit("sgds-change", { detail: { value: this.value } });
    this._updateCheckedRadio();
  }
  @watch("invalid", { waitUntilFirstUpdate: true })
  _handleInvalidChange() {
    this._radios.forEach(r => (r.invalid = this.invalid));
  }

  @state() private _isTouched = false;
  /**
   * radio requries a custom resetFormControl as the update of input value
   * requires to fire a reset event manually
   * */
  private resetFormControl() {
    this.value = this.input.value = this.defaultValue;
    this._updateInputValue("reset");
    this.resetValidity(this.input);
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
    this.addEventListener("sgds-blur", () => {
      this._isTouched = true;
    });
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
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
    if (this.value) {
      this._updateInputValue("change");
    }
  }

  @queryAssignedElements()
  private _radios!: Array<SgdsRadio>;

  private _handleRadioClick(event: MouseEvent) {
    event.preventDefault();
    const target = event.target as SgdsRadio;

    if (target.disabled) {
      return;
    }

    this.value = target.value;

    this._updateInputValue();

    const radios = this._radios;

    radios.forEach(radio => {
      return (radio.checked = radio === target);
    });
  }
  /**
   * when input value is set programatically, need to manually dispatch a change event
   * In order to prevent race conditions and ensure sequence of events, set input's value here instead of binding to value prop of input
   */
  private _updateInputValue(eventName = "change") {
    this.input.value = this.value;
    this.input.dispatchEvent(new InputEvent(eventName));
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
    this._updateInputValue();
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

  private _updateCheckedRadio() {
    const radios = this._radios;
    radios.forEach(radio => (radio.checked = radio.value === this.value));
  }

  private _renderHintText() {
    const hintTextTemplate = html` <div class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  public reportValidity(): boolean {
    return this.inputValidationController.reportValidity();
  }

  @watch("_isTouched", { waitUntilFirstUpdate: true })
  _handleIsTouched() {
    if (this._isTouched) {
      this.invalid = !this.input.checkValidity();
    }
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
        <div class="label-hint-container">
          <label
            class=${classMap({
              "form-label": true,
              required: this.required
            })}
          >
            ${this.label}
          </label>
          ${this._renderHintText()}
        </div>
        ${defaultSlot}
        <input
          type="text"
          class="radio-group-validation-input ${classMap({
            "is-invalid": this.hasFeedback && this.invalid
          })}"
          ?required=${this.required}
          tabindex="-1"
          @change=${(e: Event) => super.handleChange(e)}
          .value=${live(this.value)}
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
                <div id="radio-group-feedback" tabindex="0" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
                </div>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}

export default SgdsRadioGroup;
