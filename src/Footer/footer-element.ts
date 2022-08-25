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
  @property()
  classes = ""

  render() {
    return html`  
    <footer class="sgds footer ${this.classes}">
    <slot></slot>
        <section class="footer-bottom">
            <div class="container-fluid">
                <div class="row footer-mandatory-links">
                    <div class="col">
                        <ul>
                            <li><a href="https://tech.gov.sg/report_vulnerability" target="_blank"
                                    rel="noopener noreferrer">Report Vulnerability</a></li>
                            <li><a href="">Privacy Statement</a></li>
                            <li><a href="">Terms of use</a></li>
                        </ul>
                    </div>
                </div>
                <div class="row footer-copyrights">
                    <div class="col">
                        <div class="d-flex justify-content-lg-end text-end">
                            © 2022 Government of Singapore<br>
                            Last Updated 08 Feb 2022
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </footer>
    
                    `;
  }
}
