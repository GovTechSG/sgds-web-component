import { html, nothing } from "lit";
import { property, state, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-option.css";
import SgdsSidebar from "./sgds-sidebar";

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
  @property({ type: String }) name = "";

  @state() private sidebarCollapsed = false;
  @state() private hasNestedOptions = false;
  @state() private isNested = false;
  @state() private isFirstLevel = false;

  @state() private showFirstLevel = false;

  @queryAssignedElements({ flatten: true, selector: "sgds-sidebar-option" })
  protected nestedItems: SgdsSidebarOption[];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.detectParentSidebar();
    this.observeSidebarChanges();
    this.checkNestedOptions();
    this.checkIfNested();
    this.checkIfFirstLevel();
  }

  private checkIfNested() {
    const parentOption = this.closest("sgds-sidebar-option");

    console.log(parentOption);
    this.isNested = parentOption !== null;
  }

  private checkNestedOptions() {
    const nestedOptions = this.querySelectorAll(":scope > sgds-sidebar-option");
    this.hasNestedOptions = nestedOptions.length > 0;
  }

  private detectParentSidebar() {
    const sidebar = this.closest("sgds-sidebar");
    if (sidebar) {
      this.sidebarCollapsed = !(sidebar as SgdsSidebar).expanded;
    }
  }

  private checkIfFirstLevel() {
    const parent = this.parentElement;
    console.log(parent.tagName);
    if (parent.tagName.toLowerCase() === "sgds-sidebar-section") {
      this.isFirstLevel = true;
    }
  }

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

  private _handleClick() {
    if (this.isFirstLevel && this.hasNestedOptions) {
      this.showFirstLevel = !this.showFirstLevel;
      this.emit("sgds-select", { detail: { name: this.name, id: this.id } });
    }
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true });
    const nestedOptions = assignedElements.filter(item => item.tagName.toLowerCase() === "sgds-sidebar-option");

    if (nestedOptions.length > 0) {
      this.hasNestedOptions = true;
    }
  }

  render() {
    return html`
      <div
        class=${classMap({ "sidebar-option": true, "sidebar-option--collapsed": this.sidebarCollapsed })}
        @click=${this._handleClick}
      >
        <div class="sidebar-option-label-wrapper">
          <slot name="icon"></slot>
          <span class="sidebar-option-label">${this.title}</span>

          <span class="sidebar-option-trailing-icon">
            ${this.hasNestedOptions
              ? html`<sgds-icon name="chevron-right" size="sm"></sgds-icon>`
              : html`<slot name="trailing-icon"></slot>`}
          </span>
        </div>
      </div>

      ${this.isFirstLevel && this.hasNestedOptions
        ? html`<div
            class=${classMap({
              "sidebar-nested-overlay": true,
              show: this.showFirstLevel
            })}
          >
            <slot></slot>
          </div>`
        : nothing}
    `;
  }
}

export default SgdsSidebarOption;
