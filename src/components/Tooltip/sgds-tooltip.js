import { __decorate } from "tslib";
import Tooltip from "bootstrap/js/src/tooltip";
import { html } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import SgdsElement from "../../base/sgds-element";
import tooltipStyle from "./tooltip.css";
/**
 * @summary Tooltips display more information when users hover over, focus on, or interact with an element.
 * @slot default - The element to target the tooltip to.
 *
 * @cssproperty --sgds-tooltip-z-index - The z-index of tooltip
 * @cssproperty --sgds-tooltip-max-width - The max width of tooltip
 * @cssproperty --sgds-tooltip-padding-x - The left and right padding of tooltip
 * @cssproperty --sgds-tooltip-padding-y - The top and bottom padding of tooltip
 * @cssproperty --sgds-tooltip-font-size - The font size of tooltip
 * @cssproperty --sgds-tooltip-color - The text color of tooltip
 * @cssproperty --sgds-tooltip-bg - The background color of tooltip
 * @cssproperty --sgds-tooltip-border-radius - The border radius of tooltip
 * @cssproperty --sgds-tooltip-opacity - The opacity of tooltip
 *
 */
export class SgdsTooltip extends SgdsElement {
    constructor() {
        super(...arguments);
        this.myTooltip = createRef();
        this.bsTooltip = null;
        /** The tooltip's content. Content has to be textual */
        this.content = "";
        /** The placement of tooltip relative to its target */
        this.placement = "top";
        /** The method to invoke the tooltip. `hover focus` is the default value which allows tooltip to be triggered via mouse hover and keyboard focus. Add `tabindex=0 `for HTMLelements that are not tabbable. */
        this.trigger = "hover focus";
    }
    _handleSlotChange() {
        // For a11y purpose
        this.tooltipTargetElements.forEach(el => el.setAttribute("data-sgds-tooltip", this.content));
    }
    _handleClickOutOfElement(e, self) {
        if (!e.composedPath().includes(self)) {
            this.hide();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.trigger === "click") {
            document.addEventListener("click", (event) => this._handleClickOutOfElement(event, this));
            document.addEventListener("touchstart", (event) => this._handleClickOutOfElement(event, this));
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("click", (event) => this._handleClickOutOfElement(event, this));
        document.removeEventListener("touchstart", (event) => this._handleClickOutOfElement(event, this));
    }
    initializeTooltip() {
        this.tooltipConfig = {
            popperConfig: (defaultConfig) => {
                this.popperConfig = defaultConfig;
                const defaultModifiers = defaultConfig.modifiers;
                const newModifiers = defaultModifiers.map(mod => {
                    if (mod.name === "flip") {
                        mod.options.fallbackPlacements = [];
                    }
                    return mod;
                });
                this.popperConfig.modifiers = newModifiers;
                return this.popperConfig;
            },
            placement: this.placement,
            trigger: this.trigger,
            title: this.content,
            html: true,
            container: this.shadowRoot.querySelector("div") // tooltip to appear inside the shadow root of sgds-tooltip instead of anywhere in the DOM, so that scoped styles can apply
        };
        this.bsTooltip = new Tooltip(this.myTooltip.value, this.tooltipConfig);
    }
    firstUpdated() {
        this.initializeTooltip();
        this.myTooltip.value.addEventListener("show.bs.tooltip", () => {
            this.emit("sgds-show");
        });
        this.myTooltip.value.addEventListener("shown.bs.tooltip", () => {
            this.emit("sgds-after-show");
        });
        this.myTooltip.value.addEventListener("hide.bs.tooltip", () => {
            this.emit("sgds-hide");
        });
        this.myTooltip.value.addEventListener("hidden.bs.tooltip", () => {
            this.emit("sgds-after-hide");
        });
    }
    /** Hides the Tooltip */
    hide() {
        this.bsTooltip.hide();
    }
    /** Shows the Tooltip */
    show() {
        this.bsTooltip.show();
    }
    render() {
        return html `
      <div ${ref(this.myTooltip)}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
    }
}
SgdsTooltip.styles = [...SgdsElement.styles, tooltipStyle];
__decorate([
    property({ type: String })
], SgdsTooltip.prototype, "content", void 0);
__decorate([
    property({ type: String })
], SgdsTooltip.prototype, "placement", void 0);
__decorate([
    property({ type: String })
], SgdsTooltip.prototype, "trigger", void 0);
__decorate([
    state()
], SgdsTooltip.prototype, "popperConfig", void 0);
__decorate([
    queryAssignedElements()
], SgdsTooltip.prototype, "tooltipTargetElements", void 0);
export default SgdsTooltip;
//# sourceMappingURL=sgds-tooltip.js.map