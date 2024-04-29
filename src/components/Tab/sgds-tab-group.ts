import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsTab } from "./sgds-tab";
import { SgdsTabPanel } from "./sgds-tab-panel";
import tabGroupStyle from "./tab-group.style";
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
 */
export class SgdsTabGroup extends SgdsElement {
  static styles = [tabGroupStyle];
  /**@internal */
  @query(".tab-group") tabGroup: HTMLElement;
  /**@internal */
  @query(".tab-group__body") body: HTMLSlotElement;
  /**@internal */
  @query(".tab-group__nav") nav: HTMLElement;
  /**@internal */
  private activeTab?: SgdsTab;
  /**@internal */
  private mutationObserver: MutationObserver;
  /**@internal */
  private resizeObserver: ResizeObserver;
  /**@internal */
  private tabs: SgdsTab[] = [];
  /**@internal */
  private panels: SgdsTabPanel[] = [];
  /** The variant types of tabs. Controls the visual stylesof all `sgds-tabs` in its slot. It also dynamically changes the slots of `sgds-tab` */
  @property({ reflect: true, attribute: true }) variant: "tabs-basic-toggle" | "tabs-info-toggle";
  /** Forwards css tokens to the container div of slot[name=nav] where all `sgds-tab` are slotted in */
  @property({ type: String, reflect: true }) tabsClasses: string;
  /** Forwards css tokens to the container div of slot where all `sgds-tab-panel` are slotted in */
  @property({ type: String, reflect: true }) bodyClasses: string;

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
          if (entries[0].intersectionRatio > 0) {
            this.setAriaLabels();
            // this.setTabVariant();
            this.setActiveTab(this.getActiveTab() ?? this.tabs[0], { emitEvents: false });
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
  public show(panel: string) {
    const tab = this.tabs.find(el => el.panel === panel);

    if (tab) {
      this.setActiveTab(tab);
    }
  }
  /** @internal */
  private getAllTabs(options: { includeDisabled: boolean } = { includeDisabled: true }) {
    const slot = this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="nav"]');

    return [...(slot.assignedElements() as SgdsTab[])].filter(el => {
      return options.includeDisabled
        ? el.tagName.toLowerCase() === "sgds-tab"
        : el.tagName.toLowerCase() === "sgds-tab" && !el.disabled;
    });
  }
  /** @internal */
  private getAllPanels() {
    return [...this.body.assignedElements()].filter(el => el.tagName.toLowerCase() === "sgds-tab-panel") as [
      SgdsTabPanel
    ];
  }
  /** @internal */
  private getActiveTab() {
    return this.tabs.find(el => el.active);
  }
  /** @internal */
  private handleClick(event: MouseEvent) {
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
  /** @internal */
  private handleKeyDown(event: KeyboardEvent) {
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
  /** @internal */
  private setActiveTab(tab: SgdsTab, options?: { emitEvents?: boolean }) {
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
  /** @internal */
  private setAriaLabels() {
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
  private syncTabsAndPanels() {
    this.tabs = this.getAllTabs({ includeDisabled: false });
    this.panels = this.getAllPanels();
  }

  render() {
    return html`
      <div
        class="tab-group"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        variant=${ifDefined(this.variant)}
      >
        <div
          part="nav"
          class=${classMap({
            "tab-group__nav": true,
            [`${this.tabsClasses}`]: this.tabsClasses
          })}
          role="tablist"
        >
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
        <div
          part="body"
          class=${classMap({
            [`${this.bodyClasses}`]: this.bodyClasses
          })}
        >
          <slot class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsTabGroup;
