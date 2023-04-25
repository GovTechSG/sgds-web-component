import LinkElement from "../../base/link-element";
import { customElement } from "lit/decorators.js";
import styles from "./sgds-sidenav-link.scss";

/**
 * @slot - default slot for label of anchor tag.
 */
@customElement("sgds-sidenav-link")
export class SgdsSidenavLink extends LinkElement {
  static styles = styles;
}

export default SgdsSidenavLink;
