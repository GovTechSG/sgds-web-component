import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Mainnav a11y", () => {
  it("sgds-mainnav should be accessible", async () => {
    const el = await fixture(html`
      <sgds-mainnav>
        <img slot="brand" alt="Site logo" src="https://placehold.co/120x40" />
        <sgds-mainnav-item href="#">Home</sgds-mainnav-item>
        <sgds-mainnav-item href="#">About</sgds-mainnav-item>
      </sgds-mainnav>
    `);
    await expect(el).to.be.accessible();
  });
});
