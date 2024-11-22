import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { property, query, queryAsync } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import FormControlElement from "../../base/form-control-element";
import formPlaceholderStyles from "../../styles/form-placeholder.css";
import svgStyles from "../../styles/svg.css";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsFormControl } from "../../utils/form";
import { SgdsFormValidatorMixin } from "../../utils/validator";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import SgdsInput from "../Input/sgds-input";
import quantityToggleStyle from "./quantity-toggle.css";
/**
 * @summary The quantity toggle component is used to increase or decrease an incremental venue,  best used when the user needs to enter or adjust the quantity of a selected item.
 *
 * @csspart base - The base wrapper of the quantity toggle component.
 * @csspart button - The plus and minus button of quantity toggle
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 *
 */
export class SgdsQuantityToggle
  extends SgdsFormValidatorMixin(ScopedElementsMixin(FormControlElement))
  implements SgdsFormControl
{
  static styles = [...FormControlElement.styles, formPlaceholderStyles, svgStyles, quantityToggleStyle];

  /** @internal */
  static get scopedElements() {
    return {
      "sgds-input": SgdsInput,
      "sgds-icon-button": SgdsIconButton
    };
  }
  /** @internal */
  @query("sgds-icon-button[ariaLabel^='increase by']") private plusBtn: HTMLButtonElement;
  /** @internal */
  @query("sgds-icon-button[ariaLabel^='decrease by']") private minusBtn: HTMLButtonElement;

  /** Controls the size of the quantity toggle */
  @property() size: "sm" | "md" = "md";

  /** The input's value. Set to 0 by default */
  @property({ type: Number, reflect: true }) value = 0;

  /** The quantity toggle's button variants */
  @property({ type: String }) iconButtonVariant = "ghost";

  /**  Controls the incremental / decremental value of the input */
  @property({ type: Number }) step = 1;

  /** The input's minimum value. Only applies number input types. */
  @property() min: number;

  /** The input's maximum value. Only applies number input types. */
  @property() max: number;
  /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
  @property({ type: String, reflect: true }) hasFeedback: "style" | "text" | "both";

  /**Feedback text for error state when validated */
  @property({ type: String, reflect: true }) invalidFeedback: string;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = 0;

  @queryAsync("sgds-input") private _sgdsInput: Promise<SgdsInput>;

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

  private async _handleChange() {
    const sgdsInput = await this._sgdsInput;
    if (parseInt(sgdsInput.value) < this.step || sgdsInput.value === "") {
      sgdsInput.value = "0";
    }
    this.value = parseInt(sgdsInput.value);
    this._mixinSetFormValue();
    this._mixinValidate(sgdsInput.input);
    this.invalid = !this._mixinReportValidity();
  }
  private async _handleInputChange() {
    const sgdsInput = await this._sgdsInput;
    this.invalid = false;
    if (parseInt(sgdsInput.value) < this.step || sgdsInput.value === "") {
      sgdsInput.value = "0";
    }
    this.value = parseInt(sgdsInput.value);
    this._mixinSetFormValue();
    this._mixinValidate(sgdsInput.input);
  }

  private async _mixinResetFormControl() {
    const sgdsInput = await this._sgdsInput;
    this.value = this.defaultValue;
    sgdsInput.input.value = this.value.toString();
    this._mixinResetValidity(sgdsInput.input);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      "Backspace",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      ...Array.from(Array(10).keys()).map(key => key.toString()),
      "Tab"
    ];

    // Allow keydown event only if the pressed key is in the allowedKeys array
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  private _handleInvalid() {
    this.invalid = true;
  }
  private _handleValid() {
    this.invalid = false;
  }

  /** Simulates a click on the plus button */
  public plus() {
    this.plusBtn.click();
  }

  /** Simulates a click on the minus button */
  public minus() {
    this.minusBtn.click();
  }

  private async _onPlus(event: MouseEvent) {
    const sgdsInput = await this._sgdsInput;
    event.preventDefault();
    event.stopPropagation();
    this.value = parseInt(sgdsInput.value) + parseInt(sgdsInput.step.toString());
    this._validateOnClick(sgdsInput.input);
  }
  private async _onMinus(event: MouseEvent) {
    const sgdsInput = await this._sgdsInput;
    event.preventDefault();
    event.stopPropagation();
    if (this.value < this.step) {
      this.value = 0;
    } else {
      this.value = parseInt(sgdsInput.value) - parseInt(sgdsInput.step.toString());
    }

    this._validateOnClick(sgdsInput.input);
  }

  /**
   * Validates the input on button clicks of the toggle.
   * Input is validated every time the button is click to update the invalid state
   * to indiciate the validity of quantity toggle
   * @param input native HTMLInputElement
   */
  private async _validateOnClick(input: HTMLInputElement) {
    const sgdsInput = await this._sgdsInput;
    await sgdsInput.updateComplete;
    this._mixinSetFormValue();
    this._mixinValidate(input);
    this.invalid = !this._mixinReportValidity();
  }

  protected _renderFeedback() {
    const wantFeedbackText = this.hasFeedback === "both" || this.hasFeedback === "text";
    return this.invalid && wantFeedbackText
      ? html` <div class="invalid-feedback-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
              fill="#B90000"
            />
          </svg>
          <div id="${this._controlId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.validationMessage}
          </div>
        </div>`
      : html`${this._renderHintText()}`;
  }

  protected _renderLabel() {
    const labelTemplate = html`
      <label
        for=${this._controlId}
        id=${this._labelId}
        class=${classMap({
          "form-label": true,
          required: this.required,
          disabled: this.disabled
        })}
        >${this.label}</label
      >
    `;
    return this.label && labelTemplate;
  }

  protected _renderHintText() {
    const hintTextTemplate = html` <div id="${this._controlId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  render() {
    return html`
      <div class="form-control-container">
        ${this._renderLabel()}
        <div part="base" class="input-group" variant="quantity-toggle">
          <sgds-icon-button
            variant=${this.iconButtonVariant}
            ariaLabel=${`decrease by ${this.step}`}
            part="button"
            ?disabled=${this.disabled || (this.min !== undefined ? this.value <= this.min : this.value < 1)}
            @click=${this._onMinus}
          ></sgds-icon-button>
          <sgds-input
            type="number"
            class="quantity-toggle"
            name=${ifDefined(this.name)}
            step=${ifDefined(this.step)}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            .value=${live(this.value)}
            @sgds-change=${this._handleChange}
            @sgds-input=${this._handleInputChange}
            @sgds-invalid=${this._handleInvalid}
            @sgds-valid=${this._handleValid}
            @keydown=${this._handleKeyDown}
            ?disabled=${this.disabled}
            id=${this._controlId}
            ?invalid=${this.invalid}
            hasFeedback=${ifDefined(this.hasFeedback !== "text" ? "style" : undefined)}
          ></sgds-input>
          <sgds-icon-button
            variant=${this.iconButtonVariant}
            ariaLabel=${`increase by ${this.step}`}
            part="button"
            @click=${this._onPlus}
            ?disabled=${this.disabled || (this.max !== undefined && this.max && this.value >= this.max)}
          ></sgds-icon-button>
        </div>
        <div id="announcer" role="region" aria-live="assertive" class="visually-hidden">${this.value}</div>
        ${this._renderFeedback()}
      </div>
    `;
  }
}

export default SgdsQuantityToggle;
