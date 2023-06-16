import { customElement, property } from "lit/decorators.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-alert.scss";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("sgds-alert-link")
export class SgdsAlertLink extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  /** Forwards to href attribute of anchor element */
  @property({ type: String, reflect: true }) href: string;
  /** Tells the browser where to open the link */
  @property() target: "_blank" | "_parent" | "_self" | "_top";

  render() {
    return html`
      <a class="alert-link" href=${ifDefined(this.href)} target=${ifDefined(this.target)}><slot></slot> </a>
    `;
  }
}

export default SgdsAlertLink;
