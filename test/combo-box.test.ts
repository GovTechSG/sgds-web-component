import { assert, elementUpdated, expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import "./sgds-web-component";

import type { SgdsBadge, SgdsButton, SgdsComboBox } from "../src/components";
import SgdsCloseButton from "../src/internals/CloseButton/sgds-close-button";
import SgdsComboBoxOption from "../src/components/ComboBox/sgds-combo-box-option";
describe("sgds-combo-box ", () => {
  it("matches shadowDom semantically", async () => {
    const el = await fixture<SgdsComboBox>(html` <sgds-combo-box
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-combo-box>`);
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <div class="combobox">
        <div class="form-control-group">
          <div class="combobox-input-container">
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
          <sgds-combo-box-option
            aria-disabled="false"
            role="menuitem"
            value="option1"
          >
            Option 1
          </sgds-combo-box-option>
          <sgds-combo-box-option
            aria-disabled="false"
            role="menuitem"
            value="option2"
          >
            Option 2
          </sgds-combo-box-option>
        </ul>
          `,
      { ignoreAttributes: ["id", "aria-controls", "aria-labelledby"] }
    );
  });

  it("should be disabled with the disabled attribute to be true", async () => {
    const el = await fixture(html`<sgds-combo-box disabled></sgds-combo-box>`);
    const comboBoxInput = el.shadowRoot?.querySelector("input");
    expect(comboBoxInput?.disabled).to.be.true;
  });

  it("when readonly is true, menu cannot open ", async () => {
    const el = await fixture<SgdsComboBox>(html`<sgds-combo-box readonly></sgds-combo-box>`);
    const input = el.shadowRoot?.querySelector("input");
    input?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).to.be.null;

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).to.be.null;
    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".dropdown-menu.show")).to.be.null;
  });

  it("should emit sgds-select event when combobox value is updated", async () => {
    const el = await fixture<SgdsComboBox>(html` <sgds-combo-box
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-combo-box>`);
    const selectHandler = sinon.spy();
    el?.addEventListener("sgds-select", selectHandler);

    expect(el.value).to.equal("");
    el.value = "option1";

    await waitUntil(() => selectHandler.calledOnce);
    expect(selectHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-input event when input value changes", async () => {
    const el = await fixture<SgdsComboBox>(html`<sgds-combo-box></sgds-combo-box>`);
    const comboBoxInput = el.shadowRoot?.querySelector("input");

    const inputHandler = sinon.spy();
    el?.addEventListener("sgds-input", inputHandler);

    comboBoxInput?.focus();
    await sendKeys({ press: "A" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-change event when combobox value changes", async () => {
    const el = await fixture<SgdsComboBox>(html` <sgds-combo-box
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-combo-box>`);
    const changeHandler = sinon.spy();
    el?.addEventListener("sgds-change", changeHandler);

    expect(el.value).to.equal("");
    el.value = "option1";

    await waitUntil(() => changeHandler.calledOnce);
    expect(changeHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-focus and sgds-blur event when combobox is focused/blurred", async () => {
    const el = await fixture<SgdsComboBox>(html`<sgds-combo-box></sgds-combo-box>`);
    const comboBoxInput = el.shadowRoot?.querySelector("input");

    const focusHandler = sinon.spy();
    el?.addEventListener("sgds-focus", focusHandler);

    const blurHandler = sinon.spy();
    el?.addEventListener("sgds-blur", blurHandler);

    comboBoxInput?.focus();
    await waitUntil(() => focusHandler.calledOnce);
    expect(focusHandler).to.have.been.calledOnce;

    comboBoxInput?.blur();
    await waitUntil(() => blurHandler.calledOnce);
    expect(blurHandler).to.have.been.calledOnce;
  });

  it("mouse click on item, should update value of selected item", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("input");
    input?.click();
    await waitUntil(() => el.shadowRoot?.querySelector(".dropdown-menu.show"));

    const item = el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0] as SgdsComboBoxOption;
    const itemContent = item.shadowRoot?.querySelector("div.normal-item-content") as HTMLDivElement;
    itemContent?.click();

    await waitUntil(() => el.value === "option1");

    expect(el.value).to.equal("option1");
  });

  it("should not show any items in dropdown menu when there is no match (for default filter)", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ]}
      ></sgds-combo-box>`
    );

    el.value = "apples";
    await el.updateComplete;
    const items = el.shadowRoot?.querySelectorAll("sgds-combox-box-item");
    expect(items?.length).to.equal(0);
  });

  it("should filter the right items (for default filter)", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await sendKeys({ type: "a" });

    // should only have "apple", "apricot"
    await el.updateComplete;
    expect(input?.value).to.equal("a");
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-option");
    await waitUntil(() => items?.length === 2);

    // should only have "apple"
    await sendKeys({ type: "pp" });
    await el.updateComplete;
    expect(input?.value).to.equal("app");
    // items = el.shadowRoot?.querySelectorAll("sgds-combo-box-option");
    await waitUntil(() => el.shadowRoot?.querySelectorAll("sgds-combo-box-option").length === 1);
    const item = el.shadowRoot?.querySelector("sgds-combo-box-option");
    const itemVal = (item as SgdsComboBoxOption).innerText;
    expect(itemVal).to.equal("Apple");
  });

  it("should change filterFunction", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    // filterFunction that accepts all menuItem regardless of inputValue
    el.filterFunction = () => true;

    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await sendKeys({ type: "test" });
    await el.updateComplete;
    expect(input?.value).to.equal("test");
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-option");
    expect(items?.length).to.equal(3);
  });

  it("should display checkboxes for each item in multi-select mode", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          multiSelect
          .menuList=${[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" }
          ]}
        ></sgds-combo-box>
      `
    );

    // Open dropdown
    const comboBoxInput = el.shadowRoot?.querySelector("input") as HTMLElement;
    expect(comboBoxInput, "input not found").to.exist;
    comboBoxInput.click();
    await el.updateComplete;

    // Expect 2 <sgds-combo-box-option>
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-option") || [];
    expect(items.length).to.equal(2);

    items.forEach(item => {
      // The item’s shadow root should contain <sgds-checkbox>
      const checkboxEl = item.shadowRoot?.querySelector("sgds-checkbox") as HTMLElement;
      expect(checkboxEl, "sgds-checkbox found").to.exist;
    });
  });

  it("empty menu appears when no search options found", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          .menuList=${[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" }
          ]}
        ></sgds-combo-box>
      `
    );
    const comboBoxInput = el.shadowRoot?.querySelector("input") as HTMLElement;
    comboBoxInput.focus();
    await sendKeys({ type: "abcd" });

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".empty-menu")).to.exist;
  });

  it("should display the badge with max-width of 192px with badgeFullWidth is not set", async () => {
    const parentNode = document.createElement("div");
    parentNode.style.width = "300px";

    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          multiSelect
          value="option1"
          .menuList=${[
            { label: "A very long badge name without limitation of parent width", value: "option1" },
            { label: "Option 2", value: "option2" }
          ]}
        ></sgds-combo-box>
      `,
      { parentNode }
    );

    await elementUpdated(el);

    const parentContainer = el.shadowRoot?.querySelector(".combobox-input-container");
    const badge = el.shadowRoot?.querySelector("sgds-badge");

    // should not match width parent width
    expect(badge?.clientWidth).to.equal(192);
    expect(badge?.clientWidth).not.to.equal(parentContainer?.clientWidth);
  });

  it("should display the badge with max-width of parent with badgeFullWidth is set to true", async () => {
    const parentNode = document.createElement("div");
    parentNode.style.width = "300px";

    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          multiSelect
          badgeFullWidth
          value="option1"
          .menuList=${[
            { label: "A very long badge name without limitation of parent width", value: "option1" },
            { label: "Option 2", value: "option2" }
          ]}
        ></sgds-combo-box>
      `,
      { parentNode }
    );

    await elementUpdated(el);
    const parentContainer = el.shadowRoot?.querySelector(".combobox-input-container");
    const badge = el.shadowRoot?.querySelector("sgds-badge");

    // should match width parent width
    expect(badge?.clientWidth).to.equal(parentContainer?.clientWidth);
  });

  it("when menu list is updated, and the current value is no longer valid it should null the value", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        value="option1;option2"
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" },
          { label: "Grapes", value: "option4" },
          { label: "Orange", value: "option5" }
        ]}
      ></sgds-combo-box>`
    );

    expect(el.value).to.equal("option1;option2");

    el.setAttribute(
      "menuList",
      JSON.stringify([
        { label: "Durian", value: "option3" },
        { label: "Grapes", value: "option4" },
        { label: "Orange", value: "option5" }
      ])
    );

    await el.updateComplete;
    expect(el.value).to.equal("");
  });

  it("when value is updated, it should reflect the new value on the select", async () => {
    // Create component with initial value
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        value="option1;option2"
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" },
          { label: "Grapes", value: "option4" },
          { label: "Orange", value: "option5" }
        ]}
      ></sgds-combo-box>`
    );
    await el.updateComplete;

    // Get and verify input element
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(input, "Input element should exist").to.exist;
    expect(input instanceof HTMLInputElement, "Input should be HTMLInputElement").to.be.true;

    // Verify initial values
    expect(el.value).to.equal("option1;option2");

    // Update value and wait for changes to propagate
    el.setAttribute("value", "option4;option5");
    await el.updateComplete;

    // Verify value change
    expect(el.value).to.equal("option4;option5");
  });
});

