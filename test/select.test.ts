import { html } from "lit";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { SgdsButton, SgdsSelect } from "../src/components";
import "../src/index";
import { assert } from "@esm-bundle/chai";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import SelectItem from "../src/components/Select/select-item";

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
  it("should emit sgds-select event when combobx value is updated", async () => {
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
    await waitUntil(() => el.shadowRoot?.querySelector(".dropdown-menu.show"));

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
    const input = () => el.shadowRoot?.querySelector("input");

    input()?.focus();
    await sendKeys({ press: "ArrowDown" });

    await waitUntil(() => {
      const comboItem1 = el.shadowRoot?.querySelectorAll("sgds-select-item")[0];
      return el.shadowRoot?.activeElement === comboItem1;
    });

    await sendKeys({ press: "Escape" });
    await waitUntil(() => el.shadowRoot?.activeElement === input());
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
    await waitUntil(() => select()?.shadowRoot?.querySelector(".dropdown-menu.show"));

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
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await waitUntil(() => {
      const selectItem1 = el.shadowRoot?.querySelectorAll("sgds-select-item")[0];
      return el.shadowRoot?.activeElement === selectItem1;
    });
    expect(el.invalid).to.be.false;
  });
});
