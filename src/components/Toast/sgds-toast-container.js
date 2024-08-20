import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import toastContainerStyle from "./toast-container.css";
/**
 * @summary ToastContainer is the container component to position `sgds-toast` in screen. When there is multiple toasts in the container, the toast components are stacked vertically.
 *
 * @slot default - The slot for `sgds-toast` elements
 *
 * @cssproperty --sgds-toast-container-slot-elements-gap - The gap between multiple `sgds-toast` elements. Defaults to 0.5rem
 * @cssproperty --sgds-toast-container-z-index - The z-index of the toast container, determining its stacking order relative to other elements.
 */
export class SgdsToastContainer extends SgdsElement {
    render() {
        return html `
      <div
        class=${classMap({
            "sgds toast-container": true,
            [this.position]: this.position
        })}
      >
        <slot></slot>
      </div>
    `;
    }
}
SgdsToastContainer.styles = [toastContainerStyle];
__decorate([
    property({ type: String, reflect: true })
], SgdsToastContainer.prototype, "position", void 0);
export default SgdsToastContainer;
//# sourceMappingURL=sgds-toast-container.js.map