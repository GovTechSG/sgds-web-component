import { customElement } from "lit/decorators.js";
import styles from "./sgds-mainnav-item.scss";
import LinkElement from "../../base/link-element";

/**
 * @slot default - slot for SgdsMainnavItem element.
 *
 * @cssproperty ---mainnav-item-theme-color - Hover and active color for mainnav items.
 */
@customElement("sgds-mainnav-item")
export class SgdsMainnavItem extends LinkElement {
  static styles = [LinkElement.styles, styles];
}

export default SgdsMainnavItem;
