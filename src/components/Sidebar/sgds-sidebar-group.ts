import { html, nothing } from "lit";
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
 *
 * @slot default - Insert sgds-sidebar-group or sgds-sidebar-item elements as nested children
 * @slot trailingIcon - Insert content (typically an icon or chevron) to display after the label text
 */
export class SgdsSidebarGroup extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /**
   * The name of the icon to display before the option label.
   * Icon is rendered using sgds-icon component.
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
      this._selected = this._sidebarActiveItem === this.name && this.name !== "";
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
   * @emits i-sgds-sidebar-open-drawer When a level 0 option with children is clicked
   * @emits i-sgds-click When a level 1+ option is clicked
   */
  override _handleClick(element?: SgdsSidebarGroup) {
    if (element && element !== this) return;

    if (this._childLevel === 0 && this._childElements) {
      this.emit("i-sgds-sidebar-open-drawer", { detail: { element: this } });
    } else {
      this.activeNestedGroup = this.activeNestedGroup ? null : this;
      this._selected = !!this.activeNestedGroup;
      this._childElements.forEach(v => ((v as SidebarElement)._hidden = this._selected));

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
        aria-level=${this._childLevel + 1}
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

      ${this._childElements
        ? html` <div
            class=${classMap({
              "sidebar-submenu": true,
              show: this.activeNestedGroup === this && !(this._sidebarCollapsed && this._childLevel === 0)
            })}
          >
            <div>
              <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
          </div>`
        : nothing}
    `;
  }
}

export default SgdsSidebarGroup;
