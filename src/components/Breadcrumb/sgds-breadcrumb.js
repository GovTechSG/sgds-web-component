import { __decorate } from "tslib";
import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import breadcrumbStyle from "./breadcrumb.css";
/**
 * @summary Breadcrumbs help users to navigate and understand where they are on the current website or service.
 *
 * @slot default - The slot to pass in custom elements of `SgdsBreadcrumbItems`.
 * @slot separator - Defines all the separator of `SgdsBreadcrumbItems`. Defaults to "/"
 *
 * @csspart base - The nav element wrapper of `SgdsBreadcrumb`
 *
 * @cssprop --sgds-breadcrumb-padding-x - The x-axis padding of the breadcrumb
 * @cssprop --sgds-breadcrumb-padding-y - The y-axis padding of the breadcrumb
 *
 */
export class SgdsBreadcrumb extends SgdsElement {
    constructor() {
        super(...arguments);
        /** The aria-label of nav element within breadcrumb component. */
        this.ariaLabel = "breadcrumb";
    }
    // Generates a clone of the separator element to use for each breadcrumb item
    _getSeparator() {
        const separator = this.separatorSlot.assignedElements({ flatten: true })[0];
        // Clone it, remove ids, and slot it
        const clone = separator.cloneNode(true);
        [clone, ...clone.querySelectorAll("[id]")].forEach(el => el.removeAttribute("id"));
        clone.setAttribute("data-default", "");
        clone.slot = "separator";
        return clone;
    }
    _handleSlotChange() {
        const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(item => item.tagName.toLowerCase() === "sgds-breadcrumb-item");
        items.forEach((item, index) => {
            // Append separators to each item if they don't already have one
            const separator = item.querySelector('[slot="separator"]');
            if (separator === null) {
                // No separator exists, add one
                item.append(this._getSeparator());
            }
            else if (separator.hasAttribute("data-default")) {
                // A default separator exists, replace it
                separator.replaceWith(this._getSeparator());
            }
            else {
                // The user provided a custom separator, leave it alone
            }
            // The last breadcrumb item is the "current page"
            if (index === items.length - 1) {
                item.setAttribute("aria-current", "page");
            }
            else {
                item.removeAttribute("aria-current");
            }
        });
    }
    render() {
        return html `
      <nav aria-label=${ifDefined(this.ariaLabel)} part="base">
        <div class="breadcrumb">
          <slot @slotchange=${this._handleSlotChange}></slot>
          <slot name="separator" hidden aria-hidden="true">
            <span>/</span>
          </slot>
        </div>
      </nav>
    `;
    }
}
SgdsBreadcrumb.styles = [...SgdsElement.styles, breadcrumbStyle];
__decorate([
    property({ type: String })
], SgdsBreadcrumb.prototype, "ariaLabel", void 0);
__decorate([
    query("slot")
], SgdsBreadcrumb.prototype, "defaultSlot", void 0);
__decorate([
    query('slot[name="separator"]')
], SgdsBreadcrumb.prototype, "separatorSlot", void 0);
export default SgdsBreadcrumb;
//# sourceMappingURL=sgds-breadcrumb.js.map