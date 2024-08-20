import { __decorate } from "tslib";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { FormSubmitController } from "../../utils/form";
import genId from "../../utils/generateId";
import SgdsButton from "../Button/sgds-button";
import quantityToggleStyle from "./quantity-toggle.css";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import SgdsInput from "../Input/sgds-input";
import svgStyles from "../../styles/svg.css";
/**
 * @summary The quantity toggle component is used to increase or decrease an incremental venue,  best used when the user needs to enter or adjust the quantity of a selected item.
 *
 * @csspart base - The base wrapper of the quantity toggle component.
 * @csspart button - The plus and minus button of quantity toggle
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 *
 * @cssprop --sgds-qt-border-radius - The border radius of the four ends of the quantity toggle
 */
export class SgdsQuantityToggle extends ScopedElementsMixin(SgdsElement) {
    constructor() {
        super(...arguments);
        /**@internal */
        this.formSubmitController = new FormSubmitController(this);
        /**Controls the size of the quantity toggle */
        this.size = "md";
        /**The input's value. Set to 0 by default */
        this.value = 0;
        /** Disables the entire quantity toggle  */
        this.disabled = false;
        /** The quantity toggle's button variants */
        this.buttonVariant = "primary";
        /**
         * Controls the incremental / decremental value of the input
         */
        this.step = 1;
        /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
        this.defaultValue = 0;
        /** @internal The id forwarded to input element */
        this.inputId = genId("quantity-toggle", "input");
    }
    /**@internal */
    static get scopedElements() {
        return {
            "sgds-button": SgdsButton,
            "sgds-input": SgdsInput
        };
    }
    _handleChange() {
        if (parseInt(this.input.value) < this.step || this.input.value === "") {
            this.input.value = "0";
        }
        this.value = parseInt(this.input.value);
    }
    _handleKeyDown(event) {
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
    /** Simulates a click on the plus button */
    plus() {
        this.plusBtn.click();
    }
    /** Simulates a click on the minus button */
    minus() {
        this.minusBtn.click();
    }
    _onPlus(event) {
        event.preventDefault();
        event.stopPropagation();
        this.value = parseInt(this.input.value) + parseInt(this.input.step);
    }
    _onMinus(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.value < this.step) {
            this.value = 0;
        }
        else {
            this.value = parseInt(this.input.value) - parseInt(this.input.step);
        }
    }
    render() {
        return html `
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
        <sgds-button
          variant=${this.buttonVariant}
          ariaLabel=${`decrease by ${this.step}`}
          part="button"
          @click=${this._onMinus}
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
        </sgds-button>
        <sgds-input
          type="number"
          class="quantity-toggle"
          name=${ifDefined(this.name)}
          step=${ifDefined(this.step)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          .value=${live(this.value.toString())}
          @sgds-change=${() => this._handleChange()}
          @sgds-input=${() => this._handleChange()}
          @keydown=${this._handleKeyDown}
          ?disabled=${this.disabled}
          id=${this.inputId}
        ></sgds-input>
        <sgds-button
          variant=${this.buttonVariant}
          ariaLabel=${`increase by ${this.step}`}
          part="button"
          @click=${this._onPlus}
          ?disabled=${this.disabled || (this.max !== undefined && this.max && this.value >= this.max)}
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
        </sgds-button>
      </div>
      <div id="announcer" role="region" aria-live="assertive" class="visually-hidden">${this.value}</div>
    `;
    }
}
SgdsQuantityToggle.styles = [...SgdsElement.styles, svgStyles, quantityToggleStyle];
__decorate([
    query("sgds-input")
], SgdsQuantityToggle.prototype, "input", void 0);
__decorate([
    query("sgds-button[ariaLabel^='increase by']")
], SgdsQuantityToggle.prototype, "plusBtn", void 0);
__decorate([
    query("sgds-button[ariaLabel^='decrease by']")
], SgdsQuantityToggle.prototype, "minusBtn", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsQuantityToggle.prototype, "name", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsQuantityToggle.prototype, "min", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsQuantityToggle.prototype, "max", void 0);
__decorate([
    property()
], SgdsQuantityToggle.prototype, "size", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsQuantityToggle.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsQuantityToggle.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], SgdsQuantityToggle.prototype, "buttonVariant", void 0);
__decorate([
    property({ type: Number })
], SgdsQuantityToggle.prototype, "step", void 0);
__decorate([
    defaultValue()
], SgdsQuantityToggle.prototype, "defaultValue", void 0);
export default SgdsQuantityToggle;
//# sourceMappingURL=sgds-quantity-toggle.js.map