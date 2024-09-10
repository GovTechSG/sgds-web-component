import { expect, fixture, html } from "@open-wc/testing";
import { SgdsSwitch } from "../src/components/Switch/sgds-switch";
import "../src/components/Switch";

describe("<sgds-switch>", () => {
  it("when size prop is passed in , should update class of form-check-input", async () => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch size="md"></sgds-switch>`);
    expect(el.shadowRoot?.querySelector(".form-check-input")?.classList.value).to.contain("md");
  });
});
