import { SgdsDropdown, SgdsDropdownItem } from "../src/Dropdown";
import { SgdsButton } from "../src/Button";
import "../src/Dropdown";
import {
  fixture,
  assert,
  expect,
  waitUntil,
} from "@open-wc/testing";
import sinon from "sinon";
import { html } from "lit";
import { sendKeys, sendMouse } from "@web/test-runner-commands";
import { MockDropdown } from "../mocks/dropdown";
import "../mocks/dropdown";

describe('dropdown-element generic keyboard interactions', () => {
    // //keyboard navigation
    const closeKeys = ["Enter", "Escape"];
    closeKeys.forEach((key) => {
      it(`should close an opened menu on ${key} press`, async () => {
        const el = await fixture<MockDropdown>(
          html`<mock-dropdown menuIsOpen>
            <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
            <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
          </mock-dropdown> `
        );
        expect(el.menuIsOpen).to.be.true;
        el.shadowRoot?.querySelector("button")?.focus();
        await waitUntil(() => el.shadowRoot?.querySelector("button:focus"));
        await sendKeys({ press: key });
        await el.updateComplete;
        await waitUntil(
          () => !el.shadowRoot?.querySelector("ul.dropdown-menu.show"),
          "element should disappear",
          { timeout: 3000 }
        );
        expect(el.menuIsOpen).to.be.false;
      }).retries(1);
    });
    const openKeys = ["ArrowDown", "ArrowUp", "Enter"];
    openKeys.forEach((key) => {
      it(`should open menu on ${key} key`, async () => {
        const el = await fixture<MockDropdown>(
          html`<mock-dropdown>
            <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
            <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
          </mock-dropdown> `
        );
        expect(el.menuIsOpen).to.be.false;
        el.shadowRoot?.querySelector("button")?.focus();
        await sendKeys({ press: key });
        await waitUntil(() =>
          el.shadowRoot?.querySelector("ul.dropdown-menu.show")
        );
        expect(el.menuIsOpen).to.be.true;
      }).retries(1); // allowing retries as these tests tends to be flaky on firefox
    });

    it("for a newly opened menu with no focus on any items, ArrowDown key will navigate to the first dropdown-item on the menu and continue looping once it reaches the last menu item", async () => {
      const el = await fixture<MockDropdown>(
        html`<mock-dropdown menuIsOpen>
          <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
        </mock-dropdown> `
      );
      expect(el.nextDropdownItemNo).to.equal(0);
      expect(el.prevDropdownItemNo).to.equal(-1);
      el.shadowRoot?.querySelector("button")?.focus();

      await sendKeys({ press: "ArrowDown" });
      // currentItem = 0
      await el.updateComplete;
      expect(el.nextDropdownItemNo).to.equal(1);
      expect(el.prevDropdownItemNo).to.equal(1);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).to.have.attribute(
        "tabindex",
        "0"
      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).to.have.attribute(
        "tabindex",
        "-1"
      );
      await sendKeys({ press: "ArrowDown" });
      //currentItem = 1
      await el.updateComplete;
      expect(el.nextDropdownItemNo).to.equal(2);
      expect(el.prevDropdownItemNo).to.equal(0);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).to.have.attribute(
        "tabindex",
        "-1"
      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).to.have.attribute(
        "tabindex",
        "0"
      );
      await sendKeys({ press: "ArrowDown" });
      //currentItem = 0
      await el.updateComplete;
      expect(el.nextDropdownItemNo).to.equal(1);
      expect(el.prevDropdownItemNo).to.equal(1);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).to.have.attribute(
        "tabindex",
        "0"
      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).to.have.attribute(
        "tabindex",
        "-1"
      );
    });
    it("for a newly opened menu with no focus on any items, ArrowUp key will navigate to the last dropdown-item on the menu and continue looping once it reaches the last menu item", async () => {
      const el = await fixture<MockDropdown>(
        html`<mock-dropdown menuIsOpen>
          <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
        </mock-dropdown> `
      );
      expect(el.nextDropdownItemNo).to.equal(0);
      expect(el.prevDropdownItemNo).to.equal(-1);
      el.shadowRoot?.querySelector("button")?.focus();
      await sendKeys({ press: "ArrowUp" });
      // currentItem = 1
      await el.updateComplete;
      expect(el.nextDropdownItemNo).to.equal(2);
      expect(el.prevDropdownItemNo).to.equal(0);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).to.have.attribute(
        "tabindex",
        "-1"
      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).to.have.attribute(
        "tabindex",
        "0"
      );
      await sendKeys({ press: "ArrowUp" });
      //currentItem = 0
      await el.updateComplete;
      expect(el.nextDropdownItemNo).to.equal(1);
      expect(el.prevDropdownItemNo).to.equal(1);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).to.have.attribute(
        "tabindex",
        "0"
      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).to.have.attribute(
        "tabindex",
        "-1"
      );
      await sendKeys({ press: "ArrowUp" });
      //currentItem = 1
      await el.updateComplete;
      expect(el.nextDropdownItemNo).to.equal(2);
      expect(el.prevDropdownItemNo).to.equal(0);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).to.have.attribute(
        "tabindex",
        "-1"
      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).to.have.attribute(
        "tabindex",
        "0"
      );

      //closing the menu resets the states nextDropdownItemNo and prevDropdownItemNo
      await sendKeys({ press: "Escape" });
      await el.updateComplete;
      expect(el.menuIsOpen).to.be.false;
      expect(el.nextDropdownItemNo).to.equal(0);
      expect(el.prevDropdownItemNo).to.equal(-1);
      expect(el.querySelectorAll("sgds-dropdown-item")[0]).not.to.have.attribute(
        "tabindex"      );
      expect(el.querySelectorAll("sgds-dropdown-item")[1]).not.to.have.attribute(
        "tabindex",
      );
    });
    it("keyboard navigation skips disabled items", async () => {
      const el = await fixture<MockDropdown>(
        html`<mock-dropdown menuIsOpen>
          <sgds-dropdown-item value="1" disabled>slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 3</sgds-dropdown-item>
          <sgds-dropdown-item value="2" disabled>slot 4</sgds-dropdown-item>
        </mock-dropdown> `
      );
      el.shadowRoot?.querySelector("button")?.focus();
      await sendKeys({ press: "ArrowDown" });
      expect(el.querySelector("sgds-dropdown-item:focus")).to.equal(
        el.querySelectorAll("sgds-dropdown-item")[1]
      );
      await sendKeys({ press: "ArrowDown" });
      expect(el.querySelector("sgds-dropdown-item:focus")).to.equal(
        el.querySelectorAll("sgds-dropdown-item")[2]
      );
      await sendKeys({ press: "ArrowDown" });
      expect(el.querySelector("sgds-dropdown-item:focus")).to.equal(
        el.querySelectorAll("sgds-dropdown-item")[1]
      );
      expect(el.querySelector("sgds-dropdown-item:focus")).not.to.equal(
        el.querySelectorAll("sgds-dropdown-item")[3]
      );
    });
    // test case: when close="outside" and user mouse clicks on menu and then change to keyboard navigation
    it("transition from mouse click to keyboard navigation should be seamless", async () => {
      const el = await fixture<MockDropdown>(
        html`<mock-dropdown menuIsOpen close="outside">
          <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2" disabled>slot 2</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 3</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 4</sgds-dropdown-item>
        </mock-dropdown> `
      );
      const itemOne = el.querySelectorAll(
        "sgds-dropdown-item"
      )[0] as SgdsDropdownItem;
      itemOne.click();
      await sendKeys({ press: "ArrowDown" });
      expect(el.querySelector("sgds-dropdown-item:focus")).to.equal(
        el.querySelectorAll("sgds-dropdown-item")[2]
      );
      await sendKeys({ press: "ArrowDown" });
      expect(el.querySelector("sgds-dropdown-item:focus")).not.to.equal(
        el.querySelectorAll("sgds-dropdown-item")[2]
      );
      expect(el.querySelector("sgds-dropdown-item:focus")).to.equal(
        el.querySelectorAll("sgds-dropdown-item")[3]
      );

      itemOne.click();
      await sendKeys({ press: "ArrowUp" });
      expect(el.querySelector("sgds-dropdown-item:focus")).to.equal(
        el.querySelectorAll("sgds-dropdown-item")[3]
      );
    });
})

