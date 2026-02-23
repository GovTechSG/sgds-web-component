import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarStyle from "./sidebar.css";

import { provide } from "@lit/context";
import { SidebarCollapsed, SidebarActiveItem, SidebarActiveGroup, SidebarDrawerItems } from "./sidebar-context";
import { watch } from "../../utils/watch";
import { SidebarElement } from "../../base/sidebar-element";

/**
 * @summary Sidebar is a collapsible navigation component that displays menu items and options.
 * Users can expand and collapse the sidebar to save screen space. The sidebar coordinates
 * selection and navigation across nested items using context providers and custom events.
 *
 * Features:
 * - Collapsible state for space-saving layouts
 * - Multi-level nesting with drawer overlay for level 0 items
 * - Keyboard navigation with full ARIA support
 * - Programmatic link navigation support
 *
 * Keyboard Navigation:
 * - Arrow Up/Down: Navigate between all first-level sidebar items and groups
 * - Arrow Left/Right: Collapse/expand items or navigate in drawer
 * - Enter: Activate the focused item or group
 * - Tab: Navigate to interactive elements (standard focus management)
 *
 * @slot - Insert sgds-sidebar-item, sgds-sidebar-group, and sgds-sidebar-section elements
 * @slot brandName - Insert brand/logo content in sidebar header
 *
 * @fires sgds-select - Emitted when a sidebar item or group is selected.
 *   Detail object: { activeItem: string, activeGroup: string | null, source: "item" | "drawer" }
 *
 */
