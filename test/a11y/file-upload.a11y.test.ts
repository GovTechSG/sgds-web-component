import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("FileUpload a11y", () => {
  it("sgds-file-upload should be accessible", async () => {
    const el = await fixture(html` <sgds-file-upload label="Upload file"></sgds-file-upload> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-file-upload disabled should be accessible", async () => {
    const el = await fixture(html` <sgds-file-upload label="Upload file" disabled></sgds-file-upload> `);
    await expect(el).to.be.accessible();
  });
});
