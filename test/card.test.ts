import { assert, fixture } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsCard } from "../src/components";
import "./sgds-web-component";

describe("<sgds-card>", () => {
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card></sgds-card>`);
    assert.shadowDom.equal(
      el,
      `
        <div
          class="card"
          tabindex="-1"
        >
          <div class="card-tinted-bg"></div>
          <slot name="menu"></slot>
          <div class="card-image" style="display: none;">
            <slot name="image"></slot>
          </div>
          <div class="card-media" style="display: none;">
            <slot name="icon"></slot>
          </div>
          <div class="card-body">
            <div class="card-header-container">
              <div class="card-header">
                <slot name="subtitle"></slot>
                <h3 class="card-title"><slot name="title"></slot></h3>
              </div>
              <slot></slot>
            </div>
            <p class="card-text">
              <slot name="description"></slot>
            </p>
            <slot name="lower"></slot>
            <slot name="link"></slot>
          </div>
        </div>
      `
    );
  });
});
