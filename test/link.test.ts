import { html } from "lit";
import { expect, assert, fixture } from "@open-wc/testing";
import { SgdsLink } from "../src/components";
import "../src/index";

describe("<sgds-link>", () => {
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link href="#"></sgds-link>`);
    assert.shadowDom.equal(
      el,
      `
            <a
                class="nav-link"
                href="#"
                aria-disabled="false"
                target="_self"
                >
                <slot name="leftIcon"></slot>
                <slot></slot>
                <slot name="rightIcon"></slot>
            </a>
            `
    );
  });
  it("if disabled true, href=javascript:void(0)", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link disabled href="#"></sgds-link>`);
    const anchor = el.shadowRoot?.querySelector("a.nav-link");
    expect(anchor?.getAttribute("href")).to.equal("javascript:void(0)");
  });
});
//
