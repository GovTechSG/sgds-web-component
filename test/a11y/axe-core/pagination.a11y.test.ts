import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Pagination a11y", () => {
  it("default variant with icon-button navigation should be accessible", async () => {
    const el = await fixture(html` <sgds-pagination dataLength="50" itemsPerPage="10"></sgds-pagination> `);
    await expect(el).to.be.accessible();
  });

  it("number variant should be accessible", async () => {
    const el = await fixture(html` <sgds-pagination variant="number" dataLength="50" itemsPerPage="10"></sgds-pagination> `);
    await expect(el).to.be.accessible();
  });

  it("button variant with icon-button navigation should be accessible", async () => {
    const el = await fixture(
      html` <sgds-pagination variant="button" dataLength="30" itemsPerPage="10" navigation="icon-button"></sgds-pagination> `
    );
    await expect(el).to.be.accessible();
  });

  it("button variant with text button navigation should be accessible", async () => {
    const el = await fixture(
      html` <sgds-pagination variant="button" dataLength="30" itemsPerPage="10" navigation="button"></sgds-pagination> `
    );
    await expect(el).to.be.accessible();
  });

  it("description variant with icon-button navigation should be accessible", async () => {
    const el = await fixture(
      html` <sgds-pagination variant="description" dataLength="50" itemsPerPage="10" navigation="icon-button"></sgds-pagination> `
    );
    await expect(el).to.be.accessible();
  });

  it("description variant with text button navigation should be accessible", async () => {
    const el = await fixture(
      html` <sgds-pagination variant="description" dataLength="50" itemsPerPage="10" navigation="button"></sgds-pagination> `
    );
    await expect(el).to.be.accessible();
  });

  it("small size should be accessible", async () => {
    const el = await fixture(html` <sgds-pagination size="sm" dataLength="40" itemsPerPage="10"></sgds-pagination> `);
    await expect(el).to.be.accessible();
  });
});
