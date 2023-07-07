import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsTab } from "./sgds-tab";
import styles from "./sgds-tab-group.scss";
import { SgdsTabPanel } from "./sgds-tab-panel";

@customElement("sgds-tab-group")
export class SgdsTabGroup extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  @query(".tab-group") tabGroup: HTMLElement;
  @query(".tab-group__body") body: HTMLSlotElement;
  @query(".tab-group__nav") nav: HTMLElement;

  private activeTab?: SgdsTab;
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;
  private tabs: SgdsTab[] = [];
  private panels: SgdsTabPanel[] = [];

  @property({ reflect: true, attribute: true }) variant?: "tabs-basic-toggle" | "tabs-info-toggle";
  @property({type: String}) tabsClasses: string;

  connectedCallback() {
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

      // Set initial tab state when the tabs first become visible
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          // this.setTabVariant();
          this.setActiveTab(this.getActiveTab() ?? this.tabs[0], { emitEvents: false });
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.unobserve(this.nav);
  }

  /** Shows the specified tab panel. */
  show(panel: string) {
    const tab = this.tabs.find(el => el.panel === panel);

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  getAllTabs(options: { includeDisabled: boolean } = { includeDisabled: true }) {
    const slot = this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="nav"]');

    return [...(slot.assignedElements() as SgdsTab[])].filter(el => {
      return options.includeDisabled
        ? el.tagName.toLowerCase() === "sgds-tab"
        : el.tagName.toLowerCase() === "sgds-tab" && !el.disabled;
    });
  }

  getAllPanels() {
    return [...this.body.assignedElements()].filter(el => el.tagName.toLowerCase() === "sgds-tab-panel") as [
      SgdsTabPanel
    ];
  }

  getActiveTab() {
    return this.tabs.find(el => el.active);
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest("sgds-tab") as SgdsTab;
    const tabGroup = tab?.closest("sgds-tab-group");

    // Ensure the target tab is in this tab group
    if (tabGroup !== this) {
      return;
    }

    if (tab !== null) {
      this.setActiveTab(tab);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest("sgds-tab") as SgdsTab;
    const tabGroup = tab?.closest("sgds-tab-group");

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

      if (activeEl?.tagName.toLowerCase() === "sgds-tab") {
        let index = this.tabs.indexOf(activeEl);

        if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = this.tabs.length - 1;
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          index--;
        } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
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

  setActiveTab(tab: SgdsTab, options?: { emitEvents?: boolean }) {
    options = {
      emitEvents: true,
      ...options
    };

    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;

      // Sync active tab and panel
      this.tabs.map(el => (el.active = el === this.activeTab));
      this.panels.map(el => (el.active = el.name === this.activeTab?.panel));

      // Emit events
      if (options.emitEvents) {
        if (previousTab) {
          this.emit("sgds-tab-hide", { detail: { name: previousTab.panel } });
        }

        this.emit("sgds-tab-show", { detail: { name: this.activeTab.panel } });
      }
    }
  }

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
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs({ includeDisabled: false });
    this.panels = this.getAllPanels();
  }

  render() {
    return html`
      <div class="tab-group" @click=${this.handleClick} @keydown=${this.handleKeyDown} variant=${ifDefined(this.variant)}>
        <div class="tab-group__nav">
          <slot
            name="nav"
            class= ${classMap({
              sgds: true,
              "nav-tabs": true,
              nav: true,
              [`${this.tabsClasses}`] : this.tabsClasses
            })}
            role="tablist"
            variant=${ifDefined(this.variant)}
            @slotchange=${this.syncTabsAndPanels}
          ></slot>
        </div>
        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `;
  }
}

export default SgdsTabGroup;
