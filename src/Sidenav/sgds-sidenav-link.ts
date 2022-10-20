import LinkElement from "../utils/link-element";
import { customElement } from "lit/decorators.js";
import styles from "./sgds-sidenav-link.scss";

/**
 * @since 0.0.8
 * @status stable
 *
 *
 * @slot - default slot for label of anchor tag.
 */
@customElement("sgds-sidenav-link")
export class SgdsSidenavLink extends LinkElement {
  static styles = styles;
}


export default SgdsSidenavLink;
