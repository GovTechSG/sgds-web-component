import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Subnav a11y", () => {
  it("sgds-subnav should be accessible", async () => {
    const el = await fixture(html`
      <sgds-subnav>
        <sgds-subnav-item href="#" active>Tab 1</sgds-subnav-item>
        <sgds-subnav-item href="#">Tab 2</sgds-subnav-item>
        <sgds-subnav-item href="#">Tab 3</sgds-subnav-item>
      </sgds-subnav>
    `);
    await expect(el).to.be.accessible();
  });
});
