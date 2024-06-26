import LinkElement from "../../base/link-element";
import mainnavItemStyle from "./mainnav-item.css";

/**
 * @slot default - slot for SgdsMainnavItem element.
 *
 * @cssproperty --mainnav-item-disabled-opacity - The opacity of mainnav item at disabled state. By default, it follows --mainnav-disabled-opacity
 */
export class SgdsMainnavItem extends LinkElement {
  static styles = [...LinkElement.styles, mainnavItemStyle];
}

export default SgdsMainnavItem;
