import "./sgds-web-component";
import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";

import type { SgdsComboBox } from "../src/components";

describe("sgds-combo-box ", () => {
  it("should display checkboxes for each item in multi-select mode", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          multiSelect
          .menuList=${[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ]}
        ></sgds-combo-box>
      `
    );

    // Open dropdown
    const comboBoxInput = el.shadowRoot?.querySelector("sgds-input") as HTMLElement;
    expect(comboBoxInput, "sgds-input not found").to.exist;
    comboBoxInput.click();
    await el.updateComplete;

    // Expect 2 <sgds-combo-box-item>
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-item") || [];
    expect(items.length).to.equal(2);

    items.forEach(item => {
      // The item’s shadow root should contain <sgds-checkbox>
      const checkboxEl = item.shadowRoot?.querySelector("sgds-checkbox") as HTMLElement;
      expect(checkboxEl, "sgds-checkbox found").to.exist;
    });
  });
});
