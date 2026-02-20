import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarSectionStyle from "./sidebar-section.css";

import { SidebarElement } from "../../base/sidebar-element";

/**
 * @summary Sidebar section is a container component that groups related sidebar options into organized sections.
 * It displays a section header/title and can contain multiple sgds-sidebar-item elements.
 * Sections help organize navigation items hierarchically within the sidebar.
 *
 * @slot - Insert sgds-sidebar-item elements to be grouped within this section.
 */
export class SgdsSidebarSection extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarSectionStyle];

  /**
   * Controls whether the section content is expanded or collapsed.
   * When false, the section options are hidden but the section header remains visible.
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /**
   * Enables a collapsible section header with expand/collapse toggle.
   * When true, users can click the header to toggle section visibility.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /**
   * Tracks whether this section is the last child of its parent.
   * Used to remove bottom border from the last section.
   * @type {boolean}
   * @internal
   */
  @state() private _isLastChild = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "region");
    this._isLastChild = this.parentElement.lastElementChild === this;
  }

  /**
   * Handles click events on the section label.
   * Toggles the collapsed state to show/hide section content.
   * Only called if the section is collapsible (collapsible prop is true).
   * @private
   * @returns {void}
   */
  override _handleClick() {
    if (this.collapsible) this.collapsed = !this.collapsed;
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-section": true,
          "no-border": this._isLastChild,
          "sidebar-section--collapsed": this._sidebarCollapsed
        })}
      >
        <div
          class="sidebar-section-label"
          @click=${this._handleClick}
          tabindex="0"
          aria-expanded=${!this.collapsed}
          aria-disabled=${!this.collapsible}
        >
          <span>${this.title}</span>
          ${this.collapsible
            ? html`<sgds-icon name=${this.collapsed ? "chevron-down" : "chevron-up"} size="sm"></sgds-icon>`
            : nothing}
        </div>

        <div
          class=${classMap({
            "sidebar-section-content": true,
            "sidebar-section-content--collapsed": this.collapsed
          })}
        >
          <div>
            <slot @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarSection;
