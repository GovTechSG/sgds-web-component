import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { SgdsSelect } from "../src/components";
import "../src/index";

describe("<sgds-select>", () => {
  it("when readonly set to true, menu is disabled", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select readonly></sgds-select>`);
    const input = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement;
    input?.click();

    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).not.to.exist;
  });
});
