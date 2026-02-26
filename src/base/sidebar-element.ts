import { property, queryAssignedElements, state } from "lit/decorators.js";
import { DropdownElement } from "./dropdown-element";
import { PropertyValueMap } from "lit";
import SgdsElement from "./sgds-element";
import { consume } from "@lit/context";
import {
  SidebarActiveGroup,
  SidebarActiveItem,
  SidebarCollapsed,
  SidebarDrawerItems,
  SidebarDrawerOpen
} from "../components/Sidebar/sidebar-context";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ENTER = "Enter";

/**
 * @summary Base class for sidebar navigation components.
 * Provides core functionality for sidebar items and groups including keyboard navigation,
 * selection state management, and nesting support. This class manages hierarchical navigation,
 * active state tracking, and drawer overlay coordination through context providers.
 *
 * Features:
 * - Multi-level keyboard navigation (Arrow keys, Enter)
 * - Active state management via Lit context subscription
 * - Support for nested hierarchies up to 3 levels deep
 * - Focus management and full ARIA attribute support
 * - Event emission for sidebar coordination (i-sgds-click)
 * - Automatic child element tracking and nesting level detection
 *
 * Keyboard Navigation:
 * - Arrow Up/Down: Navigate between siblings in the same level
 * - Arrow Left/Right: Navigate hierarchically (collapse/expand or move in drawer)
 * - Enter: Activate focused item or toggle group
 *
 * Context Management:
 * - Consumes: SidebarCollapsed, SidebarActiveItem, SidebarActiveGroup, SidebarDrawerItems
 * - Updates state based on context changes for responsive UI updates
 *
 * @internal
 */
export class SidebarElement extends SgdsElement {
  static styles = DropdownElement.styles;

  /**
   * The display title/label for the sidebar element.
   * Shown in the UI and used for accessibility labels (aria-label).
   * @attribute title
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) title = "";

  /**
   * The unique name identifier for the sidebar element.
   * Used to identify selections in sgds-select events and manage active states.
   * Should be unique among siblings in the same navigation level.
   * @attribute name
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) name = "";

  /** @internal */
  @consume({ context: SidebarCollapsed, subscribe: true })
  @state()
  _sidebarCollapsed = false;

  /** @internal */
  @consume({ context: SidebarActiveItem, subscribe: true })
  @state()
  _sidebarActiveItem: SidebarElement | null = null;

  /** @internal */
  @consume({ context: SidebarActiveGroup, subscribe: true })
  @state()
  _sidebarActiveGroup: SidebarElement | null = null;

  /** @internal */
  @consume({ context: SidebarDrawerItems, subscribe: true })
  @state()
  _drawerItems: SidebarElement[] | null = null;

  /** @internal Tracks whether a drawer overlay is currently open */
  @consume({ context: SidebarDrawerOpen, subscribe: true })
  @state()
  _showDrawer = false;

  /** @internal */
  @state() _childLevel = 0;

  /**
   * Indicates whether this element is currently selected/active.
   * @internal
   */
  @state() _selected = false;

  /**
   * Indicates whether this element should be hidden based on nesting context.
   * @internal
   */
  @state() _hidden = false;

  /**
   * List of child elements assigned to this component.
   * @internal
   */
  @state()
  _childElements: SidebarElement[] = [];

  /** @internal */
  @state() _childActive = false;

  /** @internal */
  @queryAssignedElements({ flatten: true })
  private _defaultNodes!: SidebarElement[];

  connectedCallback() {
    super.connectedCallback();
    this.getChildLevel();
    this.setAttribute("role", "option");
    this.setAttribute("aria-label", this.title || this.name);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    this.getChildLevel();
  }

  updated() {
    if (this._childLevel === 1) {
      this._hidden = !this.closest(".sidebar-nested-overlay");
    }
  }

  /**
   * Handles slot change events and updates child elements list.
   * @internal
   * @returns {void}
   */
  _handleSlotChange() {
    this._childElements = this._defaultNodes;
  }

