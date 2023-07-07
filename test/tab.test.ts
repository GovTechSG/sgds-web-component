import { aTimeout, expect, fixture, html, assert } from "@open-wc/testing";
import { SgdsTab } from "../src/components/Tab/sgds-tab";
import "../src/components/Tab";
import { SgdsTabPanel } from "../src/components/Tab";

describe("<sgds-tab>", () => {
  it("passes accessibility test", async () => {
    const el = await fixture<SgdsTab>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav">Test</sgds-tab>
      </sgds-tab-group>
    `);
    await expect(el).to.be.accessible();
  });
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-tab></sgds-tab>`);
    assert.shadowDom.equal(
      el,
      ` <nav class="sidenav">
         <ul>
          <slot></slot>
        </ul>
      </nav>`
    );
  });
  it("should render default tab", async () => {
    const el = await fixture(html`<sgds-tab-group><sgds-tab>Test</sgds-tab></sgds-tab-group>`);
    const sgdsTab = el.querySelector("sgds-tab") as SgdsTab
    const tab = el.querySelector("sgds-tab")?.shadowRoot?.querySelector("li.nav-item");
    // console.log()
    expect(sgdsTab?.getAttribute("role")).to.equal("tab");
    expect(sgdsTab?.getAttribute("aria-disabled")).to.equal("false");
    expect(sgdsTab?.getAttribute("aria-selected")).to.equal("false");
    expect(tab?.getAttribute("tabindex")).to.equal("0");
    expect(tab?.getAttribute("class")).to.equal("nav-item");
    expect(sgdsTab?.active).to.equal(false);
    expect(sgdsTab?.disabled).to.equal(false);
  });

  it("should disable tab by attribute", async () => {
    const el = await fixture<SgdsTab>(html` <sgds-tab disabled>Test</sgds-tab> `);

    const tab = el.shadowRoot?.querySelector<HTMLElement>(".nav-item");

    expect(el.disabled).to.equal(true);
    expect(el.getAttribute("aria-disabled")).to.equal("true");
    expect(tab?.getAttribute("class")).to.equal(" tab tab--disabled ");
    expect(tab?.getAttribute("tabindex")).to.equal("-1");
  });

  it("should set active tab by attribute", async () => {
    const el = await fixture<SgdsTab>(html` <sgds-tab active>Test</sgds-tab> `);

    const tab = el.shadowRoot?.querySelector<HTMLElement>(".tab");

    expect(el.active).to.equal(true);
    expect(el.getAttribute("aria-selected")).to.equal("true");
    expect(tab?.getAttribute("class")).to.equal(" tab tab--active ");
    expect(tab?.getAttribute("tabindex")).to.equal("0");
  });

  describe("focus", () => {
    it("should focus inner div", async () => {
      const el = await fixture<SgdsTab>(html` <sgds-tab>Test</sgds-tab> `);

      const tab = el.shadowRoot?.querySelector<HTMLElement>(".tab");

      el.focus();
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(tab);
    });
  });

  describe("blur", () => {
    it("should blur inner div", async () => {
      const el = await fixture<SgdsTab>(html` <sgds-tab>Test</sgds-tab> `);

      el.focus();
      await el.updateComplete;

      el.blur();
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(null);
    });
  });
});

describe("<sgds-tab-panel>", () => {
  it("passes accessibility test", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);
    await expect(el).to.be.accessible();
  });

  it("default properties", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);

    expect(el.id).to.equal("sgds-tab-panel-2");
    expect(el.name).to.equal("");
    expect(el.active).to.equal(false);
    expect(el.getAttribute("role")).to.equal("tabpanel");
    expect(el.getAttribute("aria-hidden")).to.equal("true");
  });

  it("properties should reflect", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);

    el.name = "test";
    el.active = true;
    await aTimeout(100);
    expect(el.getAttribute("name")).to.equal("test");
    expect(el.hasAttribute("active")).to.equal(true);
  });

  it("changing active should always update aria-hidden role", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);

    el.active = true;
    await aTimeout(100);
    expect(el.getAttribute("aria-hidden")).to.equal("false");
  });

  it("passed id should be used", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel id="test-id">Test</sgds-tab-panel> `);

    expect(el.id).to.equal("test-id");
  });
});
