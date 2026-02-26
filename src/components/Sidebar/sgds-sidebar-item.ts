import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-item.css";

import SgdsIcon from "../Icon/sgds-icon";

import { SidebarElement } from "../../base/sidebar-element";

/**
 * @summary Sidebar item is a selectable navigation item within the sidebar component.
 * It can be used as a terminal leaf node in the navigation hierarchy (does not support nested children).
 * Items can optionally wrap anchor links for programmatic navigation to external URLs or routes.
 *
 * @slot default - Text content for the item label
 * @slot trailingIcon - Icon to display after the label text
 *
 * See SgdsSidebar for parent component usage and selection events.
 */
export class SgdsSidebarItem extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /**
   * The name of the icon to display before the item label.
   * Icon name corresponds to sgds-icon component icons.
   * When empty, no icon is displayed and spacing is adjusted.
   * @attribute icon
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
        aria-level=${this._childLevel}
        aria-label=${this.title || this.name}
        name=${this.name}
        tabindex=${this._hidden ? -1 : 0}
        role="button"
      >
        <div class="sidebar-item-label-wrapper">
          <div>
            ${this._childLevel <= 1 ? html`<slot name="leadingIcon"></slot>` : nothing}
            <span
              class=${classMap({
                "sidebar-item-label": true,
                offset: this._childLevel > 1
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