  /**
   * Handles click/activation events on the sidebar element.
   * Emits internal click event for parent sidebar to handle selection.
   * @internal
   * @param {SidebarElement} [element] - Optional element parameter (for keyboard compatibility)
   * @returns {void}
   */
  _handleClick() {
    this.emit("i-sgds-click", { detail: { element: this, level: this._childLevel } });
  }

  /**
   * Handles keyboard navigation events for sidebar elements.
   * Supports Arrow Up/Down for navigation and Arrow Left/Right for drawer management.
   * @internal
   * @param {KeyboardEvent} event - The keyboard event object
   * @returns {void}
   */
  private _handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    switch (event.key) {
      case ENTER: {
        event.preventDefault();
        event.stopPropagation();
        if (event.target === this) this._handleClick();
        return;
      }
      case ARROW_DOWN: {
        event.preventDefault();
        event.stopPropagation();

        const child = (target as SidebarElement)._childElements[0];

        const isChildHidden = child?._hidden;
        const childElement = !isChildHidden ? child : null;
        const nextElement = childElement || target.nextElementSibling || target.parentElement.nextElementSibling;

        if (nextElement?.shadowRoot) {
          const focusTarget = nextElement.shadowRoot.querySelector("[tabindex]") as HTMLElement | null;
          focusTarget?.focus();
        }

        return;
      }
      case ARROW_UP: {
        event.preventDefault();
        event.stopPropagation();

        const prevSiblingChildren = (target.previousElementSibling as SidebarElement)?._childElements;
        const lastChild = prevSiblingChildren ? prevSiblingChildren[prevSiblingChildren?.length - 1] : null;
        const isChildHidden = lastChild?._hidden;

        const childElement = !isChildHidden ? lastChild : null;
        const prevElement = childElement || target.previousElementSibling || target.parentElement;

        if (prevElement?.shadowRoot) {
          const focusTarget = prevElement.shadowRoot.querySelector("[tabindex]") as HTMLElement | null;
          focusTarget?.focus();
        }
        return;
      }
      case ARROW_LEFT: {
        event.preventDefault();
        event.stopPropagation();

        if (this._sidebarActiveGroup === this) {
          // when drawer is open, close it
          if (this._showDrawer) this._handleClick();
        } else {
          // check if we are on the drawer, if so move back to parent
          const childLevel = (target as SidebarElement)._childLevel;
          if (childLevel >= 1 && this._sidebarActiveGroup?.shadowRoot) {
            const focusTarget = this._sidebarActiveGroup.shadowRoot.querySelector("[tabindex]") as HTMLElement | null;
            focusTarget?.focus();
          }
        }

        return;
      }
      case ARROW_RIGHT: {
        event.preventDefault();
        event.stopPropagation();

        if (this._sidebarActiveGroup === this) {
          if (this._drawerItems?.length) {
            if (this._showDrawer) {
              const drawerItem = this._drawerItems[0];
              if (drawerItem?.shadowRoot) {
                const focusTarget = drawerItem.shadowRoot.querySelector("[tabindex]") as HTMLElement | null;
                focusTarget?.focus();
              }
            } else {
              this._handleClick();
            }
          }
        } else {
          if (this._childLevel === 0 && this._childElements.length > 0) {
            // when there is nested, we trigger click to show drawer
            this._handleClick();
          }
        }

        return;
      }
    }
  }

  /**
   * Calculates the nesting level by counting parent sgds-sidebar-group ancestors.
   * Level 0 = top-level element, Level 1+ = nested within another group.
   * Updates the _childLevel state property.
   * @internal
   * @returns {void}
   */
  private getChildLevel() {
    let currentEle = this.parentElement;
    let level = 0;

    while (currentEle.tagName.toLowerCase() === "sgds-sidebar-group") {
      level += 1;
      currentEle = currentEle.parentElement;
    }

    const isInDrawer = currentEle.classList.contains("sidebar-nested-overlay");
    this._childLevel = isInDrawer ? level + 1 : level;
  }
}