describe("sgds-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-dropdown");
    assert.instanceOf(el, SgdsDropdown);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(
      html`<sgds-dropdown togglerId="dropdown-test-id"></sgds-dropdown>`
    );
    assert.shadowDom.equal(
      el,
      `  <div>
         <sgds-button
           aria-expanded="false"
         id="dropdown-test-id"
         variant="outline-secondary"
         >
         <svg
         xmlns="http://www.w3.org/2000/svg"
         width="16"
         height="16"
         fill="currentColor"
         class="bi bi-chevron-down"
         viewBox="0 0 16 16"
       >
         <path
           fill-rule="evenodd"
           d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
         />
       </svg>
         </sgds-button>
       <ul
         class="dropdown-menu"
         part="menu"
         role="menu"
         >
        <slot>
        </slot>
      </ul>
       </div>
    `
    );
  });
  it("when disabled is true, toggle is disabled ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown disabled></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("sgds-button")).to.have.attribute(
      "disabled"
    );
  });
  it("when menuAlignRight is false (default) on default dropdown, data-popper-placement on ul.dropdown-menu is bottom-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();
    await waitUntil(() =>
      el.shadowRoot?.querySelector("ul.dropdown-menu.show")
    );
    expect(
      el.shadowRoot
        ?.querySelector("ul.dropdown-menu")
        ?.getAttribute("data-popper-placement")
    ).to.equal("bottom-start");
  });
  // //Popper attri data-popper-placemetn not responding to test changes in open-wc
  // //unsure why not working when console logging values are bottom-end
  it("when menuAlignRight is true on default dropdown, dropdownConfig placement is bottom-end ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuAlignRight></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("bottom-end");
  });
  it("when menuAlignRight is true on dropup, dropdownConfig placement is top-end ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuAlignRight drop="up"></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("top-end");
  });
  it("when menuAlignRight is false on dropup, dropdownConfig placement is top-start", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="up"></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("top-start");
  });
  it("when dropright, dropdownConfig placement is right-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="right"></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("right-start");
  });
  it("when dropleft, dropdownConfig placement is left-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="left"></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("left-start");
  });

  it("when noFlip is false, dropdownConfig.modifiers array has only offset obj", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();
    expect(el.dropdownConfig.modifiers?.length).to.equal(1);
    expect(el.dropdownConfig.modifiers?.[0].name).to.equal("offset");
    expect(el.dropdownConfig.modifiers?.[0].options?.offset[0]).to.equal(0);
    expect(el.dropdownConfig.modifiers?.[0].options?.offset[1]).to.equal(10);
  });
  it("when noFlip is true, dropdownConfig.modifiers array has flip obj", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown noFlip></sgds-dropdown>`
    );
    (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();
    expect(el.dropdownConfig.modifiers?.length).to.equal(2);
    expect(el.dropdownConfig.modifiers?.[1].name).to.equal("flip");
  });
  it("togglerText prop is forwarded to text content of button element", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown togglerText="Hello World"></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("sgds-button")?.textContent).to.contain(
      "Hello World"
    );
  });
  it("variant prop is forwarded to text content of sgds-button element", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown variant="primary"></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("sgds-button")).to.have.attribute(
      "variant",
      "outline-primary"
    );
  });
  it("value prop assigns value to the element", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown value="test"></sgds-dropdown>`
    );
    expect(el.value).to.equal("test");
  });
  it("menuIsOpen prop opens menu on first load", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
  });
  // //emits events when dropdown is toggle open/close
  it("emits sgds-show/shown/hide/hidden events when dropdown toggles", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown></sgds-dropdown>`
    );
    const showHandler = sinon.spy();
    const shownHandler = sinon.spy();
    const hideHandler = sinon.spy();
    const hiddenHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-shown", shownHandler);
    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-hidden", hiddenHandler);

    const button = el.shadowRoot?.querySelector("sgds-button") as SgdsButton;
    button?.click();
    await el.updateComplete;
    expect(showHandler).to.be.calledOnce;
    expect(shownHandler).to.be.calledAfter(showHandler);
    expect(shownHandler).to.be.calledOnce;
    expect(hideHandler).not.to.be.called;
    expect(hiddenHandler).not.to.be.called;

    button?.click();
    expect(hideHandler).to.be.calledOnce;
    expect(hiddenHandler).to.be.calledAfter(hideHandler);
    expect(hiddenHandler).to.be.calledOnce;
  });
  it("showMenu/hideMenu method opens/closes menu", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown></sgds-dropdown>`
    );
    expect(el.menuIsOpen).to.be.false;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).not.to.have.class(
      "show"
    );
    el.showMenu();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    el.hideMenu();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).not.to.have.class(
      "show"
    );
  });
  // // testing _handleSelectSlot functionality
  it("emits sgds-select event when its slots are clicked on", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown>
        <div>slot 1</div>
        <div>slot 2</div>
      </sgds-dropdown>`
    );
    const selectHandler = sinon.spy();
    el.addEventListener("sgds-select", selectHandler);

    const slots = el.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true }) as HTMLElement[];
    expect(slots?.length).to.equal(2);
    expect(slots?.[0].tagName).to.equal("DIV");
    slots?.[0].click();
    slots?.[1].click();
    expect(selectHandler).to.be.calledTwice;
  });
  it("does not emit sgds-select event when its disabled slots are clicked on", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown>
        <sgds-dropdown-item disabled>slot 1</sgds-dropdown-item>
        <sgds-dropdown-item>slot 2</sgds-dropdown-item>
      </sgds-dropdown>`
    );
    const selectHandler = sinon.spy();
    el.addEventListener("sgds-select", selectHandler);

    const slots = el.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true }) as SgdsDropdownItem[];
    slots?.[0].click();
    expect(selectHandler).not.to.be.called;
  });
  // // testing _handleSelectSlot functionality
  it("when clicked on slot, menu closes and value of sgds-dropdown to be updated", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown>`
    );
    expect(el.value).to.be.undefined;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    const slots = el.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true }) as HTMLElement[];

    slots?.[0].click();
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).not.to.have.class(
      "show"
    );
    expect(el.value).to.equal("1");
  });
  // // tests _handleClickOutOfElement & blur event listener
  it("click outside of component, closes the dropdown by default", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.true;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).not.to.have.class(
      "show"
    );
    expect(el.menuIsOpen).to.be.false;
  });
  it("when close=inside , dropdown menu closes only when clicked on menu item", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen close="inside">
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.true;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    // proving that clicking outside of dropdown menu wont trigger menuclose
    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    expect(el.menuIsOpen).to.be.true;
    const itemOne = el.querySelectorAll(
      "sgds-dropdown-item"
    )[0] as SgdsDropdownItem;
    itemOne.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).not.to.have.class(
      "show"
    );
    expect(el.menuIsOpen).to.be.false;
  });
  it("when close=outside , dropdown menu closes only when clicked on menu item", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen close="outside">
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.true;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    // proving that clicking inside menu item will not close the menu
    const itemOne = el.querySelectorAll(
      "sgds-dropdown-item"
    )[0] as SgdsDropdownItem;
    itemOne.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
      "show"
    );
    expect(el.menuIsOpen).to.be.true;
    // clicking outside closes the menu
    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).not.to.have.class(
      "show"
    );
    expect(el.menuIsOpen).to.be.false;
  });
  const closeValues = ["default", "outside", "inside"];
  closeValues.forEach((closeVal) => {
    it(`dropdown menu always closes regardless of prop close value = ${closeVal}`, async () => {
      const el = await fixture<SgdsDropdown>(
        html`<sgds-dropdown menuIsOpen close=${closeVal}>
          <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
        </sgds-dropdown> `
      );
      expect(el.menuIsOpen).to.be.true;
      expect(el.shadowRoot?.querySelector("ul.dropdown-menu")).to.have.class(
        "show"
      );
      (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();
      // proving that clicking inside menu item will not close the menu
      await el.updateComplete;
      expect(
        el.shadowRoot?.querySelector("ul.dropdown-menu")
      ).not.to.have.class("show");
      expect(el.menuIsOpen).to.be.false;
    });
  });
})


describe("sgds-dropdown-item", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-dropdown-item");
    assert.instanceOf(el, SgdsDropdownItem);
  });
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsDropdownItem>(
      html`<sgds-dropdown-item></sgds-dropdown-item>`
    );
    assert.shadowDom.equal(
      el,
      `  <li>
        <a
          class="dropdown-item"
          aria-disabled="false"
          href=""
          tabindex="0"
        >
          <slot>
          </slot>
        </a>
      </li>`
    );
    expect(el.value).to.be.undefined;
  });
  it("href prop is forwarded to a tag href attr", async () => {
    const el = await fixture(
      html`<sgds-dropdown-item href="#">test</sgds-dropdown-item>`
    );
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute("href", "#");
  });
  it("active prop is forwarded to <a> class", async () => {
    const el = await fixture(
      html`<sgds-dropdown-item active>test</sgds-dropdown-item>`
    );
    expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
  });
  it("disabled prop is forwarded to <a> class", async () => {
    const el = await fixture(
      html`<sgds-dropdown-item disabled>test</sgds-dropdown-item>`
    );
    expect(el.shadowRoot?.querySelector("a")).to.have.class("disabled");
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute(
      "aria-disabled",
      "true"
    );
    expect(el.shadowRoot?.querySelector('a')).to.have.attribute('tabindex', '-1')
  });
  it("value prop assigns the element target its value", async () => {
    const el = await fixture<SgdsDropdownItem>(
      html`<sgds-dropdown-item value="hello">test</sgds-dropdown-item>`
    );
    expect(el.value).to.equal("hello");
  });
})