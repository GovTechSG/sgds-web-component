import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("TableOfContents a11y", () => {
  it("sgds-table-of-contents should be accessible", async () => {
    const el = await fixture(html`
      <sgds-table-of-contents>
        <sgds-table-of-contents-item href="#section1">Section 1</sgds-table-of-contents-item>
        <sgds-table-of-contents-item href="#section2">Section 2</sgds-table-of-contents-item>
      </sgds-table-of-contents>
    `);
    await expect(el).to.be.accessible();
  });
});
