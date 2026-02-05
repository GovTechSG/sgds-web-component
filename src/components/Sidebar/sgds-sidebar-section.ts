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
  @state() private isLastChild = false;

  /**
   * Tracks whether the parent sidebar is in a collapsed state.
   * Used to hide section title when sidebar is collapsed.
   * @type {boolean}
   * @internal
   */
  @state() private sidebarCollapsed = false;

  /**
   * Stores the MutationObserver instance for tracking parent sidebar state changes.
   * Used to observe the parent sidebar's collapsed attribute.
   * @type {MutationObserver | null}
   * @internal
   */
  private sidebarObserver: MutationObserver | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "region");
    this.setAttribute("aria-label", this.title || "Sidebar section");
    this.checkIfLastChild();
    this.detectParentSidebar();
    this.observeSidebarChanges();
    this.addEventListener("keydown", this._handleKeyPress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.sidebarObserver) {
      this.sidebarObserver.disconnect();
    }
  }

  /**
   * Handles keyboard events on the sidebar option.
   * Activates the option when Enter key is pressed.
   * @private
   * @param {KeyboardEvent} event - The keyboard event object
   */
  private _handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      const ele = event.target as HTMLElement;
      if (ele.tagName.toLowerCase() === "sgds-sidebar-section") {
        this._handleClick();
      }

      return;
    }
  }

  /**
   * Checks if this section is the last child sibling in its parent.
   * Used to remove bottom border styling from the final section for visual polish.
   * @private
   * @returns {void} Updates isLastChild state property
   */
  private checkIfLastChild() {
    const parent = this.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      this.isLastChild = siblings[siblings.length - 1] === this;
    }
  }

  /**
   * Traverses the DOM to find the nearest parent sgds-sidebar component.
   * Checks the parent sidebar's expanded state and updates sidebarCollapsed flag accordingly.
   * Used to hide section titles when parent sidebar is in collapsed state.
   * @private
   */
  private detectParentSidebar() {
    const sidebar = this.closest("sgds-sidebar");
    if (sidebar) {
      this.sidebarCollapsed = (sidebar as SgdsSidebar).collapsed;
    }
  }

  /**
   * Sets up a MutationObserver to track the parent sidebar's collapsed attribute.
   * Automatically updates sidebarCollapsed state when sidebar expand/collapse state changes.
   * Observer is stored for cleanup in disconnectedCallback to prevent memory leaks.
   * @private
   */
  private observeSidebarChanges() {
    const sidebar = this.closest("sgds-sidebar");
    if (sidebar) {
      this.sidebarObserver = new MutationObserver(() => {
        const isCollapsed = (sidebar as SgdsSidebar).collapsed;
        this.sidebarCollapsed = isCollapsed;
      });

      this.sidebarObserver.observe(sidebar, {
        attributes: true,
        attributeFilter: ["collapsed"]
      });
    }
  }

  /**
   * Handles click events on the section label.
   * Toggles the collapsed state to show/hide section content.
   * Only called if the section is collapsible (collapsible prop is true).
   * @private
   * @returns {void}
   */
  private _handleClick() {
    if (this.collapsible) this.collapsed = !this.collapsed;
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-section": true,
          "no-border": this.isLastChild,
          "sidebar-section--collapsed": this.sidebarCollapsed
        })}
      >
        <div
          class="sidebar-section-label"
          @click=${this._handleClick}
          tabindex=${this.collapsible ? 0 : -1}
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
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarSection;
