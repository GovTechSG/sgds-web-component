import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Datepicker a11y", () => {
  it("sgds-datepicker should be accessible", async () => {
    const el = await fixture(html` <sgds-datepicker label="Select date"></sgds-datepicker> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-datepicker required should be accessible", async () => {
    const el = await fixture(html` <sgds-datepicker label="Date of birth" required></sgds-datepicker> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-datepicker readonly should be accessible", async () => {
    const el = await fixture(
      html` <sgds-datepicker label="Event date" readonly value="2024-01-15"></sgds-datepicker> `
    );
    await expect(el).to.be.accessible();
  });

  it("sgds-datepicker with hintText should be accessible", async () => {
    const el = await fixture(html`
      <sgds-datepicker label="Start date" hintText="Select your preferred start date"></sgds-datepicker>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-datepicker invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-datepicker
        label="Select date"
        invalid
        hasFeedback
        invalidFeedback="Please select a valid date"
      ></sgds-datepicker>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-datepicker range mode should be accessible", async () => {
    const el = await fixture(html` <sgds-datepicker label="Select date range" mode="range"></sgds-datepicker> `);
    await expect(el).to.be.accessible();
  });
});
