import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Sidebar a11y", () => {
  it("sgds-sidebar should be accessible", async () => {
    const el = await fixture(html`
      <sgds-sidebar>
        <sgds-sidebar-item title="Dashboard">
          <sgds-icon slot="icon" name="house"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Settings">
          <sgds-icon slot="icon" name="gear"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar>
    `);
    await expect(el).to.be.accessible();
  });
});
