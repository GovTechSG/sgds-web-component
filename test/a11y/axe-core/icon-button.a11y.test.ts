import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("IconButton a11y", () => {
  it("sgds-icon-button should be accessible", async () => {
    const el = await fixture(html` <sgds-icon-button name="plus" ariaLabel="Add item"></sgds-icon-button> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-icon-button disabled should be accessible", async () => {
    const el = await fixture(html` <sgds-icon-button name="search" ariaLabel="Search" disabled></sgds-icon-button> `);
    await expect(el).to.be.accessible();
  });
});
