import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("OverflowMenu a11y", () => {
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
