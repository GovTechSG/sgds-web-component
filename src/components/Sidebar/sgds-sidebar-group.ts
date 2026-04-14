import { html } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-item.css";
import SgdsIcon from "../Icon/sgds-icon";
import { watch } from "../../utils/watch";

import { SidebarElement } from "./sidebar-element";

/**
 * @summary Sidebar group represents a navigable parent item within the sidebar that can have nested children.
 * Groups support multiple levels of nesting and show nested items in a drawer overlay or submenu.
 * Groups can be used to organize related sidebar items into expanding/collapsing sections.
 *
 * Behavior varies by nesting level:
 * - Level 1 (root): Clicking opens drawer overlay showing all nested children. Keyboard: ArrowRight opens drawer.
 * - Level 2+ (nested): Clicking toggles submenu visibility. Keyboard: ArrowRight toggles submenu.
 *
 * @slot default - Insert sgds-sidebar-group or sgds-sidebar-item elements as nested children
 * @slot indicator - Display after the label text. A chevron is auto-appended. Typically used to show badges or other indicators for the group.
 *
 */
export class SgdsSidebarGroup extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /**
   * Manages submenu visibility state for nested groups (level 2+).
   * When true, nested children are displayed. When false, they are hidden.
   * Root-level groups use drawer overlay instead of submenu.
   * @internal
   */
  @state() private _showMenu = false;

  /**
   * Reports the visibility state of the submenu for nested groups.
   * Returns true when the submenu is displayed showing child items, false when hidden.
   * Only applicable for nested groups (level 2+). Root-level groups use drawer overlay instead.
   * @readonly
   * @type {boolean}
   */
  get showMenu(): boolean {
    return this._showMenu;
  }

  /**
   * Reacts to the active item context changing. If the newly active item is a descendant
   * of this group, expand the submenu without external callers touching internal state.
   * @internal
   */
  @watch("_sidebarActiveItem")
  _handleActiveItemContext() {
    if (this._childLevel > 1 && this._sidebarActiveItem && this.contains(this._sidebarActiveItem)) {
      this._showMenu = true;
    }
  }

  /** @internal */
  protected override _handleClick(): void {
    if (this._childLevel !== 1) {
      this._showMenu = !this._showMenu;
      this._childElements.forEach(v => {
        v._hidden = !this._showMenu;
      });
    } else {
      super._handleClick();
    }
  }
  /**
   * Determines the appropriate chevron icon based on nesting level and submenu state.
   * Provides visual feedback for expandable/collapsible state:
   * - Level 1: chevron-right (drawer controlled by parent)
   * - Level 2+: chevron-down (open), chevron-up (closed)
   * @internal
   * @returns {string} Icon name to display
   */
  private _getIcon() {
    if (this._childLevel === 1) {
      return "chevron-right";
    } else {
      return this._showMenu ? "chevron-down" : "chevron-up";
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-item": true,
          "sidebar-item--collapsed": !this._isOverlay && this._sidebarCollapsed && this._childLevel === 1,
          active: this._selected
        })}
        @click=${() => this._handleClick()}
        aria-expanded=${this._showMenu}
        tabindex=${this._childLevel > 2 && !this._showMenu ? -1 : 0}
      >
        <div class="sidebar-item-label-wrapper">
          <div>
            <slot name="icon"></slot>
            <span class="sidebar-item-label">${this.title}</span>
          </div>

          <span class="sidebar-item-indicator">
            <slot name="indicator"></slot>
            <sgds-icon aria-label=${this.title || this.name} name=${this._getIcon()} size="sm"></sgds-icon>
          </span>
        </div>
      </div>

      <div
        class=${classMap({
          "sidebar-submenu": true,
          "sidebar-submenu--collapsed": this._sidebarCollapsed && this._childLevel == 1,
          show: this._showMenu
        })}
      >
        <div>
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarGroup;
