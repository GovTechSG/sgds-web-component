import { __decorate } from "tslib";
import { html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import accordionStyle from "./accordion.css";
const VALID_KEYS = ["Enter", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
/**
 * @summary A dropdown mechanism that allow users to either show or hide related content. `SgdsAccordion` is a wrapper to manage the behaviour for multiple `SgdsAccordionItems`
 * @slot default - slot for accordion-item
 *
 * @cssprop --sgds-accordion-bg - The background colour of the accordion
 * @cssprop --sgds-accordion-active-color - The colour of accordion when it is active
 * @cssprop --sgds-accordion-active-bg - The active background colour of accordion when it is active
 * @cssprop --sgds-accordion-border-color - The colour of all borders in the accordion
 * @cssprop --sgds-accordion-border-width - The thickness of border line of the accordion
 */
export class SgdsAccordion extends SgdsElement {
    constructor() {
        super(...arguments);
        /** Allows multiple accordion items to be opened at the same time */
        this.allowMultiple = false;
    }
    /** @internal */
    get items() {
        return [...(this.defaultNodes || [])].filter((node) => typeof node.tagName !== "undefined");
    }
    firstUpdated() {
        const items = [...this.items];
        items.forEach((item, index) => {
            if (items.length > 1) {
                switch (index) {
                    case 0:
                        item.setAttribute("first-of-type", "");
                        break;
                    case items.length - 1:
                        item.setAttribute("last-of-type", "");
                        break;
                    default:
                        item.setAttribute("nth-of-type", "");
                }
            }
        });
    }
    async _onToggle(event) {
        if (this.allowMultiple) {
            // No toggling when `allowMultiple` or the user prevents it.
            return;
        }
        const items = [...this.items];
        if (items && !items.length) {
            // no toggling when there aren't items.
            return;
        }
        items.forEach(item => {
            // Covers all elements within accordion-item
            if (!event.composedPath().includes(item)) {
                // Close all the items that didn't dispatch the event.
                item.open = false;
            }
        });
    }
    async _onKeyboardToggle(event) {
        if (!VALID_KEYS.includes(event.key))
            return;
        return this._onToggle(event);
    }
    render() {
        return html `
      <div
        class=${classMap({
            "sgds accordion": true
        })}
      >
        <slot @click=${this._onToggle} @keydown=${this._onKeyboardToggle}></slot>
      </div>
    `;
    }
}
SgdsAccordion.styles = [...SgdsElement.styles, accordionStyle];
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsAccordion.prototype, "allowMultiple", void 0);
__decorate([
    queryAssignedElements()
], SgdsAccordion.prototype, "defaultNodes", void 0);
export default SgdsAccordion;
//# sourceMappingURL=sgds-accordion.js.map