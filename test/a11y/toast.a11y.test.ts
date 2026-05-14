import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Toast a11y", () => {
  it("sgds-toast should be accessible", async () => {
    const el = await fixture(html` <sgds-toast show> This is a toast notification. </sgds-toast> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-toast dismissible should be accessible", async () => {
    const el = await fixture(html` <sgds-toast show dismissible> Dismissible toast message. </sgds-toast> `);
    await expect(el).to.be.accessible();
  });
});
