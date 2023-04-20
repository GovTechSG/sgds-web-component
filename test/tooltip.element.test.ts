import { assert, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import "../src/Tooltip";
import { SgdsTooltip } from "../src/Tooltip";

describe("sgds-tooltip", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-tooltip");
    assert.instanceOf(el, SgdsTooltip);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-tooltip></sgds-tooltip>`);
    assert.shadowDom.equal(
      el,
      `  <div>
        <slot>
        </slot>
       </div>
    `
    );
  });

  it("by default trigger (hover/foccus) content prop forwards to Bs tooltip title", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    expect(el.tooltipConfig.title).to.equal("hello");
  });

  it("when trigger=click, content is wrapped in a closable container", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip trigger="click" content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    expect(el.tooltipConfig.title).not.to.equal("hello");
    expect(el.tooltipConfig.title).to.equal(el.closableContainer);
    expect(el.closableContainer.innerHTML).to.equal(
      'hello<button class="btn-close btn-close-white" aria-label="Close"></button>'
    );
  });
  it("placement props updates tooltipConfig", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello" placement="bottom"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    expect(el.tooltipConfig.placement).to.equal("bottom");
  });
});
