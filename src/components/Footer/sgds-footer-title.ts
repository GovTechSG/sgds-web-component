import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerTitleStyle from "./footer-title.css";

export class SgdsFooterTitle extends SgdsElement {
  static styles = [...SgdsElement.styles, footerTitleStyle];

  /**
   * 	Sets title of SgdsFooter
   */
  @property({ type: String })
  title = "";

  /**
   * 	Sets description of SgdsFooter
   */
  @property({ type: String })
  description = "";

  render() {
    // if description is defined
    const hasDescription = html` <div class="description">${this.description}</div>`;

    return html`
      <div class="footer-header">
        <span class="title">${this.title ? this.title : "Footer title"}</span>
        ${this.description ? hasDescription : undefined}
      </div>
    `;
  }
}

export default SgdsFooterTitle;
