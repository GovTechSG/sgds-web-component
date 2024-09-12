import { expect, assert, fixture, html } from "@open-wc/testing";
import { SgdsSwitch } from "../src/components/Switch/sgds-switch";
import "../src/components/Switch";

describe("<sgds-switch>", () => {
  it("semantically matches the shadowDOM", async() => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch></sgds-switch>`);
    assert.shadowDom.equal(
      el,
      `
            <div
        class="form-check"
      >
        <label class="d-none form-check-label left-label"
          ><slot name="leftLabel"></slot
        ></label>
        <input
          class="form-check-input"
          type="checkbox"
          aria-disabled="false"
          aria-checked="false"
        />
        <label class="form-check-label"
          ><slot></slot
        ></label>
      </div>
            `,
            { ignoreAttributes: ["id", "for"] }
    );
  })
  it("semantically matches the shadowDOM when leftLabel slot is present", async() => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch><span slot="leftLabel">Hello</span></sgds-switch>`);
   const leftLabel = el.shadowRoot?.querySelector("label.left-label")
   expect(leftLabel?.classList.value).to.not.contain("d-none")
  })
});
