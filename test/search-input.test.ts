import { assert, expect, fixture, html } from "@open-wc/testing";
import { SgdsSearchInput } from "../src/components";
import "../src/index";
import { sendKeys } from "@web/test-runner-commands";

describe("<sgds-search-input>", () => {
  it("matches the shadowDOM semantically", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input></sgds-search-input>`);
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <div class="combobox form-control-container">
        <div class="form-control-group">
          <sgds-icon
            name="search"
            size="md"
          >
          </sgds-icon>
          <div class="combobox-input-container">
            <input
              aria-invalid="false"
              aria-labelledby="id-0510-sgds-label- id-4624-sgds-input-Help "
              class="form-control"
              id="id-4624-sgds-input-"
              type="text"
            >
          </div>
        </div>
        <ul
          class="dropdown-menu"
          id="id-2776-sgds-dropdown-menu-div"
          part="menu"
          tabindex="-1"
        >
          <slot id="default">
            <div class="empty-menu">
              No options
            </div>
          </slot>
        </ul>
      </div>
          `,
      { ignoreAttributes: ["id", "aria-labelledby"] }
    );
  });

  it("renders a search icon as suffix", async () => {
    const el = await fixture(html`<sgds-search-input></sgds-search-input>`);
    const icon = el.shadowRoot?.querySelector("sgds-icon[name='search']");
    expect(icon).to.exist;
  });
  it("when there is no options and not loading, menu does not open on click  or on keyboard ArrowUp/ArrowDown", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input></sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.click();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;

    input?.focus();
    await el.updateComplete;
    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;

    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
  });
  it("when there is options, menu opens on click or on keyboard ArrowUp/ArrowDown", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input>
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.click();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;

    input?.focus();
    await el.updateComplete;
    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;

    await sendKeys({ press: "Escape" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;

    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;
  });
  it("when loading state is true, menu opens on click", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input loading>
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.click();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;
  });
  it("when loading state is true, menu opens on keyboard ArrowUp/ArrowDown", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input loading>
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await el.updateComplete;

    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;

    await sendKeys({ press: "Escape" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;

    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;
  });

  it("loading menu overrides no options menu ", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input loading menuIsOpen> </sgds-search-input>`);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector("slot#default");
    expect(slot?.classList.contains("is-loading")).to.be.true;
    const dropdownMenu = el.shadowRoot?.querySelector(".dropdown-menu");
    expect(dropdownMenu?.textContent).to.contain("Loading...");
  });

  it("loading menu overrides options menu ", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input loading menuIsOpen>
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector("slot#default");
    expect(slot?.classList.contains("is-loading")).to.be.true;
    const dropdownMenu = el.shadowRoot?.querySelector(".dropdown-menu");
    expect(dropdownMenu?.textContent).to.contain("Loading...");
  });
});

describe("sgds-search-input clear button behaviour", () => {
  it("no clear button when focused only with no display value or selected value", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input clearable>
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await el.updateComplete;
    const clearBtn = el.shadowRoot?.querySelector(".form-clearable");
    expect(clearBtn).to.be.null;
  });
  it("shows clear button when focused and with selected value", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input clearable value="1">
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await el.updateComplete;
    const clearBtn = el.shadowRoot?.querySelector(".form-clearable");
    expect(clearBtn).to.exist;
  });
  it("shows clear button when focused and with display value", async () => {
    const el = await fixture<SgdsSearchInput>(html`<sgds-search-input clearable>
      <sgds-search-input-option value="1">Option 1</sgds-search-input-option>
    </sgds-search-input>`);
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await el.updateComplete;
    await sendKeys({ type: "abc" });
    await el.updateComplete;
    const clearBtn = el.shadowRoot?.querySelector(".form-clearable");
    expect(clearBtn).to.exist;
  });
});
