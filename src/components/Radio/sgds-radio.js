import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import radioStyles from "./radio.css";
import formLabelStyles from "../../styles/form-label.css";
/**
 * @summary Radio allows the user to select one option from a set while seeing all available options.
 *
 * @slot default - The label of the radio input
 *
 * @event sgds-focus - Emitted when the control gains focus.
 * @event sgds-blur - Emitted when the control loses focus.
 *
 * @cssprop --sgds-radio-margin-bottom - The margin-bottom of each radio. Defaults to the value of `--sgds-radio-group-gap`
 * @cssprop --sgds-radio-inline-margin-right - The margin-right of each radio when it is inlined.
 */
export class SgdsRadio extends SgdsElement {
    constructor() {
        super(...arguments);
        /**
         * Draws the radio in a checked state
         */
        this.checked = false;
        /** Disables the radio. */
        this.disabled = false;
        /** Aligns the radios horizontally */
        this.isInline = false;
        /** For aria-label */
        this.ariaLabel = "";
        /**Feedback text for error state when validated */
        this.invalidFeedback = "";
        /** Allows invalidFeedback, invalid and valid styles to be visible with the input */
        this.hasFeedback = false;
        /** Marks the radio input as invalid. Replace the pseudo :invalid selector for absent in custom elements */
        this.invalid = false;
        this.radioId = genId("radio");
    }
    connectedCallback() {
        super.connectedCallback();
        this.setInitialAttributes();
        this.addEventListeners();
    }
    handleCheckedChange() {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
        this.setAttribute("tabindex", this.checked ? "0" : "-1");
    }
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
    handleBlur() {
        this.emit("sgds-blur");
    }
    handleClick() {
        if (!this.disabled) {
            this.checked = true;
        }
    }
    handleFocus() {
        this.emit("sgds-focus");
    }
    addEventListeners() {
        this.addEventListener("blur", () => this.handleBlur());
        this.addEventListener("click", () => this.handleClick());
        this.addEventListener("focus", () => this.handleFocus());
    }
    setInitialAttributes() {
        this.setAttribute("role", "radio");
        this.setAttribute("tabindex", "-1");
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
    render() {
        return html `
      <div
        class=${classMap({
            "form-check": true,
            "form-check-inline": this.isInline
        })}
        tabindex="-1"
      >
        <input
          class=${classMap({
            "form-check-input": true,
            "is-invalid": this.invalid
        })}
          type="radio"
          id=${ifDefined(this.radioId)}
          value=${ifDefined(this.value)}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
        />
        <label for="${ifDefined(this.radioId)}" aria-label=${ifDefined(this.ariaLabel)} class="form-check-label"
          ><slot></slot
        ></label>
      </div>
    `;
    }
}
SgdsRadio.styles = [...SgdsElement.styles, formLabelStyles, radioStyles];
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadio.prototype, "checked", void 0);
__decorate([
    property()
], SgdsRadio.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadio.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadio.prototype, "isInline", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsRadio.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsRadio.prototype, "invalidFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadio.prototype, "hasFeedback", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsRadio.prototype, "invalid", void 0);
__decorate([
    watch("checked")
], SgdsRadio.prototype, "handleCheckedChange", null);
__decorate([
    watch("disabled", { waitUntilFirstUpdate: true })
], SgdsRadio.prototype, "handleDisabledChange", null);
export default SgdsRadio;
//# sourceMappingURL=sgds-radio.js.map