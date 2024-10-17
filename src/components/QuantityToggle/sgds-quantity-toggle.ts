import { property, query, queryAsync } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import FormControlElement from "../../base/form-control-element";
import svgStyles from "../../styles/svg.css";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsFormControl } from "../../utils/form";
import genId from "../../utils/generateId";
import { InputValidationController } from "../../utils/inputValidationController";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import SgdsInput from "../Input/sgds-input";
import quantityToggleStyle from "./quantity-toggle.css";
import { watch } from "../../utils/watch";
import { live } from "lit/directives/live.js";
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
export class SgdsQuantityToggle extends FormControlElement implements SgdsFormControl {
  static styles = [...FormControlElement.styles, svgStyles, quantityToggleStyle];
  static formAssociated = true;
  protected inputValidationController = new InputValidationController(this);

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

  /** Disables the entire quantity toggle  */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The quantity toggle's button variants */
  @property({ type: String }) iconButtonVariant = "ghost";

  /**  Controls the incremental / decremental value of the input */
  @property({ type: Number }) step = 1;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = 0;

  @queryAsync("sgds-input") sgdsInput: Promise<SgdsInput>;

  @query("sgds-input") inputEl: HTMLInputElement;

  // /** @internal The id forwarded to input element */
  private inputId: string = genId("quantity-toggle", "input");
  protected labelId: string = genId("label");

  protected async _handleChange(e: Event) {
    const sgdsInput = await this.sgdsInput;
    if (parseInt(sgdsInput.value) < this.step || sgdsInput.value === "") {
      sgdsInput.value = "0";
    }
    this.value = parseInt(sgdsInput.value);
    this.inputValidationController.validateInput(sgdsInput.sgdsInput);
  }
  protected async _handleInputChange() {
    const sgdsInput = await this.sgdsInput;

    if (parseInt(sgdsInput.value) < this.step || sgdsInput.value === "") {
      sgdsInput.value = "0";
    }
    this.value = parseInt(sgdsInput.value);
    this.inputValidationController.handleInput();
    this.inputValidationController.validateInput(sgdsInput.sgdsInput);
  }
  async firstUpdated() {
    const sgdsInput = await this.sgdsInput;
    this.addEventListener("focus", () => sgdsInput.focus());

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    // validate input on first load
    this.inputValidationController.validateInput(sgdsInput);
  }
  get validity() {
    return this.inputValidationController.validity;
  }
  get validationMessage() {
    return this.inputValidationController.validationMessage;
  }

  get willValidate() {
    return this.inputValidationController.willValidate;
  }
  checkValidity() {
    return this.inputValidationController.checkValidity();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.inputValidationController.reportValidity();
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

  private _handleInvalidChange() {
    this.invalid = true;
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
    const sgdsInput = await this.sgdsInput;
    event.preventDefault();
    event.stopPropagation();
    this.value = parseInt(sgdsInput.value) + parseInt(sgdsInput.step.toString());
  }

  private async _onMinus(event: MouseEvent) {
    const sgdsInput = await this.sgdsInput;
    event.preventDefault();
    event.stopPropagation();
    if (this.value < this.step) {
      this.value = 0;
    } else {
      this.value = parseInt(sgdsInput.value) - parseInt(sgdsInput.step.toString());
    }
  }

  protected _renderFeedback() {
    return this.invalid && this.hasFeedback
      ? html` <div class="invalid-feedback-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
              fill="#B90000"
            />
          </svg>
          <div id="${this.inputId}-invalid" class="invalid-feedback">
            ${this.invalidFeedback ? this.invalidFeedback : this.inputEl.validationMessage}
          </div>
        </div>`
      : html`${this._renderHintText()}`;
  }

  protected _renderLabel() {
    const labelTemplate = html`
      <label
        for=${this.inputId}
        id=${this.labelId}
        class=${classMap({
          "form-label": true
        })}
        >${this.label}</label
      >
    `;
    return this.label && labelTemplate;
  }
  protected _renderHintText() {
    const hintTextTemplate = html` <div id="${this.inputId}Help" class="form-text">${this.hintText}</div> `;
    return this.hintText && hintTextTemplate;
  }

  render() {
    return html`
      <div class="form-control-container">
        ${this._renderLabel()}
        <div
          part="base"
          class="${classMap({
            disabled: this.disabled,
            "input-group": true,
            [`input-group-${this.size}`]: this.size
          })}"
          variant="quantity-toggle"
          size=${this.size}
        >
          <sgds-icon-button
            variant=${this.iconButtonVariant}
            ariaLabel=${`decrease by ${this.step}`}
            part="button"
            ?disabled=${this.disabled || (this.min !== undefined ? this.value <= this.min : this.value < 1)}
            @click=${this._onMinus}
          ></sgds-icon-button>
          <sgds-input
            type="number"
            class="quantity-toggle test-input"
            name=${ifDefined(this.name)}
            step=${ifDefined(this.step)}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            value=${live(this.value)}
            @sgds-change=${e => this._handleChange(e)}
            @sgds-input=${this._handleInputChange}
            @sgds-invalid=${this._handleInvalidChange}
            @keydown=${this._handleKeyDown}
            ?disabled=${this.disabled}
            id=${this.inputId}
            ?invalid=${this.invalid}
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
