import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import closeButtonStyles from "./close-button.css";
import { classMap } from "lit/directives/class-map.js";
/**
 * @summary Close button for closing actions. Used in Modal, Drawer, Alert and Toast.
 *
 * @cssprop --sgds-close-btn-border-radius - The border radius of close button border
 *
 */
export class SgdsCloseButton extends SgdsElement {
    constructor() {
        super(...arguments);
        this.ariaLabel = "Close button";
        /** Specifies a large or small button */
        this.size = "md";
        this._clickHandler = () => {
            return;
        };
    }
    _handleClick() {
        this.removeEventListener("click", this._clickHandler);
        this.addEventListener("click", this._clickHandler);
    }
    render() {
        return html `
      <button
        class=${classMap({
            "btn-close": true,
            [`btn-close-${this.size}`]: this.size
        })}
        aria-label=${ifDefined(this.ariaLabel)}
        @click=${this._handleClick}
      ></button>
    `;
    }
}
SgdsCloseButton.styles = [closeButtonStyles];
__decorate([
    property({ type: String, reflect: true })
], SgdsCloseButton.prototype, "ariaLabel", void 0);
__decorate([
    property({ reflect: true })
], SgdsCloseButton.prototype, "size", void 0);
export default SgdsCloseButton;
//# sourceMappingURL=sgds-close-button.js.map