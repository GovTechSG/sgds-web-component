import { html } from "lit";
import { fixture, expect, elementUpdated } from "@open-wc/testing";
import "../src/index";
import { SgdsDescriptionList } from "../src/components";

describe("<sgds-description-list>", () => {
  it("should render label content when label is provided", async () => {
    const el = await fixture<SgdsDescriptionList>(html` <sgds-description-list> Label Text </sgds-description-list> `);
    await elementUpdated(el);
    const labelElement = el.shadowRoot?.querySelector(".label");
    expect(labelElement).to.exist;
  });

  it("should render value content when data is provided", async () => {
    const el = await fixture<SgdsDescriptionList>(html`
      <sgds-description-list>
        <span slot="data">Value Text</span>
      </sgds-description-list>
    `);
    await elementUpdated(el);
    const valueElement = el.shadowRoot?.querySelector(".value");
    expect(valueElement).to.exist;
  });

  it("should always have label and value containers present", async () => {
    const el = await fixture<SgdsDescriptionList>(html`<sgds-description-list></sgds-description-list>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".description-list__label-container")).to.exist;
    expect(el.shadowRoot?.querySelector(".description-list__value-container")).to.exist;
  });
});
