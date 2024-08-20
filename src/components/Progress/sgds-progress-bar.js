import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import progressBarStyle from "./progress-bar.css";
/**
 * @cssproperty --sgds-progress-bar-color - Sets the text color on the progress bar
 * @cssproperty --sgds-progress-bar-font-size - Sets the font size of the text on the progress bar
 * @cssproperty --sgds-progress-bar-bg - Sets the fill color of the progress bar
 * @cssproperty --sgds-progress-bar-transition - Sets the transition of the progress bar
 */
export class SgdsProgressBar extends SgdsElement {
    constructor() {
        super(...arguments);
        /**
         * Sets the aria label for assistive devices.
         */
        this.arialabel = "";
        /** Apply a stripe over the progress bar */
        this.striped = false;
        /**
         * Animated stripes over the progress bar.
         *
         * Use in conjunction with striped property
         */
        this.animated = false;
        /** Add label on top of progress bar */
        this.label = "";
    }
    render() {
        return html `
      <div
        class=${classMap({
            "progress-bar": true,
            "progress-bar-striped": this.striped,
            "progress-bar-animated": this.animated
        })}
        role="progressbar"
        style=${styleMap({ width: `${this.value}%` })}
        aria-label=${this.arialabel}
        aria-valuenow=${this.value}
        aria-valuemin=${this.ariamin}
        aria-valuemax=${this.ariamax}
      >
        ${this.label ? html `${this.label}` : undefined}
      </div>
    `;
    }
}
SgdsProgressBar.styles = [progressBarStyle];
__decorate([
    property({ type: String, reflect: true })
], SgdsProgressBar.prototype, "variant", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsProgressBar.prototype, "ariamin", void 0);
__decorate([
    property({ type: Number, reflect: true })
], SgdsProgressBar.prototype, "ariamax", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsProgressBar.prototype, "arialabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsProgressBar.prototype, "striped", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsProgressBar.prototype, "animated", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsProgressBar.prototype, "label", void 0);
export default SgdsProgressBar;
//# sourceMappingURL=sgds-progress-bar.js.map