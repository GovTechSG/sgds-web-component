import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Spinner a11y", () => {
  it("sgds-spinner should be accessible", async () => {
    const el = await fixture(html` <sgds-spinner aria-label="Loading"></sgds-spinner> `);
    await expect(el).to.be.accessible();
  });
});
