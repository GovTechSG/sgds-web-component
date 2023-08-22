import { property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import type SgdsBreadcrumbItem from "./sgds-breadcrumb-item";
import styles from "./sgds-breadcrumb.scss";

/**
 * @summary Breadcrumbs help users to navigate and understand where they are on the current website or service.
 *
 * @slot default - The slot to pass in custom elements of `SgdsBreadcrumbItems`.
 * @slot separator - Defines all the separator of `SgdsBreadcrumbItems`. Defaults to "/"
 *
 * @csspart base - The nav element wrapper of `SgdsBreadcrumb`
 */
export class SgdsBreadcrumb extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  /** The aria-label of nav element within breadcrumb component. */
  @property({ type: String }) ariaLabel: string;
  /**@internal */
  @query("slot") defaultSlot: HTMLSlotElement;
  /**@internal */
  @query('slot[name="separator"]') separatorSlot: HTMLSlotElement;

  // Generates a clone of the separator element to use for each breadcrumb item
  private getSeparator() {
    const separator = this.separatorSlot.assignedElements({ flatten: true })[0] as HTMLElement;

    // Clone it, remove ids, and slot it
    const clone = separator.cloneNode(true) as HTMLElement;
    [clone, ...clone.querySelectorAll("[id]")].forEach(el => el.removeAttribute("id"));
    clone.setAttribute("data-default", "");
    clone.slot = "separator";

    return clone;
  }

  private handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
      item => item.tagName.toLowerCase() === "sgds-breadcrumb-item"
    ) as SgdsBreadcrumbItem[];

    items.forEach((item, index) => {
      // Append separators to each item if they don't already have one
      const separator = item.querySelector('[slot="separator"]');
      if (separator === null) {
        // No separator exists, add one
        item.append(this.getSeparator());
      } else if (separator.hasAttribute("data-default")) {
        // A default separator exists, replace it
        separator.replaceWith(this.getSeparator());
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
      <nav aria-label=${ifDefined(this.ariaLabel)} part="base">
        <ol class="breadcrumb">
          <slot @slotchange=${this.handleSlotChange}></slot>
          <slot name="separator" hidden aria-hidden="true">
            <span>/</span>
          </slot>
        </ol>
      </nav>
    `;
  }
}

export default SgdsBreadcrumb;
