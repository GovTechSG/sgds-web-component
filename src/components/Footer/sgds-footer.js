import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerStyle from "./footer.css";
/**
 * @summary The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.
 *
 * @csspart footer-top - The component's footer-top section container.
 * @csspart footer-bottom - The component's footer-bottom section container.
 *
 * @cssproperty footer-top - The component's footer-top section container.
 * @cssproperty footer-bottom - The component's footer-bottom section container.
 */
export class SgdsFooter extends SgdsElement {
    constructor() {
        super(...arguments);
        /**
         * 	Sets title of SgdsFooter
         */
        this.title = "";
        /**
         * 	Sets description of SgdsFooter
         */
        this.description = "";
        /**
         * 	Sets copyrightLiner of SgdsFooter
         */
        this.copyrightLiner = "Government of Singapore";
        /**
         * Array of type
         *
         * `interface ColumnLinks { title: string; links : Links[] } interface Links { href: string; label: string; }`
         */
        this.links = [];
        /**
         * String date for last updated date
         */
        this.lastUpdatedDate = "";
        /**
         * 	href link for contacts
         */
        this.contactHref = "#";
        /**
         * 	href link for feedback
         */
        this.feedbackHref = "#";
        /**
         * 	href link for privacy statement
         */
        this.privacyHref = "#";
        /**
         * 	href link for terms of use
         */
        this.termsOfUseHref = "#";
    }
    render() {
        // if description is defined
        const hasDescription = html ` <div class="description">${this.description}</div>`;
        return html `
      <footer class="sgds footer">
        <section class="footer-top" part="footer-top">
          <div class="container-fluid">
            <div class="row footer-header">
              <div class="col col-lg-6 col-md-12">
                <div class="title">${this.title ? this.title : "Footer title"}</div>
                ${this.description ? hasDescription : undefined}
              </div>
            </div>
            <div class="row footer-items">
              ${this.links.map((item) => html `
                    <div class="col-xxl-2 col-md-4 mb-3">
                      <div class="title">${item.title}</div>
                      <ul class="links">
                        ${item.links.map((link) => html ` <li><a href=${link.href}>${link.label}</a></li> `)}
                      </ul>
                    </div>
                  `)}
            </div>
            <div class="row footer-contact-links">
              <div class="col">
                <div class="d-flex justify-content-lg-end">
                  <ul>
                    <li><a href=${this.contactHref}>Contact</a></li>
                    <li><a href=${this.feedbackHref}>Feedback</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="footer-bottom" part="footer-bottom">
          <div class="container-fluid">
            <div class="row footer-mandatory-links">
              <div class="col">
                <ul>
                  <li>
                    <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer"
                      >Report Vulnerability</a
                    >
                  </li>
                  <li><a href=${this.privacyHref}>Privacy Statement</a></li>
                  <li><a href=${this.termsOfUseHref}>Terms of use</a></li>
                </ul>
              </div>
            </div>
            <div class="row footer-copyrights">
              <div class="col">
                <div class="d-flex justify-content-lg-end text-end">
                  © ${new Date().getFullYear()} ${this.copyrightLiner}<br />
                  Last Updated ${this.lastUpdatedDate}
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    `;
    }
}
SgdsFooter.styles = [...SgdsElement.styles, footerStyle];
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "title", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "description", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "copyrightLiner", void 0);
__decorate([
    property({
        type: Array
    })
], SgdsFooter.prototype, "links", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "lastUpdatedDate", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "contactHref", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "feedbackHref", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "privacyHref", void 0);
__decorate([
    property({ type: String })
], SgdsFooter.prototype, "termsOfUseHref", void 0);
export default SgdsFooter;
//# sourceMappingURL=sgds-footer.js.map