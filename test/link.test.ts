import { assert, expect, fixture } from "@open-wc/testing";
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
  it("slotted anchor has tabindex=0 by default", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link><a href="#"></a></sgds-link>`);
    expect(el.querySelector("a")).to.have.attribute("tabindex", "0");
  });
  it("when link is disabled, it adds disabled attribute to the slotted anchor elmement", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link disabled><a href="#"></a></sgds-link>`);
    expect(el.querySelector("a")).to.have.attribute("disabled");
    expect(el.querySelector("a")).to.have.attribute("href", "javascript:void(0)");
    expect(el.querySelector("a")).to.have.attribute("tabindex", "-1");
  });
});
