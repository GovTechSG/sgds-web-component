import LinkElement from "../../base/link-element";
import sidenavLinkStyle from "./sidenav-link.css";
/**
 * @slot default - slot for label of anchor tag.
 *
 * @cssproperty --sgds-sidenav-link-font-size - sidenav link font size, default to `--sgds-body-font-size`
 * @cssproperty --sgds-sidenav-link-padding-x - sidenav link padding left and right
 * @cssproperty --sgds-sidenav-link-padding-y - sidenav link padding top and bottom
 * @cssproperty --sgds-sidenav-link-disabled-color - sidenav link disabled color, default to `--sgds-gray-600`
 */
export class SgdsSidenavLink extends LinkElement {
}
SgdsSidenavLink.styles = [...LinkElement.styles, sidenavLinkStyle];
export default SgdsSidenavLink;
//# sourceMappingURL=sgds-sidenav-link.js.map