export class SgdsSidebar extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarStyle];

  /**
   * Controls whether the sidebar is collapsed or expanded.
   * When true, the sidebar is in collapsed state showing only icons.
   * When false, the sidebar is expanded displaying full labels and content.
   * Affects all child items by toggling visibility of labels and adjusting spacing.
   * @attribute collapsed
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /**
   * The name of the currently active sidebar item or group.
   * Reflects the selected item and allows external control of sidebar selection.
   * Used to synchronize sidebar state with external navigation state or programmatic selection.
   * When set, the corresponding item with matching `name` attribute will be highlighted as active.
   * @attribute active
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) active = "";

  /** @internal */
  @provide({ context: SidebarActiveGroup })
  @state()
  _sidebarActiveGroup = null;

  /** @internal */
  @provide({ context: SidebarCollapsed })
  @state()
  private _sidebarCollapsed: boolean;

  /** @internal */
  @provide({ context: SidebarActiveItem })
  @state()
  private _sidebarActiveItem = "";

  /** @internal */
  @provide({ context: SidebarDrawerItems })
  @state()
  private _drawerItems = [];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main navigation");
    this.addOptionListeners();
    document.addEventListener("click", this._handleClickOutOfElement);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleClickOutOfElement);
  }

  @watch("collapsed")
  _handleCollapsed() {
    this._sidebarCollapsed = this.collapsed;
  }

  @watch("active")
  _handleActive() {
    this._sidebarActiveItem = this.active;
  }

  /**
   * Manages the drawer overlay content based on the selected parent option.
   * If element is provided: Opens drawer for that element's children.
   * If element is undefined: Closes drawer and reverts items to their parent.
   * @private
   * @param {SidebarElement} [element] - The parent option to display in drawer. Undefined closes drawer.
   * @returns {void}
   */
  private _setNodesToDrawer(element?: SidebarElement) {
    if (this._sidebarActiveGroup) {
      // when there is element, we will revert the nodes of the previous active group before setting new value into the active group
      if (element) {
        this._revertNodesToParent(this._sidebarActiveGroup);
        this._sidebarActiveGroup = element;
      }

      // when there is an active group set, always set new menu items
      const menuItems = this._sidebarActiveGroup.querySelectorAll(":scope > *");
      this._drawerItems = []; // always set to empty to prevent duplicate
      menuItems.forEach(e => {
        this._drawerItems.push(e);
      });
    }
  }

  /**
   * Reverts nested options back to their original parent element.
   * Clears the drawer overlay content and updates selected attributes.
   * Called when closing the drawer or switching to a different parent option.
   * @private
   * @param {SgdsSidebarItem} element - The parent option to return nodes to
   * @returns {void}
   */
  private _revertNodesToParent(element: SidebarElement | null) {
    if (element) {
      this._drawerItems.forEach(e => {
        element.append(e);
      });
      this._drawerItems = [];
    }
  }

  /**
   * Attaches event listeners to all direct child sidebar options.
   * Handles option selection events and drawer overlay state management.
   * Manages emitting sgds-select custom events for external components.
   * @private
   * @returns {void}
   */
  private addOptionListeners() {
    const options = this.querySelectorAll("sgds-sidebar-item");
    const groups = this.querySelectorAll("sgds-sidebar-group");

    [...options, ...groups].forEach(option => {
      option.addEventListener("i-sgds-click", (e: CustomEvent) => {
        const element = e.detail.element;

        if (e.detail.level === 0) {
          this.closeDrawer();
        }

        this._sidebarActiveItem = element.name;
        this.emit("sgds-select", {
          detail: {
            activeItem: element.name,
            activeGroup: null,
            source: "item"
          }
        });

        // when there is achorlink we will trigger click to redirect and allow user to handle the navigation themselves
        const anchorLink = option.querySelector(":scope > a") as HTMLAnchorElement;
        if (anchorLink) anchorLink.click();
      });
    });

    groups.forEach(group => {
      group.addEventListener("i-sgds-sidebar-open-drawer", (e: CustomEvent) => {
        const element = e.detail.element as SidebarElement;
        if (!this._sidebarActiveGroup) {
          // when current selected is empty, means drawer is not opened.
          this._sidebarActiveGroup = element;
        } else {
          if (this._sidebarActiveGroup === element) {
            this.closeDrawer();
          }
        }

        // setting nodes
        this._setNodesToDrawer(this._sidebarActiveGroup !== element ? element : undefined);

        if (e.detail.selected) {
          this._sidebarActiveItem = element.name;
          this.emit("sgds-select", {
            detail: {
              activeItem: element.name,
              activeGroup: element.name,
              source: "drawer"
            }
          });
        }

        // Auto-focus first drawer item for keyboard accessibility
        if (this._drawerItems?.length > 0) {
          setTimeout(() => {
            const activeItem = this._sidebarActiveItem
              ? this.shadowRoot.querySelectorAll(`[name=${this._sidebarActiveItem}]`)
              : [];
            const item = activeItem[0] || this._drawerItems[0];
            const focusItem = item?.shadowRoot?.querySelector("[tabindex]") as HTMLElement | null;
            focusItem?.focus();
          }, 0);
        }
      });
    });
  }

  /**
   * Toggles the sidebar between collapsed and expanded states.
   * Updates the collapsed property and emits sgds-sidebar-toggle event.
   *
   * @emits sgds-sidebar-toggle Emitted with detail.collapsed indicating new state
   * @returns {void}
   */
  private toggleCollapsed() {
    this._sidebarCollapsed = !this._sidebarCollapsed;
  }

  private closeDrawer() {
    this._revertNodesToParent(this._sidebarActiveGroup);
    this._sidebarActiveGroup = null;
    this._sidebarActiveItem = "";
  }

  private _handleClickOutOfElement = (e: MouseEvent) => {
    if (!this._sidebarActiveGroup) return;

    if (!e.composedPath().includes(this)) {
      this.closeDrawer();
    }
  };

  render() {
    return html`
      <div
        class=${classMap({
          sidebar: true,
          "sidebar--expanded": !this._sidebarCollapsed,
          "sidebar--collapsed": this._sidebarCollapsed
        })}
      >
        <div class="sidebar-wrapper">
          <div class="sidebar-header">
            <div class="sidebar-brand-name">
              <slot name="brandName"></slot>
            </div>

            <sgds-icon-button
              name=${this._sidebarCollapsed ? "sidebar-expand" : "sidebar-collapse"}
              variant="ghost"
              tone="neutral"
              size="sm"
              @click=${this.toggleCollapsed}
              aria-label=${this._sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded=${!this._sidebarCollapsed}
            ></sgds-icon-button>
          </div>

          <nav class="sidebar-content" aria-label="Navigation menu" aria-activedescendant=${this._sidebarActiveItem}>
            <slot></slot>
          </nav>
        </div>

          <div
            class=${classMap({
              "sidebar-nested-overlay": true,
              show: this._sidebarActiveGroup !== null
            })}
            role="dialog"
            aria-label=${this._sidebarActiveGroup?.title ? `Nested options for ${this._sidebarActiveGroup.title}` : ""}
          >
            ${this._drawerItems}
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebar;
