import { aTimeout, assert, elementUpdated, expect, fixture, fixtureCleanup, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
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
      `<nav aria-label="Main navigation">
        <div class="navbar navbar-expand-lg">
          <div class="navbar-brand"><slot name="brand"></slot></div>
          <div class="navbar-end navbar-end--empty">
            <slot
              class="slot-empty"
              name="non-collapsible"
            >
            </slot>
            <slot class="slot-empty" name="profile">
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
            <slot class="slot-end" name="end">
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

  it("slotted <a> in brand slot receives navbar-brand class", async () => {
    const el = await fixture<SgdsMainnav>(
      html`<sgds-mainnav>
        <a slot="brand" href="/"><img alt="logo" src="/logo.svg" /></a>
      </sgds-mainnav>`
    );
    await el.updateComplete;
    const slottedAnchor = el.querySelector("a[slot='brand']");
    expect(slottedAnchor).to.exist;
    expect(slottedAnchor).to.have.class("navbar-brand");
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
  it("when expand=lg and window resize event occurs to above breakpoint, it inserts .navbar-body before .navbar-end", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="lg"></sgds-mainnav>`);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    // slot-end class is always present (CSS handles responsive styling)
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
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
  it("when expand=sm and window resize event occurs to above breakpoint, it inserts .navbar-body before .navbar-end", async () => {
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
    // slot-end class is always present
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
  });
  // now window.innerWidth = 511
  it("when expand=always and window resize event occurs, it NEVER changes the position of .navbar-body, and end slot ALWAYS has slot-end", async () => {
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
  it("when expand=never and window resize event occurs, it NEVER changes the position of .navbar-body, and end slot ALWAYS has slot-end", async () => {
    const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="never"></sgds-mainnav>`);
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    // slot-end is now always present (CSS handles responsive styling)
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 100000 // trying extreme sizes
    });
    window.dispatchEvent(new Event("resize"));
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("nav > .navbar-body")).to.exist;
    expect(el.shadowRoot?.querySelector("nav > .navbar .navbar-body")).not.to.exist;
    expect(el.shadowRoot?.querySelector("slot[name='end']")).to.have.class("slot-end");
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
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User">
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
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User">
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

    it("empty profile slot has .slot-empty class", async () => {
      const el = await fixture<SgdsMainnav>(html`<sgds-mainnav></sgds-mainnav>`);
      await el.updateComplete;
      const profileSlot = el.shadowRoot?.querySelector("slot[name='profile']");
      expect(profileSlot).to.have.class("slot-empty");
    });

    it("slotted profile removes .slot-empty class", async () => {
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav>
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User">
            <span slot="toggler">User</span>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      const profileSlot = el.shadowRoot?.querySelector("slot[name='profile']");
      expect(profileSlot).not.to.have.class("slot-empty");
    });

    it(".navbar-end has .navbar-end--empty in desktop when both slots are empty", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="lg"></sgds-mainnav>`);
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd).to.have.class("navbar-end--empty");
    });

    it(".navbar-end does not have .navbar-end--empty when profile slot is filled", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsMainnav>(
        html`<sgds-mainnav expand="lg">
          <sgds-mainnav-dropdown slot="profile" ariaLabel="User">
            <span slot="toggler">User</span>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>`
      );
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd).not.to.have.class("navbar-end--empty");
    });

    it(".navbar-end has .navbar-end--empty in mobile when slots are empty (CSS handles visibility)", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsMainnav>(html`<sgds-mainnav expand="lg"></sgds-mainnav>`);
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      // Class is now always applied when slots are empty (CSS media queries handle mobile visibility)
      expect(navbarEnd).to.have.class("navbar-end--empty");
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

/**
 * Stubs window.matchMedia to return a controllable MediaQueryList.
 * Call `mock.setMatches(true/false)` to trigger change listeners.
 * Call `mock.restore()` to restore the original matchMedia.
 */
function stubMatchMedia(initialMatches: boolean) {
  type ChangeListener = (e: MediaQueryListEvent) => void;
  const listeners: ChangeListener[] = [];
  const mql = {
    matches: initialMatches,
    media: "",
    addEventListener(_type: string, listener: ChangeListener) {
      listeners.push(listener);
    },
    removeEventListener(_type: string, listener: ChangeListener) {
      const idx = listeners.indexOf(listener);
      if (idx >= 0) listeners.splice(idx, 1);
    },
    addListener() {
      /* legacy */
    },
    removeListener() {
      /* legacy */
    },
    onchange: null,
    dispatchEvent() {
      return true;
    }
  } as unknown as MediaQueryList;

  const original = window.matchMedia;
  let lastQuery = "";
  window.matchMedia = (query: string) => {
    lastQuery = query;
    return mql;
  };

  return {
    get lastQuery() {
      return lastQuery;
    },
    setMatches(value: boolean) {
      (mql as { matches: boolean }).matches = value;
      listeners.forEach(l => l({ matches: value } as MediaQueryListEvent));
    },
    restore() {
      window.matchMedia = original;
    }
  };
}

describe("sgds-mainnav-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-dropdown");
    assert.instanceOf(el, SgdsMainnavDropdown);
  });

  describe("matchMedia query per expand value", () => {
    const expandBreakpoints: [string, number][] = [
      ["sm", 512],
      ["md", 768],
      ["lg", 1024],
      ["xl", 1280],
      ["xxl", 1440]
    ];

    expandBreakpoints.forEach(([size, breakpoint]) => {
      it(`expand="${size}" creates matchMedia query with max-width: ${breakpoint - 1}px`, async () => {
        const mock = stubMatchMedia(false);
        try {
          const el = await fixture<SgdsMainnav>(html`
            <sgds-mainnav expand=${size}>
              <sgds-mainnav-dropdown>
                <span slot="toggler">Menu</span>
              </sgds-mainnav-dropdown>
            </sgds-mainnav>
          `);
          await el.updateComplete;
          expect(mock.lastQuery).to.equal(`(max-width: ${breakpoint - 1}px)`);
        } finally {
          mock.restore();
        }
      });
    });

    it("defaults to lg (1024) when no expand attribute", async () => {
      const mock = stubMatchMedia(false);
      try {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav>
            <sgds-mainnav-dropdown>
              <span slot="toggler">Menu</span>
            </sgds-mainnav-dropdown>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        expect(mock.lastQuery).to.equal("(max-width: 1023px)");
      } finally {
        mock.restore();
      }
    });
  });
  it("single template: renders unified template with both icons and mobile header", async () => {
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
    // Single template always renders both icons + mobile header + dropdown-menu
    assert.shadowDom.equal(
      dropdown as SgdsMainnavDropdown,
      `
      <button
        class="nav-link"
        aria-disabled="false"
        aria-expanded="false"
      >
        <span class="toggler-wrapper"><slot name="toggler"></slot></span>
        <sgds-icon class="icon-down" name="chevron-down" size="md"></sgds-icon>
        <sgds-icon class="icon-right" name="chevron-right" size="md"></sgds-icon>
      </button>
      <div class="dropdown-menu" role="menu" aria-hidden="true">
        <div class="mobile-header">
          <a tabindex="0" role="button">
            <sgds-icon name="chevron-left" size="md"></sgds-icon>
            <span class="back-text">Dropdown</span>
          </a>
        </div>
        <slot></slot>
      </div>
      `,
      { ignoreAttributes: ["id", "style"] }
    );
  });
  it("mobile view: clicking toggler opens mobile menu panel", async () => {
    // Stub matchMedia so dropdown detects mobile mode
    const mock = stubMatchMedia(true);
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
    window.dispatchEvent(new Event("resize"));
    try {
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
      const dropdownMenu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      expect(dropdownMenu.getAttribute("aria-hidden")).to.equal("true");
      const togglerButton = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLButtonElement;
      togglerButton.click();
      await waitUntil(() => dropdownMenu.getAttribute("aria-hidden") === "false");
      expect(dropdownMenu.style.display).to.equal("block");
    } finally {
      mock.restore();
    }
  });

  it("when prop active=true, .active class is defined in the button", async () => {
    const el = await fixture(html`<sgds-mainnav-dropdown active
      ><span slot="toggler">Dropdown</span>
      <sgds-dropdown-item>
        <a href="https://www.google.com/">Item 1</a>
      </sgds-dropdown-item></sgds-mainnav-dropdown
    >`);

    expect(el.shadowRoot?.querySelector("button.nav-link")).to.have.class("active");
  });

  it("in mobile view, mainnavdropdown calls mainnav.hide() when dropdown item anchor is clicked", async () => {
    // Stub matchMedia so dropdown detects mobile mode
    const mock = stubMatchMedia(true);
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
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
      mock.restore();
    }
  }).retries(2); // retries as occasionally fails with timeout (CI or local)

  it("matchMedia change closes desktop menu when switching to mobile", async () => {
    const mock = stubMatchMedia(false); // start desktop
    try {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      // Open desktop menu
      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLButtonElement;
      toggler.click();
      await dropdown?.updateComplete;
      await aTimeout(50);
      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      expect(menu).to.have.class("menu-open");

      // Switch to mobile via matchMedia change
      mock.setMatches(true);
      await dropdown?.updateComplete;

      // Desktop menu should be closed
      expect(menu).not.to.have.class("menu-open");
    } finally {
      mock.restore();
    }
  });

  it("matchMedia change resets mobile state when switching to desktop", async () => {
    const mock = stubMatchMedia(true); // start mobile
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
    window.dispatchEvent(new Event("resize"));
    try {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      // Open mobile menu
      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLButtonElement;
      toggler.click();
      await dropdown?.updateComplete;
      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      expect(menu.style.display).to.equal("block");

      // Switch to desktop via matchMedia change
      mock.setMatches(false);
      await dropdown?.updateComplete;

      // Mobile inline styles should be cleared
      expect(menu.style.display).to.equal("");
    } finally {
      mock.restore();
    }
  });

  describe("desktop keyboard navigation", () => {
    let mock: ReturnType<typeof stubMatchMedia>;
    beforeEach(() => {
      mock = stubMatchMedia(false); // desktop
    });
    afterEach(() => mock.restore());

    it("ArrowDown on toggler opens menu and focuses first item", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Item 2</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      toggler.focus();
      await sendKeys({ press: "ArrowDown" });
      await dropdown?.updateComplete;
      await aTimeout(50);

      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      expect(menu).to.have.class("menu-open");

      const items = dropdown?.querySelectorAll("sgds-dropdown-item");
      expect(items?.[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);

    it("ArrowDown cycles through items and loops last to first", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Item 2</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      // Open menu
      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      toggler.click();
      await dropdown?.updateComplete;
      await aTimeout(50);

      // Navigate: first → second → loops to first
      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      await aTimeout(0);
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      await aTimeout(0);
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      await aTimeout(0);

      const items = dropdown?.querySelectorAll("sgds-dropdown-item");
      expect(items?.[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);

    it("ArrowUp cycles through items and loops first to last", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Item 2</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      // Open menu
      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      toggler.click();
      await dropdown?.updateComplete;
      await aTimeout(50);

      // ArrowUp from initial → loops to last item
      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
      await aTimeout(0);

      const items = dropdown?.querySelectorAll("sgds-dropdown-item");
      expect(items?.[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);

    it("Escape closes menu and returns focus to toggler", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item><a href="#">Item 1</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      // Open menu
      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      toggler.click();
      await dropdown?.updateComplete;
      await aTimeout(50);

      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      expect(menu).to.have.class("menu-open");

      // Escape
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      await dropdown?.updateComplete;

      expect(menu).not.to.have.class("menu-open");
    }).retries(1);

    it("skips disabled items during ArrowDown navigation", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav>
          <sgds-mainnav-dropdown>
            <span slot="toggler">Dropdown</span>
            <sgds-dropdown-item disabled><a href="#">Disabled</a></sgds-dropdown-item>
            <sgds-dropdown-item><a href="#">Active</a></sgds-dropdown-item>
          </sgds-mainnav-dropdown>
        </sgds-mainnav>
      `);
      const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
      await dropdown?.updateComplete;

      // Open menu
      const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      toggler.click();
      await dropdown?.updateComplete;
      await aTimeout(50);

      // ArrowDown should skip disabled and focus the active item
      const menu = dropdown?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
      menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      await aTimeout(0);

      const activeItem = dropdown?.querySelectorAll("sgds-dropdown-item")?.[1];
      expect(activeItem?.shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);
  });

  it("explicit ariaLabel is forwarded to the button", async () => {
    const el = await fixture<SgdsMainnav>(html`
      <sgds-mainnav>
        <sgds-mainnav-dropdown ariaLabel="Custom label">
          <span slot="toggler">Services</span>
        </sgds-mainnav-dropdown>
      </sgds-mainnav>
    `);
    const dropdown = el.querySelector<SgdsMainnavDropdown>("sgds-mainnav-dropdown");
    await dropdown?.updateComplete;
    await elementUpdated(dropdown as SgdsMainnavDropdown);
    const toggler = dropdown?.shadowRoot?.querySelector("button.nav-link") as HTMLButtonElement;
    expect(toggler.getAttribute("aria-label")).to.equal("Custom label");
  });
});
