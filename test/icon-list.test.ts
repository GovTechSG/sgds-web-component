import { html } from "lit";
import { assert, fixture, expect } from "@open-wc/testing";
import { SgdsIconList } from "../src/components";
import "./sgds-web-component";

describe("<sgds-icon-list>", () => {
  it("matches shadowDom semantically", async () => {
    const el = await fixture<SgdsIconList>(html`<sgds-icon-list></sgds-icon-list>`);
    assert.shadowDom.equal(el, `<div><slot></slot></div>`);
  });
  it("role=list attribute is added to the custom element", async () => {
    const el = await fixture<SgdsIconList>(html`<sgds-icon-list></sgds-icon-list>`);
    expect(el.getAttribute("role")).to.equal("list");
  });
});
