import LinkElement from "../utils/link-element";
import { customElement } from "lit/decorators.js";
import styles from "./sgds-sidenav-link.scss";

@customElement("sgds-sidenav-link")
export class SgdsSidenavLink extends LinkElement {
  static styles = styles;
}
