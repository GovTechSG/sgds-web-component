import { __decorate } from "tslib";
import { html } from "lit";
import SgdsElement from "./sgds-element";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
/**
 * @slot default - Default slot for SgdsMainnavItem anchor element
 */
export default class LinkElement extends SgdsElement {
    constructor() {
        // static styles = [...SgdsElement.styles];
        super(...arguments);
        /** when true, sets the active stylings of .nav-link */
        this.active = false;
        /** Disables the SgdsMainnavItem */
        this.disabled = false;
        /** Where to display the linked URL, as the name for a browsing context. Forwards to the HTMLAnchor target attribute */
        this.target = "_self";
    }
    render() {
        return html `
      <a
        href="${ifDefined(this.href)}"
        class="nav-link ${classMap({
            disabled: this.disabled,
            active: this.active
        })} "
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
        target=${this.target}
        ><slot></slot
      ></a>
    `;
    }
}
__decorate([
    property({ type: Boolean })
], LinkElement.prototype, "active", void 0);
__decorate([
    property({ type: String })
], LinkElement.prototype, "href", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LinkElement.prototype, "disabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], LinkElement.prototype, "target", void 0);
//# sourceMappingURL=link-element.js.map