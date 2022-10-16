import { html } from "lit";
import LinkElement from "../utils/link-element";
import { customElement } from "lit/decorators.js";
import styles from "./sgds-sidenav-link.scss";
import { classMap } from "lit/directives/class-map.js";

@customElement("sgds-sidenav-link")
export class SgdsSidenavLink extends LinkElement {
  static styles = styles;
}
