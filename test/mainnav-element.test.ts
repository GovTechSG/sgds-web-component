import { SgdsMainnavItem, SgdsMainnav } from "../src/MainNavsdf";
import "../src/MainNavsdf";
import {
  fixture,
  assert,
  expect,
  aTimeout,
  fixtureCleanup,
} from "@open-wc/testing";
import { html } from "lit";

describe("sgds-mainnav", () => {
  afterEach(() => fixtureCleanup())
  it("is defined", () => {
    const el = document.createElement("sgds-mainnav");
    assert.instanceOf(el, SgdsMainnav);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(
      html`<sgds-mainnav collapseId="collapse-test-id"></sgds-mainnav>`
    );
    assert.shadowDom.equal(
      el,
      `<nav class="navbar navbar-expand-lg navbar-light sgds">
       <a
         class="me-auto navbar-brand order-1"
         href=""
       >
         <slot name="brand">
       </a>
       <slot
         class="order-2"
         name="non-collapsible"
       >
       </slot>
       <button
         aria-controls="collapse-test-id"
         aria-expanded="false"
         aria-label="Toggle navigation"
         class="navbar-toggler order-3"
         type="button"
       >
         <span class="navbar-toggler-icon">
         </span>
       </button>
       <div
         class="collapse navbar-collapse order-4"
         id="collapse-test-id"
       >
         <ul class="navbar-nav">
           <slot>
           </slot>
         </ul>
       </div>
    `
    );
  });

  it("brandHref props forwards to a.navbar-brand  href attribute", async () => {
    const el = await fixture(
      html`<sgds-mainnav brandHref="test"></sgds-mainnav>`
    );
    expect(
      el.shadowRoot?.querySelector("a.navbar-brand")?.getAttribute("href")
    ).to.equal("test");
  });

  it("when mode is offcanvas, offcanvas classes are present instead of collapse classes", async () => {
    const el = await fixture(
      html`<sgds-mainnav mode="offcanvas"></sgds-mainnav>`
    );
    expect(el.shadowRoot?.querySelector(".offcanvas.offcanvas-start.order-4"))
      .to.exist;
    expect(el.shadowRoot?.querySelector(".collapse.navbar-collapse.order-4"))
      .not.to.exist;
  });

  it("when expand=always, nav class has .navbar-expand", async () => {
    const el = await fixture(
      html`<sgds-mainnav expand="always"></sgds-mainnav>`
    );
    expect(el.shadowRoot?.querySelector("nav.sgds.navbar")).to.have.class(
      "navbar-expand"
    );
    const classList =
      el.shadowRoot?.querySelector("nav.sgds.navbar")?.classList.value;
    expect(/navbar-expand/.test(classList!)).to.be.true;
  });
  it("when expand=never, nav class does not have .navbar-expand", async () => {
    const el = await fixture(
      html`<sgds-mainnav expand="never"></sgds-mainnav>`
    );
    const classList =
      el.shadowRoot?.querySelector("nav.sgds.navbar")?.classList.value;
    expect(/navbar-expand/.test(classList!)).to.be.false;
  });
  const testSizes = ["sm", "md", "lg", "xl", "xxl"];
  testSizes.forEach((size) => {
    it(`when expand=${size}, nav class have .navbar-expand=${size}`, async () => {
      const el = await fixture(
        html`<sgds-mainnav expand=${size}></sgds-mainnav>`
      );
      const classList =
        el.shadowRoot?.querySelector("nav.sgds.navbar")?.classList.value;
      expect(/navbar-expand/.test(classList!)).to.be.true;
      expect(classList).to.contain(`navbar-expand-${size}`);
    });
  });

  it("in default mode (collapse menu), when .navbar-toggler is clicked .navbar-collapse has .show class and toggler has aria-expanded true", async () => {
    const el = await fixture(
      html`<sgds-mainnav expand="never"></sgds-mainnav>`
    );
    const mainNavCollapse = el.shadowRoot?.querySelector(".navbar-collapse");
    expect(mainNavCollapse).not.to.have.class("show");
    const toggler = el.shadowRoot?.querySelector(
      "button.navbar-toggler"
    ) as HTMLButtonElement;
    expect(toggler.getAttribute('aria-expanded')).to.equal('false')
    toggler?.click();
    expect(mainNavCollapse).to.have.class("collapsing");
    await aTimeout(500);
    expect(mainNavCollapse).to.have.class("show");
    expect(toggler.getAttribute('aria-expanded')).to.equal('true')
    toggler?.click();
    await aTimeout(500);
    expect(mainNavCollapse).not.to.have.class("show");
    expect(toggler.getAttribute('aria-expanded')).to.equal('false')
  });
  // initial window.innerWidth = 800 
  // LG_BREAKPOINT = 992 
  // since window.innerWidth < LG_BREAKPOINT --> expect non-collapsible slot to be .order-2 (see first test)
  it('when expand=lg and window resize event occurs to above breakpoint, it changes order of non-collapsible slot, ', async() => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="lg"></sgds-mainnav>`
    );
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class('order-2')
    Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1000, // value above LG_BREAKPOINT
   })
   window.dispatchEvent(new Event('resize'));
   await el.updateComplete
   expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class('order-5')
  })
  //SM_BREAKPOINT = 576
  // now window.innerWidth = 1000
  it('when expand=sm and window resize event occurs to above breakpoint, it changes order of non-collapsible slot, ', async() => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="sm"></sgds-mainnav>`
    );
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class('order-5')
    Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 576-1, // value below SM_BREAKPOINT
   })
   window.dispatchEvent(new Event('resize'));
   await el.updateComplete
   expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class('order-2')
  })
  // now window.innerWidth = 575
  it('when expand=always and window resize event occurs, it NEVER changes order of non-collapsible slot, ', async() => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="always"></sgds-mainnav>`
    );
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class('order-5')
    Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1, // trying extreme sizes
   })
   window.dispatchEvent(new Event('resize'));
   await el.updateComplete
   expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class('order-5')

   Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 100000, // trying extreme sizes
   })
   window.dispatchEvent(new Event('resize'));
   await el.updateComplete
   expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class('order-5')
  })
  it('when expand=never and window resize event occurs, it NEVER changes order of non-collapsible slot, ', async() => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="never"></sgds-mainnav>`
    );
    expect(el.shadowRoot?.querySelector("slot[name='non-collapsible']")).to.have.class('order-2')
    Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1, // trying extreme sizes
   })
   window.dispatchEvent(new Event('resize'));
   await el.updateComplete
   expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class('order-2')

   Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 100000, // trying extreme sizes
   })
   window.dispatchEvent(new Event('resize'));
   await el.updateComplete
   expect(el.shadowRoot?.querySelector('slot[name="non-collapsible"]')).to.have.class('order-2')
  })

  it('keyboard esc to exit offcanvas works', async() => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="never" mode="offcanvas"></sgds-mainnav>`
    );
    el.shadowRoot?.querySelector('button')?.click()
    await el.updateComplete
    expect(el.shadowRoot?.querySelector(".offcanvas.show")).to.exist

    el.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape"}))
    await el.updateComplete
    expect(el.shadowRoot?.querySelector('.offcanvas')).not.to.have.class('show')
      
  })
});

describe('sgds-mainnav-item', () => {
  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-item");
    assert.instanceOf(el, SgdsMainnavItem);
  });
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-mainnav-item></sgds-mainnav-item>`);
    assert.shadowDom.equal(
      el,
      `  <li class="nav-item">
        <a
          class="nav-link"
          href=""
        >
          <slot>
          </slot>
        </a>
      </li>`
    );
  });
  it("href prop is forwarded to a tag href attr", async () => {
    const el = await fixture(html`<sgds-mainnav-item href="#">test</sgds-mainnav-item>`);
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute("href", "#");
  });
  it("active prop is forwarded to <a> class", async () => {
    const el = await fixture(html`<sgds-mainnav-item  active>test</sgds-mainnav-item >`);
    expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
  });
})
