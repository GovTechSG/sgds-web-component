import "./sgds-web-component";
import { fixture, assert, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsFooter } from "../src/components";

describe("footer", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsFooter>(html`<sgds-footer></sgds-footer>`);
    assert.shadowDom.equal(
      el,
      `
          <footer class="footer">
          <section class="footer-top" part="footer-top">
            <div class="footer-header" style="display: none;">
              <slot name="footer-title"></slot>
              <slot name="footer-description"></slot>
            </div>
            <div class="footer-items">
              <slot name="footer-item"></slot>
            </div>
          </section>
          <section class="footer-bottom" part="footer-bottom">
            <div
              class="social-media"
              style="display: none;"
            >
              <slot name="footer-social-media"></slot>
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

  it("content should be slotted into footer-title", async () => {
    const el = await fixture(
      html`<sgds-footer>
        <h2 slot="footer-title">test title</h2>
      </sgds-footer>`
    );
    expect(el.querySelector("[slot='footer-title']")?.textContent).to.equal("test title");
  });

  it("content should be slotted into footer-description", async () => {
    const el = await fixture(
      html`<sgds-footer>
        <h2 slot="footer-description">test description</h2>
      </sgds-footer>`
    );
    expect(el.querySelector("[slot='footer-description']")?.textContent).to.equal("test description");
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

  // it("links prop accepts an array", async () => {
  //   const el = await fixture(html`<sgds-footer-link .links=${linkArray}></sgds-footer-link>`);

  //   expect(el.shadowRoot?.querySelectorAll(".footer-items>div").length).to.equal(2);
  //   expect(el.shadowRoot?.querySelectorAll(".footer-items>div")[0].textContent).to.contain("test-1");
  //   expect(el.shadowRoot?.querySelectorAll(".footer-items>div")[1].textContent).to.contain("test-2");
  //   expect(el.shadowRoot?.querySelectorAll("ul.links>li>a").length).to.equal(4);
  //   expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-1"]').length).to.equal(2);
  //   expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-1"]')[0].textContent).to.equal("test-label-1");
  //   expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-2"]').length).to.equal(2);
  //   expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-2"]')[0].textContent).to.equal("test-label-2");
  // });
});
