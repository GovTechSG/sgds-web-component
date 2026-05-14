import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("QuantityToggle a11y", () => {
  it("sgds-quantity-toggle should be accessible", async () => {
    const el = await fixture(html` <sgds-quantity-toggle label="Quantity"></sgds-quantity-toggle> `);
    await expect(el).to.be.accessible();
  });
});
