import { html } from "lit";
import { assert, expect, fixture } from "@open-wc/testing";
import { SgdsIconButton, SgdsSystemBanner } from "../src/components";
import "../src/index";
import * as sinon from "sinon";
import { moveMouseOnElement, moveMouseOutOfElement} from "./utils"
import SgdsSystemBannerItem from "../src/components/SystemBanner/sgds-system-banner-item";
describe("<sgds-system-banner>", () => {
  it("matches the shadowDOM", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show></sgds-system-banner>`);
    assert.shadowDom.equal(
      el,
      `
                <div class="banner" role="alert" aria-hidden="false">
                <div class="content">
                    <slot id="loop-slot"></slot>
                </div>
                </div>
            `
    );
  });
  it("if show is false, .banner is display none, aria-hidden is true", async () => {    
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner></sgds-system-banner>`);
    const bannerDiv = el.shadowRoot?.querySelector(".banner") as HTMLDivElement;
    expect(getComputedStyle(bannerDiv).display).to.equal("none");
    expect(bannerDiv.getAttribute("aria-hidden")).to.equal("true");
  })
  it("when dimissible is true, close button is rendered", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show dismissible></sgds-system-banner>`);
    const closeButton = el.shadowRoot?.querySelector("sgds-close-button[variant='light']");
    expect(closeButton).to.exist;
  });
  it("when variant is set to warning, close button variant is dark", async () => {
    const el = await fixture<SgdsSystemBanner>(
      html`<sgds-system-banner show dismissible variant="warning"></sgds-system-banner>`
    );
    const closeButton = el.shadowRoot?.querySelector("sgds-close-button[variant='dark']");
    expect(closeButton).to.exist;
  });
  it("when more than one child, pagination is rendered, matches shadowDOM", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item></sgds-system-banner-item>
      <sgds-system-banner-item></sgds-system-banner-item>
    </sgds-system-banner>`);
    assert.shadowDom.equal(
      el,
      `
                <div class="banner" role="alert" aria-hidden="false">
                <div class="content">
                    <slot id="loop-slot"></slot>
                </div>
                <div class="pagination">
              <sgds-icon-button
                name="chevron-left"
                tone="fixed-light"
                variant="ghost"
                size="xs"
                target="_self"
              ></sgds-icon-button>
              <span>1/2</span>
              <sgds-icon-button
                name="chevron-right"
                tone="fixed-light"
                variant="ghost"
                size="xs"
                target="_self"
              ></sgds-icon-button>
            </div>
                </div>
            `
    );
  });
  it("system banner item rotates automatically every 5 seconds", async () => {
    const clock = sinon.useFakeTimers();
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);

    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    clock.tick(5000);
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "two"
    );
    clock.tick(5000);
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "three"
    );
    clock.tick(5000);
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    clock.restore();
  });
  it("mouse enter the banner, pauses the interval", async () => {
    const clock = sinon.useFakeTimers();
    const mouseEnterHandler = sinon.spy()
    const mouseLeaveHandler = sinon.spy()
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);
    el.addEventListener("mouseenter", mouseEnterHandler)
    el.addEventListener("mouseleave", mouseLeaveHandler)
     expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
   await  moveMouseOnElement(el);
    expect(mouseEnterHandler).to.have.been.called;
    clock.tick(5000);
    await el.updateComplete;
     expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    //mouseleaves clock ticks rotation resumes
    await moveMouseOutOfElement(el);
    expect(mouseLeaveHandler).to.have.been.called;
    clock.tick(5000);
     await el.updateComplete;
     expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "two"
    );
    clock.restore();
  })
  it("clicking next button loops the items and page indicator", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);
    const nextBtn = el.shadowRoot?.querySelector("sgds-icon-button[name='chevron-right']") as SgdsIconButton;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("1/3");
    nextBtn.click();
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "two"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("2/3");

    nextBtn.click();
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "three"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("3/3");

    nextBtn.click();

    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("1/3");
  });
  it("clicking prev button loops the items and page indicator", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);
    const prevBtn = el.shadowRoot?.querySelector("sgds-icon-button[name='chevron-left']") as SgdsIconButton;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("1/3");
    prevBtn.click();
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "three"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("3/3");

    prevBtn.click();
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "two"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("2/3");

    prevBtn.click();

    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    expect(el.shadowRoot?.querySelector("span")?.textContent.trim()).to.equal("1/3");
  });
});
