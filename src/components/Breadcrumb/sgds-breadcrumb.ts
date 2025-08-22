import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import SgdsOverflowMenu from "../OverflowMenu/sgds-overflow-menu";
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
  static dependencies = {
    "sgds-overflow-menu": SgdsOverflowMenu
  };
  /** The aria-label of nav element within breadcrumb component. */
  @property({ type: String }) ariaLabel = "breadcrumb";

  /**@internal */
  @query("slot") defaultSlot: HTMLSlotElement;
  /**
   * creates `<sgds-breadcrumb-item>
   *            <sgds-overflow-menu>
   *              <sgds-dropdown-item></sgds-dropdown-item>
   *               ...
   *            </sgds-overflow-menu>
   *          <sgds-breadcrumb-item>`
   */
  private _replaceExcessItemsWithDropdown(items: SgdsBreadcrumbItem[]) {
    const breadcrumbItem = document.createElement("sgds-breadcrumb-item");
    const overflowMenu = document.createElement("sgds-overflow-menu");
    overflowMenu.setAttribute("aria-haspopup", "menu");
    overflowMenu.setAttribute("size", "sm");
    const mapItems = items.filter((item, index) => {
      if (index > 0 && index < items.length - 2) {
        const clonedAnchor = item.querySelector("a");
        const clonedAnchorNode = clonedAnchor.cloneNode(true);
        const dropdownItem = document.createElement("sgds-dropdown-item");
        dropdownItem.appendChild(clonedAnchorNode);
        overflowMenu.appendChild(dropdownItem);
        return;
      } else {
        return item;
      }
    });
    breadcrumbItem.appendChild(overflowMenu);
    mapItems.splice(1, 0, breadcrumbItem);

    this.defaultSlot.replaceWith(...mapItems);
  }

  private _handleSlotChange(e: Event) {
    const items = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(
        (item: SgdsBreadcrumbItem) => item.tagName.toLowerCase() === "sgds-breadcrumb-item"
      ) as SgdsBreadcrumbItem[];
    items.forEach((item, index) => {
      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
        item.active = true;
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (items.length >= 5) {
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
