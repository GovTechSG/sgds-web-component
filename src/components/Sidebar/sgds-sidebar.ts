import { html } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
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
import { SidebarElement } from "./sidebar-element";
import SgdsSidebarGroup from "./sgds-sidebar-group";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import { SM_BREAKPOINT } from "../../utils/breakpoints";

const SGDS_SIDEBAR_GROUP = "sgds-sidebar-group";

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
 * @slot default - Insert sgds-sidebar-item, sgds-sidebar-group, and sgds-sidebar-section elements
 * @slot top - Insert brand/logo content in sidebar header
 * @slot bottom - Insert content in sidebar footer
 *
 * @fires sgds-select - Emitted when a sidebar item or group is selected.
 *   Event detail: { activeItem: string } - name of the selected item
 *
 */

export class SgdsSidebar extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarStyle];

  static dependencies = {
    "sgds-icon-button": SgdsIconButton
  };
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

  /** @internal */
  @queryAssignedElements()
  private _defaultNodes!: SidebarElement[];

  /** @internal */
  @state()
  private _isMobile = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main navigation");

    this.updateComplete.then(() => {
      this.addItemListeners();
      this._handleActive();
      document.addEventListener("click", this._handleClickOutOfElement);
    });

    window.addEventListener("resize", this._handleResize.bind(this));
    this._handleResize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleClickOutOfElement);
    window.removeEventListener("resize", this._handleResize.bind(this));
  }

  /**
   * Watch handler for the collapsed property.
   * Syncs the internal collapsed state with the property value.
   * Triggers re-render and updates all child items' collapsed styling.
   * @private
   * @returns {void}
   */
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

          parentEle._selected = true;

          parentEle._showMenu = parentEle._childLevel > 0; //setting this to true as the child is active
          parentEle = parentEle.parentElement as SgdsSidebarGroup;
        }
      }

      if (this._sidebarActiveGroup) {
        this._sidebarActiveGroup._selected = true;
      }
    }
  }

  /**
   * Watch handler for the active property.
   * Finds and sets the active item by name from the sidebar hierarchy.
   * Clears active state when active property is empty.
   * @private
   * @returns {void}
   */
  @watch("active")
  _handleActive() {
    // Return early if active is empty
    if (!this.active) {
      this._sidebarActiveItem = null;
      return;
    }

    this._sidebarActiveItem = this._getActiveChild();
  }

  /**
   * Recursively searches the sidebar hierarchy for an item matching the active name.
   * Traverses through all nested levels to find the target element.
   * Used to support programmatic selection of deeply nested items.
   * @private
   * @returns {SidebarElement | null} The matching sidebar element or null if not found
   */
  private _getActiveChild() {
    const findByName = (elements: SidebarElement[]): SidebarElement | null => {
      for (const element of elements) {
        if (element.name === this.active) {
          return element;
        }
        if (element._childElements?.length) {
          const found = findByName(element._childElements);
          if (found) return found;
        }
      }
      return null;
    };

    return findByName(this._defaultNodes);
  }
  /**
   * Handles window resize events to manage responsive behavior.
   * Automatically collapses sidebar on mobile devices (width <= SM_BREAKPOINT).
   * Expands sidebar on larger screens.
   * @private
   * @returns {void}
   */ private _handleResize() {
    const isMobile = window.innerWidth <= SM_BREAKPOINT;

    if (isMobile !== this._isMobile) {
      this._isMobile = isMobile;
      this.collapsed = this._isMobile;
    }
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
   * Updates the collapsed property to show/hide labels and adjust item spacing.
   * Called when user clicks the collapse/expand button in the sidebar header.
   * @private
   * @returns {void}
   */
  private toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Handles clicks outside the sidebar to close the drawer overlay.
   * Closes the nested items drawer when user clicks outside the sidebar.
   * Maintains drawer visibility when clicking within sidebar boundaries.
   * @private
   * @param {MouseEvent} e - The click event from the document
   * @returns {void}
   */
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
        <div class="sidebar-main">
          <div class="sidebar-wrapper">
            <div class="sidebar-top">
              <div class="sidebar-brand-name">
                <slot name="top"></slot>
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

            <nav class="sidebar-content" aria-activedescendant=${this._sidebarActiveItem?.name || ""}>
              <slot></slot>
            </nav>

            <slot name="bottom"></slot>
          </div>
        </div>

        <div
          class=${classMap({
            "sidebar-nested-overlay": true,
            show: this._showDrawer
          })}
          role="dialog"
          aria-label=${this._sidebarActiveGroup?.title ? `Nested items for ${this._sidebarActiveGroup.title}` : ""}
        >
          <sgds-icon-button
            name="chevron-left"
            variant="ghost"
            tone="neutral"
            size="sm"
            @click=${() => (this._showDrawer = false)}
            aria-label=${"Close drawer"}
            aria-expanded=${this._showDrawer}
          ></sgds-icon-button>

          ${this._drawerItems}
        </div>
      </div>
    `;
  }
}

export default SgdsSidebar;
