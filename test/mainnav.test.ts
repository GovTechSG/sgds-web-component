import { aTimeout, assert, expect, fixture, fixtureCleanup, nextFrame } from "@open-wc/testing";
import { html } from "lit";
import { SgdsMainnav, SgdsMainnavDropdown, SgdsMainnavItem, type MainnavExpandSize } from "../src/components";
import "../src/index";

describe("sgds-mainnav", () => {
  afterEach(() => fixtureCleanup());
  it("is defined", () => {
    const el = document.createElement("sgds-mainnav");
    assert.instanceOf(el, SgdsMainnav);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-mainnav></sgds-mainnav>`);
    assert.shadowDom.equal(
      el,
      `<nav class="navbar navbar-expand-lg navbar-light sgds">
       <a
         aria-label="brand-link"
         class="navbar-brand order-first"
         href=""
       >
         <slot name="brand">
       </a>
       <slot
         class="order-1"
         name="non-collapsible"
       >
       </slot>
       <button
         aria-expanded="false"
         aria-label="Toggle navigation"
         class="navbar-toggler order-1"
         type="button"
       >
       <span class="navbar-toggler-icon"></span>
       </button>
       <div
         class="navbar-body navbar-collapse order-2"
         hidden=""
       >
         <ul class="navbar-nav navbar-nav-scroll">
           <slot>
           </slot>
          <slot name="end">
          </slot>
         </ul>
       </div>
    `,
      { ignoreAttributes: ["id", "aria-controls"] }
    );
  });
  it("expect div.collapse's id to equal to button's aria-controls", async () => {
    const el = await fixture(html`<sgds-mainnav></sgds-mainnav>`);
    const collapse = el.shadowRoot?.querySelector("div.navbar-body");
    const button = el.shadowRoot?.querySelector("button");
    expect(collapse?.getAttribute("id")).to.equal(button?.getAttribute("aria-controls"));
  });
  it("brandHref props forwards to a.navbar-brand  href attribute", async () => {
    const el = await fixture(html`<sgds-mainnav brandHref="test"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("a.navbar-brand")?.getAttribute("href")).to.equal("test");
  });

  // itx("when mode is offcanvas, offcanvas classes are present instead of collapse classes", async () => {
  //   const el = await fixture(html`<sgds-mainnav mode="offcanvas"></sgds-mainnav>`);
  //   expect(el.shadowRoot?.querySelector(".offcanvas.offcanvas-start.order-4")).to.exist;
  //   expect(el.shadowRoot?.querySelector(".collapse.navbar-collapse.order-4")).not.to.exist;
  // });

  it("when expand=always, nav class has .navbar-expand", async () => {
    const el = await fixture(html`<sgds-mainnav expand="always"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("nav.sgds.navbar")).to.have.class("navbar-expand");
    const classList = el.shadowRoot?.querySelector("nav.sgds.navbar")?.classList.value;
    expect(/navbar-expand/.test(classList as string)).to.be.true;
  });
  it("when expand=never, nav class does not have .navbar-expand", async () => {
    const el = await fixture(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    const classList = el.shadowRoot?.querySelector("nav.sgds.navbar")?.classList.value;
    expect(/navbar-expand/.test(classList as string)).to.be.false;
  });
  const testSizes: MainnavExpandSize[] = ["sm", "md", "lg", "xl", "xxl"];
  testSizes.forEach(size => {
    it(`when expand=${size}, nav class have .navbar-expand=${size}`, async () => {
      const el = await fixture(html`<sgds-mainnav expand=${size}></sgds-mainnav>`);
      const classList = el.shadowRoot?.querySelector("nav.sgds.navbar")?.classList.value;
      expect(/navbar-expand/.test(classList as string)).to.be.true;
      expect(classList).to.contain(`navbar-expand-${size}`);
    });
  });

  it("in default mode (collapse menu), when .navbar-toggler is clicked .navbar-collapse has hidden attribute removed and toggler has aria-expanded true", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    const mainNavCollapse = el.shadowRoot?.querySelector(".navbar-collapse");
    await el.updateComplete;
    expect(mainNavCollapse).to.have.attribute("hidden");
    const toggler = el.shadowRoot?.querySelector("button.navbar-toggler") as HTMLButtonElement;
    expect(toggler.getAttribute("aria-expanded")).to.equal("false");
    toggler?.click();
    await nextFrame();
    expect(mainNavCollapse).not.to.have.attribute("hidden");
    // await aTimeout(500);

    expect(toggler.getAttribute("aria-expanded")).to.equal("true");
    toggler?.click();
    await aTimeout(500);
    // await waitUntil(() => expect(mainNavCollapse).to.have.attribute("hidden"))
    expect(mainNavCollapse).to.have.attribute("hidden");
    expect(toggler.getAttribute("aria-expanded")).to.equal("false");
  });
  // initial window.innerWidth = 800
  // LG_BREAKPOINT = 992
  // since window.innerWidth < LG_BREAKPOINT --> expect non-collapsible slot to be .order-2 (see first test)
  it("when expand=lg and window resize event occurs to above breakpoint, it changes order of non-collapsible slot, and end slot has class .slot-end", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="lg"></sgds-mainnav>`);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class("order-1");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1000 // value above LG_BREAKPOINT
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class("order-last");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
  });
  //SM_BREAKPOINT = 576
  // now window.innerWidth = 1000
  it("when expand=sm and window resize event occurs to above breakpoint, it changes order of non-collapsible slot and end slot has class slot-end ", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="sm"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class("order-last");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 576 - 1 // value below SM_BREAKPOINT
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class("order-1");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");
  });
  // now window.innerWidth = 575
  it("when expand=always and window resize event occurs, it NEVER changes order of non-collapsible slot and end slot ALWAYS have slot-end ", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="always"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class("order-last");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class("order-last");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 100000 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class("order-last");
  });
  it("when expand=never and window resize event occurs, it NEVER changes order of non-collapsible slot,  and end slot NEVER has class slot-end", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class("order-1");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class("order-1");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 100000 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class("order-1");
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");
  });

  // it('keyboard esc to exit offcanvas works', async() => {
  //   const el = await fixture<SgdsMainnav>(
  //     html`<sgds-mainnav expand="never" mode="offcanvas"></sgds-mainnav>`
  //   );
  //   el.shadowRoot?.querySelector('button')?.click()
  //   await el.updateComplete
  //   expect(el.shadowRoot?.querySelector(".offcanvas.show")).to.exist

  //   el.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}))
  //   await el.updateComplete
  //   expect(el.shadowRoot?.querySelector('.offcanvas')).not.to.have.class('show')

  // })
  it('adds name attribute to elements in slot="end" only', async () => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav>
        <div></div>
        <sgds-mainnav-item slot="end"></sgds-mainnav-item>
        <sgds-button slot="end"></sgds-button>
      </sgds-mainnav>`
    );
    expect(el.querySelector("div")).not.to.have.attribute("name", "div");
    expect(el.querySelector("sgds-mainnav-item")).to.have.attribute("name", "sgds-mainnav-item");
    expect(el.querySelector("sgds-button")).to.have.attribute("name", "sgds-button");
  });
});

describe("sgds-mainnav-item", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-item");
    assert.instanceOf(el, SgdsMainnavItem);
  });
});

describe("sgds-mainnav-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-dropdown");
    assert.instanceOf(el, SgdsMainnavDropdown);
  });
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-mainnav-dropdown togglerText="test"></sgds-mainnav-dropdown>`);
    assert.shadowDom.equal(
      el,
      ` <li class="nav-item dropdown sgds">
      <a
        class="nav-link dropdown-toggle"
        aria-expanded="false"
        tabindex="0"
        role="button"
        >
        test
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"    
          height="16"
          fill="currentColor"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </a>
      <ul class="dropdown-menu" role="menu" part="menu">
        <slot></slot>
      </ul>
    </li>`,
      { ignoreAttributes: ["id"] }
    );
  });
  it("when prop active=true, .active class is defined in the button", async () => {
    const el = await fixture(html`<sgds-mainnav-dropdown active togglerText="test"></sgds-mainnav-dropdown>`);

    expect(el.shadowRoot?.querySelector("a[role=button]")).to.have.class("active");
  });
});
