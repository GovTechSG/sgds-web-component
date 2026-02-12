import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarStyle from "./sidebar.css";
import SgdsSidebarItem from "./sgds-sidebar-item";
import SgdsSidebarGroup from "./sgds-sidebar-group";

/**
 * @summary Sidebar is a collapsible navigation component that displays menu items and options.
 * Users can expand and collapse the sidebar to save screen space.
 *
 * @slot - Insert sgds-sidebar-item elements or other navigation content.
 */
export class SgdsSidebar extends SgdsElement {
  static styles = [...SgdsElement.styles, sidebarStyle];

  /**
   * Controls whether the sidebar is collapsed or expanded.
   * When true, the sidebar is in collapsed state showing only icons.
   * When false, the sidebar is expanded showing full labels.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean, reflect: true }) collapsed = false;

  /**
   * The name of the currently active sidebar option.
   * Used to track which option is selected.
   * @type {string}
   * @default ""
   */
  @property({ type: String, reflect: true }) active = "";

  /**
   * Stores the nested sidebar options that should be displayed in the drawer.
   * @type {SgdsSidebarItem[]}
   * @internal
   */
  @state() private drawerContent: (SgdsSidebarItem | SgdsSidebarGroup)[] = [];

  /**
   * Tracks the currently selected sidebar option.
   * Used to manage drawer state and active styling.
   * @type {SgdsSidebarItem | null}
   * @internal
   */
  @state() currentSelected: SgdsSidebarGroup | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "navigation");
    this.setAttribute("aria-label", "Main navigation");
    this.addOptionListeners();
  }

  /**
   * Reverts nested options back to their original parent element.
   * Clears the drawer overlay content and updates selected attributes.
   * Called when closing the drawer or switching to a different parent option.
   * @private
   * @param {SgdsSidebarItem} element - The parent option to return nodes to
   * @returns {void}
   */
  private _revertNodesToParent(element: SgdsSidebarGroup) {
    this.drawerContent.forEach(e => {
      e.removeAttribute("selected");
      element.append(e);
    });
    this.drawerContent = [];
  }

  /**
   * Manages the drawer overlay content based on the selected parent option.
   * Extracts direct child options from the selected parent and populates the drawer.
   * When undefined is passed, closes the drawer and reverts nodes back to parents.
   * @private
   * @param {SgdsSidebarGroup|SgdsSidebarItem} [element] - The parent option to display in drawer. Undefined closes drawer.
   * @returns {void}
   */
  private _setNodesToDrawer(element?: SgdsSidebarGroup) {
    if (this.currentSelected) {
      // if element is passed in means its a new selected ooption that needs to be assign nodes
      // when another node is selected return the node child back to previous element
      if (element) {
        this._revertNodesToParent(this.currentSelected);
        this.currentSelected = element;
      }

      // only set nodes when drawer is opened, only getting direct child
      const menuItems = this.currentSelected.querySelectorAll(":scope > *");

      this.drawerContent = []; //always clear before assigning
      menuItems.forEach(e => {
        this.drawerContent.push(e as SgdsSidebarItem | SgdsSidebarGroup);
      });
    } else {
      // when drawer is closed, we unset the values
      this._revertNodesToParent(element);
      this.currentSelected = null;
    }
  }

  /**
   * Attaches event listeners to all direct child sidebar options.
   * Handles option selection events and drawer overlay state management.
   * Manages emitting sgds-select custom events for external components.
   * Automatically triggers anchor links if present in options.
   * @private
   * @returns {void}
   */
  private addOptionListeners() {
    const options = this.querySelectorAll("sgds-sidebar-item");
    const groups = this.querySelectorAll("sgds-sidebar-group");

    [...options, ...groups].forEach(option => {
      // when option on level 0 is clicked
      option.addEventListener("i-sgds-click", (e: CustomEvent) => {
        const element = e.detail.element as SgdsSidebarItem;
        const childLevel = e.detail.level;

        if (childLevel === 0) {
          // first level, we reset all attributes
          this._revertNodesToParent(this.currentSelected);
          this.currentSelected = null;
        }

        options.forEach(e => e.removeAttribute("selected"));
        element.setAttribute("selected", "true");

        // setting for parent if there is any
        if (this.currentSelected) {
          this.currentSelected.setAttribute("selected", "true");
        }

        this.active = element.name;
        this.emit("sgds-select");

        // when anchorLink is provided, we click
        const anchorLink = option.querySelector(":scope > a") as HTMLAnchorElement;
        if (anchorLink) {
          anchorLink.click();
        }
      });
    });

    groups.forEach(group => {
      group.addEventListener("i-sgds-sidebar-open-drawer", (e: CustomEvent) => {
        const element = e.detail.element as SgdsSidebarGroup;
        options.forEach(e => e.removeAttribute("selected"));

        if (!this.currentSelected) {
          // when current selected is empty, means drawer is not opened.
          this.currentSelected = element;
        } else {
          if (this.currentSelected === element) {
            // when same node is selected, we wil toggle the drawer
            this._revertNodesToParent(this.currentSelected);
            this.currentSelected = null;
          }
        }

        if (this.currentSelected) {
          this.currentSelected.removeAttribute("selected");
          element.setAttribute("selected", "true");
        }

        // setting nodes
        this._setNodesToDrawer(this.currentSelected !== element ? element : undefined);
        this.active = element.name;
        this.emit("sgds-select");
      });

      group.addEventListener("i-sgds-click", (e: CustomEvent) => {
        const element = e.detail.element as SgdsSidebarItem;
        const childLevel = e.detail.level;

        if (childLevel === 0) {
          // first level, we reset all attributes
          this._revertNodesToParent(this.currentSelected);
          this.currentSelected = null;
        }

        options.forEach(e => e.removeAttribute("selected"));
        element.setAttribute("selected", "true");

        if (this.currentSelected) {
          this.currentSelected.setAttribute("selected", "true");
        }

        this.active = element.name;
        this.emit("sgds-select");

        // when anchorLink is provided, we click
        const anchorLink = group.querySelector(":scope > a") as HTMLAnchorElement;
        if (anchorLink) {
          anchorLink.click();
        }
      });
    });
  }

  /**
   * Toggles the sidebar between collapsed and expanded states.
   * Updates the collapsed property and emits sgds-sidebar-toggle event.
   * @public
   * @emits sgds-sidebar-toggle Emitted with detail.collapsed indicating new state
   * @returns {void}
   */
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      this.emit("sgds-sidebar-toggle", {
        detail: { collapsed: this.collapsed },
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
          "sidebar--expanded": !this.collapsed,
          "sidebar--collapsed": this.collapsed
        })}
      >
        <nav class="sidebar-content" aria-label="Navigation menu">
          <div class="sidebar-header">
            <div class="brand-name">
              <slot name="brand-name"></slot>
            </div>

            <sgds-icon-button
              name=${this.collapsed ? "sidebar-expand" : "sidebar-collapse"}
              variant="ghost"
              tone="neutral"
              size="sm"
              @click=${this.toggleCollapsed}
              aria-label=${this.collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded=${!this.collapsed}
            ></sgds-icon-button>
          </div>

          <slot></slot>
        </nav>

        <div
          class=${classMap({
            "sidebar-nested-overlay": true,
            show: this.currentSelected !== null
          })}
          role="region"
          aria-label=${this.currentSelected?.title ? `Nested options for ${this.currentSelected.title}` : ""}
          aria-hidden=${!this.currentSelected ? "true" : "false"}
        >
          ${this.drawerContent}
        </div>
      </div>
    `;
  }
}

export default SgdsSidebar;
