import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarStyle from "./sidebar.css";

import { provide } from "@lit/context";
import { SidebarCollapsed, SidebarActiveItem, SidebarActiveGroup, SidebarDrawerItems } from "./sidebar-context";
import { watch } from "../../utils/watch";
import { SidebarElement } from "../../base/sidebar-element";
import SgdsSidebarGroup from "./sgds-sidebar-group";

/**
 * @summary Sidebar is a collapsible navigation component that displays menu items and groups.
 * Users can expand and collapse the sidebar to save screen space while navigating through organized menu items.
 * The sidebar coordinates selection and navigation across nested items using context providers and custom events.
 *
 * Features:
 * - Collapsible state for space-saving layouts with icon-only mode
 * - Multi-level nesting (up to 3 levels) with drawer overlay for root-level groups
 * - Keyboard navigation with full ARIA support for accessibility
 * - Programmatic link navigation support with anchor elements
 * - Active item tracking and synchronized state management
 *
 * Keyboard Navigation:
 * - Arrow Up/Down: Navigate between sidebar items and groups
 * - Arrow Left/Right: Collapse/expand groups or navigate drawer overlays
 * - Enter/Space: Activate focused item or toggle group
 * - Tab: Standard focus management to interactive elements
 *
 * @slot - Insert sgds-sidebar-item, sgds-sidebar-group, and sgds-sidebar-section elements
 * @slot brandName - Insert brand/logo content in sidebar header
 *
 * @fires sgds-select - Emitted when a sidebar item or group is selected.
 *   Event detail: { activeItem: string } - name of the selected item
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
  private _sidebarActiveItem = null;

  /** @internal */
  @provide({ context: SidebarDrawerItems })
  @state()
  private _drawerItems = [];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main navigation");
    this.addItemListeners();
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
    // finding active element in both shadowRoot and sidebar root
    const activeElement = this?.querySelector(`[name=${this.active}]`);
    const activeShadowElement = this?.shadowRoot?.querySelector(`[name=${this.active}]`);
    this._sidebarActiveItem = (activeElement || activeShadowElement) as SidebarElement;

    if (this._sidebarActiveItem) {
      this._sidebarActiveItem._selected = true;

      if (this._sidebarActiveItem._childLevel > 0) {
        let parentEle = this._sidebarActiveItem.parentElement as SgdsSidebarGroup;

        while (parentEle._childLevel > 0) {
          parentEle._selected = true;

          // when in drawer, we need to open the menu
          parentEle.showMenu = parentEle._childLevel >= 1;
          parentEle = parentEle.parentElement as SgdsSidebarGroup;
        }

        if (!this._sidebarActiveGroup) {
          this._setNodesToDrawer(parentEle);
        } else {
          this._sidebarActiveGroup._selected = true;
        }
      }
    }
  }

  /**
   * Manages the drawer overlay content based on the selected parent item.
   * If element is provided: Opens drawer for that element's children.
   * If element is undefined: Closes drawer and reverts items to their parent.
   * @private
   * @param {SidebarElement} [element] - The parent item to display in drawer. Undefined closes drawer.
   * @returns {void}
   */
  private _setNodesToDrawer(element: SidebarElement) {
    // when there is element, we will revert the nodes of the previous active group before setting new value into the active group
    if (this._sidebarActiveGroup && element !== this._sidebarActiveGroup) {
      this._revertNodesToParent(this._sidebarActiveGroup);
    }

    this._sidebarActiveGroup = element;
    this._sidebarActiveGroup._selected = true;

    // when there is an active group set, always set new menu items
    this._drawerItems = []; // always set to empty to prevent duplicate
    const menuItems = this._sidebarActiveGroup.querySelectorAll(":scope > *");
    menuItems.forEach(e => {
      this._drawerItems.push(e);
    });
  }

  /**
   * Reverts nested items back to their original parent element.
   * Clears the drawer overlay content and updates selected attributes.
   * Called when closing the drawer or switching to a different parent item.
   * @private
   * @param {SgdsSidebarItem} element - The parent item to return nodes to
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
   * Attaches event listeners to all direct child sidebar items.
   * Handles item selection events and drawer overlay state management.
   * Manages emitting sgds-select custom events for external components.
   * @private
   * @returns {void}
   */
  private addItemListeners() {
    const items = this.querySelectorAll("sgds-sidebar-item");
    const groups = this.querySelectorAll("sgds-sidebar-group");
    const allItems = [...items, ...groups];

    allItems.forEach(item => {
      item.addEventListener("i-sgds-click", (e: CustomEvent) => {
        const element = e.detail.element as SidebarElement;
        const childLevel = e.detail.level;

        if (element.name === this._sidebarActiveItem?.name && this._sidebarActiveItem !== this._sidebarActiveGroup)
          return;

        allItems.forEach(v => ((v as SidebarElement)._selected = false));

        if (element === this._sidebarActiveGroup) {
          // when same we close drawer
          this.closeDrawer();
          return;
        } else {
          if (element._childElements.length == 0) {
            // when it is not nested item
            if (childLevel === 0) this.closeDrawer();

            // when there is anchorLink we will trigger click to redirect and allow user to handle the navigation themselves
            const anchorLink = item.querySelector(":scope > a") as HTMLAnchorElement;
            if (anchorLink) anchorLink.click();
          } else {
            // has children we will render
            if (childLevel === 0) this._setNodesToDrawer(element);
          }

          this.active = element.name || "";
          this.emit("sgds-select", {
            detail: { activeItem: element.name || "" }
          });
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
    this._sidebarActiveItem = null;
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

          <nav class="sidebar-content" aria-label="Navigation menu" aria-activedescendant=${
            this._sidebarActiveItem?.name || ""
          }>
            <slot></slot>
          </nav>
        </div>

          <div
            class=${classMap({
              "sidebar-nested-overlay": true,
              show: this._sidebarActiveGroup !== null
            })}
            role="dialog"
            aria-label=${this._sidebarActiveGroup?.title ? `Nested items for ${this._sidebarActiveGroup.title}` : ""}
          >
            ${this._drawerItems}
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebar;
