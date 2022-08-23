import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./footer-element.scss";
import "./footer-top-element";

@customElement("footer-element")
export class FooterElement extends LitElement {
  static styles = styles;

  @property()
  title = `Title`;
  @property()
  description = ``;
  @property({
    type: Array,
    converter(value, type?) {
      return typeof value === type ? value : JSON.parse(value);
    },
  })
  links = [];
  @property()
  copyrights = "";
  @property()
  lastUpdated = "";

  render() {
    return html` <footer class="sgds footer">
      <section class="footer-top">
        <div class="container-fluid">
          <div class="row footer-header">
            <div class="col col-lg-6 col-md-12">
              <div class="title">${this.title}</div>
              ${this.description}
                <slot name="description"></slot>
            </div>
          </div>
          <div class="row footer-items">
            ${this.links.map(
              (item) =>
                html`
                  <div class="col-xxl-2 col-md-4 mb-3">
                    <div class="title">${item.title}</div>
                    <ul class="links">
                      ${item.links.map(
                        (link) =>
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
                  <li><a href="">Contact</a></li>
                  <li><a href="">Feedback</a></li>
                  <li>
                    <a
                      href="https://www.reach.gov.sg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      >Reach.gov.sg</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="footer-bottom">
        <div class="container-fluid">
          <div class="row footer-mandatory-links">
            <div class="col">
              <ul>
                <li>
                  <a
                    href="https://tech.gov.sg/report_vulnerability"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Report Vulnerability</a
                  >
                </li>
                <li><a href="">Privacy Statement</a></li>
                <li><a href="">Terms of use</a></li>
              </ul>
            </div>
          </div>
          <div class="row footer-copyrights">
            <div class="col">
              <div class="d-flex justify-content-lg-end text-end">
                ${this.copyrights} <br />
                Last Updated ${this.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>`;
  }
}
