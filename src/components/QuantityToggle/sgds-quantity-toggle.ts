import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { FormSubmitController, SgdsFormControl } from "../../utils/form";
import genId from "../../utils/generateId";
import { ButtonVariant } from "../Button/sgds-button";
import styles from "./sgds-quantity-toggle.scss";

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
export class SgdsQuantityToggle extends SgdsElement implements SgdsFormControl {
  /**@internal */
  @query("input.form-control") private input: HTMLInputElement;
  /**@internal */
  @query("button[aria-label^='increase by']") private plusBtn: HTMLButtonElement;
  /**@internal */
  @query("button[aria-label^='decrease by']") private minusBtn: HTMLButtonElement;

  static styles = [SgdsElement.styles, styles];
  /**@internal */
  private readonly formSubmitController = new FormSubmitController(this);

  /** The name of the input */
  @property({ reflect: true }) name: string;

  /** The input's minimum value. */
  @property({ type: Number, reflect: true }) min: number;
  /** The input's maximum value. */
  @property({ type: Number, reflect: true }) max: number;

  /**Controls the size of the quantity toggle */
  @property() size: "sm" | "lg" = "sm";

  /**The input's value. Set to 0 by default */
  @property({ reflect: true, type: Number }) value = 0;

  /** Disables the entire quantity toggle  */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The quantity toggle's button variants */
  @property({ type: String, reflect: true }) buttonVariant: ButtonVariant = "primary";

  /**
   * Controls the incremental / decremental value of the input
   */
  @property({ type: Number, reflect: true }) step = 1;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = 0;

  /** @internal The id forwarded to input element */
  private inputId: string = genId("quantity-toggle", "input");

  handleChange(event: string) {
    if (parseInt(this.input.value) < this.step || this.input.value === "") {
      this.input.value = "0";
    }
    this.value = parseInt(this.input.value);
    this.emit(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      "Backspace",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      ...Array.from(Array(10).keys()).map(key => key.toString())
    ];

    // Allow keydown event only if the pressed key is in the allowedKeys array
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  /** Simulates a click on the plus button */
  public plus() {
    this.plusBtn.click();
  }

  /** Simulates a click on the minus button */
  public minus() {
    this.minusBtn.click();
  }

  onPlus(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.value = parseInt(this.input.value) + parseInt(this.input.step);
  }

  onMinus(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.value < this.step) {
      this.value = 0;
    } else {
      this.value = parseInt(this.input.value) - parseInt(this.input.step);
    }
  }
  render() {
    return html`
      <div
        part="base"
        class="${classMap({
          sgds: true,
          disabled: this.disabled,
          "input-group": true,
          [`input-group-${this.size}`]: this.size
        })}"
        variant="quantity-toggle"
        size=${this.size}
      >
        <button
          aria-label=${`decrease by ${this.step}`}
          part="button"
          class=${classMap({
            sgds: true,
            btn: true,
            [`btn-${this.buttonVariant}`]: this.buttonVariant
          })}
          @click=${this.onMinus}
          ?disabled=${this.disabled || (this.min !== undefined ? this.value <= this.min : this.value < 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash"
            viewBox="0 0 16 16"
          >
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
        </button>
        <input
          type="number"
          class="form-control ${"form-control-" + this.size} text-center"
          name=${ifDefined(this.name)}
          step=${ifDefined(this.step)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          .value=${live(this.value.toString())}
          @change=${() => this.handleChange("sgds-change")}
          @input=${() => this.handleChange("sgds-input")}
          @keydown=${this.handleKeyDown}
          ?disabled=${this.disabled}
          id=${this.inputId}
          aria-label="quantity"
        />
        <button
          aria-label=${`increase by ${this.step}`}
          part="button"
          class=${classMap({
            sgds: true,
            btn: true,
            [`btn-${this.buttonVariant}`]: this.buttonVariant
          })}
          @click=${this.onPlus}
          ?disabled=${this.disabled || (this.max !== undefined && this.value >= this.max)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
        <div id="announcer" role="region" aria-live="assertive" class="visually-hidden">${this.value}</div>
      </div>
    `;
  }
}

export default SgdsQuantityToggle;
