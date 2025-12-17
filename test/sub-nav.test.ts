import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { SgdsSubnav } from "../src/components";
import "../src/index";

describe("<sgds-subnav>", () => {
  it("renders sgds-subnav with a default slot item", async () => {
    const el = await fixture<SgdsSubnav>(html`
      <sgds-subnav>
        <sgds-subnav-item>
          <a href="#">Home</a>
        </sgds-subnav-item>
      </sgds-subnav>
    `);

    const item = el.querySelector("sgds-subnav-item");
    expect(item).to.exist;
    const anchor = item?.querySelector("a");
    expect(anchor).to.exist;
    expect(anchor?.textContent?.trim()).to.equal("Home");
  });

  it("automatically wraps text node in an anchor tag", async () => {
    const el = await fixture<SgdsSubnav>(html`
      <sgds-subnav>
        <sgds-subnav-item>Dashboard</sgds-subnav-item>
      </sgds-subnav>
    `);

    const item = el.querySelector("sgds-subnav-item");
    const anchor = item?.querySelector("a");
    expect(anchor).to.exist;
    expect(anchor?.textContent?.trim()).to.equal("Dashboard");
  });

  it("sets aria-current when active is true", async () => {
    const el = await fixture<SgdsSubnav>(html`
      <sgds-subnav>
        <sgds-subnav-item active>
          <a href="#">Current Page</a>
        </sgds-subnav-item>
      </sgds-subnav>
    `);

    const anchor = el.querySelector("a");
    expect(anchor?.getAttribute("aria-current")).to.equal("true");
  });

  it("disables link and removes tab index when disabled", async () => {
    const el = await fixture<SgdsSubnav>(html`
      <sgds-subnav>
        <sgds-subnav-item disabled>
          <a href="#">Disabled Page</a>
        </sgds-subnav-item>
      </sgds-subnav>
    `);

    const anchor = el.querySelector("a");
    expect(anchor?.getAttribute("href")).to.equal("javascript:void(0)");
    expect(anchor?.getAttribute("tabindex")).to.equal("-1");
  });

  it("renders header and actions slots correctly", async () => {
    const el = await fixture<SgdsSubnav>(html`
      <sgds-subnav>
        <div slot="header">Subnav Header</div>
        <sgds-subnav-item>Home</sgds-subnav-item>
        <div slot="actions">
          <sgds-button>Action</sgds-button>
        </div>
      </sgds-subnav>
    `);

    const headerSlot = el.querySelector('[slot="header"]');
    const actionsSlot = el.querySelector('[slot="actions"]');
    const button = actionsSlot?.querySelector("sgds-button");

    expect(headerSlot).to.exist;
    expect(headerSlot?.textContent?.trim()).to.equal("Subnav Header");

    expect(button).to.exist;
    expect(button?.textContent?.trim()).to.equal("Action");
  });

  it("handles absence of actions slot correctly", async () => {
    const el = await fixture<SgdsSubnav>(html`
      <sgds-subnav>
        <div slot="header">Subnav Header</div>
        <sgds-subnav-item>Home</sgds-subnav-item>
      </sgds-subnav>
    `);

    const actionsContainer = el.shadowRoot?.querySelector(".subnav-actions");
    expect(actionsContainer).to.exist;

    expect(actionsContainer?.classList.contains("no-actions")).to.be.true;

    const slottedActions = el.querySelector('[slot="actions"]');
    expect(slottedActions).to.not.exist;

    expect(el.hasActionsSlot).to.be.false;
  });
});
