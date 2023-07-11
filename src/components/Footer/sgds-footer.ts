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
// @customElement("sgds-footer")
export class SgdsFooter extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

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

  /**
   * 	Sets copyrightLiner of SgdsFooter
   */
  @property({ type: String })
  copyrightLiner = "Government of Singapore";

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
  lastUpdatedDate = "";

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
   * 	href link for privacy statement
   */
  @property({ type: String })
  privacyHref = "#";

  /**
   * 	href link for terms of use
   */
  @property({ type: String })
  termsOfUseHref = "#";

  render() {
    // if description is defined
    const hasDescription = html` <div class="description">${this.description}</div>`;

    return html`
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
                    <li><a href=${this.contactHref}>Contact</a></li>
                    <li><a href=${this.feedbackHref}>Feedback</a></li>
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

export default SgdsFooter;
