import { aTimeout, assert, elementUpdated, expect, fixture, fixtureCleanup, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import { sendKeys } from "@web/test-runner-commands";
import { SgdsDropdownItem, SgdsMainnav, SgdsMainnavProfile } from "../src/components";
import "./sgds-web-component";

describe("sgds-mainnav-profile", () => {
  afterEach(() => fixtureCleanup());

  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-profile");
    expect(el).to.be.instanceOf(SgdsMainnavProfile);
  });

  it("desktop view: can be semantically compare with shadowDom trees", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1030 });
    window.dispatchEvent(new Event("resize"));
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
      <sgds-dropdown
        close="default"
        drop="down"
      >
        <button
          aria-disabled="false"
          aria-label="Profile menu"
          class="nav-link"
          slot="toggler"
          tabindex="0"
        >
          <slot name="avatar">
          </slot>
          <div class="profile-text">
            <span class="profile-label">User Name</span>
            <span class="profile-secondary-text">Agency (admin)</span>
          </div>
          <sgds-icon
            name="chevron-down"
            size="md"
          >
          </sgds-icon>
        </button>
        <slot>
        </slot>
      </sgds-dropdown>
      `,
      { ignoreAttributes: ["id", "aria-expanded", "aria-haspopup"] }
    );
  });

  it("mobile view: can be semantically compare with shadowDom trees", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 300 });
    window.dispatchEvent(new Event("resize"));
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
        class="profile-avatar-mobile"
        aria-expanded="false"
        aria-label="Profile menu"
      >
        <slot name="avatar">
        </slot>
      </button>
      <div
        class="profile-mobile-panel"
        hidden=""
      >
        <div class="profile-mobile-items">
          <slot>
          </slot>
        </div>
      </div>
      `,
      { ignoreAttributes: ["id"] }
    );
  });

  describe("desktop mode (above breakpoint)", () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));
    });

    it("renders a dropdown in desktop mode", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile
            slot="profile"
            label="User Name"
            secondaryText="Agency (admin)"
            ariaLabel="Profile menu"
          >
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown");
      expect(dropdown).to.exist;
    });

    it("renders avatar slot in desktop dropdown", async () => {
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

    it("renders label and secondaryText props in desktop", async () => {
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

    it("renders chevron-down icon in desktop mode", async () => {
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

    it("mainnav toggler icon-button is still rendered in desktop when profile is present", async () => {
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

    it("forwards expand and tone attributes to profile component", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg" tone="brand">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      const profile = el.querySelector("sgds-mainnav-profile");
      expect(profile).to.have.attribute("expand", "lg");
      expect(profile).to.have.attribute("tone", "brand");
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
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));
    });

    it("renders flat items (no dropdown) in mobile mode", async () => {
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

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown");
      expect(dropdown).not.to.exist;

      const mobileItems = profile.shadowRoot?.querySelector(".profile-mobile-items");
      expect(mobileItems).to.exist;
    });

    it("does not render label or secondaryText in mobile mode", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" secondaryText="Agency" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const label = profile.shadowRoot?.querySelector(".profile-label");
      expect(label).not.to.exist;

      const secondary = profile.shadowRoot?.querySelector(".profile-secondary-text");
      expect(secondary).not.to.exist;
    });

    it("mainnav hides the default toggler icon-button in mobile when profile component is present", async () => {
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
      expect(toggler).not.to.exist;
    });

    it("renders avatar toggler in mobile mode", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar-test"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const avatarToggler = profile.shadowRoot?.querySelector("button.profile-avatar-mobile");
      expect(avatarToggler).to.exist;
      expect(avatarToggler?.tagName.toLowerCase()).to.equal("button");
      expect(avatarToggler).to.have.attribute("aria-label", "Profile menu");
    });

    it("clicking avatar opens the profile mobile panel", async () => {
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

      const avatarToggler = profile.shadowRoot?.querySelector(".profile-avatar-mobile") as HTMLElement;
      const panel = profile.shadowRoot?.querySelector(".profile-mobile-panel");
      expect(panel).to.have.attribute("hidden");

      avatarToggler.click();
      await profile.updateComplete;

      expect(panel).not.to.have.attribute("hidden");
    });

    it("clicking avatar again closes the profile mobile panel", async () => {
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

      const avatarToggler = profile.shadowRoot?.querySelector(".profile-avatar-mobile") as HTMLElement;
      const panel = profile.shadowRoot?.querySelector(".profile-mobile-panel");

      // Open
      avatarToggler.click();
      await profile.updateComplete;
      expect(panel).not.to.have.attribute("hidden");

      // Close
      avatarToggler.click();
      await profile.updateComplete;
      expect(panel).to.have.attribute("hidden");
    });
  });

  describe("responsive transitions", () => {
    it("switches from mobile panel to desktop dropdown on resize", async () => {
      // Start in mobile
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));

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

      // Mobile: avatar toggler, no dropdown
      expect(profile.shadowRoot?.querySelector(".profile-avatar-mobile")).to.exist;
      expect(profile.shadowRoot?.querySelector("sgds-dropdown")).not.to.exist;

      // Resize to desktop
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));
      await el.updateComplete;
      await profile.updateComplete;

      // Desktop: dropdown with label
      expect(profile.shadowRoot?.querySelector("sgds-dropdown")).to.exist;
      expect(profile.shadowRoot?.querySelector(".profile-label")?.textContent).to.equal("User Name");
      expect(profile.shadowRoot?.querySelector(".profile-secondary-text")?.textContent).to.equal("Agency");
    });

    it("toggler icon-button returns when resizing to desktop", async () => {
      // Start in mobile
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));

      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      // Mobile: no toggler
      expect(el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler")).not.to.exist;

      // Resize to desktop
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));
      await el.updateComplete;

      // Desktop: toggler returns
      expect(el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler")).to.exist;
    });
  });

  describe("desktop keyboard navigation", () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));
    });

    it("ArrowDown opens the dropdown menu", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
            <sgds-dropdown-item><span>Settings</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown") as any;
      const toggler = profile.shadowRoot?.querySelector("button[slot='toggler']") as HTMLElement;
      toggler.focus();

      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;

      expect(dropdown.menuIsOpen).to.be.true;
    }).retries(1);

    it("ArrowDown navigates through dropdown items", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
            <sgds-dropdown-item><span>Settings</span></sgds-dropdown-item>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown") as any;
      const toggler = profile.shadowRoot?.querySelector("button[slot='toggler']") as HTMLElement;

      // Click to open menu first
      toggler.click();
      await dropdown.updateComplete;
      await aTimeout(0);
      toggler.focus();

      // Navigate to first item
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;

      const items = profile.querySelectorAll("sgds-dropdown-item");
      expect(items[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
      expect(items[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "-1");
    }).retries(1);

    it("ArrowDown loops from last item to first item", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown") as any;
      const toggler = profile.shadowRoot?.querySelector("button[slot='toggler']") as HTMLElement;

      // Click to open menu first
      toggler.click();
      await dropdown.updateComplete;
      await aTimeout(0);
      toggler.focus();

      // Navigate: first → second → loops back to first
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;

      const items = profile.querySelectorAll("sgds-dropdown-item");
      expect(items[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);

    it("skips readonly items during keyboard navigation", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item readonly><span>Account info</span></sgds-dropdown-item>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
            <sgds-dropdown-item><span>Settings</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown") as any;
      const toggler = profile.shadowRoot?.querySelector("button[slot='toggler']") as HTMLElement;

      // Click to open menu first
      toggler.click();
      await dropdown.updateComplete;
      await aTimeout(0);
      toggler.focus();

      // Navigate to first active item (should skip readonly)
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;

      const items = profile.querySelectorAll("sgds-dropdown-item");
      // readonly item (index 0) should be skipped, first navigable item (index 1) gets focus
      expect(items[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "-1");
      expect(items[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);

    it("skips non-dropdown-item elements (dividers, divs) during keyboard navigation", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" label="User Name" ariaLabel="Profile menu">
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>My profile</span></sgds-dropdown-item>
            <sgds-divider thickness="thin"></sgds-divider>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown") as any;
      const toggler = profile.shadowRoot?.querySelector("button[slot='toggler']") as HTMLElement;

      // Click to open menu first
      toggler.click();
      await dropdown.updateComplete;
      await aTimeout(0);
      toggler.focus();

      // Navigate to first item
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;

      // Navigate to second item (should skip the divider)
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;

      const items = profile.querySelectorAll("sgds-dropdown-item");
      expect(items[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "-1");
      expect(items[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute("tabindex", "0");
    }).retries(1);

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

      const dropdown = profile.shadowRoot?.querySelector("sgds-dropdown") as any;
      const toggler = profile.shadowRoot?.querySelector("button[slot='toggler']") as HTMLElement;
      toggler.focus();

      // Open menu
      await sendKeys({ press: "ArrowDown" });
      await dropdown.updateComplete;
      expect(dropdown.menuIsOpen).to.be.true;

      // Close menu
      await sendKeys({ press: "Escape" });
      await dropdown.updateComplete;
      expect(dropdown.menuIsOpen).to.be.false;
    }).retries(1);
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
