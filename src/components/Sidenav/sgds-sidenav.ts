import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-sidenav.scss";
import SgdsSidenavItem from "./sgds-sidenav-item";

/**
 * @summary The side navigation is used to display a list of links to move between pages within a related category.
 * It is used as a secondary form of navigation where the primary navigation is located hierachically above the page frame.
 * Maximum two levels of navigations are allowed.
 *
 * @slot default - Default slot for SgdsSidenavItem element.
 *
 * @cssproperty --sidenav-theme-color - overall sidenav theme color
 */
@customElement("sgds-sidenav")
export class SgdsSidenav extends SgdsElement {
  static styles = styles;

  /** Allow sidenav items to stay open when another item is opened */
  @property({ type: Boolean, attribute: true })
  alwaysOpen = false;

  render() {
    this.alwaysOpen
      ? null
      : this.addEventListener("sgds-toggle", (e: CustomEvent) => {
          const children = this.shadowRoot.querySelector("slot").assignedElements({ flatten: true });
          for (let i = 0; i < children.length; i++) {
            if (e.detail.index != i) {
              (children[i] as SgdsSidenavItem).closeItem();
            }
          }
        });

    return html`
      <nav class="sidenav" id="${this.id}">
        <ul>
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

export default SgdsSidenav;
