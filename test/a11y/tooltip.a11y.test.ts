import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Tooltip a11y", () => {
  it("sgds-tooltip should be accessible", async () => {
    const el = await fixture(html`
      <sgds-tooltip content="Helpful tooltip text">
        <sgds-button>Hover me</sgds-button>
      </sgds-tooltip>
    `);
    await expect(el).to.be.accessible();
  });
});
