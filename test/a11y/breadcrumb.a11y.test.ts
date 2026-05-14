import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Breadcrumb a11y", () => {
  it("sgds-breadcrumb should be accessible", async () => {
    const el = await fixture(html`
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Contacts</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    `);
    await expect(el).to.be.accessible();
  });
});
