import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Stepper a11y", () => {
  it("sgds-stepper should be accessible", async () => {
    const el = await fixture(html`
      <sgds-stepper
        .steps=${[
          { stepHeader: "Personal Details", component: "Step 1 content" },
          { stepHeader: "Address", component: "Step 2 content" },
          { stepHeader: "Review", component: "Step 3 content" }
        ]}
      ></sgds-stepper>
    `);
    await expect(el).to.be.accessible();
  });
});
