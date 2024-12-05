import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import type SgdsBreadcrumbItem from "./sgds-breadcrumb-item";
import breadcrumbStyle from "./breadcrumb.css";
/**
 * @summary Breadcrumbs help users to navigate and understand where they are on the current website or service.
 *
 * @slot default - The slot to pass in custom elements of `SgdsBreadcrumbItems`.
 * @slot separator - Defines all the separator of `SgdsBreadcrumbItems`. Defaults to "/"
 *
 * @csspart base - The nav element wrapper of `SgdsBreadcrumb`
 *
 */
export class SgdsBreadcrumb extends SgdsElement {
  static styles = [...SgdsElement.styles, breadcrumbStyle];
  /** The aria-label of nav element within breadcrumb component. */
  @property({ type: String }) ariaLabel = "breadcrumb";

  /**@internal */
  @query("slot") defaultSlot: HTMLSlotElement;
  /**@internal */
  @query('slot[name="separator"]') separatorSlot: HTMLSlotElement;

  // Generates a clone of the separator element to use for each breadcrumb item
  private _getSeparator() {
    const separator = this.separatorSlot.assignedElements({ flatten: true })[0] as HTMLElement;

    // Clone it, remove ids, and slot it
    const clone = separator.cloneNode(true) as HTMLElement;
    [clone, ...clone.querySelectorAll("[id]")].forEach(el => el.removeAttribute("id"));
    clone.setAttribute("data-default", "");
    clone.slot = "separator";

    return clone;
  }

  private _handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
      item => item.tagName.toLowerCase() === "sgds-breadcrumb-item"
    ) as SgdsBreadcrumbItem[];

    items.forEach((item, index) => {
      // Append separators to each item if they don't already have one
      const separator = item.querySelector('[slot="separator"]');
      if (separator === null) {
        // No separator exists, add one
        item.append(this._getSeparator());
      } else if (separator.hasAttribute("data-default")) {
        // A default separator exists, replace it
        separator.replaceWith(this._getSeparator());
      } else {
        // The user provided a custom separator, leave it alone
      }

      // The last breadcrumb item is the "current page"

      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  render() {
    return html`
      <div aria-label=${ifDefined(this.ariaLabel)}>
        <div class="breadcrumb">
          <slot @slotchange=${this._handleSlotChange}></slot>
          <slot name="separator" hidden aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.90438 2.13558C4.94724 2.0926 4.99817 2.0585 5.05424 2.03524C5.1103 2.01198 5.17041 2 5.23111 2C5.29181 2 5.35191 2.01198 5.40798 2.03524C5.46405 2.0585 5.51497 2.0926 5.55784 2.13558L11.0957 7.67339C11.1386 7.71626 11.1727 7.76718 11.196 7.82325C11.2193 7.87932 11.2312 7.93942 11.2312 8.00012C11.2312 8.06082 11.2193 8.12093 11.196 8.17699C11.1727 8.23306 11.1386 8.28398 11.0957 8.32685L5.55784 13.8647C5.47118 13.9513 5.35366 14 5.23111 14C5.10856 14 4.99103 13.9513 4.90438 13.8647C4.81772 13.778 4.76904 13.6605 4.76904 13.5379C4.76904 13.4154 4.81772 13.2979 4.90438 13.2112L10.1164 8.00012L4.90438 2.78904C4.8614 2.74617 4.8273 2.69525 4.80404 2.63918C4.78077 2.58312 4.7688 2.52301 4.7688 2.46231C4.7688 2.40161 4.78077 2.3415 4.80404 2.28544C4.8273 2.22937 4.8614 2.17845 4.90438 2.13558Z"
                fill="#757575"
              />
            </svg>
          </slot>
        </div>
      </div>
    `;
  }
}

export default SgdsBreadcrumb;
