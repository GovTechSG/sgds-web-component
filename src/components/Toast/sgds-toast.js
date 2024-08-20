import { __decorate } from "tslib";
import { property, query } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
import toastStyle from "./toast.css";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
/**
 * @summary Toast allows you to convey quick messaging notifications to the user.
 *
 * @slot default - The content to pass into toast's body
 * @slot icon - The slot to pass in icon to toast's header
 * @slot duration - When required, pass in the duration since toast appeared to this slot
 *
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 * @cssproperty --sgds-toast-max-width - The maximum width of toast
 * @cssproperty --sgds-toast-gap - The gap between header and body of toast
 * @cssproperty --sgds-toast-padding - The padding of toast
 * @cssproperty --sgds-toast-bg - The background color of toast
 * @cssproperty --sgds-toast-border-width - The width of the border of toast
 * @cssproperty --sgds-toast-border-left-width - The width of the left border of toast
 * @cssproperty --sgds-toast-border-radius - The border radius of toast
 * @cssproperty --sgds-toast-border-color - The color of the border of toast
 * @cssproperty --sgds-toast-box-shadow - The box shadow of toast
 * @cssproperty --sgds-toast-font-size - The font size of toast
 * @cssproperty --sgds-toast-color - The text color of toast
 * @cssproperty --sgds-toast-header-gap - The gap between the elements in the header
 * @cssproperty --sgds-toast-header-color - The title color of the toast header
 * @cssproperty --sgds-toast-header-icon-color - The icon color of the toast header
 */
export class SgdsToast extends ScopedElementsMixin(SgdsElement) {
    constructor() {
        super(...arguments);
        /** Controls the appearance of toast */
        this.show = false;
        /** The header title of toast. It is required to assign a title to toast */
        this.title = "Title";
        /** Controls whether the toast has fade animation during its appearance/disappearance */
        this.noAnimation = false;
        /** Controls if the toast will hide itself after the delay time. Works with delay property */
        this.autohide = false;
        /** The amount of time taken for toast to disappear after its first render. It takes effect only when autohide is set to true */
        this.delay = 5000;
    }
    /**@internal */
    static get scopedElements() {
        return {
            "sgds-close-button": SgdsCloseButton
        };
    }
    /** Shows the toast */
    async showToast() {
        if (this.show) {
            return;
        }
        this.show = true;
        return waitForEvent(this, "sgds-after-show");
    }
    /** Hide the toast */
    async hideToast() {
        if (!this.show) {
            return;
        }
        this.show = false;
        return waitForEvent(this, "sgds-after-hide");
    }
    /** @internal */
    handleCloseClick() {
        this.show = false;
        this.emit("sgds-close");
    }
    /**@internal */
    async handleShowChange() {
        if (this.show) {
            this.emit("sgds-show");
            this.toast.hidden = !this.show;
            const toastAnimation = getAnimation(this, "toast.show");
            !this.noAnimation && (await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options));
            this.emit("sgds-after-show");
        }
        else {
            this.emit("sgds-hide");
            const toastAnimation = getAnimation(this, "toast.hide");
            !this.noAnimation && (await animateTo(this.toast, toastAnimation.keyframes, toastAnimation.options));
            this.emit("sgds-after-hide");
            this.toast.hidden = !this.show;
        }
    }
    firstUpdated() {
        this.toast.hidden = !this.show;
    }
    render() {
        if (this.autohide && this.show) {
            setTimeout(() => {
                this.show = false;
            }, this.delay);
        }
        return html `
      <div
        class="toast sgds show ${classMap({
            [`is-${this.status}`]: this.status
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <slot name="icon"></slot>
          <strong>${this.title}</strong>
          <small><slot name="duration"></slot></small>
          <sgds-close-button ariaLabel="close toast" @click=${this.handleCloseClick}></sgds-close-button>
        </div>
        <div class="toast-body"><slot></slot></div>
      </div>
    `;
    }
}
SgdsToast.styles = [...SgdsElement.styles, toastStyle];
__decorate([
    query("div.toast")
], SgdsToast.prototype, "toast", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsToast.prototype, "show", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsToast.prototype, "title", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsToast.prototype, "noAnimation", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsToast.prototype, "autohide", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsToast.prototype, "delay", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsToast.prototype, "status", void 0);
__decorate([
    watch("show", { waitUntilFirstUpdate: true })
], SgdsToast.prototype, "handleShowChange", null);
export default SgdsToast;
setDefaultAnimation("toast.show", {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 400, easing: "ease" }
});
setDefaultAnimation("toast.hide", {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 400, easing: "ease" }
});
//# sourceMappingURL=sgds-toast.js.map