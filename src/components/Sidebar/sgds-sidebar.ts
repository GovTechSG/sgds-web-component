import { html, nothing } from "lit";
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
  SidebarDrawerOpen,
  SidebarDrawerOverlay
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
   * Controls whether the sidebar is collapsed or expanded to save screen space.
   * When true, sidebar displays icon-only mode for root items. When false, full labels and content are shown.
   * On mobile devices (width <= 576px), this is automatically toggled based on screen size.
   * Collapsing propagates to child items, affecting label visibility and spacing.
   * @attribute collapsed
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /**
   * The name of the currently active sidebar item or group for programmatic control.
   * Setting this property programmatically selects the item with the matching `name` attribute.
   * Automatically expands parent groups to reveal nested items and syncs the active state throughout the hierarchy.
   * Clearing this property (setting to empty string) deselects all items.
   * @attribute active
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) active = "";

  /**
   * Shows a scrim/overlay background behind the drawer or sidebar in overlay mode.
   * When true, displays a semi-transparent dark overlay behind the drawer to focus user attention.
   * Only visible when drawer is open or in overlay mode with sidebar not collapsed.
   * @attribute scrim
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) scrim = false;

  /**
   * Enables overlay mode for the sidebar, displaying it as a floating panel over page content.
   * When true, sidebar behaves as an overlay with a close button. When false, sidebar is inline.
   * In overlay mode, clicking outside the sidebar closes it. Used for responsive mobile layouts.
   * @attribute overlay
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) overlay = false;

  /** @internal Tracks the currently active group and provides it via context to all child elements */
  @provide({ context: SidebarActiveGroup })
  @state()
  _sidebarActiveGroup: SgdsSidebarGroup | null = null;

  /** @internal Syncs collapsed state to all descendants via context */
  @provide({ context: SidebarCollapsed })
  @state()
  private _sidebarCollapsed = false;

  /** @internal Syncs active item selection to all descendants via context */
  @provide({ context: SidebarActiveItem })
  @state()
  private _sidebarActiveItem: SidebarElement | null = null;

  /** @internal Provides drawer items to descendants via context */
  @provide({ context: SidebarDrawerItems })
  @state()
  private _drawerItems: Element[] = [];

  /** @internal Provides drawer open/closed state to descendants via context */
  @provide({ context: SidebarDrawerOpen })
  @state()
  private _showDrawer = false;

  /** @internal Provides overlay mode state to descendants via context */
  @provide({ context: SidebarDrawerOverlay })
  @state()
  private _isOverlay = false;

  /** @internal */
  @queryAssignedElements()
  private _defaultNodes!: SidebarElement[];

  /** @internal */
  @state()
  private _isMobile = false;

  /** @internal Bound resize handler for proper event listener removal */
  private _boundHandleResize = this._handleResize.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main navigation");

    this.updateComplete.then(() => {
      this._handleActive();
    });

    window?.addEventListener("resize", this._boundHandleResize);
    this._handleResize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document?.removeEventListener("click", this._handleClickOutOfElement);
    window?.removeEventListener("resize", this._boundHandleResize);
  }

  firstUpdated() {
    document?.addEventListener("click", this._handleClickOutOfElement);
    this._isOverlay = this.overlay;
  }

  updated() {
    this._handleActive();
  }

  private _handleSlotChange = () => {
    this.addItemListeners();
  };
  /**
   * Syncs collapsed property changes to all child items through context provider.
   * Updates internal state and triggers re-render with appropriate CSS classes.
   * @internal
   * @returns {void}
   */
  @watch("collapsed")
  _handleCollapsed() {
    this._sidebarCollapsed = this.collapsed;
  }

  /**
   * Updates sidebar state when active item changes via context provider.
   * Marks items as selected and handles drawer overlay visibility based on nesting level.
   * Root-level items with children trigger drawer display. Nested selections expand parent groups.
   * @internal
   * @returns {void}
   */
  @watch("_sidebarActiveItem")
  _handleActiveItem() {
    if (!this._sidebarActiveItem) return;

    const items = this.querySelectorAll("sgds-sidebar-item");
    const groups = this.querySelectorAll(SGDS_SIDEBAR_GROUP);
    const allItems = [...items, ...groups] as SidebarElement[];
    allItems.forEach(item => (item._selected = false));

    const childLevel = this._sidebarActiveItem._childLevel;
    this._sidebarActiveItem._selected = true;

    if (childLevel === 1) {
      // First level of navigation, check if need to open drawer or not.
      if (this._sidebarActiveItem._childElements.length > 0) {
        this._setNodesToDrawer(this._sidebarActiveItem as SgdsSidebarGroup);
      } else {
        this._revertNodesToParent();
      }
    } else {
      // when nested, we will find the top level of parent
      let parentEle = this._sidebarActiveItem.parentElement as SgdsSidebarGroup;

      while (parentEle._childLevel >= 1 && parentEle.tagName.toLowerCase() === SGDS_SIDEBAR_GROUP) {
        if (parentEle.tagName.toLowerCase() === SGDS_SIDEBAR_GROUP) {
          if (parentEle._childLevel === 1) {
            // when active item not in drawer, set nodes into drawer.
            if (!parentEle.classList.contains("sidebar-nested-overlay")) {
              this._setNodesToDrawer(parentEle);
            }
          }

          parentEle._selected = true;

          parentEle._showMenu = parentEle._childLevel > 1; // setting this to true as the child is active
          parentEle = parentEle.parentElement as SgdsSidebarGroup;
        }
      }

      if (this._sidebarActiveGroup) {
        this._sidebarActiveGroup._selected = true;
      }
    }
  }

  /**
   * Finds and activates sidebar items matching the active property name.
   * Recursively searches the hierarchy for the target item. Clears selection when active is empty.
   * @internal
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
   * Recursively searches all nesting levels for a sidebar element matching the active name.
   * Traverses the complete hierarchy to support selection of deeply nested items.
   * @internal
   * @returns {SidebarElement | null} The matching element or null if not found
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
   * Manages responsive collapse behavior on window resize.
   * Auto-collapses sidebar on mobile screens (width <= 576px), expands on larger screens.
   * @internal
   * @returns {void}
   */
  private _handleResize() {
    const isMobile = window.innerWidth <= SM_BREAKPOINT;

    if (isMobile !== this._isMobile) {
      this._isMobile = isMobile;
      this.collapsed = this._isMobile;
    }
  }

  /**
   * Populates drawer overlay with children of the specified parent group.
   * Clears previous drawer content before adding new items. Reverts previous group's items to parent.
   * @internal
   * @param {SgdsSidebarGroup} element - The parent group whose children to display in drawer
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
   * Returns drawer items to their original parent element and clears the drawer.
   * Called when closing the drawer or switching active groups.
   * @internal
   * @returns {void}
   */
  private _revertNodesToParent() {
    if (this._sidebarActiveGroup) {
      this._drawerItems.forEach(e => {
        this._sidebarActiveGroup?.append(e);
      });

      this._drawerItems = [];
    }

    this._sidebarActiveGroup = null;
  }

  /**
   * Registers click handlers on sidebar items and groups for selection and drawer management.
   * Emits sgds-select events to notify external components of item selection.
   * @internal
   * @returns {void}
   */
  private addItemListeners() {
    const items = this.querySelectorAll("sgds-sidebar-item");
    const groups = this.querySelectorAll(SGDS_SIDEBAR_GROUP);
    const allItems = [...items, ...groups] as SidebarElement[];

    allItems.forEach(item => {
      item.addEventListener("i-sgds-click", (e: Event) => {
        const element = (e as CustomEvent).detail.element as SidebarElement;

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
   * Toggles the sidebar between collapsed and expanded display modes.
   * Updates labels visibility and spacing accordingly. Called when user clicks collapse button.
   * @public
   * @returns {void}
   */
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  /**
   * Closes drawer when user clicks outside the sidebar.
   * Also collapses overlay sidebar when clicking outside (if in overlay mode).
   * @internal
   * @param {MouseEvent} e - The click event from document
   * @returns {void}
   */
  private _handleClickOutOfElement = (e: MouseEvent) => {
    const overlay = e.composedPath().find(e => (e as HTMLElement)?.classList?.contains("sidebar--overlay"));
    if (overlay || !e.composedPath().includes(this)) {
      this._showDrawer = false;

      if (this.overlay) {
        const toggler = (e.target as HTMLElement).getAttribute("data-sidebar-toggler");

        if (!toggler) this.collapsed = true;
      }
    }
  };

  render() {
    return html`
      <div
        class=${classMap({
          sidebar: true,
          "sidebar--collapsed": this._sidebarCollapsed,
          overlay: this.overlay
        })}
      >
        <div
          class=${classMap({
            "sidebar--overlay": this.scrim,
            show: this.scrim && (this._showDrawer || (this.overlay && !this._sidebarCollapsed))
          })}
        ></div>

        <div class="sidebar-main">
          <div class="sidebar-wrapper">
            <div class="sidebar-top">
              <div class="sidebar-brand-name">
                <slot name="top"></slot>
              </div>

              ${!this.overlay
                ? html`<sgds-icon-button
                    name=${this._sidebarCollapsed ? "sidebar-expand" : "sidebar-collapse"}
                    variant="ghost"
                    tone="neutral"
                    size="sm"
                    @click=${this.toggleCollapsed}
                    aria-label=${this._sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-expanded=${!this._sidebarCollapsed}
                  ></sgds-icon-button>`
                : nothing}
            </div>

            <nav class="sidebar-content" aria-activedescendant=${this._sidebarActiveItem?.name || ""}>
              <slot @slotchange=${this._handleSlotChange}></slot>
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
          ${this._isMobile
            ? html`<sgds-icon-button
                name="chevron-left"
                variant="ghost"
                tone="neutral"
                size="sm"
                @click=${() => (this._showDrawer = false)}
                aria-label=${"Close drawer"}
                aria-expanded=${this._showDrawer}
              ></sgds-icon-button>`
            : nothing}
          ${this._drawerItems}
        </div>
      </div>
    `;
  }
}

export default SgdsSidebar;
