import { __decorate } from "tslib";
import { property, query } from "lit/decorators.js";
import { defaultValue } from "../utils/defaultvalue";
import { FormSubmitController } from "../utils/form";
import { watch } from "../utils/watch";
import SgdsElement from "./sgds-element";
import { classMap } from "lit/directives/class-map.js";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
export class FormCheckElement extends SgdsElement {
    constructor() {
        super(...arguments);
        /**@internal */
        this.formSubmitController = new FormSubmitController(this, {
            value: (control) => (control.checked ? control.value : undefined),
            defaultValue: (control) => control.defaultChecked,
            setValue: (control, checked) => (control.checked = checked)
        });
        /** For aria-label when there is no appropriate text label visible */
        this.ariaLabel = "checkbox";
        /** Makes the checkbox a required field. */
        this.required = false;
        /** Draws the checkbox in a checked state. */
        this.checked = false;
        /** Disables the checkbox (so the user can't check / uncheck it). */
        this.disabled = false;
        /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
        this.hasFeedback = false;
        /** Aligns the checkbox horizontally */
        this.isInline = false;
        /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
        this.defaultChecked = false;
        /** Marks the checkbox input as invalid. Replace the pseudo :invalid selector for absent in custom elements */
        this.invalid = false;
    }
    /** Simulates a click on the checkbox. */
    click() {
        this.input.click();
    }
    /** Sets focus on the checkbox. */
    focus(options) {
        this.input.focus(options);
    }
    /** Removes focus from the checkbox. */
    blur() {
        this.input.blur();
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        if (!this.input.reportValidity()) {
            this.invalid = !this.input.checkValidity();
        }
        return this.input.reportValidity();
    }
    _handleChange() {
        this.checked = !this.checked;
        this.value = this.input.value;
        this.emit("sgds-change", { detail: { checked: this.checked, value: this.value } });
    }
    _handleKeyDown(event) {
        const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        if (event.key === "Enter" && !hasModifier) {
            this.click();
        }
    }
    _handleInvalid(e) {
        e.preventDefault();
        this.invalid = true;
    }
    /** @internal */
    handleDisabledChange() {
        // Disabled form controls are always valid, so we need to recheck validity when the state changes
        this.input.disabled = this.disabled;
        this.invalid = !this.input.checkValidity();
    }
    /** @internal */
    handleStateChange() {
        this.invalid = !this.input.checkValidity();
    }
    render() {
        return html `
      <div
        class=${classMap({
            "form-check": true,
            "form-check-inline": this.isInline
        })}
      >
        <input
          class=${classMap({
            "form-check-input": true,
            "is-invalid": this.hasFeedback && this.invalid,
            md: this._size === "md"
        })}
          type="checkbox"
          id=${this._inputId}
          aria-invalid=${this.invalid ? "true" : "false"}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
          @invalid=${(e) => this._handleInvalid(e)}
        />
        <label for="${this._inputId}" aria-label=${ifDefined(this.ariaLabel)} class="form-check-label"
          ><slot></slot
        ></label>
        ${this.hasFeedback
            ? html `<div id="${this._inputId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>`
            : nothing}
      </div>
    `;
    }
}
__decorate([
    query('input[type="checkbox"]')
], FormCheckElement.prototype, "input", void 0);
__decorate([
    property({ type: String, reflect: true })
], FormCheckElement.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], FormCheckElement.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], FormCheckElement.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FormCheckElement.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FormCheckElement.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FormCheckElement.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FormCheckElement.prototype, "hasFeedback", void 0);
__decorate([
    property({ type: String, reflect: true })
], FormCheckElement.prototype, "invalidFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FormCheckElement.prototype, "isInline", void 0);
__decorate([
    defaultValue("checked")
], FormCheckElement.prototype, "defaultChecked", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FormCheckElement.prototype, "invalid", void 0);
__decorate([
    property({ type: String })
], FormCheckElement.prototype, "_size", void 0);
__decorate([
    watch("disabled", { waitUntilFirstUpdate: true })
], FormCheckElement.prototype, "handleDisabledChange", null);
__decorate([
    watch("checked", { waitUntilFirstUpdate: true })
], FormCheckElement.prototype, "handleStateChange", null);
export default FormCheckElement;
//# sourceMappingURL=form-check-element.js.map