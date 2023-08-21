import { html } from "lit";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { SgdsComboBox } from "../src/components/ComboBox";
import sinon from "sinon";
import { SgdsDropdownItem } from "../src/components/Dropdown";
import { sendKeys } from "@web/test-runner-commands";
import { SgdsInput } from "../src/components/Input";

customElements.define("sgds-combo-box", SgdsComboBox);

describe("<sgds-combo-box>", () => {
  it("should be disabled with the disabled attribute to be true", async () => {
    const el = await fixture(html`<sgds-combo-box disabled></sgds-combo-box>`);
    const comboBoxInput = el.shadowRoot?.querySelector("sgds-input")?.shadowRoot?.querySelector("input");
    expect(comboBoxInput?.disabled).to.be.true;
  });

  it("should emit sgds-select event when a dropdown item is selected", async () => {
    const el = await fixture(html`<sgds-combo-box .menuList=${["Item #1", "Item #2"]}></sgds-combo-box>`);

    const selectHandler = sinon.spy();
    el?.addEventListener("sgds-select", selectHandler);

    const item = el.shadowRoot?.querySelector("sgds-dropdown-item") as SgdsDropdownItem;
    item?.click();

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
    const el = await fixture<SgdsComboBox>(html`<sgds-combo-box .menuList=${["Item #1", "Item #2"]}></sgds-combo-box>`);

    expect(el).to.have.attribute("value", undefined);

    const item = el.shadowRoot?.querySelector("sgds-dropdown-item") as SgdsDropdownItem;
    item?.click();

    await el.updateComplete;

    expect(el).to.have.attribute("value", "Item #1");
  });

  it("should not show any items in dropdown menu when there is no match (for default filter)", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box .menuList=${["apple", "pear", "orange", "apricot"]}></sgds-combo-box>`
    );

    el.value = "apples";
    await el.updateComplete;
    const items = el.shadowRoot?.querySelectorAll("sgds-dropdown-item");
    expect(items?.length).to.equal(0);
  });

  it("should filter the right items (for default filter)", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box .menuList=${["apple", "pear", "orange", "apricot"]}></sgds-combo-box>`
    );

    // should only have "apple", "apricot"
    el.value = "a";
    await el.updateComplete;
    let items = el.shadowRoot?.querySelectorAll("sgds-dropdown-item");
    items?.forEach(item => {
      const itemVal = (item as SgdsDropdownItem).innerText;
      expect(itemVal).to.oneOf(["apple", "apricot"]);
    });

    // should only have "apple"
    el.value = "app";
    await el.updateComplete;
    items = el.shadowRoot?.querySelectorAll("sgds-dropdown-item");
    expect(items?.length).to.equal(1);
    const item = el.shadowRoot?.querySelector("sgds-dropdown-item");
    const itemVal = (item as SgdsDropdownItem).innerText;
    expect(itemVal).to.equal("apple");
  });

  it("should change filterFunction", async () => {
    const el = await fixture<SgdsComboBox>(
      html`<sgds-combo-box .menuList=${["apple", "pear", "orange", "apricot"]}></sgds-combo-box>`
    );

    // filterFunction that accepts all menuItem regardless of inputValue
    el.filterFunction = () => true;

    el.value = "test";
    await el.updateComplete;
    const items = el.shadowRoot?.querySelectorAll("sgds-dropdown-item");
    expect(items?.length).to.equal(4);
  });
});
