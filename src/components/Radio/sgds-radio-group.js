import { __decorate } from "tslib";
import { html } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { FormSubmitController } from "../../utils/form";
import { watch } from "../../utils/watch";
import radioGroupStyles from "./radio-group.css";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
/**
 * @summary RadioGroup group multiple radios so they function as a single form control.
 *
 * @slot default - The default slot where sgds-radio are placed.
 *
 * @event sgds-change - Emitted when the radio group's selected value changes.
 *
 * @cssprop --sgds-radio-group-gap - Sets the gap between radio group's label, sgds-radio and invalid feedback message
 * @cssprop --sgds-form-label-font-weight - Sets the font weight of the radio group's label
 * @cssprop --sgds-form-label-color - Sets the text color of the radio group's label
 *
 */
export class SgdsRadioGroup extends SgdsElement {
    constructor() {
        super(...arguments);
        /**@internal */
        this.formSubmitController = new FormSubmitController(this, {
            defaultValue: (control) => control.defaultValue
        });
        /**@internal */
        this.defaultValue = "";
        /**@internal */
        this.customErrorMessage = "";
        /**  This will be true when the control is in an invalid state. */
        this.invalid = false;
        /** The selected value of the control. */
        this.value = "";
        /** The name assigned to the radio controls. */
        this.name = "option";
        /** Ensures a child radio is checked before allowing the containing form to submit. */
        this.required = false;
        /**Feedback text for error state when validated */
        this.invalidFeedback = "";
        /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
        this.hasFeedback = false;
    }
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
    get validity() {
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
    reportValidity() {
        const validity = this.validity;
        this.invalid = !validity.valid;
        if (!validity.valid) {
            this._showNativeErrorMessage();
        }
        return !this.invalid;
    }
    _handleRadioClick(event) {
        const target = event.target;
        if (target.disabled) {
            return;
        }
        this.value = target.value;
        const radios = this._radios;
        radios.forEach(radio => (radio.checked = radio === target));
    }
    _handleKeyDown(event) {
        var _a;
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
            return;
        }
        const radios = this._radios.filter(radio => !radio.disabled);
        const checkedRadio = (_a = radios.find(radio => radio.checked)) !== null && _a !== void 0 ? _a : radios[0];
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
        radios[index].focus();
        event.preventDefault();
    }
    _handleLabelClick() {
        const radios = this._radios;
        const checked = radios.find(radio => radio.checked);
        const radioToFocus = checked || radios[0];
        // Move focus to the checked radio (or the first one if none are checked) when clicking the label
        if (radioToFocus) {
            radioToFocus.focus();
        }
    }
    _handleSlotChange() {
        const radios = this._radios;
        radios.forEach(radio => (radio.checked = radio.value === this.value));
        if (!radios.some(radio => radio.checked)) {
            if (radios[0])
                radios[0].tabIndex = 0;
        }
    }
    _handleInvalid(e) {
        e.preventDefault();
        this.invalid = true;
        this._radios.forEach(radio => (radio.invalid = true));
    }
    _showNativeErrorMessage() {
        this.input.reportValidity();
    }
    _updateCheckedRadio() {
        const radios = this._radios;
        radios.forEach(radio => (radio.checked = radio.value === this.value));
        this.invalid = !this.validity.valid;
        this._radios.forEach(radio => (radio.invalid = this.invalid));
    }
    render() {
        const defaultSlot = html `
      <div>
        <slot
          @click=${this._handleRadioClick}
          @keydown=${this._handleKeyDown}
          @slotchange=${this._handleSlotChange}
          role="presentation"
        ></slot>
      </div>
    `;
        return html `
      <fieldset name=${this.name}>
        <label
          @click=${this._handleLabelClick}
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
          @invalid=${(e) => this._handleInvalid(e)}
        />
        ${this.hasFeedback ? html `<div class="invalid-feedback">${this.invalidFeedback}</div>` : ""}
      </fieldset>
    `;
    }
}
SgdsRadioGroup.styles = [...SgdsElement.styles, feedbackStyles, formLabelStyles, radioGroupStyles];
__decorate([
    query("slot:not([name])")
], SgdsRadioGroup.prototype, "defaultSlot", void 0);
__decorate([
    query(".radio-group-validation-input")
], SgdsRadioGroup.prototype, "input", void 0);
__decorate([
    state()
], SgdsRadioGroup.prototype, "defaultValue", void 0);
__decorate([
    state()
], SgdsRadioGroup.prototype, "customErrorMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadioGroup.prototype, "invalid", void 0);
__decorate([
    property({ reflect: true })
], SgdsRadioGroup.prototype, "value", void 0);
__decorate([
    property({ reflect: true })
], SgdsRadioGroup.prototype, "name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadioGroup.prototype, "required", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsRadioGroup.prototype, "invalidFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadioGroup.prototype, "hasFeedback", void 0);
__decorate([
    watch("value", { waitUntilFirstUpdate: true })
], SgdsRadioGroup.prototype, "_handleValueChange", null);
__decorate([
    queryAssignedElements()
], SgdsRadioGroup.prototype, "_radios", void 0);
export default SgdsRadioGroup;
//# sourceMappingURL=sgds-radio-group.js.map