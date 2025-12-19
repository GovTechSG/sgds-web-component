import "./sgds-web-component";
import { fixture, assert, expect } from "@open-wc/testing";
import { html } from "lit";
import { SgdsFooter, SgdsLink } from "../src/components";

describe("footer", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsFooter>(html`<sgds-footer></sgds-footer>`);
    assert.shadowDom.equal(
      el,
      `
          <footer class="footer">
          <section>
            <div class="footer-header">
              <slot name="title"></slot>
              <slot name="description"></slot>
            </div>
            <div>
              <div class="footer-items">
                <slot name="items"></slot>
              </div>
            </div>
          </section>
          <section class="footer-bottom">
            <div class="footer-mandatory-links">
              <ul>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Contact</a>
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Feedback</a>
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a
                      href="https://tech.gov.sg/report_vulnerability"
                      rel="noopener noreferrer"
                      tabindex="0"
                      target="_blank"
                      >Report Vulnerability</a
                    >
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Privacy Statement</a>
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Terms of use</a>
                  </sgds-link>
                </li>
              </ul>
              <div class="footer-copyrights">© ${new Date().getFullYear()}, Government of Singapore</div>
            </div>
          </section>
        </footer>
          `
    );
  });

  it("renders with default values when default slot has content", async () => {
    const el = await fixture<SgdsFooter>(
      html`
        <sgds-footer>
          <p>footer content</p>
        </sgds-footer>
      `
    );
    assert.shadowDom.equal(
      el,
      `
          <footer class="footer">
          <section class="footer-top has-content">
            <div class="footer-header">
              <slot name="title"></slot>
              <slot name="description"></slot>
            </div>
            <div>
              <slot></slot>
            </div>
          </section>
          <section class="footer-bottom">
            <div class="footer-mandatory-links">
              <ul>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Contact</a>
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Feedback</a>
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a
                      href="https://tech.gov.sg/report_vulnerability"
                      rel="noopener noreferrer"
                      tabindex="0"
                      target="_blank"
                      >Report Vulnerability</a
                    >
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Privacy Statement</a>
                  </sgds-link>
                </li>
                <li>
                  <sgds-link size="sm" variant="primary" tone="fixed-light">
                    <a href="#" tabindex="0">Terms of use</a>
                  </sgds-link>
                </li>
              </ul>
              <div class="footer-copyrights">© ${new Date().getFullYear()}, Government of Singapore</div>
            </div>
          </section>
        </footer>
          `
    );
  });

  it("content should be slotted into title", async () => {
    const el = await fixture(
      html`<sgds-footer>
        <h2 slot="title">test title</h2>
      </sgds-footer>`
    );
    expect(el.querySelector("[slot='title']")?.textContent).to.equal("test title");
  });

  it("content should be slotted into description", async () => {
    const el = await fixture(
      html`<sgds-footer>
        <h2 slot="description">test description</h2>
      </sgds-footer>`
    );
    expect(el.querySelector("[slot='description']")?.textContent).to.equal("test description");
  });

  it("copyrightLiner prop forward to approriate div el", async () => {
    const el = await fixture(html`<sgds-footer copyrightLiner="copyright liner"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector(".footer-copyrights")?.textContent).to.contain("copyright liner");
  });

  it("contactHref prop forward to contact's href attr", async () => {
    const el = await fixture(html`<sgds-footer contactHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Contact");
  });

  it("feedbackHref prop forward to feedback's href attr", async () => {
    const el = await fixture(html`<sgds-footer feedbackHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Feedback");
  });
  it("privacyHref prop forward to Privacy Statement's href attr", async () => {
    const el = await fixture(html`<sgds-footer privacyHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Privacy Statement");
  });
  it("termsOfUseHref prop forward to Terms of use's href attr", async () => {
    const el = await fixture(html`<sgds-footer termsOfUseHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Terms of use");
  });
  it("sitemapHref prop forward to Ssitemap href attr", async () => {
    const el = await fixture(html`<sgds-footer sitemapHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Sitemap");
  });
  it("faqHref prop forward to Ssitemap href attr", async () => {
    const el = await fixture(html`<sgds-footer faqHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("FAQ");
  });
});

describe("SgdsFooterItem", () => {
  it("renders with default structure", async () => {
    const el = await fixture<SgdsFooter>(html` <sgds-footer-item>
      <div slot="title">Application Guidelines</div>
      <sgds-link><a href="/application-guidelines/lorem-ipsum-one/second-level-a/">hello world</a></sgds-link>
      <sgds-link><a href="/application-guidelines/lorem-ipsum-one/part-A/">Second Level B</a></sgds-link>
      <sgds-link><a href="/application-guidelines/lorem-ipsum-three/">Lorem Ipsum Three</a></sgds-link>
    </sgds-footer-item>`);
    const titleSlot = el.shadowRoot?.querySelector('slot[name="title"]');
    const defaultSlot = el.shadowRoot?.querySelector("slot:not([name])");

    expect(titleSlot).to.exist;
    expect(defaultSlot).to.exist;
  });
  it("slotted sgds-link should have tone=fixed-light and size=sm attributes added", async () => {
    const el = await fixture<SgdsFooter>(html`<sgds-footer-item>
      <div slot="title">Application Guidelines</div>
      <sgds-link><a href="/application-guidelines/lorem-ipsum-one/second-level-a/">hello world</a></sgds-link>
      <sgds-link><a href="/application-guidelines/lorem-ipsum-one/part-A/">Second Level B</a></sgds-link>
      <sgds-link><a href="/application-guidelines/lorem-ipsum-three/">Lorem Ipsum Three</a></sgds-link>
    </sgds-footer-item>`);
    const links = el.querySelectorAll<SgdsLink>("sgds-link");
    links.forEach(l => {
      expect(l.tone).to.equal("fixed-light");
      expect(l.size).to.equal("sm");
    });
  });
});
