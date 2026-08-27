import { aTimeout, assert, elementUpdated, expect, fixture, fixtureCleanup } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import Sinon from "sinon";
import { SgdsAppnav, SgdsAppnavProfile } from "../src/components";
import "./sgds-web-component";

describe("sgds-appnav", () => {
  afterEach(() => fixtureCleanup());

  it("is defined", () => {
    const el = document.createElement("sgds-appnav");
    assert.instanceOf(el, SgdsAppnav);
  });

  it("tone prop defaults to 'brand'", async () => {
    const el = await fixture<SgdsAppnav>(html`<sgds-appnav></sgds-appnav>`);
    expect(el.tone).to.equal("brand");
    expect(el.getAttribute("tone")).to.equal("brand");
  });

  it("tone='gradient-1' reflects as attribute", async () => {
    const el = await fixture<SgdsAppnav>(html`<sgds-appnav tone="gradient-1"></sgds-appnav>`);
    expect(el.tone).to.equal("gradient-1");
    expect(el.getAttribute("tone")).to.equal("gradient-1");
  });

  it("tone='gradient-3' reflects as attribute", async () => {
    const el = await fixture<SgdsAppnav>(html`<sgds-appnav tone="gradient-3"></sgds-appnav>`);
    expect(el.tone).to.equal("gradient-3");
    expect(el.getAttribute("tone")).to.equal("gradient-3");
  });

  it("brandHref props forwards to a.navbar-brand href attribute", async () => {
    const el = await fixture(html`<sgds-appnav brandHref="test"></sgds-appnav>`);
    expect(el.shadowRoot?.querySelector("a.navbar-brand")?.getAttribute("href")).to.equal("test");
  });

  it("start slot renders before brand", async () => {
    const el = await fixture<SgdsAppnav>(
      html`<sgds-appnav>
        <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
      </sgds-appnav>`
    );
    await el.updateComplete;
    const navbar = el.shadowRoot?.querySelector(".navbar");
    const startSlot = navbar?.querySelector("slot[name='start']");
    const brand = navbar?.querySelector(".navbar-brand");
    expect(startSlot).to.exist;
    const children = Array.from(navbar?.children || []);
    const startIndex = children.indexOf(startSlot as Element);
    const brandIndex = children.indexOf(brand as Element);
    expect(startIndex).to.be.lessThan(brandIndex);
  });

  it("start slot has slot-empty class when nothing is slotted", async () => {
    const el = await fixture<SgdsAppnav>(html`<sgds-appnav></sgds-appnav>`);
    await el.updateComplete;
    const startSlot = el.shadowRoot?.querySelector("slot[name='start']");
    expect(startSlot).to.have.class("slot-empty");
  });

  it("start slot does not have slot-empty class when content is slotted", async () => {
    const el = await fixture<SgdsAppnav>(
      html`<sgds-appnav>
        <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
      </sgds-appnav>`
    );
    await el.updateComplete;
    const startSlot = el.shadowRoot?.querySelector("slot[name='start']");
    expect(startSlot).not.to.have.class("slot-empty");
  });

  it("when expand=always, navbar class has .navbar-expand", async () => {
    const el = await fixture(html`<sgds-appnav expand="always"></sgds-appnav>`);
    expect(el.shadowRoot?.querySelector(".navbar")).to.have.class("navbar-expand");
  });

  it("when expand=never, navbar class does not have .navbar-expand", async () => {
    const el = await fixture(html`<sgds-appnav expand="never"></sgds-appnav>`);
    const classList = el.shadowRoot?.querySelector(".navbar")?.classList.value;
    expect(/navbar-expand/.test(classList as string)).to.be.false;
  });

  describe("toggler", () => {
    it("renders toggler only when default slot has items and breakpoint is reached (mobile)", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
      </sgds-appnav>`);
      await el.updateComplete;
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).to.exist;
      expect(toggler).to.have.attribute("name", "three-dots-vertical");
    });

    it("does not render toggler in desktop even when default slot has items", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
      </sgds-appnav>`);
      await el.updateComplete;
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).not.to.exist;
    });

    it("does not render toggler when default slot is empty", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg"></sgds-appnav>`);
      await el.updateComplete;
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).not.to.exist;
    });

    it("toggler always has fixed-light tone", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav tone="brand" expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
      </sgds-appnav>`);
      await el.updateComplete;
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).to.have.attribute("tone", "fixed-light");
    });

    it("clicking toggler opens collapsed menu", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
      </sgds-appnav>`);
      await el.updateComplete;
      const mainNavCollapse = el.shadowRoot?.querySelector(".navbar-collapse");
      expect(mainNavCollapse).to.have.attribute("hidden");
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler") as HTMLButtonElement;
      expect(toggler.getAttribute("aria-expanded")).to.equal("false");
      toggler?.click();
      await elementUpdated(el);
      expect(mainNavCollapse).not.to.have.attribute("hidden");
      await aTimeout(500);
      expect(toggler.getAttribute("aria-expanded")).to.equal("true");
    });

    it("Tab from toggler when menu is open focuses the first menu item", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
        <sgds-icon-button
          name="bell"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Notifications"
        ></sgds-icon-button>
        <sgds-appnav-profile slot="profile" label="User" ariaLabel="Profile">
          <span slot="avatar" class="avatar"></span>
        </sgds-appnav-profile>
      </sgds-appnav>`);
      await el.updateComplete;

      // Open the menu
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler") as HTMLElement;
      toggler.click();
      await elementUpdated(el);
      await aTimeout(300);

      // Focus toggler and press Tab
      toggler.focus();
      await sendKeys({ press: "Tab" });

      const firstMenuItem = el.shadowRoot?.querySelector(".appnav-menu-item") as HTMLElement;
      expect(el.shadowRoot?.activeElement).to.equal(firstMenuItem);
    }).retries(1);

    it("Shift+Tab from first menu item focuses the toggler, not profile avatar", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
        <sgds-icon-button
          name="bell"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Notifications"
        ></sgds-icon-button>
        <sgds-appnav-profile slot="profile" label="User" ariaLabel="Profile">
          <span slot="avatar" class="avatar"></span>
        </sgds-appnav-profile>
      </sgds-appnav>`);
      await el.updateComplete;

      // Open the menu
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler") as HTMLElement;
      toggler.click();
      await elementUpdated(el);
      await aTimeout(300);

      // Focus the first menu item
      const firstMenuItem = el.shadowRoot?.querySelector(".appnav-menu-item") as HTMLElement;
      firstMenuItem.focus();
      expect(el.shadowRoot?.activeElement).to.equal(firstMenuItem);

      // Shift+Tab should move focus to the toggler
      await sendKeys({ down: "Shift" });
      await sendKeys({ press: "Tab" });
      await sendKeys({ up: "Shift" });

      expect(el.shadowRoot?.activeElement).to.equal(toggler);
    }).retries(1);
  });

  describe("navbar-end visibility", () => {
    it("navbar-end is hidden when no profile and no toggler (desktop, no default items)", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg"></sgds-appnav>`);
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd).to.have.class("slot-empty");
    });

    it("navbar-end is hidden in desktop when default slot has items but no profile", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
      </sgds-appnav>`);
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd).to.have.class("slot-empty");
    });

    it("navbar-end is visible when profile is slotted", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-appnav-profile slot="profile" label="User" ariaLabel="Profile">
          <span slot="avatar" class="avatar"></span>
        </sgds-appnav-profile>
      </sgds-appnav>`);
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd).not.to.have.class("slot-empty");
    });

    it("navbar-end is visible in mobile when default slot has items (toggler shown)", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(html`<sgds-appnav expand="lg">
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></sgds-icon-button>
      </sgds-appnav>`);
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd).not.to.have.class("slot-empty");
    });
  });

  describe("default slot", () => {
    it("does not overwrite user-set tone on slotted items", async () => {
      const el = await fixture<SgdsAppnav>(
        html`<sgds-appnav tone="brand" expand="xl">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>`
      );
      await el.updateComplete;
      expect(el.querySelector("sgds-icon-button")).to.have.attribute("tone", "fixed-light");
    });

    it("propagates expand attribute to slotted items", async () => {
      const el = await fixture<SgdsAppnav>(
        html`<sgds-appnav expand="xl">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>`
      );
      await el.updateComplete;
      expect(el.querySelector("sgds-icon-button")).to.have.attribute("expand", "xl");
    });
  });

  describe("mobile menu items", () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));
    });

    it("renders text menu items from ariaLabel in mobile view", async () => {
      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
          <sgds-icon-button
            name="bell"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Notifications"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      const menuItems = el.shadowRoot?.querySelectorAll(".appnav-menu-item");
      expect(menuItems?.length).to.equal(2);
      expect(menuItems?.[0].textContent).to.equal("Toggle dark mode");
      expect(menuItems?.[1].textContent).to.equal("Notifications");
    });

    it("hides slotted elements in mobile menu via slot-desktop-only class", async () => {
      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      const slot = el.shadowRoot?.querySelector(".navbar-nav-scroll > slot:not([name])");
      expect(slot).to.have.class("slot-desktop-only");
    });

    it("clicking mobile menu item triggers click on the original element", async () => {
      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      const iconButton = el.querySelector("sgds-icon-button") as HTMLElement;
      const clickSpy = Sinon.spy();
      iconButton.addEventListener("click", clickSpy);

      const menuItem = el.shadowRoot?.querySelector(".appnav-menu-item") as HTMLElement;
      menuItem.click();
      expect(clickSpy.calledOnce).to.be.true;
    });

    it("clicking mobile menu item closes the menu", async () => {
      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="never">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      // Open the menu
      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler") as HTMLElement;
      toggler.click();
      await elementUpdated(el);
      await aTimeout(300);

      const hideSpy = Sinon.spy(el, "hide");
      const menuItem = el.shadowRoot?.querySelector(".appnav-menu-item") as HTMLElement;
      menuItem.click();
      expect(hideSpy.calledOnce).to.be.true;
      hideSpy.restore();
    });

    it("logs a console.warn when slotted element has no ariaLabel", async () => {
      const warnSpy = Sinon.spy(console, "warn");
      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button name="moon" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      expect(warnSpy.calledOnce).to.be.true;
      expect(warnSpy.firstCall.args[0]).to.include("[sgds-appnav]");
      expect(warnSpy.firstCall.args[0]).to.include("no ariaLabel");
      warnSpy.restore();
    });

    it("does not log a warning when slotted element has ariaLabel", async () => {
      const warnSpy = Sinon.spy(console, "warn");
      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      expect(warnSpy.called).to.be.false;
      warnSpy.restore();
    });

    it("does not render text menu items in desktop view", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));

      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      const menuItems = el.shadowRoot?.querySelectorAll(".appnav-menu-item");
      expect(menuItems?.length).to.equal(0);
    });

    it("slot does not have slot-desktop-only class in desktop view", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));

      const el = await fixture<SgdsAppnav>(html`
        <sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
        </sgds-appnav>
      `);
      await el.updateComplete;

      const slot = el.shadowRoot?.querySelector(".navbar-nav-scroll > slot:not([name])");
      expect(slot).not.to.have.class("slot-desktop-only");
    });
  });

  describe("profile slot", () => {
    it("renders profile slot inside .navbar-end", async () => {
      const el = await fixture<SgdsAppnav>(
        html`<sgds-appnav>
          <sgds-appnav-profile slot="profile" label="User" ariaLabel="Profile">
            <span slot="avatar" class="avatar"></span>
          </sgds-appnav-profile>
        </sgds-appnav>`
      );
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      expect(navbarEnd?.querySelector("slot[name='profile']")).to.exist;
    });

    it("profile slot propagates tone and expand attributes", async () => {
      const el = await fixture<SgdsAppnav>(
        html`<sgds-appnav tone="brand" expand="xl">
          <sgds-appnav-profile slot="profile" label="User" ariaLabel="Profile">
            <span slot="avatar" class="avatar"></span>
          </sgds-appnav-profile>
        </sgds-appnav>`
      );
      await el.updateComplete;
      expect(el.querySelector("sgds-appnav-profile")).to.have.attribute("tone", "brand");
      expect(el.querySelector("sgds-appnav-profile")).to.have.attribute("expand", "xl");
    });

    it("toggler appears to the left of profile in mobile", async () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
      const el = await fixture<SgdsAppnav>(
        html`<sgds-appnav expand="lg">
          <sgds-icon-button
            name="moon"
            variant="ghost"
            tone="fixed-light"
            size="sm"
            ariaLabel="Toggle dark mode"
          ></sgds-icon-button>
          <sgds-appnav-profile slot="profile" label="User" ariaLabel="Profile">
            <span slot="avatar" class="avatar"></span>
          </sgds-appnav-profile>
        </sgds-appnav>`
      );
      await el.updateComplete;
      const navbarEnd = el.shadowRoot?.querySelector(".navbar-end");
      const children = Array.from(navbarEnd?.children || []);
      const toggler = navbarEnd?.querySelector("sgds-icon-button.navbar-toggler");
      const profileSlot = navbarEnd?.querySelector("slot[name='profile']");
      expect(toggler).to.exist;
      expect(profileSlot).to.exist;
      const togglerIndex = children.indexOf(toggler as Element);
      const profileIndex = children.indexOf(profileSlot as Element);
      expect(togglerIndex).to.be.lessThan(profileIndex);
    });
  });
});

describe("sgds-appnav-profile", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-appnav-profile");
    assert.instanceOf(el, SgdsAppnavProfile);
  });
});
