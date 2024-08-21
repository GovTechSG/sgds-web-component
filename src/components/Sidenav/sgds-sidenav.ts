import { html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import SgdsSidenavItem from "./sgds-sidenav-item";
import { classMap } from "lit/directives/class-map.js";
import sidenavStyle from "./sidenav.css";

/**
 * @summary The side navigation is used to display a list of links to move between pages within a related category.
 * It is used as a secondary form of navigation where the primary navigation is located hierachically above the page frame.
 * Maximum two levels of navigations are allowed.
 *
 * @slot default - Default slot for SgdsSidenavItem element.
 *
 * @cssproperty --sidenav-theme-color - overall sidenav theme color
 * @cssproperty --sidenav-sticky-top - set the top value of the sticky sidenav. Defaults to 0rem
 */
export class SgdsSidenav extends SgdsElement {
  static styles = [...SgdsElement.styles, sidenavStyle];

  /** Allow sidenav items to stay open when another item is opened */
  @property({ type: Boolean, attribute: true })
  alwaysOpen = false;

  /** Apply position sticky to the sidenav */
  @property({ type: Boolean, attribute: true })
  sticky = false;

  /** @internal */
  @queryAssignedElements()
  private defaultNodes!: SgdsSidenavItem[];

  /** @internal */
  get items(): SgdsSidenavItem[] {
    return [...(this.defaultNodes || [])].filter(
      (node: HTMLElement) => typeof node.tagName !== "undefined"
    ) as SgdsSidenavItem[];
  }

  async onToggle(event: Event): Promise<void> {
    const target = event.target as SgdsSidenavItem;
    const isSidenavLink = target.tagName === "SGDS-SIDENAV-LINK";
    // Let the event pass through the DOM so that it can be
    // prevented from the outside if a user so desires.
    if (this.alwaysOpen || event.defaultPrevented || isSidenavLink) {
      // No toggling when `alwaysOpen` or the user prevents it.
      return;
    }
    const items = [...this.items] as SgdsSidenavItem[];

    if (items && !items.length) {
      // no toggling when there aren't items.
      return;
    }
    items.forEach(item => {
      // Covers all elements within sidenav-item
      if (!event.composedPath().includes(item)) {
        // Close all the items that didn't dispatch the event.
        item.active = false;
      }
    });
  }

  render() {
    return html`
      <nav class=${classMap({ sticky: this.sticky })}>
        <div>
          <slot @click=${this.onToggle}></slot>
        </div>
      </nav>
    `;
  }
}

export default SgdsSidenav;