describe("single select combobox", () => {
  it("when initial value is specified, input is populated, item is active", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option3"
      ></sgds-combo-box>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;

    expect(input.value).to.equal("Durian");
    expect(el.value).to.equal("option3");
    expect(durianItem.active).to.be.true;
  });

  it("invalid displayValue entered should be cleared when blurred", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();

    await sendKeys({ type: "asdfs" });
    await el.updateComplete;
    expect(input.value).to.equal("asdfs"); // equivalent to displayValue
    expect(el.value).to.equal("");
    input.blur();
    await el.updateComplete;
    expect(input.value).to.equal("");
    expect(el.value).to.equal("");
  });

  it("When input is cleared, the active item is no longer active", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
        value="option3"
      ></sgds-combo-box>`
    );
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
    expect(durianItem.active).to.be.true;

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => el.value === "");
    const updatedDurianItem = el.shadowRoot?.querySelector(
      "sgds-combo-box-option[value='option3']"
    ) as SgdsComboBoxOption;
    expect(updatedDurianItem.active).to.be.false;
  });

  it("When no purpose selection is made through clicking or keyboard, input clears when blur", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ type: "Dur" });

    await waitUntil(() => input.value === "Dur");
    input.blur();
    await waitUntil(() => input.value === "");
    expect(el.value).to.equal("");
    const durItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
    expect(durItem.active).to.be.false;
  });

  it("When there is already a selectedItem, even when user types more rubbish, the value of input or displayValue will sync with the menu selected item regardless of the value", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
        value="option1"
      ></sgds-combo-box>`
    );
    expect(el.value).to.equal("option1");

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ type: "rubbish" });
    await waitUntil(() => el.shadowRoot?.querySelector("input")?.value === "Applerubbish");
    expect(el.value).to.equal("option1");

    input.blur();
    await waitUntil(() => el.shadowRoot?.querySelector("input")?.value === "Apple");
    expect(el.value).to.equal("option1");
  });

  it("Keyboard arrowDown and enter populates the input and update value", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.value).to.equal("option1");
    expect(el.shadowRoot?.querySelector("input")?.value).to.equal("Apple");
  });

  it("Keyboard arrowDown and enter populates the input and update value, sgds-change and sgds-select will be called", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    const spySelect = sinon.spy();
    el.addEventListener("sgds-select", spySelect);

    const spyChange = sinon.spy();
    el.addEventListener("sgds-change", spyChange);

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;

    expect(spyChange).to.be.called;
    expect(spySelect).to.be.called;
  });

  it("Menu filters while typing, but when reopen should show the full menu again", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = () => el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input().focus();
    await sendKeys({ type: "D" });
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll("sgds-combo-box-option").length).to.equal(1);
    expect(el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0].textContent?.trim()).to.equal("Dur");

    const item = el.shadowRoot
      ?.querySelectorAll("sgds-combo-box-option")[0]
      .shadowRoot?.querySelector(".normal-item-content") as HTMLElement;
    item.click();

    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".dropdown-menu.show"));
    expect(input().value).to.equal("Dur");

    input().click();

    await waitUntil(() => el.shadowRoot?.querySelector(".dropdown-menu.show"));
    expect(el.shadowRoot?.querySelectorAll("sgds-combo-box-option").length).to.equal(3);
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active");
  });

  it("when menu is close, focused is brought back to input", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = () => el.shadowRoot?.querySelector("input");

    input()?.focus();
    await sendKeys({ press: "ArrowDown" });

    await waitUntil(() => {
      const comboItem1 = el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0];
      return el.shadowRoot?.activeElement === comboItem1;
    });

    await sendKeys({ press: "Escape" });
    await waitUntil(() => el.shadowRoot?.activeElement === input());
  });

  it("when menu list is updated, and the current value is no longer valid it should null the value", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        value="option1"
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" },
          { label: "Grapes", value: "option4" },
          { label: "Orange", value: "option5" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;

    expect(input.value).to.equal("Apple");
    expect(el.value).to.equal("option1");

    el.setAttribute(
      "menuList",
      JSON.stringify([
        { label: "Durian", value: "option3" },
        { label: "Grapes", value: "option4" },
        { label: "Orange", value: "option5" }
      ])
    );

    await el.updateComplete;
    expect(input.value).to.equal("");
    expect(el.value).to.equal("");
  });

  it("when value is updated, it should reflect the new value on the select", async () => {
    // Create component with initial value
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        value="option1"
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" },
          { label: "Grapes", value: "option4" },
          { label: "Orange", value: "option5" }
        ]}
      ></sgds-combo-box>`
    );
    await el.updateComplete;

    // Get and verify input element
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    expect(input, "Input element should exist").to.exist;
    expect(input instanceof HTMLInputElement, "Input should be HTMLInputElement").to.be.true;

    // Verify initial values
    expect(input.value).to.equal("Apple");
    expect(el.value).to.equal("option1");

    // Update value and wait for changes to propagate
    el.setAttribute("value", "option4");
    await el.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for value change to process

    // Verify value change
    expect(el.value).to.equal("option4");

    // Wait for and verify input update
    await waitUntil(() => input.value === "Grapes", "Input value should update to Grapes", { timeout: 2000 });
    expect(input.value).to.equal("Grapes");
  });
});

describe("multi select combobox", () => {
  it("when badge dismissed by keyboard, menu is synced", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option3"
      ></sgds-combo-box>`
    );
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active");
    const input = () => el.shadowRoot?.querySelector("input");
    input()?.focus();

    await sendKeys({ press: "Backspace" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']")).not.to.have.attribute("active");
  });

  it("when badge dismissed by mouseclick, menu and badges are sync", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option1;option2;option3"
      ></sgds-combo-box>`
    );
    const badges = () => el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
    expect(badges().length).to.equal(3);
    const appleBadgeCloseButton = badges()[0].shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
    appleBadgeCloseButton?.click();
    await waitUntil(() => el.value === "option2;option3");
    expect(badges()?.length).to.equal(2);
    expect(badges()[0].textContent).to.equal("Apricot");
    expect(badges()[1].textContent).to.equal("Durian");

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option1']")).not.to.have.attribute("active");
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option2']")).to.have.attribute("active");
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active");
  });

  it("when initial value is specified, input is populated, item is active", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option3"
      ></sgds-combo-box>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const badges = el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;

    expect(durianItem.active).to.be.true;
    expect(badges.length).to.equal(1);
    expect(badges[0].innerText).to.equal("Durian");
    expect(input.value).to.equal("");
    expect(el.value).to.equal("option3");
  });

  it("when initial value (more than 1) is specified, input is populated, item is active", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option1;option3"
      ></sgds-combo-box>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const badges = el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
    const appleItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option1']") as SgdsComboBoxOption;
    const apricotItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option2']") as SgdsComboBoxOption;
    expect(durianItem.active).to.be.true;
    expect(appleItem.active).to.be.true;
    expect(apricotItem.active).to.be.false;
    expect(badges.length).to.equal(2);
    expect(badges[0].innerText).to.equal("Apple");
    expect(badges[1].innerText).to.equal("Durian");
    expect(input.value).to.equal("");
    expect(el.value).to.equal("option1;option3");
  });

  it("invalid displayValue entered should be cleared when blurred", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();

    await sendKeys({ type: "asdfs" });
    await el.updateComplete;
    expect(input.value).to.equal("asdfs"); // equivalent to displayValue
    expect(el.value).to.equal("");
    input.blur();
    await el.updateComplete;
    expect(input.value).to.equal("");
    expect(el.value).to.equal("");
  });

  it("When input is cleared, the active item is no longer active, badge is removed", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
        value="option3"
      ></sgds-combo-box>`
    );
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
    expect(durianItem.active).to.be.true;

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    const badge = el.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
    expect(badge).to.exist;
    expect(badge.innerText).to.equal("Dur");
    input.focus();
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => el.value === "");
    const updatedDurianItem = el.shadowRoot?.querySelector(
      "sgds-combo-box-option[value='option3']"
    ) as SgdsComboBoxOption;
    expect(updatedDurianItem.active).to.be.false;

    const updatedBadge = el.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
    expect(updatedBadge).not.to.exist;
  });

  it("When no purposeful selection is made through clicking or keyboard, input clears when blur", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ type: "Dur" });

    await waitUntil(() => input.value === "Dur");
    input.blur();
    await waitUntil(() => input.value === "");
    expect(el.value).to.equal("");
    const durItem = el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
    expect(durItem.active).to.be.false;
  });

  it("Keyboard arrowDown and enter populates the input with badge", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.value).to.equal("option1");
    const badge = el.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
    expect(badge.innerText).to.equal("Apple");
  });

  it("Keyboard arrowDown and enter populates the input with badge, sgds-change and sgds-select will be called", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );

    const spySelect = sinon.spy();
    el.addEventListener("sgds-select", spySelect);

    const spyChange = sinon.spy();
    el.addEventListener("sgds-change", spyChange);

    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.focus();
    await sendKeys({ press: "ArrowDown" });
    await sendKeys({ press: "Enter" });
    await el.updateComplete;

    expect(spyChange).to.be.called;
    expect(spySelect).to.be.called;
  });

  it("When badge is dismissed and value is set to empty, sgds-change will be called", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Durian", value: "option3" }
        ]}
        value="option1"
      ></sgds-combo-box>`
    );

    const spySelect = sinon.spy();
    el.addEventListener("sgds-select", spySelect);

    const spyChange = sinon.spy();
    el.addEventListener("sgds-change", spyChange);

    const badges = () => el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
    expect(badges().length).to.equal(1);

    const badgeCloseBtn = badges()[0].shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
    badgeCloseBtn?.click();

    await waitUntil(() => spyChange.called);
    await waitUntil(() => spySelect.notCalled);

    expect(spyChange).to.be.called;
    expect(spySelect).not.to.be.called;
  });

  it("Menu filters while typing, but when reopen should show the full menu again", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = () => el.shadowRoot?.querySelector("input") as HTMLInputElement;
    input().focus();
    await sendKeys({ type: "D" });
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll("sgds-combo-box-option").length).to.equal(1);
    expect(el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0].textContent?.trim()).to.equal("Dur");

    el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0].shadowRoot?.querySelector("sgds-checkbox")?.click();

    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".dropdown-menu.show"));
    expect(el.shadowRoot?.querySelector("sgds-badge")?.textContent?.trim()).to.equal("Dur");

    input().click();

    await waitUntil(() => el.shadowRoot?.querySelector(".dropdown-menu.show"));
    expect(el.shadowRoot?.querySelectorAll("sgds-combo-box-option").length).to.equal(3);
    expect(el.shadowRoot?.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active");
  });

  it("when menu is close, focused is brought back to input", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        multiSelect
        .menuList=${[
          { label: "Apple", value: "option1" },
          { label: "Apricot", value: "option2" },
          { label: "Dur", value: "option3" }
        ]}
      ></sgds-combo-box>`
    );
    const input = () => el.shadowRoot?.querySelector("input");

    input()?.focus();
    await sendKeys({ press: "ArrowDown" });

    await waitUntil(() => {
      const comboItem1 = el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0];
      return el.shadowRoot?.activeElement === comboItem1;
    });

    await sendKeys({ press: "Escape" });
    await waitUntil(() => el.shadowRoot?.activeElement === input());
  });
});

