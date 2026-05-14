import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Pagination a11y", () => {
  it("sgds-pagination should be accessible", async () => {
    const el = await fixture(html` <sgds-pagination dataLength="50" itemsPerPage="10"></sgds-pagination> `);
    await expect(el).to.be.accessible();
  });
});
