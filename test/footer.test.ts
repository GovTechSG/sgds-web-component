import "./sgds-web-component";
import { ColumnLinks } from "../src/components/Footer/sgds-footer";
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
            <slot name="footer-title"></slot>
            <slot name="footer-link"></slot>
          </section>
          <section class="footer-bottom" part="footer-bottom">
            <ul
              class="social-media"
              style="display: none;"
            >
              <slot name="footer-social-media"></slot>
            </ul>
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

  it("description prop forward to .description class", async () => {
    const el = await fixture(
      html`<sgds-footer-title slot="footer-title" description="test description"></sgds-footer-title>`
    );
    expect(el.shadowRoot?.querySelector(".description")?.textContent).to.equal("test description");
  });

  it("title prop forward to approriate .title class", async () => {
    const el = await fixture(html`<sgds-footer-title title="test title"></sgds-footer-title>`);
    expect(el.shadowRoot?.querySelector(".title")?.textContent).to.equal("test title");
  });

  it("description should render when description attribute exist", async () => {
    const el = await fixture(html`<sgds-footer-title></sgds-footer-title>`);
    expect(el.shadowRoot?.querySelector(".description")?.textContent).to.be.undefined;

    el.setAttribute("description", "test description");
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".description")?.textContent).to.equal("test description");
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

  it("links prop accepts an array", async () => {
    const linkArray: ColumnLinks[] = [
      {
        title: "test-1",
        links: [
          { href: "test-href-1", label: "test-label-1" },
          { href: "test-href-2", label: "test-label-2" }
        ]
      },
      {
        title: "test-2",
        links: [
          { href: "test-href-1", label: "test-label-1" },
          { href: "test-href-2", label: "test-label-2" }
        ]
      }
    ];
    const el = await fixture(html`<sgds-footer-link .links=${linkArray}></sgds-footer-link>`);

    expect(el.shadowRoot?.querySelectorAll(".footer-items>div").length).to.equal(2);
    expect(el.shadowRoot?.querySelectorAll(".footer-items>div")[0].textContent).to.contain("test-1");
    expect(el.shadowRoot?.querySelectorAll(".footer-items>div")[1].textContent).to.contain("test-2");
    expect(el.shadowRoot?.querySelectorAll("ul.links>li>a").length).to.equal(4);
    expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-1"]').length).to.equal(2);
    expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-1"]')[0].textContent).to.equal("test-label-1");
    expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-2"]').length).to.equal(2);
    expect(el.shadowRoot?.querySelectorAll('li>a[href="test-href-2"]')[0].textContent).to.equal("test-label-2");
  });
});
