import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Badge a11y", () => {
  it("sgds-badge should be accessible", async () => {
    const el = await fixture(html` <sgds-badge variant="primary">New</sgds-badge> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-badge outlined should be accessible", async () => {
    const el = await fixture(html` <sgds-badge variant="neutral" outlined>Tag</sgds-badge> `);
    await expect(el).to.be.accessible();
  });
});
