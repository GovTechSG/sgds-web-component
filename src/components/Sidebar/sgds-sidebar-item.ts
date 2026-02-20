import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-item.css";

import SgdsIcon from "../Icon/sgds-icon";

import { SidebarElement } from "../../base/sidebar-element";

/**
 * @summary Sidebar item is a selectable navigation option within the sidebar component.
 * It can be used as a terminal leaf node in the navigation hierarchy.
 *
 * @slot default - Insert text content for the item label
 * @slot trailingIcon - Insert content (typically an icon) to display after the label text
 */
export class SgdsSidebarItem extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };
  /**
   * The name of the icon to display before the option label.
   * Icon is rendered using sgds-icon component.
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) icon = "";

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
        aria-label=${this.title || this.name}
        ?hidden=${this._hidden}
        tabindex=${this._hidden ? "-1" : "0"}
      >
        <div class="sidebar-item-label-wrapper">
          <div>
            <sgds-icon name=${this.icon}></sgds-icon>
            <span
              class=${classMap({
                "sidebar-item-label": true,
                offset: this.icon == ""
              })}
              >${this.title}</span
            >
          </div>

          <span class="sidebar-item-trailingIcon">
            <slot name="trailingIcon"></slot>
          </span>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarItem;
