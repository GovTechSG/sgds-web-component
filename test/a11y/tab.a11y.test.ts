import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Tab a11y", () => {
  it("sgds-tab-group should be accessible", async () => {
    const el = await fixture(html`
      <sgds-tab-group>
        <sgds-tab slot="nav">Tab 1</sgds-tab>
        <sgds-tab slot="nav">Tab 2</sgds-tab>
        <sgds-tab slot="nav">Tab 3</sgds-tab>
        <sgds-tab-panel>Panel 1 content</sgds-tab-panel>
        <sgds-tab-panel>Panel 2 content</sgds-tab-panel>
        <sgds-tab-panel>Panel 3 content</sgds-tab-panel>
      </sgds-tab-group>
    `);
    await expect(el).to.be.accessible();
  });
});
