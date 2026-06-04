import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("FileUpload a11y", () => {
  it("default variant should be accessible", async () => {
    const el = await fixture(html` <sgds-file-upload label="Upload file"></sgds-file-upload> `);
    await expect(el).to.be.accessible();
  });

  it("drag-and-drop variant should be accessible", async () => {
    const el = await fixture(
      html` <sgds-file-upload label="Upload document" variant="drag-and-drop"></sgds-file-upload> `
    );
    await expect(el).to.be.accessible();
  });

  it("multiple files should be accessible", async () => {
    const el = await fixture(html` <sgds-file-upload label="Upload files" multiple></sgds-file-upload> `);
    await expect(el).to.be.accessible();
  });

  it("required should be accessible", async () => {
    const el = await fixture(html` <sgds-file-upload label="Required upload" required></sgds-file-upload> `);
    await expect(el).to.be.accessible();
  });

  it("custom ariaLabel should be accessible", async () => {
    const el = await fixture(
      html` <sgds-file-upload label="Upload photo" ariaLabel="Upload photo"></sgds-file-upload> `
    );
    await expect(el).to.be.accessible();
  });

  it("with accept filter should be accessible", async () => {
    const el = await fixture(html` <sgds-file-upload label="Upload PDF" accept=".pdf"></sgds-file-upload> `);
    await expect(el).to.be.accessible();
  });
});
