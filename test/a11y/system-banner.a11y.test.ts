import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("SystemBanner a11y", () => {
  it("sgds-system-banner should be accessible", async () => {
    const el = await fixture(html`
      <sgds-system-banner show>
        <sgds-system-banner-item> Important system announcement. </sgds-system-banner-item>
      </sgds-system-banner>
    `);
    await expect(el).to.be.accessible();
  });
});
