import { html, nothing } from "lit";
import { property, state, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-option.css";
import SgdsSidebar from "./sgds-sidebar";
import { watch } from "../../utils/watch";

/**
 * @summary Sidebar option represents a selectable or navigable item within the sidebar component.
 * It can be used to display menu items, navigation links, or other sidebar content options.
 *
 * @slot icon - Insert content (typically an icon) to display before the label text.
 * @slot trailing-icon - Insert content (typically an icon) to display after the label text.
 */
export class SgdsSidebarOption extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /**
   * Indicates whether the sidebar option is selected.
   * When true, applies selected styling to visually distinguish the active option.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * The name identifier for the sidebar option.
   * @type {string}
   */
  @property({ type: String, reflect: true }) name = "";
  @property({ type: String, reflect: true }) icon = "";

  /**
   * Tracks whether the parent sidebar is in a collapsed state.
   * Used to hide option labels when the sidebar is collapsed.
   * @type {boolean}
   * @internal
   */
  @state() private sidebarCollapsed = false;

  /**
   * Tracks whether this option has nested child options.
   * Used to display the chevron icon.
   * @type {boolean}
   * @internal
   */
  @state() private hasNestedOptions = false;

  /**
   * Stores the currently selected nested level option.
   * Used to manage submenu visibility.
   * @type {SgdsSidebarOption}
   * @internal
   */
  @state() private selectedNestedLevel: SgdsSidebarOption;

  /**
   * Tracks the nesting level of this option (0 = top level, 1 = nested once, etc.).
   * Used to determine behavior on click and icon display.
   * @type {number}
   * @internal
   */
  @state() private childLevel = 0;

  @queryAssignedElements({ flatten: true, selector: "sgds-sidebar-option" })
  protected nestedItems: SgdsSidebarOption[];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.detectParentSidebar();
    this.observeSidebarChanges();
    this.checkNestedOptions();
  }

  @watch("selected")
  _handleDisabled() {
    if (this.selected === true) {
      this.parentElement.setAttribute("selected", `${this.selected}`);
    } else {
      this.parentElement.removeAttribute("selected");
    }
  }

  protected firstUpdated(): void {
    this.getChildLevel();
  }

  /**
   * Checks for nested sgds-sidebar-option elements.
   * Updates hasNestedOptions state if nested options are found.
   * @private
   */
  private checkNestedOptions() {
    const nestedOptions = this.querySelectorAll(":scope > sgds-sidebar-option");
    this.hasNestedOptions = nestedOptions.length > 0;
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
   * Calculates the nesting level of this option by counting parent sgds-sidebar-option elements.
   * Updates childLevel state with the calculated level (0 = top level, 1+ = nested).
   * @private
   */
  private getChildLevel() {
    let currentEle = this.parentElement;
    let level = 0;

    while (currentEle.tagName.toLowerCase() === "sgds-sidebar-option") {
      level += 1;
      currentEle = currentEle.parentElement;
    }

    this.childLevel = level;
  }

  /**
   * Observes changes to the parent sidebar's expanded attribute.
   * Automatically updates the option's collapsed state when the sidebar expands or collapses.
   * @private
   */
  private observeSidebarChanges() {
    const sidebar = this.closest("sgds-sidebar") as SgdsSidebar;

    if (sidebar) {
      const observer = new MutationObserver(() => {
        const isExpanded = sidebar.expanded;
        this.sidebarCollapsed = !isExpanded;
      });

      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ["expanded"]
      });
    }
  }

  /**
   * Handles click events on the option.
   * For level 0 options with nested items, opens the drawer overlay.
   * For other levels, manages submenu visibility and emits click events.
   * @private
   */
  private _handleClick() {
    if (this.childLevel === 0 && this.hasNestedOptions) {
      this.emit("i-sgds-sidebar-open-drawer", { detail: { element: this } });
    } else {
      this.selectedNestedLevel = this.childLevel === 1 && this.selectedNestedLevel ? null : this;
      this.emit("i-sgds-click", { detail: { element: this, level: this.childLevel } });
    }
  }

  /**
   * Determines the appropriate icon to display based on the option's nesting level and selected state.
   * At level 0: shows chevron-right (selected) or chevron-left (not selected)
   * At level 1+: shows chevron-down (selected) or chevron-up (not selected)
   * @private\n   * @returns {string} The icon name to display
   */
  private getIcon() {
    if (this.childLevel === 0) {
      return this.selected ? "chevron-right" : "chevron-left";
    } else {
      return this.selectedNestedLevel ? "chevron-down" : "chevron-up";
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          "sidebar-option": true,
          "sidebar-option--collapsed": this.sidebarCollapsed && this.childLevel === 0,
          active: this.selected
        })}
        @click=${this._handleClick}
      >
        <div class="sidebar-option-label-wrapper">
          <sgds-icon name=${this.icon}></sgds-icon>
          <span class="sidebar-option-label">${this.title}</span>

          <span class="sidebar-option-trailing-icon">
            ${this.hasNestedOptions
              ? html`<sgds-icon name=${this.getIcon()} size="sm"></sgds-icon>`
              : html`<slot name="trailing-icon"></slot>`}
          </span>
        </div>
      </div>

      ${this.childLevel === 1 && this.hasNestedOptions
        ? html` <div
            class=${classMap({
              "sidebar-submenu": true,
              show: this.selectedNestedLevel === this
            })}
          >
            <div>
              <slot></slot>
            </div>
          </div>`
        : nothing}
    `;
  }
}

export default SgdsSidebarOption;
