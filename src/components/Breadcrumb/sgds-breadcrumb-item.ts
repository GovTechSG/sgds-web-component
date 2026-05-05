import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsLink from "../Link/sgds-link";
import breadcrumbItemStyle from "./breadcrumb-item.css";
import SgdsElement from "../../base/sgds-element";
/**
 * @summary Breadcrumb Item are navigational links used in Breadcrumb component
 *
 * @slot default - The link of the item. Pass in anchor tags into this slot
 */
export class SgdsBreadcrumbItem extends SgdsElement {
  static styles = [breadcrumbItemStyle];
  static dependencies: Record<string, typeof SgdsElement> = {
    "sgds-link": SgdsLink,
    "sgds-icon": SgdsIcon
  };
  /** Indicates the link matches the current location of the page. Programmatically handled by SgdsBreadcrumb to set this prop to true for the last breadcrumb item  */
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`
      <sgds-link><slot class="nav-link"></slot></sgds-link>
      <div class="separator">
        <sgds-icon name="chevron-right" size="sm"></sgds-icon>
      </div>
    `;
  }
}

export default SgdsBreadcrumbItem;
