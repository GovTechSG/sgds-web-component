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
            class="sgds card"
            part="base"
          >
            <slot name="card-image"></slot>
            <div class="card-body" part="body">
              <h3 class="card-title" part="title"><slot name="card-title"></slot></h3>
              <p class="card-text" part="text">
                <slot name="card-text"></slot>
              </p>
              <slot name="card-link"></slot>
            </div>
          </div>
            `
    );
  });
  it("when stretchedLink is true, adds a .stretched-link class to slot card link", async () => {
    const el = await fixture(html`<sgds-card stretchedLink><a slot="card-link" href="#">Link</a></sgds-card>`);

    expect(el.querySelector("a[slot=card-link]")?.className).to.contain("stretched-link");
  });
});
