import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("QuantityToggle a11y", () => {
  it("sgds-quantity-toggle should be accessible", async () => {
    const el = await fixture(html` <sgds-quantity-toggle label="Quantity"></sgds-quantity-toggle> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-quantity-toggle required should be accessible", async () => {
    const el = await fixture(html` <sgds-quantity-toggle label="Quantity" required></sgds-quantity-toggle> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-quantity-toggle readonly should be accessible", async () => {
    const el = await fixture(html` <sgds-quantity-toggle label="Quantity" readonly value="5"></sgds-quantity-toggle> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-quantity-toggle with hintText should be accessible", async () => {
    const el = await fixture(html`
      <sgds-quantity-toggle label="Quantity" hintText="Enter a value between 1 and 10"></sgds-quantity-toggle>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-quantity-toggle invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-quantity-toggle
        label="Quantity"
        invalid
        hasFeedback="both"
        invalidFeedback="Quantity must be at least 1"
      ></sgds-quantity-toggle>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-quantity-toggle with min max step should be accessible", async () => {
    const el = await fixture(html`
      <sgds-quantity-toggle label="Quantity" min="1" max="10" step="1"></sgds-quantity-toggle>
    `);
    await expect(el).to.be.accessible();
  });
});
