import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { SgdsSelect } from "../src/components";
import "../src/index";
import { assert } from "@esm-bundle/chai";
import { sendKeys } from "@web/test-runner-commands";

describe("<sgds-select>", () => {
  it("matches shadowDom semantically", async () => {
    const el = await fixture<SgdsSelect>(html` <sgds-select
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-select>`);
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
        <div class="select">
          <div class="form-control-group">
            <div class="select-input-container">
              <input
                aria-invalid="false"
                  class="form-control"
                type="text"
              >
            </div>
            <sgds-icon
              name="chevron-down"
              size="md"
            >
            </sgds-icon>
            </div>
          <ul
            class="dropdown-menu"
            id="id-7895-sgds-dropdown-menu-div"
            part="menu"
            tabindex="-1"
            >
            <sgds-select-item
              aria-disabled="false"
              role="menuitem"
              value="option1"
            >
              Option 1
            </sgds-select-item>
            <sgds-select-item
              aria-disabled="false"
              role="menuitem"
              value="option2"
            >
              Option 2
            </sgds-select-item>
          </ul>
            `,
      { ignoreAttributes: ["id", "aria-controls", "aria-labelledby"] }
    );
  });
  it("should be disabled with the disabled attribute to be true", async () => {
    const el = await fixture(html`<sgds-select disabled></sgds-select>`);
    const selectInput = el.shadowRoot?.querySelector("input");
    expect(selectInput?.disabled).to.be.true;
  });
  it("when readonly set to true, menu cannot open", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select readonly></sgds-select>`);
    const input = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement;
    input?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).not.to.exist;

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).to.be.null;
    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).to.be.null;
  });
});
