import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerLinkStyle from "./footer-link.css";
import anchorStyles from "../../styles/anchor.css";

export interface ColumnLinks {
  title: string;
  links: Links[];
}
export interface Links {
  href: string;
  label: string;
  external: boolean;
}

export class SgdsFooterLink extends SgdsElement {
  static styles = [...SgdsElement.styles, footerLinkStyle, anchorStyles];

  /**
   * Array of type
   *
   * `interface ColumnLinks { title: string; links : Links[] } interface Links { href: string; label: string; }`
   */
  @property({
    type: Array
  })
  links: ColumnLinks[] = [];

  render() {
    return html`
      <div class="footer-items">
        ${this.links.map(
          (item: ColumnLinks) =>
            html`
              <div class="footer-item">
                <div class="title">${item.title}</div>
                <ul class="links">
                  ${item.links.map((link: Links) => {
                    return link.external
                      ? html`
                          <li><a href=${link.href} target="_blank" rel="noopener noreferrer">${link.label}</a></li>
                        `
                      : html` <li><a href=${link.href}>${link.label}</a></li> `;
                  })}
                </ul>
              </div>
            `
        )}
      </div>
    `;
  }
}

export default SgdsFooterLink;
