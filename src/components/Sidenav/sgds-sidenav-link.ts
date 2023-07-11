import LinkElement from "../../base/link-element";
import { customElement } from "lit/decorators.js";
import styles from "./sgds-sidenav-link.scss";

/**
 * @slot default - slot for label of anchor tag.
 *
 * @cssproperty --sidenav-link-font-size - sidenav link font size, default to `--sgds-body-font-size`
 * @cssproperty --sidenav-link-padding-x - sidenav link padding left and right
 * @cssproperty --sidenav-link-padding-y - sidenav link padding top and bottom
 * @cssproperty --sidenav-link-disabled-color - sidenav link disabled color, default to `--sgds-gray-600`
 */
// @customElement("sgds-sidenav-link")
export class SgdsSidenavLink extends LinkElement {
  static styles = styles;
}
if(!customElements.get("sgds-sidenav-link")) {
  customElements.define("sgds-sidenav-link", SgdsSidenavLink)

}
export default SgdsSidenavLink;
