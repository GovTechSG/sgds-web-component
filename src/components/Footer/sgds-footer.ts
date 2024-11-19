import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerStyle from "./footer.css";

// TODO: remove csspart and its jsdocs to prevent user from modifying footer style
// TODO: add jsdocs description for the all the slots
// TODO: slots can be renamed to remove footer- prefix.

/**
 * @summary The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.
 *
 * @csspart footer-top - The component's footer-top section container.
 * @csspart footer-bottom - The component's footer-bottom section container.
 *
 */
export class SgdsFooter extends SgdsElement {
  static styles = [...SgdsElement.styles, footerStyle];

  /**
   * 	Sets copyrightLiner of SgdsFooter
   */
  @property({ type: String })
  copyrightLiner = "Government of Singapore";

  /**
   * 	href link for contacts
   */
  @property({ type: String })
  contactHref = "#";

  /**
   * 	href link for feedback
   */
  @property({ type: String })
  feedbackHref = "#";

  /**
   * 	href link for faq
   */
  @property({ type: String })
  faqHref = "#";

  /**
   * 	href link for privacy statement
   */
  @property({ type: String })
  privacyHref = "#";

  /**
   * 	href link for terms of use
   */
  @property({ type: String })
  termsOfUseHref = "#";

  firstUpdated() {
    const socialMediaSlot = this.shadowRoot.querySelector("slot[name='footer-social-media']") as HTMLSlotElement;
    const footerTitleSlot = this.shadowRoot.querySelector("slot[name='footer-title']") as HTMLSlotElement;
    const footerDescriptionSlot = this.shadowRoot.querySelector("slot[name='footer-description']") as HTMLSlotElement;
    const socialMediaChildNodes = socialMediaSlot.assignedNodes({ flatten: true });
    const footerTitleChildNodes = footerTitleSlot.assignedNodes({ flatten: true });
    const footerDescriptionChildNodes = footerDescriptionSlot.assignedNodes({ flatten: true });
    if (socialMediaChildNodes.length === 0) {
      const socialMediaContainer = this.shadowRoot.querySelector(".social-media") as HTMLDivElement;
      socialMediaContainer.style.display = "none";
    }

    if (footerTitleChildNodes.length === 0 && footerDescriptionChildNodes.length === 0) {
      const footerHeaderContainer = this.shadowRoot.querySelector(".footer-header") as HTMLDivElement;
      footerHeaderContainer.style.display = "none";
    }
  }

  render() {
    return html`
      <footer class="footer">
        <section class="footer-top" part="footer-top">
          <div class="footer-header">
            <slot name="footer-title"></slot>
            <slot name="footer-description"></slot>
          </div>
          <div class="footer-items">
            <slot name="footer-item"></slot>
          </div>
        </section>
        <section class="footer-bottom" part="footer-bottom">
          <div class="social-media">
            <slot name="footer-social-media"></slot>
          </div>
          <div class="footer-mandatory-links">
            <ul>
              <li><a href=${this.contactHref}>Contact</a></li>
              <li><a href=${this.feedbackHref}>Feedback</a></li>
              <li><a href=${this.faqHref}>FAQ</a></li>
              <li>
                <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer">
                  Report Vulnerability
                </a>
              </li>
              <li><a href=${this.privacyHref}>Privacy Statement</a></li>
              <li><a href=${this.termsOfUseHref}>Terms of use</a></li>
            </ul>
            <div class="footer-copyrights">© ${new Date().getFullYear()}, ${this.copyrightLiner}</div>
          </div>
        </section>
      </footer>
    `;
  }
}

export default SgdsFooter;
