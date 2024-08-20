import { __decorate } from "tslib";
import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import badgeStyle from "./badge.css";
import { watch } from "../../utils/watch";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
/**
 * @summary Badges can be used to highlight important bits of information such as labels, notifications & status.
 *
 * @slot default - slot for badge
 * @slot leftIcon - The slot for icon to the left of the badge text
 * @slot rightIcon - The slot for icon to the right of the badge text
 *
 * @event sgds-show - Emitted when the badge appears.
 * @event sgds-hide - Emitted after the badge closes.
 *
 * @cssprop --sgds-badge-color - The text color of badge, only if the 'variant' prop is set to 'filled' and the background color is yellow.
 * @cssprop --sgds-badge-border-radius - The border radius of badge
 * @cssprop --sgds-badge-bg - The background color of the badge. Changing 'status' prop updates this css property
 * @cssprop --sgds-badge-border-color - The border color of the badge. Changing `variant` prop to 'outline' updates this css property
 *
 */
export class SgdsBadge extends SgdsElement {
    constructor() {
        super(...arguments);
        /** Controls the appearance of the alert  */
        this.show = true;
        /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `info`, `success`, `danger`, `warning`, 'neutral' */
        this.variant = "info";
        /** Manually set the outlined state to false */
        this.outlined = false;
        /** Manually set the dismissable state of the button to `false` */
        this.dismissible = false;
    }
    /**@internal */
    static get scopedElements() {
        return {
            "sgds-close-button": SgdsCloseButton
        };
    }
    /** Closes the alert  */
    close() {
        this.show = false;
    }
    /**@internal */
    _handleShowChange() {
        this.show ? this.emit("sgds-show") : this.emit("sgds-hide");
    }
    render() {
        return this.show
            ? html `
          <div
            class="  
          ${classMap({
                sgds: true,
                [`badge-dismissible`]: this.dismissible,
                badge: true,
                show: this.show,
                outlined: this.outlined
            })}
            "
            aria-hidden=${this.show ? "false" : "true"}
          >
            <slot name="leftIcon" class="left-icon"></slot>
            <span class="badge-label">
              <slot></slot>
            </span>
            <slot name="rightIcon" class="right-icon"></slot>

            ${this.dismissible
                ? html `<sgds-close-button
                  size="sm"
                  aria-label="close the badge"
                  @click=${this.close}
                ></sgds-close-button>`
                : nothing}
          </div>
        `
            : nothing;
    }
}
SgdsBadge.styles = [...SgdsElement.styles, badgeStyle];
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsBadge.prototype, "show", void 0);
__decorate([
    property({ reflect: true })
], SgdsBadge.prototype, "variant", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsBadge.prototype, "outlined", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsBadge.prototype, "dismissible", void 0);
__decorate([
    watch("show")
], SgdsBadge.prototype, "_handleShowChange", null);
export default SgdsBadge;
//# sourceMappingURL=sgds-badge.js.map