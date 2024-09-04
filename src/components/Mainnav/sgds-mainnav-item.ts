import LinkElement from "../../base/link-element";
import mainnavItemStyle from "./mainnav-item.css";

/**
 * @slot default - slot for SgdsMainnavItem element.
 *
 *  */
export class SgdsMainnavItem extends LinkElement {
  static styles = [...LinkElement.styles, mainnavItemStyle];
}

export default SgdsMainnavItem;
