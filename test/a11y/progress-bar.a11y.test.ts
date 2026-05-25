import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("ProgressBar a11y", () => {
  it("sgds-progress-bar should be accessible", async () => {
    const el = await fixture(html` <sgds-progress-bar value="50" ariaLabel="Loading progress"></sgds-progress-bar> `);
    await expect(el).to.be.accessible();
  });
});
