import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarStyle from "./sidebar.css";

import { provide } from "@lit/context";
import {
  SidebarCollapsed,
  SidebarActiveItem,
  SidebarActiveGroup,
  SidebarDrawerItems,
  SidebarDrawerOpen
} from "./sidebar-context";
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

const SGDS_SIDEBAR_GROUP = "sgds-sidebar-group";
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

  /** @internal Tracks the currently active group and provides it via context to all child elements */
  @provide({ context: SidebarActiveGroup })
  @state()
  _sidebarActiveGroup: SgdsSidebarGroup | null = null;

  /** @internal Tracks the collapsed state and provides it via context to all child elements */
  @provide({ context: SidebarCollapsed })
  @state()
  private _sidebarCollapsed: boolean;

  /** @internal Tracks the currently active item and provides it via context to all child elements */
  @provide({ context: SidebarActiveItem })
  @state()
  private _sidebarActiveItem: SidebarElement | null = null;

  /** @internal Provides the list of items shown in the drawer overlay */
  @provide({ context: SidebarDrawerItems })
  @state()
  private _drawerItems = [];

  /** @internal Indicates whether a drawer overlay is currently open */
  @provide({ context: SidebarDrawerOpen })
  @state()
  private _showDrawer = false;

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

  /**
   * Handles changes to the active item selection.
   * Updates selection state and manages drawer overlay visibility based on the active item's nesting level.
   * For root-level items with children, opens the drawer overlay.
   * For nested items, expands parent groups and opens the appropriate drawer if needed.
   * @private
   * @returns {void}
   */
  @watch("_sidebarActiveItem")
  _handleActiveItem() {
    if (!this._sidebarActiveItem) return;
    const childLevel = this._sidebarActiveItem._childLevel;
    this._sidebarActiveItem._selected = true;

    if (childLevel === 0) {
      // First level of navigation, check if need to open drawer or not.
      if (this._sidebarActiveItem._childElements.length > 0) {
        this._setNodesToDrawer(this._sidebarActiveItem as SgdsSidebarGroup);
      } else {
        this._revertNodesToParent();
      }
    } else {
      // when nested, we will find the top level of parent
      let parentEle = this._sidebarActiveItem.parentElement as SgdsSidebarGroup;

      while (parentEle._childLevel >= 0 && parentEle.tagName.toLowerCase() === SGDS_SIDEBAR_GROUP) {
        if (parentEle.tagName.toLowerCase() === SGDS_SIDEBAR_GROUP) {
          if (parentEle._childLevel === 0) {
            // when active item not in drawer, set nodes into drawer.
            if (!parentEle.classList.contains("sidebar-nested-overlay")) {
              this._setNodesToDrawer(parentEle);
            }
          }

          parentEle._showMenu = parentEle._childLevel > 0; //setting this to true as the child is active
          parentEle._selected = true;
          parentEle = parentEle.parentElement as SgdsSidebarGroup;
        }
      }
    }
  }

  @watch("active")
  _handleActive() {
    // Return early if active is empty
    if (!this.active) {
      this._sidebarActiveItem = null;
      return;
    }

    // finding active element in both shadowRoot and sidebar root with proper quoting
    const activeElement = this?.querySelector(`[name="${this.active}"]`);
    const activeShadowElement = this?.shadowRoot?.querySelector(`[name="${this.active}"]`);
    this._sidebarActiveItem = (activeElement || activeShadowElement) as SidebarElement;
  }

  /**
   * Manages the drawer overlay content based on the selected parent item.
   * If element is provided: Opens drawer for that element's children.
   * If element is undefined: Closes drawer and reverts items to their parent.
   * @private
   * @param {SgdsSidebarGroup} [element] - The parent item to display in drawer. Undefined closes drawer.
   * @returns {void}
   */
  private _setNodesToDrawer(element: SgdsSidebarGroup) {
    if (!element) return;

    // when there is element, we will revert the nodes of the previous active group before setting new value into the active group
    if (this._sidebarActiveGroup && element !== this._sidebarActiveGroup) {
      this._revertNodesToParent();
    }

    this._sidebarActiveGroup = element;

    // when there is an active group set, always set new menu items
    this._drawerItems = []; // always set to empty to prevent duplicate
    const menuItems = this._sidebarActiveGroup.querySelectorAll(
      ":scope > sgds-sidebar-group, :scope > sgds-sidebar-item"
    );
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
  private _revertNodesToParent() {
    if (this._sidebarActiveGroup) {
      this._drawerItems.forEach(e => {
        this._sidebarActiveGroup.append(e);
      });

      this._drawerItems = [];
    }

    this._sidebarActiveGroup = null;
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
    const groups = this.querySelectorAll(SGDS_SIDEBAR_GROUP);
    const allItems = [...items, ...groups] as SidebarElement[];

    allItems.forEach(item => {
      item.addEventListener("i-sgds-click", (e: CustomEvent) => {
        const element = e.detail.element as SidebarElement;

        if (element === this._sidebarActiveGroup) {
          // just toggle drawer
          this._showDrawer = !this._showDrawer;
        } else {
          if (this.active !== element.name) {
            this.active = element.name;
            allItems.forEach(item => (item._selected = false));
          }

          if (element._childElements.length > 0) {
            this._showDrawer = true;
          } else {
            this._showDrawer = false;

            // when there is anchorLink we will trigger click to redirect and allow user to handle the navigation themselves
            const anchorLink = item.querySelector(":scope > a") as HTMLAnchorElement;
            if (anchorLink) anchorLink.click();
          }

          // Emit sgds-select event when an item is selected
          this.emit("sgds-select", { detail: { activeItem: element.name } });
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
    this.collapsed = !this.collapsed;
  }

  private _handleClickOutOfElement = (e: MouseEvent) => {
    if (!this._sidebarActiveGroup) return;

    if (!e.composedPath().includes(this)) {
      this._showDrawer = false;
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

          <nav class="sidebar-content" role="navigation" aria-label="Main navigation" aria-activedescendant=${
            this._sidebarActiveItem?.name || ""
          }>
            <slot></slot>
          </nav>
        </div>

          <div
            class=${classMap({
              "sidebar-nested-overlay": true,
              show: this._showDrawer
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
