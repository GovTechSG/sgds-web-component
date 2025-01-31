import { assert, elementUpdated, expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import "./sgds-web-component";

import type { SgdsBadge, SgdsComboBox, SgdsComboBoxItem, SgdsInput } from "../src/components";

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
        <sgds-input
          aria-autocomplete="list"
          aria-controls="id-7895-sgds-dropdown-menu-div"
          aria-expanded="false"
          class="dropdown-toggle"
          hinttext=""
          invalidfeedback=""
          label=""
          name=""
          placeholder="placeholder"
          required=""
          role="combobox"
          suffix="[object Object]"
          type="text"
          value=""
          >
        </sgds-input>
        <ul
          class="dropdown-menu"
          id="id-7895-sgds-dropdown-menu-div"
          part="menu"
          tabindex="-1"
          >
          <sgds-combo-box-item
            aria-disabled="false"
            role="menuitem"
            value="option1"
          >
            Option 1
          </sgds-combo-box-item>
          <sgds-combo-box-item
            aria-disabled="false"
            role="menuitem"
            value="option2"
          >
            Option 2
          </sgds-combo-box-item>
        </ul>
          `,
      { ignoreAttributes: ["id", "aria-controls"] }
    );
  });
  it("should be disabled with the disabled attribute to be true", async () => {
    const el = await fixture(html`<sgds-combo-box disabled></sgds-combo-box>`);
    const comboBoxInput = el.shadowRoot?.querySelector("sgds-input")?.shadowRoot?.querySelector("input");
    expect(comboBoxInput?.disabled).to.be.true;
  });

  it("should emit sgds-select when combobx value is updated", async () => {
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
    const comboBoxInput = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;

    const inputHandler = sinon.spy();
    el?.addEventListener("sgds-input", inputHandler);

    comboBoxInput.focus();
    await sendKeys({ press: "A" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputHandler).to.have.been.calledOnce;
  });

  it("should update value of selected item", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box
        .menuList=${[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" }
        ]}
      ></sgds-combo-box>`
    );

    const input = el.shadowRoot?.querySelector("sgds-input");
    input?.click();
    await waitUntil(() => el.shadowRoot?.querySelector(".dropdown-menu.show"));

    const item = el.shadowRoot?.querySelectorAll("sgds-combo-box-item")[0] as SgdsComboBoxItem;
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
    const input = el.shadowRoot?.querySelector("sgds-input");
    input?.focus();
    await sendKeys({ type: "a" });

    // should only have "apple", "apricot"
    await el.updateComplete;
    expect(input?.value).to.equal("a");
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-item");
    await waitUntil(() => items?.length === 2);

    // should only have "apple"
    await sendKeys({ type: "pp" });
    await el.updateComplete;
    expect(input?.value).to.equal("app");
    // items = el.shadowRoot?.querySelectorAll("sgds-combo-box-item");
    await waitUntil(() => el.shadowRoot?.querySelectorAll("sgds-combo-box-item").length === 1);
    const item = el.shadowRoot?.querySelector("sgds-combo-box-item");
    const itemVal = (item as SgdsComboBoxItem).innerText;
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

    const input = el.shadowRoot?.querySelector("sgds-input");
    input?.focus();
    await sendKeys({ type: "test" });
    await el.updateComplete;
    expect(input?.value).to.equal("test");
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-item");
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
    const comboBoxInput = el.shadowRoot?.querySelector("sgds-input") as HTMLElement;
    expect(comboBoxInput, "sgds-input not found").to.exist;
    comboBoxInput.click();
    await el.updateComplete;

    // Expect 2 <sgds-combo-box-item>
    const items = el.shadowRoot?.querySelectorAll("sgds-combo-box-item") || [];
    expect(items.length).to.equal(2);

    items.forEach(item => {
      // The item’s shadow root should contain <sgds-checkbox>
      const checkboxEl = item.shadowRoot?.querySelector("sgds-checkbox") as HTMLElement;
      expect(checkboxEl, "sgds-checkbox found").to.exist;
    });
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
    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
    // const appleItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option1']") as SgdsComboBoxItem;
    // const apricotItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option2']") as SgdsComboBoxItem;

    expect(input.value).to.equal("Durian");
    expect(el.value).to.equal("option3");
    expect(durianItem.active).to.be.true;
    // expect(appleItem.active).to.be.false
    // expect(apricotItem.active).to.be.false
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
    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
    expect(durianItem.active).to.be.true;

    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    input.focus();
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => el.value === "");
    const updatedDurianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
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

    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    input.focus();
    await sendKeys({ type: "Dur" });

    await waitUntil(() => input.value === "Dur");
    input.blur();
    await waitUntil(() => input.value === "");
    expect(el.value).to.equal("");
    const durItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
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

    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    input.focus();
    await sendKeys({ type: "rubbish" });
    await waitUntil(() => el.shadowRoot?.querySelector("sgds-input")?.value === "Applerubbish");
    expect(el.value).to.equal("option1");

    input.blur();
    await waitUntil(() => el.shadowRoot?.querySelector("sgds-input")?.value === "Apple");
    expect(el.value).to.equal("option1");
  });
});

describe("multi select combobox", () => {
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
    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const badges = input.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;

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
    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const badges = input.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
    const appleItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option1']") as SgdsComboBoxItem;
    const apricotItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option2']") as SgdsComboBoxItem;
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
    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
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
    const durianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
    expect(durianItem.active).to.be.true;

    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const badge = input.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
    expect(badge).to.exist;
    expect(badge.innerText).to.equal("Dur");
    input.focus();
    await sendKeys({ press: "Backspace" });
    await waitUntil(() => el.value === "");
    const updatedDurianItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
    expect(updatedDurianItem.active).to.be.false;

    const updatedBadge = input.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
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

    const input = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    input.focus();
    await sendKeys({ type: "Dur" });

    await waitUntil(() => input.value === "Dur");
    input.blur();
    await waitUntil(() => input.value === "");
    expect(el.value).to.equal("");
    const durItem = el.shadowRoot?.querySelector("sgds-combo-box-item[value='option3']") as SgdsComboBoxItem;
    expect(durItem.active).to.be.false;
  });
});

// UT scenarios
// Single Select
// 1. when initial value is specified, input is populated, item is active (DONE)
// 2. When invalid displayValue is written, it should clear the input after losing focus (DONE)
// 3. When input value matches an item, item menu is shown and focused . On enter populates the input
// 4. When input is cleared, the active item is no longer active (DONE)
// 5. When a selection is made and input is blurred. The value of input or displayValue will sync with the menu selected item regardless of the value (DONE)
// 6. If a purposeful selection is not made through enter or click, input is blurred. the displayValue clears regardless if value match anot (DONE)

// UT scenarios
// Multi Select
// 1. when initial value is specified, input is populated, item is checked and active, badge is in input (DONE)
// 2. When invalid displayValue is written, it should clear the input after losing focus (DONE)
// 3. When input value matches an item, item menu is shown and focused . On enter populates the input
// 4. If a purposeful selection is not made through enter or click, input is blurred. the displayValue clears regardless if value match anot (DONE)
// 5. When a badge is cancelled, it syncs with the removal actie item in the menu (DONE)
