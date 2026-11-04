import { assert, expect, fixture } from "@open-wc/testing";
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

  it("when link is disabled, it removes href from the slotted anchor element", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link disabled><a href="#"></a></sgds-link>`);
    expect(el.querySelector("a")).to.exist;
    expect(el.querySelector("a")).to.have.attribute("disabled");
    expect(el.querySelector("a")).to.not.have.attribute("href");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getComputedStyle(el.querySelector("a")!).pointerEvents).to.equal("none");
  });

  it("slotted anchor does not get tabindex=0 (native focusability)", async () => {
    const el = await fixture<SgdsLink>(html`<sgds-link><a href="#"></a></sgds-link>`);
    expect(el.querySelector("a")).to.not.have.attribute("tabindex");
  });

  describe("ssr mode (ssr=true)", () => {
    it("slotted anchor should not have tabindex attribute when ssr is true", async () => {
      const el = await fixture<SgdsLink>(html`<sgds-link ssr><a href="#"></a></sgds-link>`);
      await el.updateComplete;
      expect(el.querySelector("a")).to.not.have.attribute("tabindex");
    });

    it("when link is disabled and ssr is true, anchor should not be mutated (no DOM mutation during SSR)", async () => {
      const el = await fixture<SgdsLink>(html`<sgds-link ssr disabled><a href="#"></a></sgds-link>`);
      await el.updateComplete;
      expect(el.querySelector("a")).to.not.have.attribute("disabled");
      expect(el.querySelector("a")).to.not.have.attribute("tabindex");
      expect(el.querySelector("a")).to.have.attribute("href", "#");
    });
  });
});
