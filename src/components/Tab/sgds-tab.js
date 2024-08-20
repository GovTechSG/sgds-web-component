import { __decorate } from "tslib";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import tabStyle from "./tab.css";
let id = 0;
/**
 * @summary Tabs are used within tab group to activate the tab panels
 *
 * @slot default - The content of the tab. This is  available when variant attribute of `sgds-tab-group` is not specified or when it is `tabs-basic-toggle`
 *
 * @slot icon - The slot to place svg icons. This is only available when variant attribute of `sgds-tab-group` is `tabs-info-toggle`
 * @slot count - The slot for count. This is only available when variant attribute of `sgds-tab-group` is `tabs-info-toggle`
 * @slot label - The slot for label of tab. This is only available when variant attribute of `sgds-tab-group` is `tabs-info-toggle`
 *
 * @csspart base - The base wrapper of tab
 *
 * @cssproperty  --sgds-tab-theme-color - The theme colour of tab. Defaults to `--sgds-primary`
 * @cssproperty  --sgds-tab-color - The color of tab.
 * @cssproperty  --sgds-tab-bg - The background color of tab.
 * @cssproperty  --sgds-tab-basic-toggle-hover-color - The text color of basic toggle tab in hover state.
 *
 */
export class SgdsTab extends SgdsElement {
    constructor() {
        super(...arguments);
        /**@internal */
        this.attrId = ++id;
        /**@internal */
        this.componentId = `sgds-tab-${this.attrId}`;
        /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
        this.panel = "";
        /** Draws the tab in an active state. When used with tab group, this state is already managed. Use it to set the initial active tab on first load of page */
        this.active = false;
        /** Disables the tab and prevents selection. */
        this.disabled = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("role", "tab");
    }
    /** Sets focus to the tab. */
    focus(options) {
        this.tab.focus(options);
    }
    /** Removes focus from the tab. */
    blur() {
        this.tab.blur();
    }
    /**@internal */
    handleActiveChange() {
        this.setAttribute("aria-selected", this.active ? "true" : "false");
    }
    /**@internal */
    handleDisabledChange() {
        this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
        if (this.disabled)
            this.active = false;
    }
    render() {
        // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
        this.id = this.id.length > 0 ? this.id : this.componentId;
        const parentVariantAttr = this.closest("sgds-tab-group").getAttribute("variant");
        const tabsInfo = html `
      <div class="tabs-info-label">
        <div><slot name="icon"></slot></div>
        <div><slot name="label"></slot></div>
      </div>
      <div class="tabs-info-count"><slot name="count"></slot></div>
    `;
        return html `
      <ul class="list-unstyled">
        <li part="base" class="nav-item" tabindex=${this.disabled ? "-1" : "0"}>
          <div
            class="${classMap({
            "nav-link": true,
            [`${parentVariantAttr}`]: parentVariantAttr,
            active: this.active,
            disabled: this.disabled
        })}"
          >
            ${parentVariantAttr === "tabs-info-toggle" ? tabsInfo : html `<slot></slot>`}
          </div>
        </li>
      </ul>
    `;
    }
}
SgdsTab.styles = [tabStyle];
__decorate([
    query(".nav-item")
], SgdsTab.prototype, "tab", void 0);
__decorate([
    property({ reflect: true })
], SgdsTab.prototype, "panel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTab.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsTab.prototype, "disabled", void 0);
__decorate([
    watch("active")
], SgdsTab.prototype, "handleActiveChange", null);
__decorate([
    watch("disabled")
], SgdsTab.prototype, "handleDisabledChange", null);
export default SgdsTab;
//# sourceMappingURL=sgds-tab.js.map