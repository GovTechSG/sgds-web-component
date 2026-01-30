import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarSectionStyle from "./sidebar-section.css";

/**
 * @summary Sidebar section is a container component that groups related sidebar options into organized sections.
 * It displays a section header/title and can contain multiple sgds-sidebar-option elements.
 * Sections help organize navigation items hierarchically within the sidebar.
 *
 * @slot - Insert sgds-sidebar-option elements to be grouped within this section.
 */
export class SgdsSidebarSection extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarSectionStyle];

  /**
   * Controls whether the section content is expanded or collapsed.
   * When false, the section options are hidden but the section header remains visible.
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, reflect: true }) expanded = true;

  /**
   * Enables a collapsible section header with expand/collapse toggle.
   * When true, users can click the header to toggle section visibility.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Toggle the expanded/collapsed state of the section.
   * Only applies if collapsible property is true.
   * @public
   */
  public toggleExpanded() {
    if (!this.collapsible) return;
    this.expanded = !this.expanded;
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-section": true
        })}
        tabindex=${this.collapsible ? 0 : -1}
      >
        <div class="sidebar-section-label">
          <span>${this.title}</span>
          ${this.collapsible ? html`<sgds-icon name="chevron-down" size="sm"></sgds-icon>` : nothing}
        </div>

        <div
          class=${classMap({
            "sidebar-section-content": true,
            "sidebar-section-content--expanded": this.expanded,
            "sidebar-section-content--collapsed": !this.expanded
          })}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarSection;
