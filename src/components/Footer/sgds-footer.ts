import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { HasSlotController } from "../../utils/slot";
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

  private readonly hasSlotController = new HasSlotController(this, "social-media", "title", "description", "items");

  render() {
    const hasSocialMediaSlot = this.hasSlotController.test("social-media");
    const hasTitleSlot = this.hasSlotController.test("title");
    const hasDescriptionSlot = this.hasSlotController.test("description");
    const hasItemsSlot = this.hasSlotController.test("items");

    const displayFooterHeader = hasTitleSlot || hasDescriptionSlot;
    const displayFooterItems = hasItemsSlot;
    const displaySocialMedia = hasSocialMediaSlot;
    const displayFooterTop = displayFooterHeader || displayFooterItems;

    return html`
      <footer class="footer">
        ${displayFooterTop
          ? html` <section class="footer-top">
              ${displayFooterHeader
                ? html`
                    <div class="footer-header">
                      <slot name="title"></slot>
                      <slot name="description"></slot>
                    </div>
                  `
                : nothing}
              ${displayFooterItems
                ? html` <div class="footer-items">
                    <slot name="items"></slot>
                  </div>`
                : nothing}
            </section>`
          : nothing}

        <section class="footer-bottom">
          ${displaySocialMedia
            ? html`
                <div class="social-media">
                  <slot name="social-media"></slot>
                </div>
              `
            : nothing}
          <div class="footer-mandatory-links">
            <ul>
              <li><a href=${this.contactHref}>Contact</a></li>
              <li><a href=${this.feedbackHref}>Feedback</a></li>
              <li><a href=${this.faqHref}>FAQ</a></li>
              <li>
                <a
                  href="https://tech.gov.sg/report_vulnerability"
                  target="_blank"
                  rel="noopener
                  noreferrer"
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
