import { assert, fixture } from "@open-wc/testing";
import { html } from "lit";
import "../src/internals/OverflowMenu";

describe("<sgds-overflow-menu>", () => {
  it("semantically matches the DOM", async () => {
    const el = await fixture(html`<sgds-overflow-menu></sgds-overflow-menu>`);
    assert.shadowDom.equal(
      el,
      `
      <sgds-dropdown drop="down">
        <button slot="toggler" class="overflow-btn">
            <sgds-icon name="three-dots" size="md"></sgds-icon>
        </button>
        <slot></slot>
      </sgds-dropdown>
      `
    );
  });
});
