import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Modal a11y", () => {
  it("sgds-modal should be accessible", async () => {
    const el = await fixture(html`
      <sgds-modal open>
        <span slot="title">Modal title</span>
        <p slot="description">Are you sure you want to proceed?</p>
        <sgds-button slot="footer">Confirm</sgds-button>
      </sgds-modal>
    `);
    await expect(el).to.be.accessible();
  });
});
