import "./sgds-web-component";
import { fixture, assert, expect } from "@open-wc/testing";
import { html } from "lit";
import { SgdsFooter } from "../src/components";

describe("footer", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsFooter>(html`<sgds-footer></sgds-footer>`);
    assert.shadowDom.equal(
      el,
      `
          <footer class="footer">
          <section class="footer-top" style="display: none;">
            <div class="footer-header" style="display: none;">
              <slot name="title"></slot>
              <slot name="description"></slot>
            </div>
            <div class="footer-items" style="display: none;">
              <slot name="items"></slot>
            </div>
          </section>
          <section class="footer-bottom">
            <div
              class="social-media"
              style="display: none;"
            >
              <slot name="social-media"></slot>
            </div>
            <div class="footer-mandatory-links">
              <ul>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Feedback</a></li>
                <li><a href="#">FAQ</a></li>
                <li>
                  <a
                    href="https://tech.gov.sg/report_vulnerability"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Report Vulnerability</a
                  >
                </li>
                <li><a href="#">Privacy Statement</a></li>
                <li><a href="#">Terms of use</a></li>
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
});

describe("SgdsFooterItem", () => {
  it("renders with default structure", async () => {
    const el = await fixture<SgdsFooter>(html` <sgds-footer-item>
      <div slot="title">Application Guidelines</div>
      <a href="/application-guidelines/lorem-ipsum-one/second-level-a/">hello world</a>
      <a href="/application-guidelines/lorem-ipsum-one/part-A/">Second Level B</a>
      <a href="/application-guidelines/lorem-ipsum-three/">Lorem Ipsum Three</a>
    </sgds-footer-item>`);
    const titleSlot = el.shadowRoot?.querySelector('slot[name="title"]');
    const defaultSlot = el.shadowRoot?.querySelector("slot:not([name])");

    expect(titleSlot).to.exist;
    expect(defaultSlot).to.exist;
  });
});
