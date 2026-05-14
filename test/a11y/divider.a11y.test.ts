import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Divider a11y", () => {
  it("sgds-divider should be accessible", async () => {
    const el = await fixture(html` <sgds-divider></sgds-divider> `);
    await expect(el).to.be.accessible();
  });
});
