import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Drawer a11y", () => {
  it("sgds-drawer should be accessible", async () => {
    const el = await fixture(html`
      <sgds-drawer open ariaLabel="Drawer title">
        <p>Drawer content here</p>
      </sgds-drawer>
    `);
    await expect(el).to.be.accessible();
  });
});
