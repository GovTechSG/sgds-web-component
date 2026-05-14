import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Masthead a11y", () => {
  it("sgds-masthead should be accessible", async () => {
    const el = await fixture(html` <sgds-masthead></sgds-masthead> `);
    await expect(el).to.be.accessible();
  });
});
