import { aTimeout, assert, elementUpdated, expect, fixture, fixtureCleanup, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import Sinon from "sinon";
import {
  SgdsDropdownItem,
  SgdsIconButton,
  SgdsMainnav,
  SgdsMainnavDropdown,
  SgdsMainnavItem,
  type MainnavExpandSize
} from "../src/components";
import "./sgds-web-component";

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
      `<nav>
        <div class="navbar navbar-expand-lg">
          <a
            aria-label="brand-link"
            class="navbar-brand"
            href=""
          >
            <slot name="brand"></slot>
          </a>
          <div class="navbar-end">
            <slot
              class="slot-empty"
              name="non-collapsible"
            >
            </slot>
            <slot name="profile">
            </slot>
            <sgds-icon-button
              aria-expanded="false"
              class="navbar-toggler"
              name="menu"
              size="sm"
              target="_self"
              tone="brand"
              variant="ghost"
            >
            </sgds-icon-button>
          </div>
        </div>
        <div
          class="navbar-body navbar-collapse"
          hidden=""
        >
          <div class="navbar-nav navbar-nav-scroll">
            <slot>
            </slot>
            <slot name="end">
            </slot>
          </div>
        </div>
      </nav>
    `,
      { ignoreAttributes: ["id", "aria-controls", "style"] }
    );
  });

  it("expect div.collapse's id to equal to button's aria-controls", async () => {
    const el = await fixture(html`<sgds-mainnav></sgds-mainnav>`);
    const collapse = el.shadowRoot?.querySelector("div.navbar-body");
    const button = el.shadowRoot?.querySelector("sgds-icon-button");
    expect(collapse?.getAttribute("id")).to.equal(button?.getAttribute("aria-controls"));
  });
  it("brandHref props forwards to a.navbar-brand  href attribute", async () => {
    const el = await fixture(html`<sgds-mainnav brandHref="test"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("a.navbar-brand")?.getAttribute("href")).to.equal("test");
  });

  it("when expand=always, navbar class has .navbar-expand", async () => {
    const el = await fixture(html`<sgds-mainnav expand="always"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector(".navbar")).to.have.class("navbar-expand");
    const classList = el.shadowRoot?.querySelector(".navbar")?.classList.value;
    expect(/navbar-expand/.test(classList as string)).to.be.true;
  });
  it("when expand=never, navbar class does not have .navbar-expand", async () => {
    const el = await fixture(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    const classList = el.shadowRoot?.querySelector(".navbar")?.classList.value;
    expect(/navbar-expand/.test(classList as string)).to.be.false;
  });
  const testSizes: MainnavExpandSize[] = ["sm", "md", "lg", "xl", "xxl"];
  testSizes.forEach(size => {
    it(`when expand=${size}, navbar class have .navbar-expand=${size}`, async () => {
      const el = await fixture(html`<sgds-mainnav expand=${size}></sgds-mainnav>`);
      const classList = el.shadowRoot?.querySelector(".navbar")?.classList.value;
      expect(/navbar-expand/.test(classList as string)).to.be.true;
      expect(classList).to.contain(`navbar-expand-${size}`);
    });
  });

  it("in default mode (collapse menu), when .navbar-toggler is clicked .navbar-collapse has hidden attribute removed and toggler has aria-expanded true", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    const mainNavCollapse = el.shadowRoot?.querySelector(".navbar-collapse");
    await el.updateComplete;
    expect(mainNavCollapse).to.have.attribute("hidden");
    const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler") as HTMLButtonElement;
    expect(toggler.getAttribute("aria-expanded")).to.equal("false");
    toggler?.click();
    // await nextFrame();
    await elementUpdated(el);
    expect(mainNavCollapse).not.to.have.attribute("hidden");
    await aTimeout(500);

    expect(toggler.getAttribute("aria-expanded")).to.equal("true");
    toggler?.click();
    await aTimeout(500);
    // // await waitUntil(() => expect(mainNavCollapse).to.have.attribute("hidden"))
    expect(mainNavCollapse).to.have.attribute("hidden");
    expect(toggler.getAttribute("aria-expanded")).to.equal("false");
  });
  // initial window.innerWidth = 800
  // LG_BREAKPOINT = 1024
  // since window.innerWidth < LG_BREAKPOINT --> expect non-collapsible slot to be .order-2 (see first test)
  it("when expand=lg and window resize event occurs to above breakpoint, it inserts .navbar-body before .navbar-end, and end slot has class .slot-end", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="lg"></sgds-mainnav>`);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1030 // value above LG_BREAKPOINT
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
  });
  //SM_BREAKPOINT = 512
  // now window.innerWidth = 1030
  it("when expand=sm and window resize event occurs to above breakpoint, it inserts .navbar-body before .navbar-end, and end slot has class slot-end ", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="sm"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 512 - 1 // value below SM_BREAKPOINT
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");
  });
  // now window.innerWidth = 511
  it("when expand=always and window resize event occurs, it NEVER changes the position of .navbar-body, and end slot ALWAYS have slot-end ", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="always"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 100000 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
  });
  it("when expand=never and window resize event occurs, it NEVER changes the position of .navbar-body,  and end slot NEVER has class slot-end", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 100000 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).not.to.have.class("slot-end");
  });

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

  it("slotchange on default slot sets expand attribute on slotted items using component expand value", async () => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="md">
        <sgds-mainnav-item></sgds-mainnav-item>
        <sgds-mainnav-dropdown><span slot="toggler">Menu</span></sgds-mainnav-dropdown>
      </sgds-mainnav>`
    );
    await el.updateComplete;
    expect(el.querySelector("sgds-mainnav-item")).to.have.attribute("expand", "md");
    expect(el.querySelector("sgds-mainnav-dropdown")).to.have.attribute("expand", "md");
  });

  it("slotchange on end slot sets both expand and name attributes on slotted items", async () => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="xl">
        <sgds-mainnav-item slot="end"></sgds-mainnav-item>
        <sgds-mainnav-dropdown slot="end"><span slot="toggler">Menu</span></sgds-mainnav-dropdown>
      </sgds-mainnav>`
    );
    await el.updateComplete;
    expect(el.querySelector("sgds-mainnav-item")).to.have.attribute("expand", "xl");
    expect(el.querySelector("sgds-mainnav-item")).to.have.attribute("name", "sgds-mainnav-item");
    expect(el.querySelector("sgds-mainnav-dropdown")).to.have.attribute("expand", "xl");
    expect(el.querySelector("sgds-mainnav-dropdown")).to.have.attribute("name", "sgds-mainnav-dropdown");
  });

  it("default slot items do not receive name attribute", async () => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav expand="lg">
        <sgds-mainnav-item></sgds-mainnav-item>
      </sgds-mainnav>`
    );
    await el.updateComplete;
    expect(el.querySelector("sgds-mainnav-item")).to.have.attribute("expand", "lg");
    expect(el.querySelector("sgds-mainnav-item")).not.to.have.attribute("name");
  });

  describe("profile slot", () => {
    it("renders profile slot inside .navbar-end", async () => {
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav>
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User menu">
            <span slot="toggler">User</span>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd?.querySelector("slot[name='profile']")).to.exist;
    });

    it("profile slot propagates expand attribute to slotted items", async () => {
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav expand="xl">
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User menu">
            <span slot="toggler">User</span>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      expect(el.querySelector("sgds-mainnav-dropdown[slot='profile']")).to.have.attribute("expand", "xl");
    });

    it("sgds-mainnav-item and sgds-mainnav-profile can coexist without warning", async () => {
      const warnStub = Sinon.stub(console, "warn");
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav expand="lg">
          <sgds-mainnav-item><a href="#">Home</a></sgds-mainnav-item>
          <sgds-mainnav-profile slot="profile" label="User" ariaLabel="Profile">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      expect(warnStub.calledWith(Sinon.match("[sgds-mainnav]"))).to.be.false;
      warnStub.restore();
    });

    it("hamburger toggler is always rendered regardless of profile presence", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav expand="lg">
          <sgds-mainnav-item><a href="#">Home</a></sgds-mainnav-item>
          <sgds-mainnav-profile slot="profile" label="User" ariaLabel="Profile">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).to.exist;
    });

    it("profile slot stays in .navbar-end in mobile view", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav expand="lg">
          <sgds-mainnav-item><a href="#">Home</a></sgds-mainnav-item>
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User menu">
            <span slot="toggler">User</span>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd?.querySelector("slot[name='profile']")).to.exist;
    });
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
  it("desktop view: can be semantically compare with shadowDom trees", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
    window.dispatchEvent(new Event("resize"));
    const el = await fixture<SgdsMainnav>(html`
      <sgds-mainnav>
        <sgds-mainnav-dropdown>
          <span slot="toggler">Dropdown</span>
          <sgds-dropdown-item>
            <a href="https://www.google.com/">Item 1</a>
          </sgds-dropdown-item>
        </sgds-mainnav-dropdown>
      </sgds-mainnav>
    `);
    const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
    await dropdown?.updateComplete;
    assert.shadowDom.equal(
      dropdown as SgdsMainnavDropdown,
      `
      <sgds-dropdown
        close="default"
        drop="down"
      >
        <a
          aria-disabled="false"
          aria-expanded="false"
          aria-haspopup="menu"
          class="nav-link"
          role="button"
          slot="toggler"
          tabindex="0"
        >
          <slot name="toggler">
          </slot>
          <sgds-icon
            name="chevron-down"
            size="md"
          >
          </sgds-icon>
        </a>
        <slot>
        </slot>
      </sgds-dropdown>
      `,
      { ignoreAttributes: ["id"] }
    );
  });
  it("mobile view: can be semantically compare with shadowDom trees", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 300 // mobile size
    });
    window.dispatchEvent(new Event("resize"));
    const el = await fixture<SgdsMainnav>(html`
      <sgds-mainnav>
        <sgds-mainnav-dropdown>
          <span slot="toggler">Dropdown</span>
          <sgds-dropdown-item>
            <a href="https://www.google.com/">Item 1</a>
          </sgds-dropdown-item>
        </sgds-mainnav-dropdown>
      </sgds-mainnav>
    `);

    const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
    await waitUntil(() => dropdown?.shadowRoot?.querySelector("div.dropdown-items"));
    assert.shadowDom.equal(
      dropdown as SgdsMainnavDropdown,
      `
      <a
             class="nav-link"
             aria-disabled="false"
             tabindex="0"
             role="button"
           >
             <slot name="toggler"></slot>
             <sgds-icon name="chevron-right" size="md"></sgds-icon>
           </a>
           <div class="dropdown-items" aria-hidden="true" style="display: none;">
             <a tabindex="0" role="button">
               <sgds-icon name="chevron-left" size="md"></sgds-icon>
               <span>Dropdown</span>
             </a>
             <slot></slot>
           </div>
      `,
      { ignoreAttributes: ["id"] }
    );
  });
  it("mobile view second layer of navigation: can be semantically compare with shadowDom trees", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 300 // mobile size
    });
    window.dispatchEvent(new Event("resize"));
    const el = await fixture<SgdsMainnav>(html`
      <sgds-mainnav>
        <sgds-mainnav-dropdown>
          <span slot="toggler">Dropdown</span>
          <sgds-dropdown-item>
            <a href="https://www.google.com/">Item 1</a>
          </sgds-dropdown-item>
        </sgds-mainnav-dropdown>
      </sgds-mainnav>
    `);

    const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
    await waitUntil(() => dropdown?.shadowRoot?.querySelector("div.dropdown-items"));
    const togglerAnchor = dropdown?.shadowRoot?.querySelector("a.nav-link") as HTMLAnchorElement;
    togglerAnchor.click();
    await waitUntil(
      () => dropdown?.shadowRoot?.querySelector("div.dropdown-items")?.getAttribute("aria-hidden") === "false"
    );
    assert.shadowDom.equal(
      dropdown as SgdsMainnavDropdown,
      `
      <a
             class="nav-link"
             aria-disabled="false"
             tabindex="0"
             role="button"
           >
             <slot name="toggler"></slot>
             <sgds-icon name="chevron-right" size="md"></sgds-icon>
           </a>
           <div class="dropdown-items" aria-hidden="false" style="">
             <a tabindex="0" role="button">
               <sgds-icon name="chevron-left" size="md"></sgds-icon>
               <span>Dropdown</span>
             </a>
             <slot></slot>
           </div>
      `,
      { ignoreAttributes: ["id"] }
    );
  });

  it("when prop active=true, .active class is defined in the button", async () => {
    const el = await fixture(html`<sgds-mainnav-dropdown active
      ><span slot="toggler">Dropdown</span>
      <sgds-dropdown-item>
        <a href="https://www.google.com/">Item 1</a>
      </sgds-dropdown-item></sgds-mainnav-dropdown
    >`);

    expect(el.shadowRoot?.querySelector("a[role=button]")).to.have.class("active");
  });

  it("in mobile view, mainnavdropdown calls mainnav.hide() when dropdown item anchor is clicked", async () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 300 // mobile size
    });
    window.dispatchEvent(new Event("resize"));
    // Restore any leftover stub from a previous retry
    if ((SgdsMainnav.prototype.hide as any).restore) {
      (SgdsMainnav.prototype.hide as any).restore();
    }
    const stubHide = Sinon.stub(SgdsMainnav.prototype, "hide");
    try {
      const showSpy = Sinon.spy();

      const mainnav = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-dropdown>
            <span slot="toggler">Menu</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Item 2</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      mainnav.addEventListener("sgds-show", showSpy);
      await mainnav.updateComplete;
      const hamburgerButton = mainnav.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler") as SgdsIconButton;
      hamburgerButton.click();
      await elementUpdated(mainnav);
      expect(showSpy.calledOnce).to.be.true;
      const dropdownItemOne = mainnav.querySelectorAll("sgds-dropdown-item")?.[0] as SgdsDropdownItem;
      const anchorLink = dropdownItemOne.querySelector("a") as HTMLAnchorElement;
      anchorLink.click();
      await elementUpdated(mainnav);
      const dropdown = mainnav.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");

      await dropdown?.updateComplete;
      await waitUntil(() => stubHide.called, "hide() was not called", { timeout: 3000 });
      expect(stubHide.called).to.be.true;
    } finally {
      stubHide.restore();
    }
  }).retries(2); // retries as occasionally fails with timeout (CI or local)
});