describe("single select >> when submitting a form", () => {
  it("when required=true should block submission of form when there is no value", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-combo-box
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
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
        <sgds-combo-box
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
          value="option3"
        ></sgds-combo-box>
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
        <sgds-combo-box
          required
          disabled
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
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
        <sgds-combo-box
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
          value="option3"
        ></sgds-combo-box>
        <sgds-button type="submit"></sgds-button>
        <sgds-button type="reset"></sgds-button>
      </form>`
    );
    const input = () => form.querySelector("sgds-combo-box")?.shadowRoot?.querySelector("input");
    const comboBox = () => form.querySelector("sgds-combo-box");
    expect(input()?.value).to.equal("Dur");
    // Clear input
    input()?.focus();
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => input()?.value === "");

    const submitButton = form.querySelector<SgdsButton>("sgds-button[type='submit']");
    submitButton?.click();
    //submitting empty combobox value triggers invalid
    await waitUntil(() => comboBox()?.invalid);
    expect(comboBox()?.invalid).to.be.true;

    const resetButton = form.querySelector<SgdsButton>("sgds-button[type='reset']");
    resetButton?.click();
    // resets value to the defaultValue and removes the invalid state
    await waitUntil(() => !comboBox()?.invalid);
    expect(comboBox()?.invalid).to.be.false;
    expect(input()?.value).to.equal("Dur");
  });
  it("when touched and blurred and value is empty, error is shown", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          hasFeedback
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    el.blur();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector("input:invalid"));
  });
  it("when invalid, typing in the input sets invalid to false", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          hasFeedback
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    el.blur();

    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector("input:invalid"));
    input?.focus();
    await sendKeys({ type: "Abcd" });
    await waitUntil(() => el.shadowRoot?.querySelector("input")?.value === "Abcd");
    expect(el.invalid).to.be.false;
  });

  it("when traversing menu, no error should be shown", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          hasFeedback
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await waitUntil(() => {
      const comboItem1 = el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0];
      return el.shadowRoot?.activeElement === comboItem1;
    });
    expect(el.invalid).to.be.false;
  });
});

describe("multi select >> when submitting a form", () => {
  it("when required=true should block submission of form when there is no value", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-combo-box
          required
          multiSelect
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
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
        <sgds-combo-box
          required
          multiSelect
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
          value="option3"
        ></sgds-combo-box>
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
        <sgds-combo-box
          required
          disabled
          multiSelect
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
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
        <sgds-combo-box
          required
          multiSelect
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
          value="option3"
        ></sgds-combo-box>
        <sgds-button type="submit"></sgds-button>
        <sgds-button type="reset"></sgds-button>
      </form>`
    );
    const input = () => form.querySelector("sgds-combo-box")?.shadowRoot?.querySelector("input");
    const comboBox = () => form.querySelector("sgds-combo-box");
    const badge = () => comboBox()?.shadowRoot?.querySelector("sgds-badge");

    expect(badge()?.textContent).to.equal("Dur");
    // Clear input
    input()?.focus();
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => !badge());

    const submitButton = form.querySelector<SgdsButton>("sgds-button[type='submit']");
    submitButton?.click();
    //submitting empty combobox value triggers invalid
    await waitUntil(() => comboBox()?.invalid);
    expect(comboBox()?.invalid).to.be.true;

    const resetButton = form.querySelector<SgdsButton>("sgds-button[type='reset']");
    resetButton?.click();
    // resets value to the defaultValue and removes the invalid state
    await waitUntil(() => !comboBox()?.invalid);
    expect(comboBox()?.invalid).to.be.false;
    expect(badge()?.textContent).to.equal("Dur");
  });
  it("when touched and blurred and value is empty, error is shown", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          hasFeedback
          multiSelect
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    el.blur();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector("input:invalid"));
  });
  it("when invalid, typing in the input sets invalid to false", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          hasFeedback
          required
          multiSelect
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    el.blur();

    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector("input:invalid"));
    input?.focus();
    await sendKeys({ type: "Abcd" });
    await waitUntil(() => el.shadowRoot?.querySelector("input")?.value === "Abcd");
    expect(el.invalid).to.be.false;
  });

  it("when traversing menu, no error should be shown", async () => {
    const el = await fixture<SgdsComboBox>(
      html`
        <sgds-combo-box
          hasFeedback
          multiSelect
          required
          .menuList=${[
            { label: "Apple", value: "option1" },
            { label: "Apricot", value: "option2" },
            { label: "Dur", value: "option3" }
          ]}
        ></sgds-combo-box>
      `
    );
    const input = el.shadowRoot?.querySelector("input");
    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await waitUntil(() => {
      const comboItem1 = el.shadowRoot?.querySelectorAll("sgds-combo-box-option")[0];
      return el.shadowRoot?.activeElement === comboItem1;
    });
    expect(el.invalid).to.be.false;
  });
});

