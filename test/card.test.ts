import "./sgds-web-component";
import { html } from "lit";
import { fixture, assert, expect } from "@open-wc/testing";
import type { SgdsCard } from "../src/components";

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
          <div class="card-image" style="display: none;">
            <slot name="image"></slot>
          </div>
          <div class="card-icon" style="display: none;">
            <slot name="icon"></slot>
          </div>
          <div class="card-body">
            <div class="card-header">
              <slot name="subtitle"></slot>
              <h3 class="card-title"><slot name="title"></slot></h3>
            </div>
            <p class="card-text">
              <slot name="description"></slot>
            </p>
            <slot name="link"></slot>
          </div>
        </div>
      `
    );
  });
});
