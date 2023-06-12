import "../mocks/link";
import { MockLink } from "../mocks/link";
import { fixture, assert, expect } from "@open-wc/testing";
import { html } from "lit";

describe("link-element", () => {
  it("renders with default values", async () => {
    const el = await fixture<MockLink>(html`<mock-link></mock-link>`);
    assert.shadowDom.equal(
      el,
      ` <li>
        <a
          aria-disabled="false"
          class="nav-link"
          href=""
          target="_self"
        >
          <slot>
          </slot>
      </a>
      </li>
    `
    );
  });
  it("href prop is forwarded to a tag href attr", async () => {
    const el = await fixture(html`<mock-link href="#">test</mock-link>`);
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute("href", "#");
  });
  it("active prop is forwarded to <a> class", async () => {
    const el = await fixture(html`<mock-link active>test</mock-link>`);
    expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
  });
  it("disabled prop apply disable props and attr to anchor element", async () => {
    const el = await fixture(html`<mock-link disabled>test</mock-link>`);
    expect(el.shadowRoot?.querySelector("a")).to.have.class("disabled");
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute("disabled");
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute("aria-disabled", "true");
  });
});
