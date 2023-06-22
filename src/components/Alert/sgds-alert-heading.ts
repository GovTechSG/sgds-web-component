import { customElement, property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";

@customElement("sgds-alert-heading")
export class SgdsAlertHeading extends SgdsElement {
  static styles = [SgdsElement.styles];

  @property({ type: String, reflect: true }) headerTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h4";

  render() {
    return html`
      <span class=${this.headerTag}>
        <slot></slot>
      </span>
    `;
  }
}

export default SgdsAlertHeading;
