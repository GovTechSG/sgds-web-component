import { assert, aTimeout, expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import { SgdsButton, SgdsSelect } from "../src/components";
import SgdsSelectOption from "../src/components/Select/sgds-select-option";
import "../src/index";

const NoOptionsSelects = [
  { render: html`<sgds-select .menuList=${[]}></sgds-select>`, mode: "property" },
  { render: html`<sgds-select></sgds-select>`, mode: "slot" }
];

const TwoOptionsSelects = [
  {
    render: html`<sgds-select
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-select>`,
    mode: "property"
  },
  {
    render: html`<sgds-select>
      <sgds-select-option value="option1">Option 1</sgds-select-option>
      <sgds-select-option value="option2">Option 2</sgds-select-option>
    </sgds-select>`,
    mode: "slot"
  }
];

const ThreeOptionsSelects = [
  {
    render: html`<sgds-select
      .menuList=${[
        { label: "Apple", value: "option1" },
        { label: "Apricot", value: "option2" },
        { label: "Durian", value: "option3" }
      ]}
      value="option3"
    ></sgds-select>`,

    mode: "property"
  },
  {
    render: html`<sgds-select value="option3">
      <sgds-select-option value="option1">Apple</sgds-select-option>
      <sgds-select-option value="option2">Apricot</sgds-select-option>
      <sgds-select-option value="option3">Durian</sgds-select-option>
    </sgds-select>`,

    mode: "slot"
  }
];
function getRootActiveElement(el: HTMLElement | null): Element | null {
  if (!el) return null;
  const root = el.getRootNode();
  return (root as Document | ShadowRoot).activeElement as Element | null;
}

async function simulateUserClick(element: HTMLElement) {
  // Simulate a real user pointer/mouse sequence before calling focus
  element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
  element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
  element.click(); // triggers click handlers
  element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, composed: true }));
  // ensure focus after the click
  element.focus();
  // allow event loop/slot listeners to run
  await aTimeout(0);
}

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
        <div class="form-control-container select">
          <div class="form-control-group">
              <input
                aria-invalid="false"
                  class="form-control"
                type="text"
              >
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
            <slot>
            <sgds-select-option
              aria-disabled="false"
              role="menuitem"
              value="option1"
            >
              Option 1
            </sgds-select-option>
            <sgds-select-option
              aria-disabled="false"
              role="menuitem"
              value="option2"
            >
              Option 2
            </sgds-select-option>
            </slot>
          </ul>
        
            `,
      { ignoreAttributes: ["id", "aria-controls", "aria-labelledby"] }
    );
  });

  it("Should not be able to type in the input", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select></sgds-select>`);
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await sendKeys({ type: "hi" });

    await el.updateComplete;
    expect(input?.value).not.to.equal("hi");
    expect(input?.value).to.equal("");
  });

  it("should be disabled with the disabled attribute to be true", async () => {
    const el = await fixture(html`<sgds-select disabled></sgds-select>`);
    const selectInput = el.shadowRoot?.querySelector("input");
    expect(selectInput?.disabled).to.be.true;
  });

  it("when readonly set to true, menu cannot open", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select readonly></sgds-select>`);
    const input = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement;
    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    input?.click();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
    expect(getComputedStyle(menuEl).display).to.equal("none");

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(getComputedStyle(menuEl).display).to.equal("none");
    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(getComputedStyle(menuEl).display).to.equal("none");
  });

  TwoOptionsSelects.forEach(({ mode, render }) => {
    it(`MODE: ${mode} , should emit sgds-select event when select value is updated`, async () => {
      const el = await fixture<SgdsSelect>(render);
      const selectHandler = sinon.spy();
      el?.addEventListener("sgds-select", selectHandler);

      expect(el.value).to.equal("");
      el.value = "option1";

      await waitUntil(() => selectHandler.calledOnce);
      expect(selectHandler).to.have.been.calledOnce;
    });
    it(`MODE: ${mode} ,should emit sgds-change event when select value is updated`, async () => {
      const el = await fixture<SgdsSelect>(render);
      const changeHandler = sinon.spy();
      el?.addEventListener("sgds-change", changeHandler);

      expect(el.value).to.equal("");
      el.value = "option1";

      await waitUntil(() => changeHandler.calledOnce);
      expect(changeHandler).to.have.been.calledOnce;
    });

    it(`MODE: ${mode} ,should emit sgds-focus and sgds-blur event when select is focused/blurred`, async () => {
      const el = await fixture<SgdsSelect>(render);

      const selectInput = el.shadowRoot?.querySelector("input");

      const focusHandler = sinon.spy();
      el?.addEventListener("sgds-focus", focusHandler);

      const blurHandler = sinon.spy();
      el?.addEventListener("sgds-blur", blurHandler);

      selectInput?.focus();
      await waitUntil(() => focusHandler.calledOnce);
      expect(focusHandler).to.have.been.calledOnce;

      selectInput?.blur();
      await waitUntil(() => blurHandler.calledOnce);
      expect(blurHandler).to.have.been.calledOnce;
    });
    it(`MODE: ${mode} mouse click on item, should update value of selected item`, async () => {
      const el = await fixture<SgdsSelect>(render);
      const input = el.shadowRoot?.querySelector("input");
      input?.click();
      await waitUntil(() => el.menuIsOpen);

      const item = el.shadowRoot?.querySelectorAll("sgds-select-option")[0] as SgdsSelectOption;
      const itemContent = item.shadowRoot?.querySelector("div.normal-item-content") as HTMLDivElement;
      itemContent?.click();

      await waitUntil(() => el.value === "option1");

      expect(el.value).to.equal("option1");
    });
  });

  NoOptionsSelects.forEach(({ mode, render }) => {
    it(`MODE=${mode}, it should not show any items in dropdown menu when there is no match (for default filter)`, async () => {
      const el = await fixture<SgdsSelect>(render);

      await el.updateComplete;
      const items = el.shadowRoot?.querySelectorAll("sgds-select-option");
      expect(items?.length).to.equal(0);
      const emptyMenu = el.shadowRoot?.querySelector(".empty-menu");
      expect(emptyMenu).to.exist;
    });
  });

  ThreeOptionsSelects.forEach(({ mode, render }) => {
    it(`MODE=${mode},when initial value is specified, input is populated, item is active`, async () => {
      const el = await fixture<SgdsSelect>(render);

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      let durianItem: SgdsSelectOption;
      if (mode === "slot") {
        durianItem = el.querySelector("sgds-select-option[value='option3']") as SgdsSelectOption;
      } else {
        durianItem = el.shadowRoot?.querySelector("sgds-select-option[value='option3']") as SgdsSelectOption;
      }
      await el.updateComplete;
      await waitUntil(() => input.value === "Durian");
      expect(input.value).to.equal("Durian");
      expect(el.value).to.equal("option3");
      expect(durianItem.active).to.be.true;
    });
    it(`MODE=${mode}, when menu is close, focused is brought back to input`, async () => {
      const el = await fixture<SgdsSelect>(render);

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      await simulateUserClick(input);

      await sendKeys({ press: "ArrowDown" });
      if (mode === "slot") {
        await waitUntil(
          () => el?.querySelectorAll("sgds-select-option")[0] === document.activeElement,
          "focus did not move into first select item",
          { timeout: 2000 }
        );
      } else {
        await waitUntil(
          () => {
            const selectItem1 = el.shadowRoot?.querySelectorAll("sgds-select-option")[0];
            return getRootActiveElement(input) === selectItem1;
          },
          "focus did not move into first select item",
          { timeout: 2000 }
        );
      }

      await sendKeys({ press: "Escape" });
      await waitUntil(() => getRootActiveElement(input) === input, "focus did not return to the input after Escape", {
        timeout: 2000
      });
      expect(getRootActiveElement(input)).to.equal(input);
    });
  });
});

describe("select >> when submitting a form", () => {
  it("when value exist in required field, pressing submit should not show error", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-select required value="option1">
          <sgds-select-option value="option1">Apple</sgds-select-option>
          <sgds-select-option value="option2">Apricot</sgds-select-option>
          <sgds-select-option value="option3">Dur</sgds-select-option>
        </sgds-select>
        <sgds-button type="submit">Submit</sgds-button>
      </form>`
    );
    const select = form.querySelector<SgdsSelect>("sgds-select");
    const button = form.querySelector<SgdsButton>("sgds-button");
    form?.addEventListener("submit", e => e.preventDefault());
    expect(select?.value).to.equal("option1");
    expect(select?.invalid).to.be.false;
    button?.click();
    await select?.updateComplete;
    expect(select?.invalid).to.be.false;
  });
  it("when value is truthy, and reset button is clicked, input is reset and is valid", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-select required menuIsOpen>
          <sgds-select-option value="option1">Apple</sgds-select-option>
          <sgds-select-option value="option2">Apricot</sgds-select-option>
          <sgds-select-option value="option3">Dur</sgds-select-option>
        </sgds-select>
        <sgds-button type="reset">Reset</sgds-button>
      </form>`
    );

    const button = form.querySelector<SgdsButton>("sgds-button");
    const select = form.querySelector<SgdsSelect>("sgds-select");
    const appleItem = form
      .querySelector<SgdsSelectOption>("sgds-select-option[value='option1']")
      ?.shadowRoot?.querySelector("div.normal-item-content") as HTMLElement;
    appleItem?.click();
    await select?.updateComplete;
    await waitUntil(() => select?.value === "option1");
    expect(select?.value).to.equal("option1");
    button?.click();

    await waitUntil(() => !select?.value);
    expect(select?.invalid).to.be.false;
  });
  it("when required=true should block submission of form when there is no value", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-select
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-select>
        <sgds-button type="submit"></sgds-button>
      </form>`
    );
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(false);
    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    expect(submitHandler).not.to.have.been.calledOnce;
  });

  it("when required=true and value is true , form can be submitted", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-select
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
          value="option3"
        ></sgds-select>
        <sgds-button type="submit"></sgds-button>
      </form>`
    );
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(true);
    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });

  it("when disabled, form is always able to submit even if there is no value", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-select
          required
          disabled
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-select>
        <sgds-button type="submit"></sgds-button>
      </form>`
    );
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(true);
    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });

  it("when reset, values are reset to defaultValue", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-select
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
          value="option3"
        ></sgds-select>
        <sgds-button type="submit"></sgds-button>
        <sgds-button type="reset"></sgds-button>
      </form>`
    );
    const input = () => form.querySelector("sgds-select")?.shadowRoot?.querySelector("input");
    const select = () => form.querySelector("sgds-select");
    expect(input()?.value).to.equal("Dur");
    // Clear input
    input()?.click();
    await waitUntil(() => select()?.menuIsOpen);

    const itemOne = select()?.shadowRoot?.querySelectorAll("sgds-select-option")[0] as SgdsSelectOption;

    itemOne?.click();
    await waitUntil(() => select()?.value === "option1");

    const resetButton = form.querySelector<SgdsButton>("sgds-button[type='reset']");
    resetButton?.click();
    // resets value to the defaultValue
    await waitUntil(() => select()?.value === "option3");
  });

  it("when touched and blurred and value is empty, error is shown", async () => {
    const el = await fixture<SgdsSelect>(
      html`
        <sgds-select
          hasFeedback
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-select>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    el.blur();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector("input:invalid"));
  });

  it("when traversing menu, no error should be shown", async () => {
    const el = await fixture<SgdsSelect>(
      html`
        <sgds-select
          hasFeedback
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-select>
      `
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    await simulateUserClick(input);

    await sendKeys({ press: "ArrowDown" });
    await waitUntil(
      () => {
        const selectItem1 = el.shadowRoot?.querySelectorAll("sgds-select-option")[0];
        return getRootActiveElement(input) === selectItem1;
      },
      "focus did not move into first select item",
      { timeout: 2000 }
    );

    expect(el.invalid).to.be.false;
  });
  it("should dynamically update the display value when the value changes", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select value="1">
      <sgds-select-option value="1">Option 1</sgds-select-option>
      <sgds-select-option value="2">Option 2</sgds-select-option>
      <sgds-select-option value="3">Option 3</sgds-select-option>
    </sgds-select>`);
    expect(el.value).to.equal("1");
    const firstOption = el.querySelector<SgdsSelectOption>("sgds-select-option[value='1']");
    await waitUntil(() => firstOption?.active);
    expect(firstOption?.active).to.be.true;
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(input.value).to.equal("Option 1");

    el.value = "2";
    await el.updateComplete;
    await waitUntil(() => input.value === "Option 2");
    expect(input.value).to.equal("Option 2");
    expect(firstOption?.active).to.be.false;
    const secondOption = el.querySelector<SgdsSelectOption>("sgds-select-option[value='2']");
    expect(secondOption?.active).to.be.true;
  });
});

describe("sgds-select-option (default)", () => {
  it("matches shadowDom semantically", async () => {
    const el = await fixture<SgdsSelectOption>(html`<sgds-select-option></sgds-select-option>`);
    assert.shadowDom.equal(
      el,
      `
       <div class="dropdown-item" tabindex="0">
       <div class="normal-item-content">
                  <slot></slot>
                </div>
      </div>
      `
    );
  });
  it("when active is true, tick sgds-icon appears", async () => {
    const el = await fixture<SgdsSelectOption>(html`<sgds-select-option active></sgds-select-option>`);
    assert.shadowDom.equal(
      el,
      `
          <div class="dropdown-item active" tabindex="0">
          <div class="normal-item-content" >
            <slot></slot>
            <sgds-icon name="check" size="lg"></sgds-icon>
          </div>
          </div>
      `
    );
  });
  it("when disabled is true, matches the shadow Dom semantically", async () => {
    const el = await fixture<SgdsSelectOption>(html`<sgds-select-option disabled></sgds-select-option>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="dropdown-item disabled" tabindex="-1">
          <div class="normal-item-content" >
            <slot></slot>
          </div>
        </div>
      `
    );
  });
  it("loading menu overrides no options menu ", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select loading menuIsOpen> </sgds-select>`);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector("slot#default");
    expect(slot?.classList.contains("is-loading")).to.be.true;
    const dropdownMenu = el.shadowRoot?.querySelector(".dropdown-menu");
    expect(dropdownMenu?.textContent).to.contain("Loading...");
  });

  it("loading menu overrides options menu ", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select loading menuIsOpen>
      <sgds-select-option value="1">Option 1</sgds-select-option>
    </sgds-select>`);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector("slot#default");
    expect(slot?.classList.contains("is-loading")).to.be.true;
    const dropdownMenu = el.shadowRoot?.querySelector(".dropdown-menu");
    expect(dropdownMenu?.textContent).to.contain("Loading...");
  });
});
