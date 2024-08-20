import { __decorate } from "tslib";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import tabGroupStyle from "./tab-group.css";
/**
 * @summary Tab Group organizes content into a container with the syncing of tab and their corresponding panels.
 * Each tab must be slotted into the nav slot and its `panel` must refer to a tab panel of the same name.
 *
 * @slot default - The slot for `sgds-tab-panel`
 * @slot nav - The slot for `sgds-tab`
 *
 * @event sgds-tab-show  Emitted when a tab and its panels are shown
 * @event sgds-tab-hide  Emitted when a tab and its panels are hidden.
 *
 * @csspart body - The container wrapping the default slot where all `sgds-tab-panel`s are slotted.
 * @csspart nav - The container wrapping the default slot where all `sgds-tab`s are slotted.
 *
 * @cssproperty --sgds-tab-group-margin-bottom - The bottom margin of tab group
 * @cssproperty --sgds-tab-group-padding-left - The left padding of tab group
 * @cssproperty --sgds-tab-group-gap - The gap between the elements of tab group
 *
 */
export class SgdsTabGroup extends SgdsElement {
    constructor() {
        super(...arguments);
        /**@internal */
        this.tabs = [];
        /**@internal */
        this.panels = [];
    }
    connectedCallback() {
        const whenAllDefined = Promise.all([
            customElements.whenDefined("sgds-tab"),
            customElements.whenDefined("sgds-tab-panel")
        ]);
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(() => {
            return;
        });
        this.mutationObserver = new MutationObserver(mutations => {
            // Update aria labels when the DOM changes
            if (mutations.some(m => !["aria-labelledby", "aria-controls"].includes(m.attributeName))) {
                setTimeout(() => this.setAriaLabels());
            }
            // Sync tabs when disabled states change
            if (mutations.some(m => m.attributeName === "disabled")) {
                this.syncTabsAndPanels();
            }
        });
        this.updateComplete.then(() => {
            this.syncTabsAndPanels();
            this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
            this.resizeObserver.observe(this.nav);
            whenAllDefined.then(() => {
                // Set initial tab state when the tabs first become visible
                const intersectionObserver = new IntersectionObserver((entries, observer) => {
                    var _a;
                    if (entries[0].intersectionRatio > 0) {
                        this.setAriaLabels();
                        // this.setTabVariant();
                        this.setActiveTab((_a = this.getActiveTab()) !== null && _a !== void 0 ? _a : this.tabs[0], { emitEvents: false });
                        observer.unobserve(entries[0].target);
                    }
                });
                intersectionObserver.observe(this.tabGroup);
            });
        });
    }
    disconnectedCallback() {
        this.mutationObserver.disconnect();
        this.resizeObserver.unobserve(this.nav);
    }
    /** Shows the specified tab panel. */
    show(panel) {
        const tab = this.tabs.find(el => el.panel === panel);
        if (tab) {
            this.setActiveTab(tab);
        }
    }
    /** @internal */
    getAllTabs(options = { includeDisabled: true }) {
        const slot = this.shadowRoot.querySelector('slot[name="nav"]');
        return [...slot.assignedElements()].filter(el => {
            return options.includeDisabled
                ? el.tagName.toLowerCase() === "sgds-tab"
                : el.tagName.toLowerCase() === "sgds-tab" && !el.disabled;
        });
    }
    /** @internal */
    getAllPanels() {
        return [...this.body.assignedElements()].filter(el => el.tagName.toLowerCase() === "sgds-tab-panel");
    }
    /** @internal */
    getActiveTab() {
        return this.tabs.find(el => el.active);
    }
    /** @internal */
    handleClick(event) {
        const target = event.target;
        const tab = target.closest("sgds-tab");
        const tabGroup = tab === null || tab === void 0 ? void 0 : tab.closest("sgds-tab-group");
        // Ensure the target tab is in this tab group
        if (tabGroup !== this) {
            return;
        }
        if (tab !== null) {
            this.setActiveTab(tab);
        }
    }
    /** @internal */
    handleKeyDown(event) {
        const target = event.target;
        const tab = target.closest("sgds-tab");
        const tabGroup = tab === null || tab === void 0 ? void 0 : tab.closest("sgds-tab-group");
        // Ensure the target tab is in this tab group
        if (tabGroup !== this) {
            return;
        }
        // Activate a tab
        if (["Enter", " "].includes(event.key)) {
            if (tab !== null) {
                this.setActiveTab(tab);
                event.preventDefault();
            }
        }
        // Move focus left or right
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
            const activeEl = this.tabs.find(t => t.matches(":focus"));
            if ((activeEl === null || activeEl === void 0 ? void 0 : activeEl.tagName.toLowerCase()) === "sgds-tab") {
                let index = this.tabs.indexOf(activeEl);
                if (event.key === "Home") {
                    index = 0;
                }
                else if (event.key === "End") {
                    index = this.tabs.length - 1;
                }
                else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    index--;
                }
                else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    index++;
                }
                if (index < 0) {
                    index = this.tabs.length - 1;
                }
                if (index > this.tabs.length - 1) {
                    index = 0;
                }
                this.tabs[index].focus({ preventScroll: true });
                this.setActiveTab(this.tabs[index] /** , { scrollBehavior: "smooth" }*/);
                event.preventDefault();
            }
        }
    }
    /** @internal */
    setActiveTab(tab, options) {
        options = Object.assign({ emitEvents: true }, options);
        if (tab !== this.activeTab && !tab.disabled) {
            const previousTab = this.activeTab;
            this.activeTab = tab;
            // Sync active tab and panel
            this.tabs.map(el => (el.active = el === this.activeTab));
            this.panels.map(el => { var _a; return (el.active = el.name === ((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.panel)); });
            // Emit events
            if (options.emitEvents) {
                if (previousTab) {
                    this.emit("sgds-tab-hide", { detail: { name: previousTab.panel } });
                }
                this.emit("sgds-tab-show", { detail: { name: this.activeTab.panel } });
            }
        }
    }
    /** @internal */
    setAriaLabels() {
        // Link each tab with its corresponding panel
        this.tabs.forEach(tab => {
            const panel = this.panels.find(el => el.name === tab.panel);
            if (panel) {
                tab.setAttribute("aria-controls", panel.getAttribute("id"));
                panel.setAttribute("aria-labelledby", tab.getAttribute("id"));
            }
        });
    }
    // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
    /** @internal */
    syncTabsAndPanels() {
        this.tabs = this.getAllTabs({ includeDisabled: false });
        this.panels = this.getAllPanels();
    }
    render() {
        return html `
      <div
        class="tab-group"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        variant=${ifDefined(this.variant)}
      >
        <div part="nav" class="tab-group__nav" role="tablist">
          <slot
            name="nav"
            class=${classMap({
            sgds: true,
            "nav-tabs": true,
            nav: true
        })}
            variant=${ifDefined(this.variant)}
            @slotchange=${this.syncTabsAndPanels}
          ></slot>
        </div>
        <div part="body">
          <slot class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `;
    }
}
SgdsTabGroup.styles = [...SgdsElement.styles, tabGroupStyle];
__decorate([
    query(".tab-group")
], SgdsTabGroup.prototype, "tabGroup", void 0);
__decorate([
    query(".tab-group__body")
], SgdsTabGroup.prototype, "body", void 0);
__decorate([
    query(".tab-group__nav")
], SgdsTabGroup.prototype, "nav", void 0);
__decorate([
    property({ reflect: true, attribute: true })
], SgdsTabGroup.prototype, "variant", void 0);
export default SgdsTabGroup;
//# sourceMappingURL=sgds-tab-group.js.map