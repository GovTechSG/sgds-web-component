import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Switch a11y", () => {
  it("sgds-switch should be accessible", async () => {
    const el = await fixture(html` <sgds-switch>Enable notifications</sgds-switch> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-switch checked should be accessible", async () => {
    const el = await fixture(html` <sgds-switch checked>Enable notifications</sgds-switch> `);
    await expect(el).to.be.accessible();
  });
});
