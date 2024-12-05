import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsLink from "../Link/sgds-link";
import breadcrumbItemStyle from "./breadcrumb-item.css";
/**
 * @summary Breadcrumb Item are navigational links used in Breadcrumb component
 *
 * @slot default - The title of the item
 * @slot separator - The individual separator of breadcrumb item can be changed here.
 *
 * @csspart base - The base wrapper of breadcrumb item which is a HTMLListElement.
 * @csspart label -The label of the breadcrumb item. It is either a span or anchor element depending on href attribute
 *
 */
export class SgdsBreadcrumbItem extends SgdsLink {
  static styles = [...SgdsLink.styles, breadcrumbItemStyle];
  /** Specifies the url path of the breadcrumb-item. When defined, the breadcrumb-items is a anchor element. When not defined, indicates that the breadcrumb item is active. In such cases, a span element is rendered. */
  @property({ type: String, reflect: true }) active: string;

  render() {
    return html`
      <slot class="nav-link"></slot>
      <slot name="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
    `;
  }
}

export default SgdsBreadcrumbItem;
