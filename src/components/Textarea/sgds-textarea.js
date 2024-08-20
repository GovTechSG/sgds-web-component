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
import { watch } from "../../utils/watch";
import textareaStyle from "./textarea.css";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
import formHintStyles from "../../styles/form-hint.css";
/**
 * @summary Text areas allow for the collection of input longer than a single line.
 *
 * @event sgds-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sgds-input - Emitted when the control receives input and its value changes.
 * @event sgds-focus - Emitted when textarea is in focus.
 * @event sgds-blur - Emitted when textarea loses focus.
 *
 * @cssproperty --sgds-textarea-padding-x - The x-axis padding of the textarea
 * @cssproperty --sgds-textarea-padding-y - The y-axis padding of the textarea
 * @cssproperty --sgds-textarea-line-height - The line height of text in the textarea
 * @cssproperty --sgds-textarea-font-weight - Sets the font weight of text in the textarea
 * @cssproperty --sgds-textarea-font-size - Sets the font size of text in the textarea
 * @cssproperty --sgds-textarea-border-radius - The border radius of the textarea
 * @cssproperty --sgds-textarea-border-width - The thickness of the textarea's border
 * @cssproperty --sgds-textarea-border-color - The border color of the textarea
 * @cssproperty --sgds-textarea-focus-box-shadow-color - The color of box shadow of textarea at focused state
 * @cssproperty --sgds-textarea-focus-box-shadow - The box shadow of textarea at focused state
 * @cssproperty --sgds-textarea-placeholder-color - Sets the text color textarea's placeholder.
 * @cssproperty --sgds-textarea-color - Sets the text colors of textarea
 * @cssproperty --sgds-form-label-color - Sets the text color of textarea's label
 * @cssproperty --sgds-form-label-font-weight - Sets the font weight of textarea's label
 * @cssproperty --sgds-form-hint-text-color - The color of hint text
 * @cssproperty --sgds-form-hint-text-font-size - The font size of hint text
 * @cssproperty --sgds-form-hint-text-font-weight - The font weight of hint text
 */
