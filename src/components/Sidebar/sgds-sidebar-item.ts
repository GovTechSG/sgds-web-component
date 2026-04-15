import { html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-item.css";

import { SidebarElement } from "./sidebar-element";

/**
 * @summary Sidebar item is a selectable navigation item within the sidebar component.
 * It can be used as a terminal leaf node in the navigation hierarchy (does not support nested children).
 * Items can optionally wrap anchor links for programmatic navigation to external URLs or routes.
 *
 * @slot default - Text content for the item label
 * @slot icon - Icon to display before the label text (required for level 1 and level 2)
 * @slot indicator - Display after the label text (optional). Typically used for badges or status indicators.
 *
 * See SgdsSidebar for parent component usage and selection events.
 */
export class SgdsSidebarItem extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-item": true,
          "sidebar-item--collapsed": !this._isOverlay && this._sidebarCollapsed && this._childLevel === 1,
          active: this._selected
        })}
        @click=${() => this._handleClick()}
        aria-label=${this.title || this.name}
        name=${this.name}
        tabindex=${this._hidden ? -1 : 0}
        role="button"
      >
        <div class="sidebar-item-label-wrapper">
          <div>
            <!-- For level 1 and 2 -->
            ${this._childLevel <= 2 ? html`<slot name="icon"></slot>` : nothing}
            <span
              class=${classMap({
                "sidebar-item-label": true,
                offset: this._childLevel > 2
              })}
              >${this.title}</span
            >
          </div>

          <!-- For level 1 and 2 -->
          ${this._childLevel <= 2
            ? html`<span class="sidebar-item-indicator">
                <slot name="indicator"></slot>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarItem;
