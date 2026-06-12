import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Checkbox a11y", () => {
  it("sgds-checkbox should be accessible", async () => {
    const el = await fixture(html` <sgds-checkbox name="agree" value="yes">I agree to the terms</sgds-checkbox> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-checkbox required should be accessible", async () => {
    const el = await fixture(html`
      <sgds-checkbox name="agree" value="yes" required>I agree to the terms</sgds-checkbox>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-checkbox checked should be accessible", async () => {
    const el = await fixture(html`
      <sgds-checkbox name="agree" value="yes" checked>I agree to the terms</sgds-checkbox>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-checkbox indeterminate should be accessible", async () => {
    const el = await fixture(html`
      <sgds-checkbox name="select-all" value="all" indeterminate>Select all</sgds-checkbox>
    `);
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

  it("sgds-checkbox-group with hintText should be accessible", async () => {
    const el = await fixture(html`
      <sgds-checkbox-group label="Select options" hintText="Select at least one option">
        <sgds-checkbox name="options" value="a">Option A</sgds-checkbox>
        <sgds-checkbox name="options" value="b">Option B</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-checkbox-group invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-checkbox-group
        label="Select options"
        invalid
        hasFeedback
        invalidFeedback="Please select at least one option"
      >
        <sgds-checkbox name="options" value="a">Option A</sgds-checkbox>
        <sgds-checkbox name="options" value="b">Option B</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    await expect(el).to.be.accessible();
  });
});
