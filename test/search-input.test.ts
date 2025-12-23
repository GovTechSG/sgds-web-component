import { html, fixture, expect } from "@open-wc/testing";
import "../src/index";
import { SgdsSearchInput } from "../src/components";

describe("<sgds-search-input>", () => {
  it("shows clear button when focused", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input clearable></sgds-search-input>`);
    const input = el.shadowRoot?.querySelector("input");
    // Mimic user focusing the input using the DOM focus() method
    input?.focus();
    await el.updateComplete;
    const clearBtn = el.shadowRoot?.querySelector(".form-clearable");
    expect(clearBtn).to.exist;
  });

  it("renders a search icon as suffix", async () => {
    const el = await fixture(html`<sgds-search-input></sgds-search-input>`);
    const icon = el.shadowRoot?.querySelector("sgds-icon[name='search']");
    expect(icon).to.exist;
  });
});
