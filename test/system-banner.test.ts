import { html } from "lit";
import { assert, expect, fixture } from "@open-wc/testing";
import { SgdsSystemBanner } from "../src/components";
import "../src/index";

describe("<sgds-system-banner>", () => {
  it("matches the shadowDOM", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show></sgds-system-banner>`);
    assert.shadowDom.equal(
      el,
      `
                <div class="banner" role="alert" aria-hidden="false">
                <div class="content">
                    <slot id="loop-slot"></slot>
                </div>
                </div>
            `
    );
  });
  it("when dimissible is true, close button is rendered", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show dismissible></sgds-system-banner>`);
    const closeButton = el.shadowRoot?.querySelector("sgds-close-button[variant='light']");
    expect(closeButton).to.exist;
  });
  it("when variant is set to warning, close button variant is dark", async () => {
    const el = await fixture<SgdsSystemBanner>(
      html`<sgds-system-banner show dismissible variant="warning"></sgds-system-banner>`
    );
    const closeButton = el.shadowRoot?.querySelector("sgds-close-button[variant='dark']");
    expect(closeButton).to.exist;
  });
  it("when more than one child, pagination is rendered, matches shadowDOM", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item></sgds-system-banner-item>
      <sgds-system-banner-item></sgds-system-banner-item>
    </sgds-system-banner>`);
    assert.shadowDom.equal(
      el,
      `
                <div class="banner" role="alert" aria-hidden="false">
                <div class="content">
                    <slot id="loop-slot"></slot>
                </div>
                <div class="pagination">
              <sgds-icon-button
                name="chevron-left"
                tone="fixed-light"
                variant="ghost"
                size="xs"
                target="_self"
              ></sgds-icon-button>
              <span>1/2</span>
              <sgds-icon-button
                name="chevron-right"
                tone="fixed-light"
                variant="ghost"
                size="xs"
                target="_self"
              ></sgds-icon-button>
            </div>
                </div>
            `
    );
  });
  it("system banner item rotates automatically every 5 seconds", async () => {
    const el = await fixture<SgdsSystemBanner>(html`<sgds-system-banner show>
      <sgds-system-banner-item>one</sgds-system-banner-item>
      <sgds-system-banner-item>two</sgds-system-banner-item>
      <sgds-system-banner-item>three</sgds-system-banner-item>
    </sgds-system-banner>`);
  });
});
