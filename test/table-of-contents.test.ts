import { html } from "lit";
import { assert, expect, fixture } from "@open-wc/testing";

import "../src/index";

describe("<sgds-table-of-contents>", () => {
  it("matches semantic shadowDOM", async () => {
    const el = await fixture(html`<sgds-table-of-contents></sgds-table-of-contents>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="container">
          <slot></slot>
          <ul class="contents">
            <slot name="contents">
            </slot>
          </ul>
        </div>
      `
    );
  });

  it("renders default slot content", async () => {
    const el = await fixture(html`
      <sgds-table-of-contents>
        <h4>Header</h4>
      </sgds-table-of-contents>
    `);

    const slot = el.shadowRoot?.querySelector("slot:not([name])");
    expect(slot).to.exist;
    expect(el.textContent).to.include("Header");
  });

  it("renders named slot 'contents' properly", async () => {
    const el = await fixture(html`
      <sgds-table-of-contents>
        <h4>Header</h4>
        <li slot="contents">Section 1</li>
        <li slot="contents">Section 2</li>
      </sgds-table-of-contents>
    `);

    const slot = el.shadowRoot?.querySelector('slot[name="contents"]');
    expect(slot).to.exist;
    expect(el.textContent).to.include("Section 1");
    expect(el.textContent).to.include("Section 2");
  });
});
