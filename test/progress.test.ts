import { html } from "lit";
import { fixture, assert } from "@open-wc/testing";
import { SgdsProgress } from "../src/components/Progress/sgds-progress";
import { SgdsProgressBar } from "../src/components/Progress/sgds-progress-bar";

customElements.define("sgds-progress", SgdsProgress);
customElements.define("sgds-progress-bar", SgdsProgressBar);

describe("<sgds-progress>", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsProgress>(html` <sgds-progress></sgds-progress> `);
    assert.shadowDom.equal(el, `<div class=" progress "><slot></slot></div>`);
  });
});
