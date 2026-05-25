import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Radio a11y", () => {
  it("sgds-radio-group should be accessible", async () => {
    const el = await fixture(html`
      <sgds-radio-group label="Choose an option" name="option">
        <sgds-radio value="a">Option A</sgds-radio>
        <sgds-radio value="b">Option B</sgds-radio>
        <sgds-radio value="c">Option C</sgds-radio>
      </sgds-radio-group>
    `);
    await expect(el).to.be.accessible();
  });
});
