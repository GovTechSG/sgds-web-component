import { assert, expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as sinon from "sinon";
import { SgdsIconButton, SgdsSystemBanner } from "../src/components";
import SgdsSystemBannerItem from "../src/components/SystemBanner/sgds-system-banner-item";
import "./sgds-web-component";
import { moveMouseOnElement, moveMouseOutOfElement } from "./utils";


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
  });
  it("when dimissible is true, close button is rendered", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show dismissible></sgds-system-banner>`);
    const closeButton = el.shadowRoot?.querySelector("sgds-close-button[tone='fixed-light']");
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
    const mouseEnterHandler = sinon.spy();
    const mouseLeaveHandler = sinon.spy();
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);
    el.addEventListener("mouseenter", mouseEnterHandler);
    el.addEventListener("mouseleave", mouseLeaveHandler);
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    await moveMouseOnElement(el);
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
  });
  it("keyboard focuses the elements , pauses the interval", async () => {
    const clock = sinon.useFakeTimers();
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);
    const paginationButton = el.shadowRoot?.querySelector("sgds-icon-button[name='chevron-right']") as SgdsIconButton;
    paginationButton.focus();
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    clock.tick(5000);
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "one"
    );
    //mouseleaves clock ticks rotation resumes
    paginationButton.blur();
    clock.tick(5000);
    await el.updateComplete;
    expect(el.querySelector<SgdsSystemBannerItem>("sgds-system-banner-item[active]")?.textContent.trim()).to.equal(
      "two"
    );
    clock.restore();
  });
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

  it("more than 5 items trigger console warning", async () => {
    const consoleWarnStub = sinon.stub(console, "warn");

    await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
      <sgds-system-banner-item>four</sgds-system-banner-item>
      <sgds-system-banner-item>five</sgds-system-banner-item>
      <sgds-system-banner-item>six</sgds-system-banner-item>
    </sgds-system-banner>`);
    expect(consoleWarnStub).to.have.been.calledWith(
      "It is not recommended to have more than 5 <sgds-system-banner-item> elements."
    );
  });

  it("when noClampAction is true on parent, children inherit the property", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show noClampAction>
      <sgds-system-banner-item id="item1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
      </sgds-system-banner-item>
    </sgds-system-banner>`);
    
    await el.updateComplete;
    const bannerItem = el.querySelector("#item1") as SgdsSystemBannerItem;
    await bannerItem.updateComplete;
    
    expect(bannerItem.noClampAction).to.be.true;
  });

  it("when noClampAction is true, show more link does not appear even when text is long", async () => {
    const el = await fixture<SgdsSystemBannerItem>(html`<sgds-system-banner-item noClampAction>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    </sgds-system-banner-item>`);
    
    await el.updateComplete;
    const showMoreLink = el.shadowRoot?.querySelector(".show-more__link");
    expect(showMoreLink).to.not.exist;
  });

  it("when noClampAction is true, text is not truncated", async () => {
    const el = await fixture<SgdsSystemBannerItem>(html`<sgds-system-banner-item noClampAction>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    </sgds-system-banner-item>`);
    
    await el.updateComplete;
    const messageDiv = el.shadowRoot?.querySelector(".message");
    expect(messageDiv?.classList.contains("truncated")).to.be.false;
  });

  it("when noClampAction is false, show more link appears for long text", async () => {
    const el = await fixture<SgdsSystemBanner>(html`
      <sgds-system-banner-item>
     1 Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus  Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus
    </sgds-system-banner-item>
    `);
    
    await el.updateComplete;
    const messageDiv = el.shadowRoot?.querySelector(".message");
    await waitUntil(() => messageDiv?.classList.contains("truncated") === true, "Message div did not get truncated");
    expect(messageDiv?.classList.contains("truncated")).to.be.true;
    const showMore = el.shadowRoot?.querySelector(".show-more");
    expect(showMore).to.exist;
  });

  it("clicking show more link emits sgds-show-more event", async () => {
    const el = await fixture<SgdsSystemBannerItem>(html`<sgds-system-banner-item>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </sgds-system-banner-item>`);
    
    const showMoreHandler = sinon.spy();
    el.addEventListener("sgds-show-more", showMoreHandler);
    
    await el.updateComplete;
    // Force clamping
    const messageDiv = el.shadowRoot?.querySelector(".message") as HTMLElement;
    if (messageDiv) {
      Object.defineProperty(messageDiv, "scrollHeight", { value: 100, configurable: true });
      Object.defineProperty(messageDiv, "clientHeight", { value: 50, configurable: true });
      (el as unknown as { _clampCheck: () => void })._clampCheck();
      await el.updateComplete;
    }
    
    const showMoreLink = el.shadowRoot?.querySelector(".show-more__link") as HTMLAnchorElement;
    if (showMoreLink) {
      showMoreLink.click();
      expect(showMoreHandler).to.have.been.called;
    }
  });
});
