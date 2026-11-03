import { nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsBreadcrumbItem } from "./sgds-breadcrumb-item";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsOverflowMenu from "../OverflowMenu/sgds-overflow-menu";
import breadcrumbStyle from "./breadcrumb.css";
/**
 * @summary Breadcrumbs help users to navigate and understand where they are on the current website or service.
 *
 * @slot default - The slot to pass in custom elements of `SgdsBreadcrumbItems`.
 *
 */
export class SgdsBreadcrumb extends SgdsElement {
  static styles = [...SgdsElement.styles, breadcrumbStyle];
  static dependencies = {
    "sgds-overflow-menu": SgdsOverflowMenu,
    "sgds-icon": SgdsIcon,
    "sgds-breadcrumb-item": SgdsBreadcrumbItem
  };
  /** The aria-label of nav element within breadcrumb component. */
  @property({ type: String }) ariaLabel = "breadcrumb";

  /** @internal Overflow item data collected from middle breadcrumb items */
  @state() private _overflowItems: Array<{ href: string; text: string }> = [];

  /** @internal Trailing visible items rendered in shadow DOM for correct tab order */
  @state() private _trailingItems: Array<{ href: string; text: string; isLast: boolean }> = [];

  private _handleSlotChange(e: Event) {
    const items = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(
        (item): item is SgdsBreadcrumbItem => item.tagName.toLowerCase() === "sgds-breadcrumb-item"
      );
    items.forEach((item, index) => {
      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
        item.active = true;
      } else {
        item.removeAttribute("aria-current");
      }
    });

    if (items.length >= 5) {
      this._overflowItems = items
        .filter((_, index) => index > 0 && index < items.length - 2)
        .map(item => {
          const anchor = item.querySelector("a");
          return { href: anchor?.href || "#", text: anchor?.textContent?.trim() || "" };
        });
      this._trailingItems = items.slice(-2).map((item, i, arr) => {
        const anchor = item.querySelector("a");
        return {
          href: anchor?.href || "#",
          text: anchor?.textContent?.trim() || item.textContent?.trim() || "",
          isLast: i === arr.length - 1
        };
      });
    } else {
      this._overflowItems = [];
      this._trailingItems = [];
    }
  }

  render() {
    const hasOverflow = this._overflowItems.length > 0;
    return html`
      <nav aria-label=${ifDefined(this.ariaLabel)}>
        <div class="breadcrumb${hasOverflow ? " has-overflow" : ""}">
          <slot @slotchange=${this._handleSlotChange}></slot>
          ${hasOverflow
            ? html`
                <div class="overflow-menu">
                  <sgds-overflow-menu aria-haspopup="menu" size="sm">
                    ${this._overflowItems.map(
                      item => html`
                        <sgds-dropdown-item>
                          <a href="${item.href}">${item.text}</a>
                        </sgds-dropdown-item>
                      `
                    )}
                  </sgds-overflow-menu>
                  <div class="separator">
                    <sgds-icon name="chevron-right" size="sm"></sgds-icon>
                  </div>
                </div>
                ${this._trailingItems.map(
                  item => html`
                    <sgds-breadcrumb-item
                      ?active=${item.isLast}
                      aria-current=${ifDefined(item.isLast ? "page" : undefined)}
                    >
                      <a href="${item.href}">${item.text}</a>
                    </sgds-breadcrumb-item>
                  `
                )}
              `
            : nothing}
        </div>
      </nav>
    `;
  }
}

export default SgdsBreadcrumb;
