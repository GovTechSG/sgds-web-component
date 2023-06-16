import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-alert.scss";

@customElement("sgds-alert-heading")
export class SgdsAlertHeading extends SgdsElement {
  static styles = [SgdsElement.styles];

  /** The alert's theme variant. */

  @property({ type: String, reflect: true }) headerTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h4";

  render() {
    return html`
      <${this.headerTag}
      class=${this.headerTag}
      >
      <slot>
      </${this.headerTag}>
    `;
  }
}

export default SgdsAlertHeading;
