import { assert, aTimeout, elementUpdated, expect, fixture, oneEvent, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import "./sgds-web-component";

import { ifDefined } from "lit/directives/if-defined.js";
import type { SgdsBadge, SgdsButton, SgdsCheckbox, SgdsComboBox } from "../src/components";
import SgdsComboBoxOption from "../src/components/ComboBox/sgds-combo-box-option";
import SgdsCloseButton from "../src/internals/CloseButton/sgds-close-button";
interface IComboBoxRenderProps {
  multiSelect?: boolean;
  value?: string;
}
const FiveOptionsCombobox = [
  {
    render: ({ multiSelect, value }: IComboBoxRenderProps) => html`<sgds-combo-box
      ?multiSelect=${multiSelect}
      value=${ifDefined(value)}
      .menuList=${[
        { label: "Apple", value: "option1" },
        { label: "Apricot", value: "option2" },
        { label: "Durian", value: "option3" },
        { label: "Grapes", value: "option4" },
        { label: "Orange", value: "option5" }
      ]}
    ></sgds-combo-box>`,
    mode: "property"
  },
  {
    render: ({ multiSelect, value }: IComboBoxRenderProps) => html`<sgds-combo-box
      ?multiSelect=${multiSelect}
      value=${ifDefined(value)}
    >
      <sgds-combo-box-option value="option1">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="option2">Apricot</sgds-combo-box-option>
      <sgds-combo-box-option value="option3">Durian</sgds-combo-box-option>
      <sgds-combo-box-option value="option4">Grapes</sgds-combo-box-option>
      <sgds-combo-box-option value="option5">Orange</sgds-combo-box-option>
    </sgds-combo-box>`,
    mode: "slot"
  }
];

const TwoOptionsComboBox = [
  {
    render: ({ multiSelect }: IComboBoxRenderProps) => html`<sgds-combo-box
      ?multiSelect=${multiSelect}
      .menuList=${[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" }
      ]}
    ></sgds-combo-box>`,
    mode: "property"
  },
  {
    render: ({ multiSelect }: IComboBoxRenderProps) => html`<sgds-combo-box ?multiSelect=${multiSelect}>
      <sgds-combo-box-option value="option1">Option 1</sgds-combo-box-option>
      <sgds-combo-box-option value="option2">Option 2</sgds-combo-box-option>
    </sgds-combo-box>`,
    mode: "slot"
  }
];

const ThreeOptionsComboBox = [
  {
    render: ({ value, multiSelect }: IComboBoxRenderProps) => html`<sgds-combo-box
      .menuList=${[
        { label: "Apple", value: "option1" },
        { label: "Apricot", value: "option2" },
        { label: "Durian", value: "option3" }
      ]}
      ?multiSelect=${multiSelect}
      value=${ifDefined(value)}
    ></sgds-combo-box>`,
    mode: "property"
  },
  {
    render: ({ value, multiSelect }: IComboBoxRenderProps) => html`<sgds-combo-box
      ?multiSelect=${multiSelect}
      value=${ifDefined(value)}
    >
      <sgds-combo-box-option value="option1">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="option2">Apricot</sgds-combo-box-option>
      <sgds-combo-box-option value="option3">Durian</sgds-combo-box-option>
    </sgds-combo-box>`,
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
      <div class="combobox form-control-container">
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
              <slot><div class="empty-menu">No options</div></slot> 
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
    expect(el.menuIsOpen).to.be.false;

    input?.focus();
    await sendKeys({ press: "ArrowDown" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
    await sendKeys({ press: "ArrowUp" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
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
    const listener = oneEvent(el, "sgds-input");

    comboBoxInput?.focus();
    await sendKeys({ press: "A" });
    const event = await listener;
    expect(event.detail).to.deep.equal({ displayValue: "A" });
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

  TwoOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, mouse click on item, should update value of selected item`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: false }));

      const input = el.shadowRoot?.querySelector("input");
      input?.click();
      await waitUntil(() => el.menuIsOpen);
      const item = el?.querySelectorAll("sgds-combo-box-option")[0] as SgdsComboBoxOption;
      const itemContent = item.shadowRoot?.querySelector("div.normal-item-content") as HTMLDivElement;
      itemContent?.click();

      await waitUntil(() => el.value === "option1");

      expect(el.value).to.equal("option1");
    });
  });

  TwoOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode}should not show any items in dropdown menu when there is no match (for default filter)`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: false }));

      el.value = "apples";
      await el.updateComplete;
      const items = el.shadowRoot?.querySelectorAll("sgds-combox-box-option");
      expect(items?.length).to.equal(0);
    });
  });

  ThreeOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode},should filter the right items (for default filter)`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));
      const input = el.shadowRoot?.querySelector("input");
      input?.focus();
      await sendKeys({ type: "a" });

      // should only have "apple", "apricot"
      await el.updateComplete;
      expect(input?.value).to.equal("a");
      const items = el.querySelectorAll("sgds-combo-box-option:not([hidden])");
      await waitUntil(() => items?.length === 2);

      // should only have "apple"
      await sendKeys({ type: "pp" });
      await el.updateComplete;
      expect(input?.value).to.equal("app");
      await waitUntil(() => el.querySelectorAll("sgds-combo-box-option:not([hidden])").length === 1);
      const item = el.querySelector("sgds-combo-box-option");
      const itemVal = (item as SgdsComboBoxOption).innerText;
      expect(itemVal).to.equal("Apple");
    });
  });

  ThreeOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, should change filterFunction`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));

      // filterFunction that accepts all menuItem regardless of inputValue
      el.filterFunction = () => true;

      const input = el.shadowRoot?.querySelector("input");
      input?.focus();
      await sendKeys({ type: "test" });
      await el.updateComplete;
      expect(input?.value).to.equal("test");
      const items = el.querySelectorAll("sgds-combo-box-option:not([hidden])");
      expect(items?.length).to.equal(3);
    });
  });

  TwoOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, should display checkboxes for each item in multi-select mode`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

      // Open dropdown
      const comboBoxInput = el.shadowRoot?.querySelector("input") as HTMLElement;
      expect(comboBoxInput, "input not found").to.exist;
      comboBoxInput.click();
      await el.updateComplete;

      // Expect 2 <sgds-combo-box-option>
      const items = () => el.querySelectorAll("sgds-combo-box-option:not([hidden])") || [];
      await waitUntil(() => items().length === 2);
      expect(items().length).to.equal(2);

      items().forEach(item => {
        // The item’s shadow root should contain <sgds-checkbox>
        const checkboxEl = item.shadowRoot?.querySelector("sgds-checkbox") as HTMLElement;
        expect(checkboxEl, "sgds-checkbox found").to.exist;
      });
    });
    it(`MODE=${mode}, empty menu appears when no search options found`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: false }));
      const comboBoxInput = el.shadowRoot?.querySelector("input") as HTMLElement;
      comboBoxInput.focus();
      await sendKeys({ type: "abcd" });

      await el.updateComplete;
      expect(el.shadowRoot?.querySelector(".empty-menu")).to.exist;
    });
  });

  it("should display the badge with max-width of 192px with badgeFullWidth is not set", async () => {
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --sgds-dimension-192: 192px;
      }
    `;
    document.head.appendChild(style);

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
    const parentContainer = () => el.shadowRoot?.querySelector(".combobox-input-container");

    await waitUntil(() => parentContainer());

    const parentWidth = getComputedStyle(parentContainer() as Element).width;

    const badge = el.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
    const badgeEl = badge.shadowRoot?.querySelector(".badge") as HTMLElement;

    const styles = getComputedStyle(badgeEl);
    const badgeWidth = styles.width;

    // should not match width parent width
    expect(badgeWidth).to.equal("192px");
    expect(badgeWidth).not.to.equal(parentWidth);
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
    await waitUntil(() => badge?.clientWidth === parentContainer?.clientWidth);
    // should match width parent width
    expect(badge?.clientWidth).to.equal(parentContainer?.clientWidth);
  });

  FiveOptionsCombobox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, (multiselect) when menu list is updated, and the current value is no longer valid it should null the value`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true, value: "option1;option2" }));

      expect(el.value).to.equal("option1;option2");
      const newMenuList = [
        { label: "Durian", value: "option3" },
        { label: "Grapes", value: "option4" },
        { label: "Orange", value: "option5" }
      ];
      if (mode === "property") {
        el.setAttribute("menuList", JSON.stringify(newMenuList));
      } else {
        const newElements = newMenuList.map(list => {
          const newOption = document.createElement("sgds-combo-box-option");
          newOption.textContent = list.label;
          newOption.setAttribute("value", "option3");
          return newOption;
        });
        el.replaceChildren(...newElements);
        el.requestUpdate();
      }

      await el.updateComplete;
      // testing that menu has changed
      const newMenu = () => el.querySelectorAll("sgds-combo-box-option")[0];
      await waitUntil(() => newMenu()?.textContent.trim() === "Durian");
      expect(newMenu()?.textContent.trim()).to.equal("Durian");
      await waitUntil(() => el.value === "");
      expect(el.value).to.equal("");
    });
    it("when value is updated, it should reflect the new value on the select", async () => {
      // Create component with initial value
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true, value: "option1;option2" }));
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

  it("No option dropdown item should present when no child is provided", async () => {
    const el = await fixture<SgdsComboBox>(html`<sgds-combo-box
      label="Combobox using slot"
      hinttext="Select an option"
      placeholder="Select an option"
    ></sgds-combo-box>`);

    const input = el.shadowRoot?.querySelector("input");
    input?.click();

    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;

    expect(el.shadowRoot?.querySelectorAll(".empty-menu")).to.exist;
  });
  it("no option div should not persist when menu is closed", async () => {
    const el = await fixture<SgdsComboBox>(html`<sgds-combo-box
      label="Combobox using slot"
      hinttext="Select an option"
      placeholder="Select an option"
      ><sgds-combo-box-option value="one">One</sgds-combo-box-option>
    </sgds-combo-box>`);
    expect(el.shadowRoot?.querySelector("ul>.empty-menu")).to.not.exist;
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input.form-control");
    input?.focus();

    await el.updateComplete;
    await sendKeys({ type: "x" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("ul>.empty-menu")).to.exist;
    input?.blur();
    await el.updateComplete;
    input?.click();
    await waitUntil(() => !el.shadowRoot?.querySelector("ul>.empty-menu"));
    expect(el.shadowRoot?.querySelector("ul>.empty-menu")).to.not.exist;
  });
});

describe("single select combobox", () => {
  ThreeOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode} when initial value is specified, input is populated, item is active`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option3" }));
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const durianItem = () => el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      await waitUntil(() => input.value === "Durian");
      expect(input.value).to.equal("Durian");
      expect(el.value).to.equal("option3");
      expect(durianItem().active).to.be.true;
    });

    it(`MODE=${mode} invalid displayValue entered should be cleared when blurred`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));
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

    it(`MODE=${mode}, When input is cleared, the active item is no longer active`, async () => {
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
      const durianItem = el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      expect(durianItem.active).to.be.true;

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      input.focus();
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await sendKeys({ press: "Backspace" });
      await waitUntil(() => el.value === "");
      const updatedDurianItem = el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      expect(updatedDurianItem.active).to.be.false;
    });

    it(`MODE=${mode} When no purpose selection is made through clicking or keyboard, input clears when blur`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      input.focus();
      await sendKeys({ type: "Durian" });

      await waitUntil(() => input.value === "Durian");
      input.blur();
      await waitUntil(() => input.value === "");
      expect(el.value).to.equal("");
      const durItem = el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      expect(durItem.active).to.be.false;
    });

    it(`MODE=${mode} When there is already a selectedItem, even when user types more rubbish, the value of input or displayValue will sync with the menu selected item regardless of the value`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option1" }));

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

    it(`MODE=${mode} Keyboard arrowDown and enter populates the input and update value`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      await simulateUserClick(input);

      await sendKeys({ press: "ArrowDown" });
      await sendKeys({ press: "Enter" });

      expect(el.value).to.equal("option1");
      expect(input.value).to.equal("Apple");
    });
    it(`MODE=${mode} Keyboard arrowDown and enter populates the input and update value, sgds-change and sgds-select will be called`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));

      const spySelect = sinon.spy();
      el.addEventListener("sgds-select", spySelect);

      const spyChange = sinon.spy();
      el.addEventListener("sgds-change", spyChange);

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      await simulateUserClick(input);

      await sendKeys({ press: "ArrowDown" });
      await sendKeys({ press: "Enter" });
      await el.updateComplete;

      expect(spyChange).to.be.called;
      expect(spySelect).to.be.called;
    });

    it(`MODE=${mode} Menu filters while typing, but when reopen should show the full menu again`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));

      const input = () => el.shadowRoot?.querySelector("input") as HTMLInputElement;
      input().focus();
      await sendKeys({ type: "D" });
      await waitUntil(() => el.querySelectorAll("sgds-combo-box-option:not([hidden])").length === 1);
      expect(el.querySelectorAll("sgds-combo-box-option:not([hidden])").length).to.equal(1);
      expect(el.querySelectorAll("sgds-combo-box-option:not([hidden])")[0].textContent?.trim()).to.equal("Durian");

      const item = el
        ?.querySelectorAll("sgds-combo-box-option:not([hidden])")[0]
        .shadowRoot?.querySelector(".normal-item-content") as HTMLElement;
      item.click();

      await el.updateComplete;
      await waitUntil(() => !el.menuIsOpen);
      expect(input().value).to.equal("Durian");

      input().click();

      await waitUntil(() => el.menuIsOpen);
      expect(el.querySelectorAll("sgds-combo-box-option:not([hidden])").length).to.equal(3);
      expect(el.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active");
    });

    it(`MODE=${mode}, when menu is close, focused is brought back to input`, async () => {
      const el = await fixture<SgdsComboBox>(render({}));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

      await simulateUserClick(input);
      await waitUntil(() => el.menuIsOpen === true, "menu did not open", { timeout: 2000 });
      expect(getComputedStyle(menuEl).display).to.equal("block");

      await sendKeys({ press: "ArrowDown" });

      await waitUntil(
        () => {
          const comboItem1 = el.querySelectorAll("sgds-combo-box-option")[0];
          return document.activeElement === comboItem1;
        },
        "focus did not move into first combo item",
        { timeout: 2000 }
      );

      await sendKeys({ press: "Escape" });
      await waitUntil(() => getRootActiveElement(input) === input, "focus did not return to the input after Escape", {
        timeout: 2000
      });
      expect(getRootActiveElement(input)).to.equal(input);
    });
  });
  FiveOptionsCombobox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, when menu list is updated, and the current value is no longer valid it should null the value`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: false, value: "option1" }));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      await waitUntil(() => input.value === "Apple");
      expect(input.value).to.equal("Apple");
      expect(el.value).to.equal("option1");

      const newMenuList = [
        { label: "Durian", value: "option3" },
        { label: "Grapes", value: "option4" },
        { label: "Orange", value: "option5" }
      ];
      if (mode === "property") {
        el.setAttribute("menuList", JSON.stringify(newMenuList));
      } else {
        const newElements = newMenuList.map(list => {
          const newOption = document.createElement("sgds-combo-box-option");
          newOption.textContent = list.label;
          newOption.setAttribute("value", "option3");
          return newOption;
        });
        el.replaceChildren(...newElements);
        el.requestUpdate();
      }
      await el.updateComplete;
      await waitUntil(() => input.value === "");
      expect(input.value).to.equal("");
      expect(el.value).to.equal("");
    });
  });

  FiveOptionsCombobox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, when value is updated, it should reflect the new value on the select`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option1", multiSelect: false }));

      await el.updateComplete;

      // Get and verify input element
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      expect(input, "Input element should exist").to.exist;
      expect(input instanceof HTMLInputElement, "Input should be HTMLInputElement").to.be.true;

      // Verify initial values
      await waitUntil(() => input.value === "Apple");
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
});

