import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-footer.scss";
import SgdsElement from "../utils/sgds-element";

export type Links = {
  href: string;
  label: string;
}
export interface ColumnLinks {
  title: string;
  links: Links[]
}

/**
 * @since 0.0.8
 * @status stable
 *
 *
 *
 *
 * @csspart footer-top - The component's footer-top section container.
 * @csspart footer-bottom - The component's footer-bottom section container.
 */
@customElement("sgds-footer")
export class SgdsFooter extends SgdsElement {
  static styles = styles
  @property()
  title = ``;
  @property()
  description = ``;
  @property({
    type: Array,
  })
  links: ColumnLinks[] = [];

  @property({ type: String })
  lastUpdatedDate = "";

  //href
  @property({ type: String })
  contactHref = "#";
  @property({ type: String })
  feedbackHref = "#";
  @property({ type: String })
  vulnerabilityHref = "#";
  @property({ type: String })
  privacyHref = "#";
  @property({ type: String })
  termsOfUseHref = "#";
  
  render() {
    return html`
      <footer class="sgds footer">
        <section class="footer-top" part="footer-top">
          <div class="container-fluid">
            <div class="row footer-header">
              <div class="col col-lg-6 col-md-12">
                <div class="title">${this.title}</div>
                <div class="description">${this.description}</div>
              </div>
            </div>
            <div class="row footer-items">
              ${this.links.map(
                (item: ColumnLinks) =>
                  html`
                    <div class="col-xxl-2 col-md-4 mb-3">
                      <div class="title">${item.title}</div>
                      <ul class="links">
                        ${item.links.map(
                          (link: Links) =>
                            html`
                              <li><a href="${link.href}">${link.label}</a></li>
                            `
                        )}
                      </ul>
                    </div>
                  `
              )}
            </div>
            <div class="row footer-contact-links">
              <div class="col">
                <div class="d-flex justify-content-lg-end">
                  <ul>
                    <li><a href="${this.contactHref}">Contact</a></li>
                    <li><a href="${this.feedbackHref}">Feedback</a></li>
                    <li>
                      <a
                        href="https://www.reach.gov.sg/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Reach.gov.sg</a>
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
                    <a
                      href="${this.vulnerabilityHref}"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Report Vulnerability</a>
                  </li>
                  <li><a href="${this.privacyHref}">Privacy Statement</a></li>
                  <li><a href="${this.termsOfUseHref}">Terms of use</a></li>
                </ul>
              </div>
            </div>
            <div class="row footer-copyrights">
              <div class="col">
                <div class="d-flex justify-content-lg-end text-end">
                  © ${new Date().getFullYear()} Government of Singapore<br />
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