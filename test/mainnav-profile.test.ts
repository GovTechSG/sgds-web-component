import { aTimeout, elementUpdated, expect, fixture, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";
import { SgdsDropdownItem, SgdsMainnav, SgdsMainnavProfile } from "../src/components";
import "./sgds-web-component";

describe("sgds-mainnav-profile", () => {
  afterEach(() => fixtureCleanup());

  it("is defined", () => {
    const el = document.createElement("sgds-mainnav-profile");
    expect(el).to.be.instanceOf(SgdsMainnavProfile);
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
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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

    it("renders toggler slot content in desktop dropdown", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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
      const togglerSlot = navLink?.querySelector('slot[name="toggler"]') as HTMLSlotElement;
      expect(togglerSlot).to.exist;
    });

    it("renders chevron-down icon in desktop mode", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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

    it("mainnav hides the default toggler icon-button in mobile when profile component is present", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      const toggler = el.shadowRoot?.querySelector("sgds-icon-button.navbar-toggler");
      expect(toggler).not.to.exist;
    });

    it("renders profile-avatar slot in mainnav navbar-end in mobile", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;

      const avatarSlot = el.shadowRoot?.querySelector('slot[name="profile-avatar"]');
      expect(avatarSlot).to.exist;
    });

    it("moves avatar element to mainnav light DOM with slot=profile-avatar in mobile", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
            <span slot="avatar" class="avatar-test"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      // Wait for rAF in the profile component
      await aTimeout(50);

      const avatarInMainnav = el.querySelector('[slot="profile-avatar"]');
      expect(avatarInMainnav).to.exist;
      expect(avatarInMainnav).to.have.class("avatar-test");
      expect(avatarInMainnav).to.have.attribute("role", "button");
      expect(avatarInMainnav).to.have.attribute("tabindex", "0");
    });

    it("clicking avatar opens the mobile menu", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      await aTimeout(50);

      const avatar = el.querySelector('[slot="profile-avatar"]') as HTMLElement;
      expect(avatar).to.exist;

      const menuBody = el.shadowRoot?.querySelector(".navbar-body");
      expect(menuBody).to.have.attribute("hidden");

      avatar.click();
      await aTimeout(300);

      expect(menuBody).not.to.have.attribute("hidden");
    });

    it("clicking avatar again closes the mobile menu", async () => {
      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
            <span slot="avatar" class="avatar"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      await aTimeout(50);

      const avatar = el.querySelector('[slot="profile-avatar"]') as HTMLElement;

      // Open
      avatar.click();
      await aTimeout(300);
      const menuBody = el.shadowRoot?.querySelector(".navbar-body");
      expect(menuBody).not.to.have.attribute("hidden");

      // Close
      avatar.click();
      await aTimeout(300);
      expect(menuBody).to.have.attribute("hidden");
    });
  });

  describe("responsive transitions", () => {
    it("moves avatar back when resizing to desktop", async () => {
      // Start in mobile
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300
      });
      window.dispatchEvent(new Event("resize"));

      const el = await fixture<SgdsMainnav>(html`
        <sgds-mainnav expand="lg">
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
            <span slot="avatar" class="avatar-test"></span>
            <sgds-dropdown-item><span>Log out</span></sgds-dropdown-item>
          </sgds-mainnav-profile>
        </sgds-mainnav>
      `);
      await el.updateComplete;
      await aTimeout(50);

      // Avatar should be in mainnav light DOM
      expect(el.querySelector('[slot="profile-avatar"]')).to.exist;

      // Resize to desktop
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1030
      });
      window.dispatchEvent(new Event("resize"));
      await el.updateComplete;
      const profile = el.querySelector("sgds-mainnav-profile") as SgdsMainnavProfile;
      await profile.updateComplete;

      // Avatar should be back in profile component
      expect(el.querySelector('[slot="profile-avatar"]')).not.to.exist;
      expect(profile.querySelector('[slot="avatar"]')).to.exist;
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
          <sgds-mainnav-profile slot="profile" ariaLabel="Profile menu">
            <div slot="toggler">User Name</div>
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

  describe("dropdown-item readonly prop", () => {
    it("readonly attribute reflects on sgds-dropdown-item", async () => {
      const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item readonly><span>Info</span></sgds-dropdown-item>`);
      await el.updateComplete;
      expect(el).to.have.attribute("readonly");
    });

    it("readonly dropdown-item has readonly class on .dropdown-item", async () => {
      const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item readonly><span>Info</span></sgds-dropdown-item>`);
      await el.updateComplete;
      const inner = el.shadowRoot?.querySelector(".dropdown-item");
      expect(inner).to.have.class("readonly");
    });

    it("readonly dropdown-item has tabindex -1", async () => {
      const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item readonly><span>Info</span></sgds-dropdown-item>`);
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
