import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerStyle from "./footer.css";

/**
 * @summary The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.
 *
 * @slot title - The slot for title
 * @slot description - The slot for description
 * @slot items - The slot for the list of footer items
 * @slot social-media - The slot for the list of social media with icons
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
    const socialMediaSlot = this.shadowRoot.querySelector("slot[name='social-media']") as HTMLSlotElement;
    const footerTitleSlot = this.shadowRoot.querySelector("slot[name='title']") as HTMLSlotElement;
    const footerDescriptionSlot = this.shadowRoot.querySelector("slot[name='description']") as HTMLSlotElement;
    const footerItemsSlot = this.shadowRoot.querySelector("slot[name='items']") as HTMLSlotElement;
    const socialMediaChildNodes = socialMediaSlot.assignedNodes({ flatten: true });
    const footerTitleChildNodes = footerTitleSlot.assignedNodes({ flatten: true });
    const footerDescriptionChildNodes = footerDescriptionSlot.assignedNodes({ flatten: true });
    const footerItemsChildNodes = footerItemsSlot.assignedNodes({ flatten: true });
    if (socialMediaChildNodes.length === 0) {
      const socialMediaContainer = this.shadowRoot.querySelector(".social-media") as HTMLDivElement;
      socialMediaContainer.style.display = "none";
    }

    if (footerTitleChildNodes.length === 0 && footerDescriptionChildNodes.length === 0) {
      const footerHeaderContainer = this.shadowRoot.querySelector(".footer-header") as HTMLDivElement;
      footerHeaderContainer.style.display = "none";
    }

    if (footerItemsChildNodes.length === 0) {
      const footerItemsContainer = this.shadowRoot.querySelector(".footer-items") as HTMLDivElement;
      footerItemsContainer.style.display = "none";
    }

    if (
      footerTitleChildNodes.length === 0 &&
      footerDescriptionChildNodes.length === 0 &&
      footerItemsChildNodes.length === 0
    ) {
      const footerTopContainer = this.shadowRoot.querySelector(".footer-top") as HTMLDivElement;
      footerTopContainer.style.display = "none";
    }
  }

  render() {
    return html`
      <footer class="footer">
        <section class="footer-top">
          <div class="footer-header">
            <slot name="title"></slot>
            <slot name="description"></slot>
          </div>
          <div class="footer-items">
            <slot name="items"></slot>
          </div>
        </section>
        <section class="footer-bottom">
          <div class="social-media">
            <slot name="social-media"></slot>
          </div>
          <div class="footer-mandatory-links">
            <ul>
              <li><a href=${this.contactHref}>Contact</a></li>
              <li><a href=${this.feedbackHref}>Feedback</a></li>
              <li><a href=${this.faqHref}>FAQ</a></li>
              <li>
                <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer"
                  >Report Vulnerability</a
                >
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
