import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Dropdown a11y", () => {
  it("sgds-dropdown should be accessible", async () => {
    const el = await fixture(html`
      <sgds-dropdown>
        <sgds-button slot="toggler">Actions</sgds-button>
        <sgds-dropdown-item>Option 1</sgds-dropdown-item>
        <sgds-dropdown-item>Option 2</sgds-dropdown-item>
        <sgds-dropdown-item>Option 3</sgds-dropdown-item>
      </sgds-dropdown>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-dropdown should set aria-haspopup and aria-expanded on toggler", async () => {
    const el = await fixture(html`
      <sgds-dropdown>
        <sgds-button slot="toggler">Actions</sgds-button>
        <sgds-dropdown-item>Option 1</sgds-dropdown-item>
      </sgds-dropdown>
    `);
    const toggler = el.querySelector("[slot='toggler']");
    expect(toggler).to.have.attribute("aria-haspopup", "menu");
    expect(toggler).to.have.attribute("aria-expanded", "false");
  });

  it("sgds-dropdown should update aria-expanded when menu opens", async () => {
    const el = await fixture(html`
      <sgds-dropdown menuIsOpen>
        <sgds-button slot="toggler">Actions</sgds-button>
        <sgds-dropdown-item>Option 1</sgds-dropdown-item>
      </sgds-dropdown>
    `);
    const toggler = el.querySelector("[slot='toggler']");
    expect(toggler).to.have.attribute("aria-expanded", "true");
  });

  it("sgds-overflow-menu should be accessible", async () => {
    const el = await fixture(html`
      <sgds-overflow-menu>
        <sgds-dropdown-item>View</sgds-dropdown-item>
        <sgds-dropdown-item>Edit</sgds-dropdown-item>
        <sgds-dropdown-item>Delete</sgds-dropdown-item>
      </sgds-overflow-menu>
    `);
    await expect(el).to.be.accessible();
  });
});
