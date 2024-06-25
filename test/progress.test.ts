import "./sgds-web-component";
import { html } from "lit";
import { fixture, assert } from "@open-wc/testing";
import type { SgdsProgress } from "../src/components/Progress/sgds-progress";

describe("<sgds-progress>", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsProgress>(html` <sgds-progress></sgds-progress> `);
    assert.shadowDom.equal(el, `<div class=" progress "><slot></slot></div>`);
  });
});