// UT scenarios
// Single Select
// 1. when initial value is specified, input is populated, item is active (DONE)
// 2. When invalid displayValue is written, it should clear the input after losing focus (DONE)
// 3. When input value matches an item, item menu is shown and focused . On enter populates the input (??? clarify with andy)
// 4. When input is cleared, the active item is no longer active (DONE)
// 5. When a selection is made and input is blurred. The value of input or displayValue will sync with the menu selected item regardless of the value (DONE)
// 6. If a purposeful selection is not made through enter or click, input is blurred. the displayValue clears regardless if value match anot (DONE)
// 7. Keyboard ArrowDown and Enter populates the input with value (DONE)
// 8. Menu filters while typing, but when reopen should show the full menu again
//9. When menu is close, focus is brought back to input
// Required VALIDATION
// 8. When first submitted untouched, throw error (DONE)
// 9. When touched and blurred, throw error (DONE)
// 10. When typing, error should be gone (DONE)
// 11. when traversing menu, no error to show (DONE)
// 12. When reset, no error , values revert to defaultValue (DONE)

// UT scenarios
// Multi Select
// 1. when initial value is specified, input is populated, item is checked and active, badge is in input (DONE)
// 2. When invalid displayValue is written, it should clear the input after losing focus (DONE)
// 3. When input value matches an item, item menu is shown and focused . On enter populates the input (??? clarify with andy)
// 4. If a purposeful selection is not made through enter or click, input is blurred. the displayValue clears regardless if value match anot (DONE)
// 5. When a badge is cancelled, it syncs with the removal actie item in the menu (DONE)
// 6. Keyboard arrowdown and enter populates the input with badge (DONE)
// 8. Menu filters while typing, but when reopen should show the full menu again
