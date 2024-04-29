import LinkElement from "../../base/link-element";
import styles from "./sgds-mainnav-item.scss?inline";
import mainnavItemStyle from "./mainnav-item.style";
/**
 * @slot default - slot for SgdsMainnavItem element.
 *
 * @cssproperty --mainnav-item-theme-color - Hover and active color for mainnav items.
 * @cssproperty --mainnav-item-color - Text color of nav item.
 * @cssproperty --mainnav-item-borderBottom-width - border bottom width for hover and active state for nav item
 */
export class SgdsMainnavItem extends LinkElement {
  static styles = [mainnavItemStyle, styles];
}

export default SgdsMainnavItem;
