import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarSectionStyle from "./sidebar-section.css";

import { SidebarElement } from "./sidebar-element";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsDivider from "../Divider/sgds-divider";

/**
 * @summary Sidebar section is a container component that groups related sidebar items into organized sections.
 * It displays a section header/title and can optionally be collapsible. Sections help organize navigation
 * items hierarchically within the sidebar, providing visual separation between different areas of functionality.
 *
 * @slot - Insert sgds-sidebar-item and sgds-sidebar-group elements to be grouped within this section
 */
export class SgdsSidebarSection extends SidebarElement {
  static styles = [...SgdsElement.styles, sidebarSectionStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-divider": SgdsDivider
  };

  /**
   * The display title/label for the sidebar section header.
   * Always visible in the sidebar, used to group related items.
   * @attribute title
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) title = "";

  /**
   * Controls whether the section content is expanded or collapsed.
   * When true, the section content is hidden but the section header remains visible.
   * Only applicable when the section is collapsible.
   * @attribute collapsed
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /**
   * Enables a collapsible section header with expand/collapse toggle functionality.
   * When true, users can click the header to toggle section visibility.
   * When false, the section header is display-only and not interactive.
   * @attribute collapsible
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsible = false;
  @property({ type: Boolean, reflect: true }) separator = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "region");
    this._childLevel = -1;
  }

  /**
   * Toggles the collapsed state when section is collapsible.
   * Called when user clicks the section header. No-op if section is not collapsible.
   * @internal
   * @returns {void}
   */
  protected override _handleClick(): void {
    if (this.collapsible) this.collapsed = !this.collapsed;
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-section": true,
          "sidebar-section--collapsed": !this._isOverlay && this._sidebarCollapsed
        })}
      >
        ${this.title !== ""
          ? html`<div
              class="sidebar-section-label"
              @click=${this._handleClick}
              aria-expanded=${!this.collapsed}
              aria-disabled=${!this.collapsible}
              tabindex="0"
            >
              <span>${this.title}</span>
              ${this.collapsible
                ? html`<sgds-icon name=${this.collapsed ? "chevron-down" : "chevron-up"} size="sm"></sgds-icon>`
                : nothing}
            </div>`
          : nothing}

        <div
          class=${classMap({
            "sidebar-section-content": true,
            "sidebar-section-content--collapsed": this.collapsed && this.collapsible,
            "sidebar-section-separator": this.separator
          })}
        >
          <div>
            <slot @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>

        ${this.separator ? html`<sgds-divider></sgds-divider>` : nothing}
      </div>
    `;
  }
}

export default SgdsSidebarSection;
