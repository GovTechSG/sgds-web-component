import { __decorate } from "tslib";
import { state, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { FormSubmitController } from "../../utils/form";
import buttonStyles from "./button.css";
import anchorStyles from "../../styles/anchor.css";
/**
 * @summary Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
 *
 * @slot default - The button's label.
 * @slot leftIcon - The slot for icon to the left of the button text
 * @slot rightIcon - The slot for icon to the right of the button text
 *
 * @event sgds-blur - Emitted when the button is not focused.
 * @event sgds-focus - Emitted when the button is focused.
 *
 * @cssprop --sgds-btn-font-weight - The font weight of text content in button
 * @cssprop --sgds-btn-bg - The background color of button
 * @cssprop --sgds-btn-hover-bg - The background color of a button in hover state
 * @cssprop --sgds-btn-border-radius - The border radius of button border
 * @cssprop --sgds-btn-color - The text color of button, applicable to primary, outline, and ghost variants only
 * @cssprop --sgds-btn-icon-color - The color of icon in button, applicable to primary, outline, and ghost variants only
 * @cssprop --sgds-btn-border-width - The thickness of the button border, applicable to outline variant only
 * @cssprop --sgds-btn-border-color - The color of the button border, applicable to outline variant only
 *
 */
export class SgdsButton extends SgdsElement {
    constructor() {
        super(...arguments);
        /** @internal */
        this._hasLeftIcon = false;
        /** @internal */
        this._hasRightIcon = false;
        /** @internal */
        this.formSubmitController = new FormSubmitController(this, {
            form: (input) => {
                // Buttons support a form attribute that points to an arbitrary form, so if this attribute it set we need to query
                // the form from the same root using its id
                if (input.hasAttribute("form")) {
                    const doc = input.getRootNode();
                    const formId = input.getAttribute("form");
                    return doc.getElementById(formId);
                }
                // Fall back to the closest containing form
                return input.closest("form");
            }
        });
        /** Specifies a large or small button */
        this.size = "md";
        /** Manually set the visual state of the button to `:active` */
        this.active = false;
        /** The disabled state of the button */
        this.disabled = false;
        /** The behavior of the button with default as `type='button', `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
        this.type = "button";
        /** When set, the button will be in full width. */
        this.fullWidth = false;
        this._clickHandler = () => {
            if (this.type === "submit") {
                this.formSubmitController.submit(this);
            }
            if (this.type === "reset") {
                this.formSubmitController.reset(this);
            }
        };
    }
    /** Sets focus on the button. */
    focus(options) {
        this.button.focus(options);
    }
    /** Simulates a click on the button. */
    click() {
        this.button.click();
    }
    /** Removes focus from the button. */
    blur() {
        this.button.blur();
    }
    handleBlur() {
        this.emit("sgds-blur");
    }
    handleFocus() {
        this.emit("sgds-focus");
    }
    handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this.removeEventListener("click", this._clickHandler);
        this.addEventListener("click", this._clickHandler);
    }
    handleLeftIconSlotchange(e) {
        const childNodes = e.target.assignedNodes({ flatten: true });
        if (childNodes.length > 0) {
            return (this._hasLeftIcon = true);
        }
    }
    handleRightIconSlotchange(e) {
        const childNodes = e.target.assignedNodes({ flatten: true });
        if (childNodes.length > 0) {
            return (this._hasRightIcon = true);
        }
    }
    render() {
        const isLink = this.href;
        const tag = isLink ? literal `a` : literal `button`;
        return html `
      <${tag}
        class="sgds btn ${classMap({
            disabled: this.disabled,
            active: this.active,
            "full-width": this.fullWidth,
            "has-left-icon": this._hasLeftIcon,
            "has-right-icon": this._hasRightIcon,
            [`btn-${this.variant}`]: this.variant,
            [`btn-${this.size}`]: this.size
            // "btn-link": this.variant === "link"
        })}"
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : this.type)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target === "_blank" ? "noreferrer noopener" : undefined)}
        role=${ifDefined(isLink ? "button" : undefined)}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        aria-label=${ifDefined(this.ariaLabel)}
      >
      <slot name="leftIcon" @slotchange=${this.handleLeftIconSlotchange}></slot>
      <span><slot></slot></span>
      <slot name="rightIcon" @slotchange=${this.handleRightIconSlotchange}></slot>
      </${tag}>
    `;
    }
}
SgdsButton.styles = [...SgdsElement.styles, anchorStyles, buttonStyles];
__decorate([
    query(".btn")
], SgdsButton.prototype, "button", void 0);
__decorate([
    state()
], SgdsButton.prototype, "_hasLeftIcon", void 0);
__decorate([
    state()
], SgdsButton.prototype, "_hasRightIcon", void 0);
__decorate([
    property({ reflect: true })
], SgdsButton.prototype, "variant", void 0);
__decorate([
    property({ reflect: true })
], SgdsButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsButton.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsButton.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsButton.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsButton.prototype, "href", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsButton.prototype, "target", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsButton.prototype, "download", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsButton.prototype, "form", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "formaction" })
], SgdsButton.prototype, "formAction", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "formmethod" })
], SgdsButton.prototype, "formMethod", void 0);
__decorate([
    property({ attribute: "formnovalidate", type: Boolean, reflect: true })
], SgdsButton.prototype, "formNoValidate", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "formtarget" })
], SgdsButton.prototype, "formTarget", void 0);
__decorate([
    property({ type: String })
], SgdsButton.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsButton.prototype, "fullWidth", void 0);
export default SgdsButton;
//# sourceMappingURL=sgds-button.js.map