import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerSocialMediaStyle from "./footer-social-media.css";

export class SgdsFooterSocialMedia extends SgdsElement {
  static styles = [...SgdsElement.styles, footerSocialMediaStyle];

  /**
   * 	href link for social media
   */
  @property({ type: String })
  href = "#";

  render() {
    return html`
      <a slot="footer-social-media" href="${this.href}">
        <slot></slot>
      </a>
    `;
  }
}

export default SgdsFooterSocialMedia;
