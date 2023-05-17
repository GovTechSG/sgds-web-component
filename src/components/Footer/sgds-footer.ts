import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-footer.scss";
import SgdsElement from "../../base/sgds-element";

export interface Links {
  href: string;
  label: string;
}
export interface ColumnLinks {
  title: string;
  links: Links[];
}

/**
 * @summary The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.
 *
 * @csspart footer-top - The component's footer-top section container.
 * @csspart footer-bottom - The component's footer-bottom section container.
 *
 * @cssproperty footer-top - The component's footer-top section container.
 * @cssproperty footer-bottom - The component's footer-bottom section container.
 */
@customElement("sgds-footer")
export class SgdsFooter extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /**
   * 	Sets title of SgdsFooter
   */
  @property({ type: String })
  title: string;

  /**
   * 	Sets description of SgdsFooter
   */
  @property({ type: String })
  description: string;

  /**
   * 	Sets copyrightLiner of SgdsFooter
   */
  @property({ type: String })
  copyrightLiner: string;

  /**
   * Array of type
   *
   * `interface ColumnLinks { title: string; links : Links[] } interface Links { href: string; label: string; }`
   */
  @property({
    type: Array
  })
  links: ColumnLinks[] = [];

  /**
   * String date for last updated date
   */
  @property({ type: String })
  lastUpdatedDate: string;

  /**
   * 	href link for contacts
   */
  @property({ type: String })
  contactHref: string;

  /**
   * 	href link for feedback
   */
  @property({ type: String })
  feedbackHref: string;

  /**
   * 	href link for privacy statement
   */
  @property({ type: String })
  privacyHref: string;

  /**
   * 	href link for terms of use
   */
  @property({ type: String })
  termsOfUseHref: string;

  render() {
    return html`
      <footer class="sgds footer">
        <section class="footer-top" part="footer-top">
          <div class="container-fluid">
            <div class="row footer-header">
              <div class="col col-lg-6 col-md-12">
                <div class="title">${this.title ? this.title : "Footer title"}</div>
                <div class="description">${this.description ? this.description : "Footer description"}</div>
              </div>
            </div>
            <div class="row footer-items">
              ${this.links.map(
                (item: ColumnLinks) =>
                  html`
                    <div class="col-xxl-2 col-md-4 mb-3">
                      <div class="title">${item.title}</div>
                      <ul class="links">
                        ${item.links.map((link: Links) => html` <li><a href=${link.href}>${link.label}</a></li> `)}
                      </ul>
                    </div>
                  `
              )}
            </div>
            <div class="row footer-contact-links">
              <div class="col">
                <div class="d-flex justify-content-lg-end">
                  <ul>
                    <li><a href=${this.contactHref ? this.contactHref : "#"}>Contact</a></li>
                    <li><a href=${this.feedbackHref ? this.feedbackHref : "#"}>Feedback</a></li>
                    <li>
                      <a href="https://www.reach.gov.sg/" target="_blank" rel="noopener noreferrer">Reach.gov.sg</a>
                    </li>
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
                  <li><a href=${this.privacyHref ? this.privacyHref : "#"}>Privacy Statement</a></li>
                  <li><a href=${this.termsOfUseHref ? this.termsOfUseHref : "#"}>Terms of use</a></li>
                </ul>
              </div>
            </div>
            <div class="row footer-copyrights">
              <div class="col">
                <div class="d-flex justify-content-lg-end text-end">
                  © ${new Date().getFullYear()}
                  ${this.copyrightLiner ? this.copyrightLiner : "Government of Singapore"}<br />
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

export default SgdsFooter;
