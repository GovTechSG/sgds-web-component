import "../../sgds-web-component";
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

  it("sgds-radio-group required should be accessible", async () => {
    const el = await fixture(html`
      <sgds-radio-group label="Choose an option" name="option-required" required>
        <sgds-radio value="a">Option A</sgds-radio>
        <sgds-radio value="b">Option B</sgds-radio>
        <sgds-radio value="c">Option C</sgds-radio>
      </sgds-radio-group>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-radio-group with pre-selected value should be accessible", async () => {
    const el = await fixture(html`
      <sgds-radio-group label="Choose an option" name="option-preselected" value="b">
        <sgds-radio value="a">Option A</sgds-radio>
        <sgds-radio value="b">Option B</sgds-radio>
        <sgds-radio value="c">Option C</sgds-radio>
      </sgds-radio-group>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-radio-group with hintText should be accessible", async () => {
    const el = await fixture(html`
      <sgds-radio-group label="Choose an option" name="option-hint" hintText="Select one option only">
        <sgds-radio value="a">Option A</sgds-radio>
        <sgds-radio value="b">Option B</sgds-radio>
        <sgds-radio value="c">Option C</sgds-radio>
      </sgds-radio-group>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-radio-group invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-radio-group
        label="Choose an option"
        name="option-invalid"
        invalid
        hasFeedback
        invalidFeedback="Please select an option"
      >
        <sgds-radio value="a">Option A</sgds-radio>
        <sgds-radio value="b">Option B</sgds-radio>
        <sgds-radio value="c">Option C</sgds-radio>
      </sgds-radio-group>
    `);
    await expect(el).to.be.accessible();
  });
});
