import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Alert a11y", () => {
  it("sgds-alert should be accessible", async () => {
    const el = await fixture(html` <sgds-alert show> This is an alert message. </sgds-alert> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-alert with icon should be accessible", async () => {
    const el = await fixture(html`
      <sgds-alert show variant="warning">
        <sgds-icon slot="icon" name="exclamation-triangle"></sgds-icon>
        Warning alert with icon.
      </sgds-alert>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-alert with anchor link should be accessible", async () => {
    const el = await fixture(html`
      <sgds-alert show> This is an alert with a <a href="https://example.com">link</a> and more text. </sgds-alert>
    `);
    await expect(el).to.be.accessible();
  });
});
