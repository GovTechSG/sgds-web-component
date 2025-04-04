import { assert, fixture } from "@open-wc/testing";
import { html } from "lit";
import { SgdsLink } from "../src/components";
import "../src/index";

describe("<sgds-link>", () => {
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link></sgds-link>`);
    assert.shadowDom.equal(
      el,
      `
      <slot class="nav-link"></slot>
      `
    );
  });
});
