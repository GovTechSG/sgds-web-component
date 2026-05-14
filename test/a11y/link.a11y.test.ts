import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Link a11y", () => {
  it("sgds-link should be accessible", async () => {
    const el = await fixture(html` <sgds-link><a href="#">Visit our website</a></sgds-link> `);
    await expect(el).to.be.accessible();
  });
});
