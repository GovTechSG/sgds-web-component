import { __decorate } from "tslib";
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../utils/watch";
import tabPanelStyles from "./tab-panel.css";
let id = 0;
/**
 * @summary Tab panels are used inside tab groups to display tabbed content.
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --sgds-tab-panel-padding-y - The y-axis padding of tab panel.
 *
 */
export class SgdsTabPanel extends LitElement {
    constructor() {
        super(...arguments);
        /**@internal */
        this.attrId = ++id;
        /**@internal */
        this.componentId = `sgds-tab-panel-${this.attrId}`;
        /** The tab panel's name. */
        this.name = "";
        /** When true, the tab panel will be shown. When used with tab-group, this property is already being managed */
        this.active = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.id = this.id.length > 0 ? this.id : this.componentId;
        this.setAttribute("role", "tabpanel");
    }
    handleActiveChange() {
        this.setAttribute("aria-hidden", this.active ? "false" : "true");
    }
    render() {
        return html `
      <slot
        part="base"
        class=${classMap({
            "tab-panel": true,
            "tab-panel--active": this.active
        })}
      ></slot>
    `;
    }
}
SgdsTabPanel.styles = tabPanelStyles;
__decorate([
    property({ reflect: true })
], SgdsTabPanel.prototype, "name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTabPanel.prototype, "active", void 0);
__decorate([
    watch("active")
], SgdsTabPanel.prototype, "handleActiveChange", null);
export default SgdsTabPanel;
//# sourceMappingURL=sgds-tab-panel.js.map