import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { warnUnregisteredElements } from "../../utils/ce-registry";
import breadcrumbStyle from "./breadcrumb.css";
import type SgdsBreadcrumbItem from "./sgds-breadcrumb-item";
/**
 * @summary Breadcrumbs help users to navigate and understand where they are on the current website or service.
 *
 * @slot default - The slot to pass in custom elements of `SgdsBreadcrumbItems`.
 * 
 */
export class SgdsBreadcrumb extends SgdsElement {
  static styles = [...SgdsElement.styles, breadcrumbStyle];
  /** The aria-label of nav element within breadcrumb component. */
  @property({ type: String }) ariaLabel = "breadcrumb";

  /**@internal */
  @query("slot") defaultSlot: HTMLSlotElement;

  private _checkDependencies() {
    warnUnregisteredElements("sgds-dropdown");
    warnUnregisteredElements("sgds-icon-button");
    warnUnregisteredElements("sgds-icon");
  }
  /**
   * creates `<sgds-breadcrumb-item>
   *            <sgds-dropdown>
   *              <sgds-icon-button slot="toggler">
   *                <sgds-icon>
   *              </sgds-icon-button> 
   *              <sgds-dropdown-item></sgds-dropdown-item>
   *               ...
   *            </sgds-dropdown>
   *          <sgds-breadcrumb-item>`
   */
  private _replaceExcessItemsWithDropdown(items: SgdsBreadcrumbItem[]) {
    const breadcrumbItem = document.createElement("sgds-breadcrumb-item");
    const dropdown = document.createElement("sgds-dropdown");
    const overflowButton = document.createElement("sgds-icon-button");
    const icon = document.createElement("sgds-icon");
    icon.setAttribute("name", "three-dots");
    overflowButton.setAttribute("slot", "toggler");
    overflowButton.setAttribute("variant", "ghost");
    overflowButton.setAttribute("role", "button");
    overflowButton.setAttribute("aria-haspopup", "menu");
    overflowButton.appendChild(icon);
    dropdown.appendChild(overflowButton);
    const mapItems = items.filter((item, index) => {
      if (index > 0 && index < items.length - 2) {
        const clonedAnchor = item.querySelector("a");
        const clonedAnchorNode = clonedAnchor.cloneNode(true)
        const dropdownItem = document.createElement("sgds-dropdown-item");
        dropdownItem.appendChild(clonedAnchorNode)
        dropdown.appendChild(dropdownItem);
        return;
      } else {
        return item;
      }
    });
    breadcrumbItem.appendChild(dropdown);
    mapItems.splice(1, 0, breadcrumbItem);

    this.defaultSlot.replaceWith(...mapItems);
  }
  private _handleSlotChange(e) {
    const items = e.target
      .assignedElements({ flatten: true })
      .filter(item => item.tagName.toLowerCase() === "sgds-breadcrumb-item") as SgdsBreadcrumbItem[];
    items.forEach((item, index) => {
      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
        item.active = true;
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (items.length >= 5) {
      this._checkDependencies();
      this._replaceExcessItemsWithDropdown(items);
    }
  }

  render() {
    return html`
      <div aria-label=${ifDefined(this.ariaLabel)}>
        <div class="breadcrumb">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsBreadcrumb;
