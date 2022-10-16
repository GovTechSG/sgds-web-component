
import { customElement } from "lit/decorators.js";
import styles from "./sgds-mainnav-item.scss";
import LinkElement from "../utils/link-element";
@customElement("sgds-mainnav-item")
export class SgdsMainnavItem extends LinkElement {
  static styles = styles;
}