import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Datepicker a11y", () => {
  it("sgds-datepicker should be accessible", async () => {
    const el = await fixture(html` <sgds-datepicker label="Select date"></sgds-datepicker> `);
    await expect(el).to.be.accessible();
  });
});
