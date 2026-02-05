import { html, nothing } from "lit";
import { property, state, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-option.css";
import SgdsSidebar from "./sgds-sidebar";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";

/**
 * @summary Sidebar option represents a selectable or navigable item within the sidebar component.
 * It can be used to display menu items, navigation links, or other sidebar content options.
 *
 * @slot icon - Insert content (typically an icon) to display before the label text.
 * @slot trailing-icon - Insert content (typically an icon) to display after the label text.
 */
export class SgdsSidebarOption extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarOptionStyle];

  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };
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
   * @default ""
   */
  @property({ type: String, reflect: true }) name = "";

  /**
   * The name of the icon to display before the option label.
   * Icon is rendered using sgds-icon component.
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) icon = "placeholder";

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

  /**
   * Stores the MutationObserver instance for tracking parent sidebar state changes.
   * Used to observe the parent sidebar's collapsed attribute.
   * @type {MutationObserver | null}
   * @internal
   */
  private sidebarObserver: MutationObserver | null = null;

  /**
   * Lifecycle method called when the component is inserted into the DOM.
   * Sets up ARIA attributes, initializes state watchers, and attaches event listeners.
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-label", this.title || this.name);
    this.detectParentSidebar();
    this.observeSidebarChanges();
    this.checkNestedOptions();

    this.addEventListener("keydown", this._handleKeyPress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.sidebarObserver) {
      this.sidebarObserver.disconnect();
    }
    this.removeEventListener("keydown", this._handleKeyPress);
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
      this._handleClick(event.target as SgdsSidebarOption);
      return;
    }
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
   * Checks for nested sgds-sidebar-option elements as direct children.
   * Updates hasNestedOptions state flag if nested options are found.
   * Called during initialization and whenever slot content changes.
   * @private
   */
  private checkNestedOptions() {
    const nestedOptions = this.querySelectorAll(":scope > sgds-sidebar-option");
    this.hasNestedOptions = nestedOptions.length > 0;
  }

  /**
   * Traverses the DOM to find the nearest parent sgds-sidebar component.
   * Checks the parent sidebar's collapsed state and updates sidebarCollapsed flag accordingly.
   * Required for responsive label hiding when sidebar is collapsed.
   * @private
   */
  private detectParentSidebar() {
    const sidebar = this.closest("sgds-sidebar");
    if (sidebar) {
      this.sidebarCollapsed = (sidebar as SgdsSidebar).collapsed;
    }
  }

  /**
   * Calculates the nesting level by counting parent sgds-sidebar-option ancestors.
   * Level 0 = top-level option in sidebar
   * Level 1+ = nested within another option (supports up to 3 levels)
   * Used to determine click behavior (drawer vs submenu) and icon display.
   * @private
   * @returns {void} Updates childLevel state property
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
   * Sets up a MutationObserver to track the parent sidebar's collapsed attribute.
   * Automatically updates sidebarCollapsed state when sidebar expand/collapse state changes.
   * Observer is stored for cleanup in disconnectedCallback to prevent memory leaks.
   * @private
   * @returns {void} Stores observer reference in sidebarObserver property
   */
  private observeSidebarChanges() {
    const sidebar = this.closest("sgds-sidebar") as SgdsSidebar;

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
   * Handles click/activation events on the sidebar option.
   * Behavior varies by nesting level:
   * - Level 0 with nested items: Opens drawer overlay to show nested content
   * - Level 1+: Toggles submenu visibility
   * - Always: Emits custom events for parent sidebar to handle selection and navigation
   * @private
   * @param {SgdsSidebarOption} [element] - Optional element parameter (for keyboard compatibility)
   * @emits i-sgds-sidebar-open-drawer When a level 0 option with children is clicked
   * @emits i-sgds-click When a level 1+ option is clicked
   */
  private _handleClick(element?: SgdsSidebarOption) {
    if (element && element !== this) return;

    if (this.childLevel === 0 && this.hasNestedOptions) {
      this.emit("i-sgds-sidebar-open-drawer", { detail: { element: this } });
    } else {
      this.selectedNestedLevel = this.childLevel === 1 && this.selectedNestedLevel ? null : this;
      this.emit("i-sgds-click", { detail: { element: this, level: this.childLevel } });
    }
  }
  /**
   * Determines the appropriate chevron icon based on nesting level and selection state.
   * Icon changes indicate expandable/expandable state to users:
   * - Level 0: chevron-right (expanded) or chevron-left (collapsed)
   * - Level 1+: chevron-down (expanded) or chevron-up (collapsed)
   * Used for visual feedback on nested navigation options.
   * @private
   * @returns {string} The icon name to display (e.g., 'chevron-right', 'chevron-down')
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
        @click=${() => this._handleClick()}
        tabindex="0"
        aria-level=${this.childLevel + 1}
        aria-expanded=${this.hasNestedOptions ? !!this.selectedNestedLevel : "false"}
        aria-label=${this.title || this.name}
      >
        <div class="sidebar-option-label-wrapper">
          <div>
            <sgds-icon name=${this.icon}></sgds-icon>
            <span class="sidebar-option-label">${this.title}</span>
          </div>

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
