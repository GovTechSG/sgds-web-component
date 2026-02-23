import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-item.css";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";

import { SidebarElement } from "../../base/sidebar-element";

/**
 * @summary Sidebar group represents a navigable parent item within the sidebar that can have nested children.
 * Groups support multiple levels of nesting and show nested items in a drawer overlay or submenu.
 * Groups can be used to organize related sidebar items into expanding/collapsing sections.
 *
 * Behavior varies by nesting level:
 * - Level 0 (root): Clicking opens drawer overlay showing all nested children. Keyboard: ArrowRight opens drawer.
 * - Level 1+ (nested): Clicking toggles submenu visibility. Keyboard: ArrowRight toggles submenu.
 *
 * @slot default - Insert sgds-sidebar-group or sgds-sidebar-item elements as nested children
 * @slot trailingIcon - Icon to display after the label text. A chevron is auto-appended.
 *
 */
export class SgdsSidebarGroup extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /**
   * The name of the icon to display before the group label.
   * Icon name corresponds to sgds-icon component icons.
   * A chevron icon is automatically appended to show expand/collapse state.
   * @attribute icon
   * @type {string}
   * @default "placeholder"
   */
  @property({ type: String, reflect: true }) icon = "placeholder";

  /**
   * Stores the currently selected nested level option.
   * Used to manage submenu visibility.
   * @type {SgdsSidebarItem}
   * @internal
   */
  @state() private activeNestedGroup: SgdsSidebarGroup;

  /**
   * Lifecycle method called when the component is inserted into the DOM.
   * Sets up ARIA attributes, initializes state watchers, and attaches event listeners.
   * @internal
   */

  @watch("_sidebarActiveItem")
  _handleActive() {
    if (this._sidebarActiveGroup === this) {
      this._selected = true;
    } else {
      if (this.parentElement.tagName.toLowerCase() !== "sgds-sidebar-group") {
        // first level of group
        this._selected = false;
      } else {
        this._selected = this._sidebarActiveItem === this.name && this.name !== "";
      }
    }
  }

  /** @internal */
  @watch("_selected")
  _handleSelected() {
    if (this._selected) {
      // set parent to be selected
      const parent = this.parentElement as SidebarElement;
      if (parent.tagName.toLowerCase() === "sgds-sidebar-group") {
        this.activeNestedGroup = this;
        parent._selected = true;
      } else {
        if (!this._sidebarActiveGroup) {
          this.emit("i-sgds-sidebar-open-drawer", { detail: { element: this } });
        }
      }
    }
  }

  /**
   * Handles click/activation events on the sidebar option.
   * Behavior varies by nesting level:
   * - Level 0 with nested items: Opens drawer overlay to show nested content
   * - Level 1+: Toggles submenu visibility
   * - Always: Emits custom events for parent sidebar to handle selection and navigation
   * @private
   * @param {SgdsSidebarItem} [element] - Optional element parameter (for keyboard compatibility)
   *
   */
  override _handleClick(element?: SgdsSidebarGroup) {
    if (element && element !== this) return;

    if (this._childLevel === 0 && this._childElements.length > 0) {
      this.emit("i-sgds-sidebar-open-drawer", { detail: { element: this, selected: true } });
    } else {
      this.activeNestedGroup = this.activeNestedGroup ? null : this;
      this._selected = !!this.activeNestedGroup;

      this._childElements.forEach(v => {
        const ele = v as SidebarElement;
        ele._hidden = !this._selected;
      });

      this.emit("i-sgds-click", { detail: { element: this, level: this._childLevel } });
    }
  }
  /**
   * Determines the appropriate chevron icon based on nesting level and selection state.
   * Icon changes indicate expandable/expandable state to users:
   * - Level 0: chevron-right (expanded) or chevron-left (collapsed)
   * - Level 1+: chevron-down (expanded) or chevron-up (collapsed)
   * Used for visual feedback on nested navigation options.
   * @private
   * @returns {string} The icon name to display (e.g., 'chevron-right', 'chevron-down')
   */
  private getIcon() {
    if (this._childLevel === 0) {
      return "chevron-right";
    } else {
      return this.activeNestedGroup ? "chevron-down" : "chevron-up";
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-item": true,
          "sidebar-item--collapsed": this._sidebarCollapsed && this._childLevel === 0,
          active: this._selected
        })}
        @click=${() => this._handleClick()}
        aria-level=${this._childLevel}
        aria-expanded=${this._childElements ? !!this.activeNestedGroup : "false"}
        aria-label=${this.title || this.name}
        ?hidden=${this._hidden}
        tabindex=${this._hidden ? "-1" : "0"}
      >
        <div class="sidebar-item-label-wrapper">
          <div>
            <sgds-icon name=${this.icon}></sgds-icon>
            <span class="sidebar-item-label">${this.title}</span>
          </div>

          <span class="sidebar-item-trailingIcon">
            <sgds-icon name=${this.getIcon()} size="sm"></sgds-icon>
          </span>
        </div>
      </div>

      <div
        class=${classMap({
          "sidebar-submenu": true,
          show: !!this.activeNestedGroup && this._childLevel !== 0
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
