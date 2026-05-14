import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Card a11y", () => {
  it("sgds-card should be accessible", async () => {
    const el = await fixture(html`
      <sgds-card>
        <span slot="title">Card title</span>
        <p slot="description">Card description</p>
      </sgds-card>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-icon-card should be accessible", async () => {
    const el = await fixture(html`
      <sgds-icon-card>
        <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
        <span slot="title">Icon card title</span>
        <p slot="description">Icon card description</p>
      </sgds-icon-card>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-image-card should be accessible", async () => {
    const el = await fixture(html`
      <sgds-image-card>
        <img slot="image" alt="Sample image" src="https://placehold.co/467x300" />
        <span slot="title">Image card title</span>
        <p slot="description">Image card description</p>
      </sgds-image-card>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-thumbnail-card should be accessible", async () => {
    const el = await fixture(html`
      <sgds-thumbnail-card>
        <img slot="thumbnail" alt="Thumbnail" width="64" height="64" src="https://placehold.co/64x64" />
        <span slot="title">Thumbnail card title</span>
        <p slot="description">Thumbnail card description</p>
      </sgds-thumbnail-card>
    `);
    await expect(el).to.be.accessible();
  });
});
