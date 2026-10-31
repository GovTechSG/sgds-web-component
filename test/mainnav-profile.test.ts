import { aTimeout, assert, expect, fixture, fixtureCleanup, waitUntil } from "@open-wc/testing";
import { sendKeys, sendMouse } from "@web/test-runner-commands";
import { html } from "lit";
import { SgdsDropdownItem, SgdsMainnav, SgdsMainnavProfile } from "../src/components";
import "./sgds-web-component";

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
  window.matchMedia = () => mql;

  return {
    setMatches(value: boolean) {
      (mql as { matches: boolean }).matches = value;
      listeners.forEach(l => l({ matches: value } as MediaQueryListEvent));
    },
    restore() {
      window.matchMedia = original;
    }
  };
}

describe("sgds-mainnav-profile", () => {
  afterEach(() => fixtureCleanup());

  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-profile");
    expect(el).to.be.instanceOf(SgdsMainnavProfile);
  });

  it("single template: renders unified template with avatar, profile-text, chevron, and dropdown-menu", async () => {
    const el = await fixture<SgdsMainnav>(html`
      <sgds-mainnav expand="lg">
        <sgds-mainnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu">
          <span slot="avatar" class="avatar"></span>
          <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
        </sgds-mainnav-profile>
      </sgds-mainnav>
    `);
    await el.updateComplete;
    const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
    await profile.updateComplete;
    assert.shadowDom.equal(
      profile,
      `
      <button
        aria-disabled="false"
        aria-expanded="false"
        aria-label="Profile menu"
        class="nav-link"
        tabindex="0"
      >
        <slot name="avatar">
        </slot>
        <div class="profile-text">
          <span class="profile-label">User Name</span>
          <span class="profile-secondary-text">Agency (admin)</span>
        </div>
        <sgds-icon
          class="chevron"
          name="chevron-down"
          size="md"
        >
        </sgds-icon>
      </button>
      <div class="dropdown-menu">
        <div class="menu-items">
          <slot>
          </slot>
        </div>
      </div>
      `,
      { ignoreAttributes: ["id"] }
    );
  });

  describe("desktop mode (above breakpoint)", () => {
    let mock: ReturnType<typeof stubMatchMedia>;
    beforeEach(() => {
      mock = stubMatchMedia(false); // false = desktop (not mobile)
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
    });
    afterEach(() => mock.restore());

    it("renders avatar slot in nav-link", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Settings</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const navLink = profile.shadowRoot?.querySelector(".nav-link");
      expect(navLink).to.exist;
      const avatarSlot = navLink?.querySelector('slot[name="avatar"]') as HTMLSlotElement;
      expect(avatarSlot).to.exist;
    });

    it("renders label and secondaryText props", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile
            slot="profile"
            label="User Name"
            secondaryText="Agency (admin)"
            ariaLabel="Profile menu"
          >
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const label = profile.shadowRoot?.querySelector(".profile-label");
      expect(label).to.exist;
      expect(label?.textContent).to.equal("User Name");

      const secondary = profile.shadowRoot?.querySelector(".profile-secondary-text");
      expect(secondary).to.exist;
      expect(secondary?.textContent).to.equal("Agency (admin)");
    });

    it("renders chevron-down icon", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const icon = profile.shadowRoot?.querySelector('sgds-icon[name="chevron-down"]');
      expect(icon).to.exist;
    });

    it("clicking toggler opens the floating dropdown menu", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      toggler.click();
      await profile.updateComplete;
      await aTimeout(50);

      expect(menu).to.have.class("menu-open");
    });

    it("mainnav toggler icon-button is always rendered when profile is present", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).to.exist;
    });

    it("forwards expand attribute to profile component", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      const profile = el.querySelector("sgds-mainnav-profile");
      expect(profile).to.have.attribute("expand", "lg");
    });

    it("does not render profile-text when label and secondaryText are empty", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const profileText = profile.shadowRoot?.querySelector(".profile-text");
      expect(profileText).not.to.exist;
    });
  });

  describe("mobile mode (below breakpoint)", () => {
    let mock: ReturnType<typeof stubMatchMedia>;
    beforeEach(() => {
      mock = stubMatchMedia(true); // true = mobile
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));
    });
    afterEach(() => mock.restore());

    it("clicking avatar toggler opens the mobile panel", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      toggler.click();
      await profile.updateComplete;

      expect(menu).to.have.class("menu-open");
    });

    it("clicking avatar again closes the mobile panel", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      // Open
      toggler.click();
      await profile.updateComplete;
      expect(menu).to.have.class("menu-open");

      // Close
      toggler.click();
      await profile.updateComplete;
      expect(menu).not.to.have.class("menu-open");
    });

    it("clicking outside the profile closes the mobile panel", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      // Open
      toggler.click();
      await profile.updateComplete;
      expect(menu).to.have.class("menu-open");

      // Click outside
      await sendMouse({ type: "click", position: [0, 0] });
      await profile.updateComplete;

      expect(menu).not.to.have.class("menu-open");
    });

    it("does not close mobile panel on outside click when close='inside'", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu" close="inside">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      // Open
      toggler.click();
      await profile.updateComplete;
      expect(menu).to.have.class("menu-open");

      // Click outside
      await sendMouse({ type: "click", position: [0, 0] });
      await profile.updateComplete;

      // Panel should remain open
      expect(menu).to.have.class("menu-open");
    });

    it("hamburger toggler is always rendered in mobile when profile is present", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).to.exist;
    });
  });

  describe("responsive transitions", () => {
    it("matchMedia change triggers breakpoint switch", async () => {
      // Start in mobile
      const mock = stubMatchMedia(true);
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));

      try {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile slot="profile" label="User Name" secondaryText="Agency" ariaLabel="Profile menu">
              <span slot="avatar" class="avatar-test"></span>
              <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
        await profile.updateComplete;

        // Open mobile panel
        const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
        toggler.click();
        await profile.updateComplete;
        const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
        expect(menu).to.have.class("menu-open");

        // Switch to desktop via matchMedia change
        mock.setMatches(false);
        await profile.updateComplete;

        // Menu should close on breakpoint switch
        expect(menu).not.to.have.class("menu-open");
      } finally {
        mock.restore();
      }
    });

    it("toggler icon-button is always present regardless of viewport", async () => {
      const mock = stubMatchMedia(true);
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
      window.dispatchEvent(new Event("resize"));

      try {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
              <span slot="avatar" class="avatar"></span>
              <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;

        // Mobile: toggler is present
        expect(el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler")).to.exist;

        // Switch to desktop
        mock.setMatches(false);
        Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
        window.dispatchEvent(new Event("resize"));
        await el.updateComplete;

        // Desktop: toggler still present
        expect(el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler")).to.exist;
      } finally {
        mock.restore();
      }
    });
  });

  describe("desktop keyboard navigation", () => {
    let mock: ReturnType<typeof stubMatchMedia>;
    beforeEach(() => {
      mock = stubMatchMedia(false); // desktop
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
      window.dispatchEvent(new Event("resize"));
    });
    afterEach(() => mock.restore());

    it("Escape closes the dropdown menu", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const toggler = profile.shadowRoot?.querySelector("button.nav-link") as HTMLElement;
      const menu = profile.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      // Open menu
      toggler.click();
      await profile.updateComplete;
      await aTimeout(50);
      expect(menu).to.have.class("menu-open");

      // Press Escape
      toggler.focus();
      await sendKeys({ press: "Escape" });
      await profile.updateComplete;

      expect(menu).not.to.have.class("menu-open");
    }).retries(1);
  });

  describe("read-only mode (no dropdown items)", () => {
    describe("desktop", () => {
      let mock: ReturnType<typeof stubMatchMedia>;
      beforeEach(() => {
        mock = stubMatchMedia(false);
        Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
        window.dispatchEvent(new Event("resize"));
      });
      afterEach(() => mock.restore());

      it("has read-only class when no items are slotted", async () => {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile slot="profile" label="User Name" secondaryText="Agency" ariaLabel="Profile info">
              <span slot="avatar" class="avatar"></span>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
        await profile.updateComplete;

        const navLink = profile.shadowRoot?.querySelector(".nav-link");
        expect(navLink).to.exist;
        expect(navLink).to.have.class("read-only");
      });

      it("still renders label and secondaryText in read-only mode", async () => {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile
              slot="profile"
              label="User Name"
              secondaryText="Agency (admin)"
              ariaLabel="Profile info"
            >
              <span slot="avatar" class="avatar"></span>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
        await profile.updateComplete;

        const label = profile.shadowRoot?.querySelector(".profile-label");
        expect(label).to.exist;
        expect(label?.textContent).to.equal("User Name");

        const secondary = profile.shadowRoot?.querySelector(".profile-secondary-text");
        expect(secondary).to.exist;
        expect(secondary?.textContent).to.equal("Agency (admin)");
      });

      it("is not interactive in read-only mode (disabled, tabindex=-1)", async () => {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile info">
              <span slot="avatar" class="avatar"></span>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
        await profile.updateComplete;

        const button = profile.shadowRoot?.querySelector("button.nav-link") as HTMLButtonElement;
        expect(button).to.exist;
        expect(button.tabIndex).to.equal(-1);
        expect(button.disabled).to.be.true;
      });

      it("transitions from read-only to interactive when items are dynamically added", async () => {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
              <span slot="avatar" class="avatar"></span>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
        await profile.updateComplete;

        // Initially read-only
        expect(profile.shadowRoot?.querySelector(".nav-link.read-only")).to.exist;

        // Dynamically add a dropdown item
        const item = document.createElement("sgds-dropdown-item");
        item.innerHTML = "<span>Log out</span>";
        profile.appendChild(item);
        await profile.updateComplete;
        await aTimeout(0);
        await profile.updateComplete;

        // Should now be interactive (no read-only class)
        expect(profile.shadowRoot?.querySelector(".nav-link.read-only")).not.to.exist;
        expect(profile.shadowRoot?.querySelector('sgds-icon.chevron[name="chevron-down"]')).to.exist;
      });
    });

    describe("mobile", () => {
      let mock: ReturnType<typeof stubMatchMedia>;
      beforeEach(() => {
        mock = stubMatchMedia(true);
        Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
        window.dispatchEvent(new Event("resize"));
      });
      afterEach(() => mock.restore());

      it("has read-only class when no items are slotted", async () => {
        const el = await fixture<SgdsMainnav>(html`
          <sgds-mainnav expand="lg">
            <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile info">
              <span slot="avatar" class="avatar"></span>
            </sgds-mainnav-profile>
          </sgds-mainnav>
        `);
        await el.updateComplete;
        const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
        await profile.updateComplete;

        const navLink = profile.shadowRoot?.querySelector(".nav-link");
        expect(navLink).to.exist;
        expect(navLink).to.have.class("read-only");
      });
    });
  });

  describe("dropdown-item readonly prop", () => {
    it("readonly attribute reflects on sgds-dropdown-item", async () => {
      const el = await fixture<SgdsDropdownItem>(
        html`<sgds-dropdown-item readonly><span>Info</span></sgds-dropdown-item>`
      );
      await el.updateComplete;
      expect(el).to.have.attribute("readonly");
    });

    it("readonly dropdown-item has readonly class on .dropdown-item", async () => {
      const el = await fixture<SgdsDropdownItem>(
        html`<sgds-dropdown-item readonly><span>Info</span></sgds-dropdown-item>`
      );
      await el.updateComplete;
      const inner = el.shadowRoot?.querySelector(".dropdown-item");
      expect(inner).to.have.class("readonly");
    });

    it("readonly dropdown-item has tabindex -1", async () => {
      const el = await fixture<SgdsDropdownItem>(
        html`<sgds-dropdown-item readonly><span>Info</span></sgds-dropdown-item>`
      );
      await el.updateComplete;
      const inner = el.shadowRoot?.querySelector(".dropdown-item");
      expect(inner?.getAttribute("tabindex")).to.equal("-1");
    });

    it("non-readonly dropdown-item has tabindex 0", async () => {
      const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item><span>Info</span></sgds-dropdown-item>`);
      await el.updateComplete;
      const inner = el.shadowRoot?.querySelector(".dropdown-item");
      expect(inner?.getAttribute("tabindex")).to.equal("0");
    });
  });
});
