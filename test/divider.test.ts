import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { SgdsDivider } from "../src/components";
import "../src/index";

describe("<sgds-divider>", () => {
  it("has the default attributes", async () => {
    const el = await fixture<SgdsDivider>(html`<sgds-divider></sgds-divider>`);
    expect(el.getAttribute("role")).to.equal("separator");
    expect(el.getAttribute("aria-orientation")).to.equal("horizontal");
    expect(el.getAttribute("thickness")).to.equal("thin");
  });
});
