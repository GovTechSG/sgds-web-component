import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import headingStyles from "../../styles/header-class.css";
/**
 * @summary Alert heading is the header of the Alert component. Use it in the default slot of `sgds-alert` when required
 *
 * @slot default - The text content of the anchor element
 */
export class SgdsAlertHeading extends SgdsElement {
    constructor() {
        super(...arguments);
        /** The type of header tag style for alert's heading */
        this.headerTag = "h4";
    }
    render() {
        return html `
      <span class=${this.headerTag}>
        <slot></slot>
      </span>
    `;
    }
}
SgdsAlertHeading.styles = [headingStyles];
__decorate([
    property({ type: String, reflect: true })
], SgdsAlertHeading.prototype, "headerTag", void 0);
export default SgdsAlertHeading;
//# sourceMappingURL=sgds-alert-heading.js.map