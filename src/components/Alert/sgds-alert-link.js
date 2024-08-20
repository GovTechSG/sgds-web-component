import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import alertLinkStyle from "./alert-link.css";
import anchorStyles from "../../styles/anchor.css";
/**
 * @summary Alert link are used within the alert's message that is passed into the default slot of `<sgds-alert>`
 *
 * @slot default - The text content of the anchor element
 * @cssproperty --alert-link-anchor-color - The margin-right css of icon slot, to position the gap between icon and alert message
 */
export class SgdsAlertLink extends SgdsElement {
    render() {
        return html `
      <a class="alert-link" href=${ifDefined(this.href)} target=${ifDefined(this.target)}><slot></slot></a>
    `;
    }
}
SgdsAlertLink.styles = [anchorStyles, alertLinkStyle];
__decorate([
    property({ type: String, reflect: true })
], SgdsAlertLink.prototype, "href", void 0);
__decorate([
    property()
], SgdsAlertLink.prototype, "target", void 0);
export default SgdsAlertLink;
//# sourceMappingURL=sgds-alert-link.js.map