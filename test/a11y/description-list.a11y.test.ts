import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("DescriptionList a11y", () => {
  it("sgds-description-list should be accessible", async () => {
    const el = await fixture(html`
      <sgds-description-list-group>
        <sgds-description-list>
          <span>Term 1</span>
          <span slot="data">Description 1</span>
        </sgds-description-list>
        <sgds-description-list>
          <span>Term 2</span>
          <span slot="data">Description 2</span>
        </sgds-description-list>
      </sgds-description-list-group>
    `);
    await expect(el).to.be.accessible();
  });
});