export class SgdsTextarea extends SgdsElement {
    constructor() {
        super(...arguments);
        /**@internal */
        this.formSubmitController = new FormSubmitController(this);
        /**The textarea's label */
        this.label = "label";
        /**The textarea's value attribute. */
        this.value = "";
        /**Enables spell checking on the textarea */
        this.spellcheck = false;
        /** The number of rows to display by default. */
        this.rows = 4;
        /**The textarea's placeholder text. */
        this.placeholder = "Placeholder";
        /**Feedback text for error state when validated */
        this.invalidFeedback = "";
        /**Autofocus the textarea */
        this.autofocus = false;
        /**Disables the textarea. */
        this.disabled = false;
        /**Makes the textarea a required field. */
        this.required = false;
        /** Makes the textarea readonly. */
        this.readonly = false;
        /** Controls how the textarea can be resized. */
        this.resize = "vertical";
        /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
        this.defaultValue = "";
        /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
        this.hasFeedback = false;
        /** Marks the component as invalid. Replace the pseudo :invalid selector for absent in custom elements */
        this.invalid = false;
        /** Marks the input as invalid. Replace the pseudo :valid selector for absent in custom elements */
        this.valid = false;
        /** @internal The textarea's unique id */
        this.textareaId = genId("textarea", "input");
    }
    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
        this.updateComplete.then(() => {
            this.setTextareaHeight();
            this.resizeObserver.observe(this.textarea);
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver.unobserve(this.textarea);
    }
    /** Sets focus on the textarea. */
    focus(options) {
        this.textarea.focus(options);
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        return this.textarea.reportValidity();
    }
    /** Selects all the text in the textarea. */
    select() {
        this.textarea.select();
    }
    handleInvalid(e) {
        e.preventDefault();
        this.invalid = true;
    }
    handleChange(event) {
        this.value = this.textarea.value;
        this.emit(event);
    }
    handleFocus() {
        this.emit("sgds-focus");
    }
    handleBlur() {
        this.emit("sgds-blur");
    }
    handleKeyDown(event) {
        const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        // Pressing enter when focused on an input should submit the form like a native input, but we wait a tick before
        // submitting to allow users to cancel the keydown event if they need to
        if (event.key === "Enter" && !hasModifier) {
            setTimeout(() => {
                if (!event.defaultPrevented) {
                    this.formSubmitController.submit();
                }
            });
        }
    }
    handleRowsChange() {
        this.setTextareaHeight();
    }
    setTextareaHeight() {
        if (this.resize === "auto") {
            this.textarea.style.height = "auto";
            this.textarea.style.height = `${this.textarea.scrollHeight}px`;
        }
        else {
            this.textarea.style.height = undefined;
        }
    }
    handleDisabledChange() {
        // Disabled form controls are always valid, so we need to recheck validity when the state changes
        this.textarea.disabled = this.disabled;
        this.invalid = !this.textarea.checkValidity();
    }
    handleValueChange() {
        this.invalid = !this.textarea.checkValidity();
        this.valid = this.textarea.checkValidity();
        this.updateComplete.then(() => this.setTextareaHeight());
        if (!this.required && this.value === "") {
            this.valid = false;
        }
    }
    render() {
        // if maxlength is defined
        const wordCount = html ` <div class="form-text">${this.value.length}/${this.maxlength}</div> `;
        return html `
      <div class="text-area-label-wrapper">
        <label for=${this.textareaId} class="form-label">${this.label}</label>
        ${this.maxlength > 0 ? wordCount : undefined}
      </div>

      <textarea
        class=${classMap({
            "form-control": true,
            "is-invalid": this.hasFeedback && this.invalid,
            "is-valid": this.hasFeedback && this.valid,
            "textarea-resize-none": this.resize === "none",
            "textarea-resize-vertical": this.resize === "vertical",
            "textarea-resize-auto": this.resize === "auto"
        })}
        id=${this.textareaId}
        name=${ifDefined(this.name)}
        rows=${ifDefined(this.rows)}
        placeholder=${ifDefined(this.placeholder)}
        minlength=${ifDefined(this.minlength)}
        maxlength=${ifDefined(this.maxlength)}
        .value=${live(this.value)}
        aria-invalid=${this.invalid ? "true" : "false"}
        spellcheck=${ifDefined(this.spellcheck)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        ?autofocus=${this.autofocus}
        autocorrect=${ifDefined(this.autocorrect)}
        inputmode=${ifDefined(this.inputmode)}
        @keyup=${this.handleValueChange}
        @input=${() => this.handleChange("sgds-input")}
        @change=${() => this.handleChange("sgds-change")}
        @invalid=${(e) => this.handleInvalid(e)}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
      </textarea>

      ${this.hasFeedback
            ? html `<div id="${this.textareaId}-invalid" class="invalid-feedback">${this.invalidFeedback}</div>`
            : ""}
    `;
    }
}
SgdsTextarea.styles = [...SgdsElement.styles, feedbackStyles, formHintStyles, formLabelStyles, textareaStyle];
__decorate([
    query("textarea.form-control")
], SgdsTextarea.prototype, "textarea", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "value", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsTextarea.prototype, "minlength", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsTextarea.prototype, "maxlength", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "spellcheck", void 0);
__decorate([
    property({ type: Number })
], SgdsTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "invalidFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "required", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "readonly", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "resize", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "inputmode", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsTextarea.prototype, "autocorrect", void 0);
__decorate([
    defaultValue()
], SgdsTextarea.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "hasFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTextarea.prototype, "valid", void 0);
__decorate([
    watch("rows", { waitUntilFirstUpdate: true })
], SgdsTextarea.prototype, "handleRowsChange", null);
__decorate([
    watch("disabled", { waitUntilFirstUpdate: true })
], SgdsTextarea.prototype, "handleDisabledChange", null);
__decorate([
    watch("value", { waitUntilFirstUpdate: true })
], SgdsTextarea.prototype, "handleValueChange", null);
export default SgdsTextarea;
//# sourceMappingURL=sgds-textarea.js.map