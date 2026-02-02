import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarSectionStyle from "./sidebar-section.css";
import SgdsSidebar from "./sgds-sidebar";

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

  /**
   * Tracks whether this section is the last child of its parent.
   * Used to remove bottom border from the last section.
   * @type {boolean}
   * @internal
   */
  @state() private isLastChild = false;

  /**
   * Tracks whether the parent sidebar is in a collapsed state.
   * Used to hide section title when sidebar is collapsed.
   * @type {boolean}
   * @internal
   */
  @state() private sidebarCollapsed = false;

  connectedCallback() {
    super.connectedCallback();
    this.checkIfLastChild();
    this.detectParentSidebar();
    this.observeSidebarChanges();
  }

  /**
   * Checks if this section is the last child of its parent.
   * Sets isLastChild state to true if it is the last sibling.
   * @private
   */
  private checkIfLastChild() {
    const parent = this.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      this.isLastChild = siblings[siblings.length - 1] === this;
    }
  }

  /**
   * Detects the parent sidebar element and checks its expanded state.
   * Updates sidebarCollapsed state accordingly.
   * @private
   */
  private detectParentSidebar() {
    const sidebar = this.closest("sgds-sidebar");
    if (sidebar) {
      this.sidebarCollapsed = !(sidebar as SgdsSidebar).expanded;
    }
  }

  /**
   * Observes changes to the parent sidebar's expanded attribute.
   * Automatically updates the section visibility when the sidebar expands or collapses.
   * @private
   */
  private observeSidebarChanges() {
    const sidebar = this.closest("sgds-sidebar");
    if (sidebar) {
      const observer = new MutationObserver(() => {
        const isExpanded = (sidebar as SgdsSidebar).expanded;
        this.sidebarCollapsed = !isExpanded;
      });

      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["expanded"]
      });
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-section": true,
          "no-border": this.isLastChild,
          "sidebar-section--collapsed": this.sidebarCollapsed
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
            "sidebar-section-content--expanded": this.expanded
          })}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarSection;
