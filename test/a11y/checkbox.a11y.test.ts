import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Checkbox a11y", () => {
  it("sgds-checkbox should be accessible", async () => {
    const el = await fixture(html` <sgds-checkbox name="agree" value="yes">I agree to the terms</sgds-checkbox> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-checkbox disabled should be accessible", async () => {
    const el = await fixture(html` <sgds-checkbox name="agree" value="yes" disabled>Disabled option</sgds-checkbox> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-checkbox-group should be accessible", async () => {
    const el = await fixture(html`
      <sgds-checkbox-group label="Select options">
        <sgds-checkbox name="options" value="a">Option A</sgds-checkbox>
        <sgds-checkbox name="options" value="b">Option B</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    await expect(el).to.be.accessible();
  });
});
