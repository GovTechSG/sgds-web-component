import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Skeleton a11y", () => {
  it("sgds-skeleton should be accessible", async () => {
    const el = await fixture(html` <sgds-skeleton></sgds-skeleton> `);
    await expect(el).to.be.accessible();
  });
});
