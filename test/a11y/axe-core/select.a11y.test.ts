import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Select a11y", () => {
  it("sgds-select with slot children should be accessible", async () => {
    const el = await fixture(html`
      <sgds-select label="Choose a country">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-select required should be accessible", async () => {
    const el = await fixture(html`
      <sgds-select label="Choose a country" required>
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-select readonly should be accessible", async () => {
    const el = await fixture(html`
      <sgds-select label="Choose a country" readonly value="sg">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-select with hintText should be accessible", async () => {
    const el = await fixture(html`
      <sgds-select label="Choose a country" hintText="Select your country of residence">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-select invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-select label="Choose a country" invalid hasFeedback invalidFeedback="Please select a country">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>
    `);
    await expect(el).to.be.accessible();
  });
});
