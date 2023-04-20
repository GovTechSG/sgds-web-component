import { SgdsFooter, ColumnLinks } from "../src/Footer";
import { fixture, assert, expect } from "@open-wc/testing";
import { html } from "lit";

describe("button-element", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-footer");
    assert.instanceOf(el, SgdsFooter);
  });
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-footer></sgds-footer>`);
    assert.shadowDom.equal(
      el,
      `
          <footer class="sgds footer">
          <section class="footer-top" part="footer-top">
            <div class="container-fluid">
              <div class="row footer-header">
                <div class="col col-lg-6 col-md-12">
                  <div class="title"></div>
                  <div class="description"></div>
                </div>
              </div>
              <div class="row footer-items">
              </div>
              <div class="row footer-contact-links">
                <div class="col">
                  <div class="d-flex justify-content-lg-end">
                    <ul>
                      <li><a href="#">Contact</a></li>
                      <li><a href="#">Feedback</a></li>
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
          <section class="footer-bottom" part="footer-bottom">
            <div class="container-fluid">
              <div class="row footer-mandatory-links">
                <div class="col">
                  <ul>
                    <li>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Report Vulnerability</a
                      >
                    </li>
                    <li><a href="#">Privacy Statement</a></li>
                    <li><a href="#">Terms of use</a></li>
                  </ul>
                </div>
              </div>
              <div class="row footer-copyrights">
                <div class="col">
                  <div class="d-flex justify-content-lg-end text-end">
                    © ${new Date().getFullYear()} Government of Singapore<br />
                    Last Updated
                  </div>
                </div>
              </div>
            </div>
          </section>
        </footer>
          `
    );
  });

  it("description prop forward to .description class", async () => {
    const el = await fixture(html`<sgds-footer description="test description"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector(".description")?.textContent).to.equal("test description");
  });

  it("title prop forward to approriate .title class", async () => {
    const el = await fixture(html`<sgds-footer title="test title"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector(".title")?.textContent).to.equal("test title");
  });
  it("lastUpdatedDate prop forward to approriate div el", async () => {
    const el = await fixture(html`<sgds-footer lastUpdatedDate="08 Feb 2022"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector(".footer-copyrights>div.col>div")?.textContent).to.contain("08 Feb 2022");
  });

  it("contactHref prop forward to contact's href attr", async () => {
    const el = await fixture(html`<sgds-footer contactHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Contact");
  });

  it("feedbackHref prop forward to feedback's href attr", async () => {
    const el = await fixture(html`<sgds-footer feedbackHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Feedback");
  });
  it("vulnerabilityHref prop forward to Report Vulnerability's href attr", async () => {
    const el = await fixture(html`<sgds-footer vulnerabilityHref="test"></sgds-footer>`);
    expect(el.shadowRoot?.querySelector("a[href='test']")?.textContent).to.contain("Report Vulnerability");
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
    const el = await fixture(html`<sgds-footer .links=${linkArray}></sgds-footer>`);

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
