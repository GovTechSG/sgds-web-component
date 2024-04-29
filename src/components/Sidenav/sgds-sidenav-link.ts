import LinkElement from "../../base/link-element";
import sidenavLinkStyle from "./sidenav-link.style";

/**
 * @slot default - slot for label of anchor tag.
 *
 * @cssproperty --sidenav-link-font-size - sidenav link font size, default to `--sgds-body-font-size`
 * @cssproperty --sidenav-link-padding-x - sidenav link padding left and right
 * @cssproperty --sidenav-link-padding-y - sidenav link padding top and bottom
 * @cssproperty --sidenav-link-disabled-color - sidenav link disabled color, default to `--sgds-gray-600`
 */
export class SgdsSidenavLink extends LinkElement {
  static styles = sidenavLinkStyle;
}

export default SgdsSidenavLink;
