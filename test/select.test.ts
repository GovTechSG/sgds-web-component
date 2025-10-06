import { html } from "lit";
import { aTimeout, expect, fixture, waitUntil } from "@open-wc/testing";
import { SgdsButton, SgdsSelect } from "../src/components";
import "../src/index";
import { assert } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import SelectItem from "../src/components/Select/select-item";

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

  it("should emit sgds-select event when select value is updated", async () => {
    const el = await fixture<SgdsSelect>(html` <sgds-select
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-select>`);
    const selectHandler = sinon.spy();
    el?.addEventListener("sgds-select", selectHandler);

    expect(el.value).to.equal("");
    el.value = "option1";

    await waitUntil(() => selectHandler.calledOnce);
    expect(selectHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-change event when select value is updated", async () => {
    const el = await fixture<SgdsSelect>(html` <sgds-select
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-select>`);
    const changeHandler = sinon.spy();
    el?.addEventListener("sgds-change", changeHandler);

    expect(el.value).to.equal("");
    el.value = "option1";

    await waitUntil(() => changeHandler.calledOnce);
    expect(changeHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-focus and sgds-blur event when select is focused/blurred", async () => {
    const el = await fixture<SgdsSelect>(html` <sgds-select
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-select>`);
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

  it("mouse click on item, should update value of selected item", async () => {
    const el = await fixture<SgdsSelect>(
      html`<sgds-select
        .menuList=${[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ]}
      ></sgds-select>`
    );

    const input = el.shadowRoot?.querySelector("input");
    input?.click();
    await waitUntil(() => el.menuIsOpen);

    const item = el.shadowRoot?.querySelectorAll("sgds-select-item")[0] as SelectItem;
    const itemContent = item.shadowRoot?.querySelector("div.normal-item-content") as HTMLDivElement;
    itemContent?.click();

    await waitUntil(() => el.value === "option1");

    expect(el.value).to.equal("option1");
  });

  it("should not show any items in dropdown menu when there is no match (for default filter)", async () => {
    const el = await fixture<SgdsSelect>(html`<sgds-select .menuList=${[]}></sgds-select>`);

    await el.updateComplete;
    const items = el.shadowRoot?.querySelectorAll("sgds-combox-box-item");
    expect(items?.length).to.equal(0);
    const emptyMenu = el.shadowRoot?.querySelector(".empty-menu");
    expect(emptyMenu).to.exist;
  });

  it("when initial value is specified, input is populated, item is active", async () => {
    const el = await fixture<SgdsSelect>(
      html`<sgds-select
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option3"
      ></sgds-select>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const durianItem = el.shadowRoot?.querySelector("sgds-select-item[value='option3']") as SelectItem;

    expect(input.value).to.equal("Durian");
    expect(el.value).to.equal("option3");
    expect(durianItem.active).to.be.true;
  });

  it("when menu is close, focused is brought back to input", async () => {
    const el = await fixture<SgdsSelect>(
      html`<sgds-select
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-select>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    await simulateUserClick(input);

    await sendKeys({ press: "ArrowDown" });

    await waitUntil(
      () => {
        const selectItem1 = el.shadowRoot?.querySelectorAll("sgds-select-item")[0];
        return getRootActiveElement(input) === selectItem1;
      },
      "focus did not move into first select item",
      { timeout: 2000 }
    );

    await sendKeys({ press: "Escape" });
    await waitUntil(() => getRootActiveElement(input) === input, "focus did not return to the input after Escape", {
      timeout: 2000
    });
    expect(getRootActiveElement(input)).to.equal(input);
  });
});

describe("select >> when submitting a form", () => {
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

    const itemOne = select()?.shadowRoot?.querySelectorAll("sgds-select-item")[0] as SelectItem;

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
        const selectItem1 = el.shadowRoot?.querySelectorAll("sgds-select-item")[0];
        return getRootActiveElement(input) === selectItem1;
      },
      "focus did not move into first select item",
      { timeout: 2000 }
    );

    expect(el.invalid).to.be.false;
  });
});