describe("multi select combobox", () => {
  ThreeOptionsComboBox.forEach(({ render, mode }) => {
    it(`MODE=${mode}, when badge dismissed by keyboard, menu is synced`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option3", multiSelect: true }));
      const option3 = () => el.querySelector<SgdsComboBoxOption>("sgds-combo-box-option[value='option3']");
      await option3()?.updateComplete;
      await waitUntil(() => option3());
      expect(option3()).to.have.attribute("active");
      const input = () => el.shadowRoot?.querySelector("input");
      input()?.focus();

      await sendKeys({ press: "Backspace" });
      await waitUntil(() => expect(option3()).not.to.have.attribute("active"));
    });
    it(`MODE=${mode}, when badge dismissed by mouseclick, menu and badges are sync`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option1;option2;option3", multiSelect: true }));

      const badges = () => el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
      await waitUntil(() => badges().length === 3);
      expect(badges().length).to.equal(3);
      const appleBadgeCloseButton = badges()[0].shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
      appleBadgeCloseButton?.click();
      await waitUntil(() => el.value === "option2;option3");
      expect(badges()?.length).to.equal(2);
      expect(badges()[0].textContent).to.equal("Apricot");
      expect(badges()[1].textContent).to.equal("Durian");

      await el.updateComplete;
      await waitUntil(() =>
        expect(el.querySelector("sgds-combo-box-option[value='option1']")).not.to.have.attribute("active")
      );
      await waitUntil(() =>
        expect(el.querySelector("sgds-combo-box-option[value='option2']")).to.have.attribute("active")
      );
      await waitUntil(() =>
        expect(el.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active")
      );
    });
    it(`MODE=${mode}, when initial value is specified, input is populated, item is active`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option3", multiSelect: true }));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const badges = () => el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
      const durianItem = () => el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      await waitUntil(() => durianItem());
      expect(durianItem().active).to.be.true;
      await waitUntil(() => badges().length === 1);
      expect(badges().length).to.equal(1);
      expect(badges()[0].innerText).to.equal("Durian");
      expect(input.value).to.equal("");
      expect(el.value).to.equal("option3");
    });

    it(`MODE=${mode}, when initial value (more than 1) is specified, input is populated, item is active`, async () => {
      const el = await fixture<SgdsComboBox>(render({ value: "option1;option3", multiSelect: true }));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const badges = () => el.shadowRoot?.querySelectorAll("sgds-badge");
      const durianItem = () => el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      const appleItem = () => el.querySelector("sgds-combo-box-option[value='option1']") as SgdsComboBoxOption;
      const apricotItem = () => el.querySelector("sgds-combo-box-option[value='option2']") as SgdsComboBoxOption;
      await waitUntil(() => durianItem());
      await waitUntil(() => appleItem());
      await waitUntil(() => apricotItem());
      expect(durianItem().active).to.be.true;
      expect(appleItem().active).to.be.true;
      expect(apricotItem().active).to.be.false;
      await waitUntil(() => badges()?.length === 2);
      expect(badges()?.[0].innerText).to.equal("Apple");
      expect(badges()?.[1].innerText).to.equal("Durian");
      expect(input.value).to.equal("");
      expect(el.value).to.equal("option1;option3");
    });
    it(`MODE=${mode}, invalid displayValue entered should be cleared when blurred`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

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

    it(`MODE=${mode}, When input is cleared, the active item is no longer active, badge is removed`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true, value: "option3" }));
      const durianItem = () => el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      await waitUntil(() => durianItem());
      expect(durianItem().active).to.be.true;

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const badge = () => el.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
      await waitUntil(() => badge());
      expect(badge().innerText).to.equal("Durian");
      input.focus();
      await sendKeys({ press: "Backspace" });
      await waitUntil(() => el.value === "");
      const updatedDurianItem = () => el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      await updatedDurianItem().updateComplete;
      expect(updatedDurianItem().active).to.be.false;
      await el.updateComplete;
      expect(badge()).not.to.exist;
    });
    it(`MODE=${mode},When no purposeful selection is made through clicking or keyboard, input clears when blur`, async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      input.focus();
      await sendKeys({ type: "Durian" });

      await waitUntil(() => input.value === "Durian");
      input.blur();
      await waitUntil(() => input.value === "");
      expect(el.value).to.equal("");
      const durItem = el.querySelector("sgds-combo-box-option[value='option3']") as SgdsComboBoxOption;
      expect(durItem.active).to.be.false;
    });
    it("Keyboard arrowDown and enter populates the input with badge", async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      await simulateUserClick(input);

      await sendKeys({ press: "ArrowDown" });
      await sendKeys({ press: "Enter" });

      expect(el.value).to.equal("option1");
      const badge = el.shadowRoot?.querySelector("sgds-badge") as SgdsBadge;
      expect(badge.innerText).to.equal("Apple");
    });

    it("Keyboard arrowDown and enter populates the input with badge, sgds-change and sgds-select will be called", async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

      const spySelect = sinon.spy();
      el.addEventListener("sgds-select", spySelect);

      const spyChange = sinon.spy();
      el.addEventListener("sgds-change", spyChange);

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      await simulateUserClick(input);

      await sendKeys({ press: "ArrowDown" });
      await sendKeys({ press: "Enter" });

      expect(spyChange).to.be.called;
      expect(spySelect).to.be.called;
    });

    it("When badge is dismissed and value is set to empty, sgds-change will be called", async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true, value: "option1" }));

      const spySelect = sinon.spy();
      el.addEventListener("sgds-select", spySelect);

      const spyChange = sinon.spy();
      el.addEventListener("sgds-change", spyChange);

      const badges = () => el.shadowRoot?.querySelectorAll("sgds-badge") as NodeListOf<SgdsBadge>;
      await waitUntil(() => badges().length === 1);
      expect(badges().length).to.equal(1);

      const badgeCloseBtn = badges()[0].shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
      badgeCloseBtn?.click();

      await waitUntil(() => spyChange.called);
      await waitUntil(() => spySelect.notCalled);

      expect(spyChange).to.be.called;
      expect(spySelect).not.to.be.called;
    });
    it("Menu filters while typing, but when reopen should show the full menu again", async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

      const input = () => el.shadowRoot?.querySelector("input") as HTMLInputElement;
      input().focus();
      await sendKeys({ type: "D" });
      await waitUntil(() => el.querySelectorAll("sgds-combo-box-option:not([hidden])").length === 1);
      expect(el.querySelectorAll("sgds-combo-box-option:not([hidden])")[0].textContent?.trim()).to.equal("Durian");

      el.querySelectorAll("sgds-combo-box-option:not([hidden])")[0].shadowRoot?.querySelector("sgds-checkbox")?.click();

      await el.updateComplete;
      await waitUntil(() => !el.menuIsOpen);
      expect(el.shadowRoot?.querySelector("sgds-badge")?.textContent?.trim()).to.equal("Durian");

      input().click();

      await waitUntil(() => el.menuIsOpen);
      expect(el.querySelectorAll("sgds-combo-box-option:not([hidden])").length).to.equal(3);
      expect(el.querySelector("sgds-combo-box-option[value='option3']")).to.have.attribute("active");
    });
    it("when menu is close, focused is brought back to input", async () => {
      const el = await fixture<SgdsComboBox>(render({ multiSelect: true }));

      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLUListElement;

      await simulateUserClick(input);

      await waitUntil(() => el.menuIsOpen === true, "menu did not open", { timeout: 2000 });

      expect(getComputedStyle(menuEl).display).to.equal("block");

      await sendKeys({ press: "ArrowDown" });
      await waitUntil(
        () => {
          const comboItem1 = el.querySelectorAll("sgds-combo-box-option")[0];
          return document.activeElement === comboItem1;
        },
        "focus did not move into first combo item",
        { timeout: 2000 }
      );

      await sendKeys({ press: "Escape" });
      await waitUntil(() => getRootActiveElement(input) === input, "focus did not return to the input after Escape", {
        timeout: 2000
      });
      expect(getRootActiveElement(input)).to.equal(input);
    });
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
    await waitUntil(() => form.reportValidity());
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
  it("when value exist in required field, pressing submit should not show error", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-combo-box required value="option1">
          <sgds-combo-box-option value="option1">Apple</sgds-combo-box-option>
          <sgds-combo-box-option value="option2">Apricot</sgds-combo-box-option>
          <sgds-combo-box-option value="option3">Dur</sgds-combo-box-option>
        </sgds-combo-box>
        <sgds-button type="submit">Submit</sgds-button>
      </form>`
    );
    const combobox = form.querySelector<SgdsComboBox>("sgds-combo-box");
    const button = form.querySelector<SgdsButton>("sgds-button");
    form?.addEventListener("submit", e => e.preventDefault());
    expect(combobox?.value).to.equal("option1");
    expect(combobox?.invalid).to.be.false;
    button?.click();
    await combobox?.updateComplete;
    expect(combobox?.invalid).to.be.false;
  });
  it("when value is truthy, and reset button is clicked, input is reset and is valid", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-combo-box required menuIsOpen>
          <sgds-combo-box-option value="option1">Apple</sgds-combo-box-option>
          <sgds-combo-box-option value="option2">Apricot</sgds-combo-box-option>
          <sgds-combo-box-option value="option3">Dur</sgds-combo-box-option>
        </sgds-combo-box>
        <sgds-button type="reset">Reset</sgds-button>
      </form>`
    );

    const button = form.querySelector<SgdsButton>("sgds-button");
    const combobox = form.querySelector<SgdsComboBox>("sgds-combo-box");
    const appleItem = form
      .querySelector<SgdsComboBoxOption>("sgds-combo-box-option[value='option1']")
      ?.shadowRoot?.querySelector("div.normal-item-content") as HTMLElement;
    appleItem?.click();
    await combobox?.updateComplete;
    await waitUntil(() => combobox?.value === "option1");
    expect(combobox?.value).to.equal("option1");
    button?.click();

    await waitUntil(() => !combobox?.value);
    expect(combobox?.invalid).to.be.false;
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
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    await simulateUserClick(input);

    await sendKeys({ press: "ArrowDown" });
    await waitUntil(
      () => {
        const comboItem1 = el.querySelectorAll("sgds-combo-box-option")[0];
        return document.activeElement === comboItem1;
      },
      "focus did not move into first combo item",
      { timeout: 2000 }
    );

    expect(el.invalid).to.be.false;
  });
  it("when clicking menu item, only one option turns active at a time", async () => {
    const el = await fixture<SgdsComboBox>(html` <sgds-combo-box>
      <sgds-combo-box-option value="1">Afghanistan</sgds-combo-box-option>
      <sgds-combo-box-option value="2">Zimbabwe</sgds-combo-box-option>
      <sgds-combo-box-option value="3">Zoo</sgds-combo-box-option>
      <sgds-combo-box-option value="4">Zzzbabwe</sgds-combo-box-option>
    </sgds-combo-box>`);

    const comboBoxOptionOne = el.querySelector<SgdsComboBoxOption>("sgds-combo-box-option[value='1']");
    const clickDiv1 = comboBoxOptionOne?.shadowRoot?.querySelector("div.normal-item-content") as HTMLDivElement;
    clickDiv1?.click();
    await waitUntil(() => comboBoxOptionOne?.active);

    const comboBoxOptionTwo = el.querySelector<SgdsComboBoxOption>("sgds-combo-box-option[value='2']");
    const clickDiv2 = comboBoxOptionTwo?.shadowRoot?.querySelector("div.normal-item-content") as HTMLDivElement;
    clickDiv2?.click();
    await waitUntil(() => comboBoxOptionTwo?.active);
    expect(comboBoxOptionOne?.active).to.be.false;
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
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    await simulateUserClick(input);

    await sendKeys({ press: "ArrowDown" });
    await waitUntil(
      () => {
        const comboItem1 = el.querySelectorAll("sgds-combo-box-option")[0];
        return document.activeElement === comboItem1;
      },
      "focus did not move into first combo item",
      { timeout: 2000 }
    );

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

describe("sgds-combo-box-option (default)", () => {
  it("matches shadowDom semantically", async () => {
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option></sgds-combo-box-option>`);
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
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option active></sgds-combo-box-option>`);
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
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option disabled></sgds-combo-box-option>`);
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

  it("on click triggers i-sgds-select event", async () => {
    const spy = sinon.spy();
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option></sgds-combo-box-option>`);
    el.addEventListener("i-sgds-select", spy);
    const item = el.shadowRoot?.querySelector(".normal-item-content") as HTMLDivElement;
    item?.click();
    expect(spy.calledOnce).to.be.true;
  });
});

