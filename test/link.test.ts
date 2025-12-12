import { assert, aTimeout, elementUpdated, expect, fixture, nextFrame, oneEvent, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import { SgdsIcon, SgdsLink } from "../src/components";
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
  const linkToIconSizeMap = {
    xs: "sm",
    sm: "md",
    md: "lg",
    lg: "xl"
  };
  Object.entries(linkToIconSizeMap).map(([key, value]) => {
    it(`when link size=${key}, a size attribute of ${value} added to slotted sgds-icon`, async () => {
      const el = await fixture<SgdsLink>(
        html`<sgds-link size=${key}
          ><a href="#"><sgds-icon name="placeholder"></sgds-icon></a
        ></sgds-link>`
      );
      await el.updateComplete;
      const icon = el.querySelector<SgdsIcon>("sgds-icon");
      await icon?.updateComplete;
      expect(icon?.getAttribute("size")).to.equal(value);
    });
  });
});
