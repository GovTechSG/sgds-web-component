import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Sidenav a11y", () => {
  it("sgds-sidenav should be accessible", async () => {
    const el = await fixture(html`
      <sgds-sidenav>
        <sgds-sidenav-item>
          <a href="#">Link 1</a>
        </sgds-sidenav-item>
        <sgds-sidenav-item>
          <a href="#">Link 2</a>
        </sgds-sidenav-item>
      </sgds-sidenav>
    `);
    await expect(el).to.be.accessible();
  });
});