describe("sgds-combo-box-option (checkbox)", () => {
  it("matches shadowDom semantically ", async () => {
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option checkbox></sgds-combo-box-option>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="dropdown-item" tabindex="0">
          <sgds-checkbox>
            <slot></slot>
          </sgds-checkbox>
        </div>
      `,
      { ignoreAttributes: ["hinttext", "invalidfeedback", "label"] }
    );
  });
  it("when checkbox and active is true, checkbox is checked", async () => {
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option checkbox active></sgds-combo-box-option>`);
    const checkbox = el.shadowRoot?.querySelector<SgdsCheckbox>("sgds-checkbox");
    expect(checkbox?.checked).to.be.true;
  });

  it("on click triggers sgds-select event, click again triggers sgds-unselect", async () => {
    const selectSpy = sinon.spy();
    const unselectSpy = sinon.spy();
    const el = await fixture<SgdsComboBoxOption>(html`<sgds-combo-box-option checkbox></sgds-combo-box-option>`);
    el.addEventListener("i-sgds-select", selectSpy);
    el.addEventListener("i-sgds-unselect", unselectSpy);
    const item = el.shadowRoot?.querySelector("sgds-checkbox") as SgdsCheckbox;
    item?.click();
    expect(selectSpy.calledOnce).to.be.true;
    item.click();
    expect(unselectSpy.calledOnce).to.be.true;
  });
});
