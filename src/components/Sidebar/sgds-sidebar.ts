import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarStyle from "./sidebar.css";

/**
 * @summary Sidebar is a collapsible navigation component that displays menu items and options.
 * Users can expand and collapse the sidebar to save screen space.
 *
 * @slot - Insert sgds-sidebar-option elements or other navigation content.
 */
export class SgdsSidebar extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarStyle];

  /**
   * Controls whether the sidebar is expanded or collapsed.
   * When true, the sidebar is in expanded state showing full labels.
   * When false, the sidebar is collapsed showing only icons.
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, reflect: true }) expanded = true;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
  }

  /**
   * Toggle the expanded/collapsed state of the sidebar.
   * @public
   */
  public toggleExpanded() {
    this.expanded = !this.expanded;
    this.dispatchEvent(
      new CustomEvent("sgds-sidebar-toggle", {
        detail: { expanded: this.expanded },
        composed: true,
        bubbles: true
      })
    );
  }

  render() {
    return html`
      <div
        class=${classMap({
          sidebar: true,
          "sidebar--expanded": this.expanded,
          "sidebar--collapsed": !this.expanded
        })}
      >
        <div class="sidebar-header">
          <div class="brand-name">
            <slot name="brand-name"></slot>
          </div>

          <sgds-icon-button
            name=${this.expanded ? "sidebar-collapse" : "sidebar-expand"}
            variant="ghost"
            tone="neutral"
            size="md"
            @click=${() => this.toggleExpanded()}
            aria-label=${this.expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded=${this.expanded}
          ></sgds-icon-button>
        </div>

        <nav class="sidebar-content">
          <slot></slot>
        </nav>
      </div>
    `;
  }
}

export default SgdsSidebar;
