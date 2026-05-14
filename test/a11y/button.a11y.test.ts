import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Button a11y", () => {
  it("sgds-button should be accessible", async () => {
    const el = await fixture(html` <sgds-button>Click me</sgds-button> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-button as link should be accessible", async () => {
    const el = await fixture(html` <sgds-button href="https://example.com">Visit site</sgds-button> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-button disabled should be accessible", async () => {
    const el = await fixture(html` <sgds-button disabled>Disabled</sgds-button> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-icon-button should be accessible", async () => {
    const el = await fixture(html` <sgds-icon-button name="plus" ariaLabel="Add item"></sgds-icon-button> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-close-button should be accessible", async () => {
    const el = await fixture(html` <sgds-close-button></sgds-close-button> `);
    await expect(el).to.be.accessible();
  });
});
