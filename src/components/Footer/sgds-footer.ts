import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsLink from "../Link/sgds-link";
import SgdsElement from "../../base/sgds-element";
import { HasSlotController } from "../../utils/slot";
import footerStyle from "./footer.css";

/**
 * @summary The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.
 *
 * @slot title - The slot for title
 * @slot description - The slot for description
 * @slot content - The slot for footer content. Use this slot if you want full control over the layout or styling. When provided, it replaces the `items` slot layout.
 * @slot items - the slot for the list of footer items, styled automatically with `.footer-items`. For custom layouts or styles, use the `content` slot instead.
 */
export class SgdsFooter extends SgdsElement {
  static styles = [...SgdsElement.styles, footerStyle];

  /** @internal */
  static dependencies = {
    "sgds-link": SgdsLink
  };

  /** Sets copyrightLiner of SgdsFooter */
  @property({ type: String })
  copyrightLiner = "Government of Singapore";

  /**	href link for contacts */
  @property({ type: String })
  contactHref = "#";

  /**	href link for feedback */
  @property({ type: String })
  feedbackHref = "#";

  /**	href link for faq */
  @property({ type: String })
  faqHref = "#";

  /**	href link for sitemap */
  @property({ type: String })
  sitemapHref = "#";

  /**	href link for privacy statement */
  @property({ type: String })
  privacyHref = "#";

  /**	href link for terms of use */
  @property({ type: String })
  termsOfUseHref = "#";

  /** Used only for SSR to indicate the presence of the `title` slot. */
  @property({ type: Boolean }) hasTitleSlot = false;

  /** Used only for SSR to indicate the presence of the `description` slot. */
  @property({ type: Boolean }) hasDescriptionSlot = false;

  /** Used only for SSR to indicate the presence of the `items` slot. */
  @property({ type: Boolean }) hasItemsSlot = false;

  /** Used only for SSR to indicate the presence of the `content` slot. */
  @property({ type: Boolean }) hasContentSlot = false;

  private readonly hasSlotController = new HasSlotController(this, "title", "description", "content", "items");

  updated() {
    if (!this.hasTitleSlot) this.hasTitleSlot = this.hasSlotController.test("title");
    if (!this.hasDescriptionSlot) this.hasDescriptionSlot = this.hasSlotController.test("description");
    if (!this.hasItemsSlot) this.hasItemsSlot = this.hasSlotController.test("items");
    if (!this.hasContentSlot) this.hasContentSlot = this.hasSlotController.test("content");
  }

  render() {
    return html`
      <footer class="footer">
        <section
          class="${classMap({
            "footer-top": this.hasTitleSlot || this.hasDescriptionSlot || this.hasItemsSlot || this.hasContentSlot,
            "has-content": this.hasItemsSlot || this.hasContentSlot
          })}"
        >
          <div class="footer-header">
            <slot name="title"></slot>
            <slot name="description"></slot>
          </div>
          <div>
            <slot name="content">
              <div class="footer-items">
                <slot name="items"></slot>
              </div>
            </slot>
          </div>
        </section>
        <section class="footer-bottom">
          <div class="footer-mandatory-links">
            <ul>
              <li>
                <sgds-link size="sm"><a href=${this.contactHref}>Contact</a></sgds-link>
              </li>
              <li>
                <sgds-link size="sm"><a href=${this.feedbackHref}>Feedback</a></sgds-link>
              </li>
              <li>
                <sgds-link size="sm"><a href=${this.faqHref}>FAQ</a></sgds-link>
              </li>
              <li>
                <sgds-link size="sm"><a href=${this.sitemapHref}>Sitemap</a></sgds-link>
              </li>
              <li>
                <sgds-link size="sm">
                  <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer">
                    Report Vulnerability
                  </a>
                </sgds-link>
              </li>
              <li>
                <sgds-link size="sm"><a href=${this.privacyHref}>Privacy Statement</a></sgds-link>
              </li>
              <li>
                <sgds-link size="sm"><a href=${this.termsOfUseHref}>Terms of use</a></sgds-link>
              </li>
            </ul>
            <div class="footer-copyrights">© ${new Date().getFullYear()}, ${this.copyrightLiner}</div>
          </div>
        </section>
      </footer>
    `;
  }
}

export default SgdsFooter;
