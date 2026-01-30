import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import sidebarOptionStyle from "./sidebar-option.css";

/**
 * @summary Sidebar option represents a selectable or navigable item within the sidebar component.
 * It can be used to display menu items, navigation links, or other sidebar content options.
 * Supports nested options that display in a floating overlay when the parent option is hovered or focused.
 *
 * @slot - Insert any elements to be rendered as the option's content (label text).
 * @slot before - Insert content (typically an icon) to display before the label text.
 * @slot after - Insert content (typically an icon) to display after the label text.
 * @slot nested - Insert nested sidebar options that will appear in the floating overlay.
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
  @property({ type: String, reflect: true }) label = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.classList.add("sidebar-option");
  }

  render() {
    const hasNestedSlot = this.querySelector('[slot="nested"]');

    return html`
      <div
        class=${classMap({
          "sidebar-option-content": true,
          "sidebar-option-content--selected": this.selected,
          "sidebar-option-content--has-nested": !!hasNestedSlot
        })}
      >
        <div class="sidebar-option">
          <slot name="icon"></slot>
          ${this.label}
        </div>
      </div>
    `;
  }
}

export default SgdsSidebarOption;
