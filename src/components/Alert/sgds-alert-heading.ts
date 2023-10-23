import { property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
/**
 * @summary Alert heading is the header of the Alert component. Use it in the default slot of `sgds-alert` when required
 *
 * @slot default - The text content of the anchor element
 */
export class SgdsAlertHeading extends SgdsElement {
  static styles = [SgdsElement.styles];

  /** The type of header tag style for alert's heading */
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
