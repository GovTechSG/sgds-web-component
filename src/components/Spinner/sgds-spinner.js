import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import spinnerStyle from "./spinner.css";
import textStyles from "../../styles/text-variants.css";
/**
 * @summary Spinners notify the users that their request is being processed.
 *
 * @cssproperty --sgds-spinner-color - The color of spinner
 * @cssproperty --sgds-spinner-size - The width and height of spinner
 * @cssproperty --sgds-spinner-border-width - The width of the border of spinner
 *
 */
export class SgdsSpinner extends SgdsElement {
    constructor() {
        super(...arguments);
        /** The type of spinner */
        this.type = "border";
        /** The color of spinner */
        this.color = "primary";
    }
    render() {
        return html `
      <div class="spinner-${this.type}" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `;
    }
}
SgdsSpinner.styles = [...SgdsElement.styles, textStyles, spinnerStyle];
__decorate([
    property({ type: String, reflect: true })
], SgdsSpinner.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsSpinner.prototype, "color", void 0);
export default SgdsSpinner;
//# sourceMappingURL=sgds-spinner.js.map