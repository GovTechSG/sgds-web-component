import { html } from "lit";
import { assert, fixture, expect } from "@open-wc/testing";
import { SgdsIconList } from "../src/components";
import "./sgds-web-component";

describe("<sgds-icon-list>", () => {
  it("matches shadowDom semantically", async () => {
    const el = await fixture<SgdsIconList>(html`<sgds-icon-list></sgds-icon-list>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="md">
      <sgds-icon
          size="lg"
        >
        </sgds-icon>
        <slot></slot>
        </div>`
    );
  });
  it("role=list attribute is added to the custom element", async () => {
    const el = await fixture<SgdsIconList>(html`<sgds-icon-list></sgds-icon-list>`);
    expect(el.getAttribute("role")).to.equal("list");
  });
  it("size prop is forwarded down to the class attribute of shadow dom ", async () => {
    const el = await fixture<SgdsIconList>(html`<sgds-icon-list size="sm"></sgds-icon-list>`);
    expect(el.shadowRoot?.querySelector("div")?.classList.value).to.contain("sm");
  });
});
