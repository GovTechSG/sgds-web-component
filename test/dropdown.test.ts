import "./sgds-web-component";
import { SgdsDropdown, SgdsDropdownItem, SgdsButton } from "../src/components";
import { fixture, assert, expect, waitUntil } from "@open-wc/testing";
import sinon from "sinon";
import { html } from "lit";
import { sendKeys, sendMouse } from "@web/test-runner-commands";
import { MockDropdown } from "../mocks/dropdown";
import "../mocks/dropdown";

describe("dropdown-element generic keyboard interactions", () => {
  // //keyboard navigation
  const closeKeys = ["Enter", "Escape"];
  closeKeys.forEach(key => {
    it(`should close an opened menu on ${key} press`, async () => {
      const el = await fixture<MockDropdown>(
        html`<mock-dropdown menuIsOpen>
          <sgds-dropdown-item>slot 1</sgds-dropdown-item>
          <sgds-dropdown-item>slot 2</sgds-dropdown-item>
        </mock-dropdown> `
      );
      expect(el.menuIsOpen).to.be.true;
      el.shadowRoot?.querySelector("button")?.focus();
      await waitUntil(() => el.shadowRoot?.querySelector("button:focus"));
      await sendKeys({ press: key });
      await el.updateComplete;
      await waitUntil(() => !el.shadowRoot?.querySelector("div.dropdown-menu.show"), "element should disappear", {
        timeout: 3000
      });
      expect(el.menuIsOpen).to.be.false;
    }).retries(1);
  });
  const openKeys = ["ArrowDown", "ArrowUp", "Enter"];
  openKeys.forEach(key => {
    it(`should open menu on ${key} key`, async () => {
      const el = await fixture<MockDropdown>(
        html`<mock-dropdown>
          <sgds-dropdown-item>slot 1</sgds-dropdown-item>
          <sgds-dropdown-item>slot 2</sgds-dropdown-item>
        </mock-dropdown> `
      );
      expect(el.menuIsOpen).to.be.false;
      el.shadowRoot?.querySelector("button")?.focus();
      await sendKeys({ press: key });
      await waitUntil(() => el.shadowRoot?.querySelector("div.dropdown-menu.show"));
      expect(el.menuIsOpen).to.be.true;
    }).retries(1); // allowing retries as these tests tends to be flaky on firefox
  });

  it("for a newly opened menu with no focus on any items, ArrowDown key will navigate to the first dropdown-item on the menu and continue looping once it reaches the last menu item", async () => {
    const el = await fixture<MockDropdown>(
      html`<mock-dropdown menuIsOpen>
        <sgds-dropdown-item>slot 1</sgds-dropdown-item>
        <sgds-dropdown-item>slot 2</sgds-dropdown-item>
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
    expect(el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
    await sendKeys({ press: "ArrowDown" });
    //currentItem = 1
    await el.updateComplete;
    expect(el.nextDropdownItemNo).to.equal(2);
    expect(el.prevDropdownItemNo).to.equal(0);
    expect(el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    await sendKeys({ press: "ArrowDown" });
    //currentItem = 0
    await el.updateComplete;
    expect(el.nextDropdownItemNo).to.equal(1);
    expect(el.prevDropdownItemNo).to.equal(1);
    expect(el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
  }).retries(1);
  it("for a newly opened menu with no focus on any items, ArrowUp key will navigate to the last dropdown-item on the menu and continue looping once it reaches the last menu item", async () => {
    const el = await fixture<MockDropdown>(
      html`<mock-dropdown menuIsOpen>
        <sgds-dropdown-item>slot 1</sgds-dropdown-item>
        <sgds-dropdown-item>slot 2</sgds-dropdown-item>
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
    expect(el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    await sendKeys({ press: "ArrowUp" });
    //currentItem = 0
    await el.updateComplete;
    expect(el.nextDropdownItemNo).to.equal(1);
    expect(el.prevDropdownItemNo).to.equal(1);
    expect(el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
    await sendKeys({ press: "ArrowUp" });
    //currentItem = 1
    await el.updateComplete;
    expect(el.nextDropdownItemNo).to.equal(2);
    expect(el.prevDropdownItemNo).to.equal(0);
    expect(el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );

    //closing the menu resets the states nextDropdownItemNo and prevDropdownItemNo
    await sendKeys({ press: "Escape" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
    expect(el.nextDropdownItemNo).to.equal(0);
    expect(el.prevDropdownItemNo).to.equal(-1);
    expect(
      el.querySelectorAll("sgds-dropdown-item")[0].shadowRoot?.querySelector(".dropdown-item")
    ).not.to.have.attribute("tabindex");
    expect(
      el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")
    ).not.to.have.attribute("tabindex");
  }).retries(1);
  it("keyboard navigation skips disabled items", async () => {
    const el = await fixture<MockDropdown>(
      html`<mock-dropdown menuIsOpen>
        <sgds-dropdown-item disabled>slot 1</sgds-dropdown-item>
        <sgds-dropdown-item>slot 2</sgds-dropdown-item>
        <sgds-dropdown-item>slot 3</sgds-dropdown-item>
        <sgds-dropdown-item disabled>slot 4</sgds-dropdown-item>
      </mock-dropdown> `
    );
    el.shadowRoot?.querySelector("button")?.focus();
    await sendKeys({ press: "ArrowDown" });
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    await sendKeys({ press: "ArrowDown" });
    expect(el.querySelectorAll("sgds-dropdown-item")[2].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    await sendKeys({ press: "ArrowDown" });
    expect(el.querySelectorAll("sgds-dropdown-item")[1].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[3].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
  }).retries(1);
  // test case: when close="outside" and user mouse clicks on menu and then change to keyboard navigation
  it("transition from mouse click to keyboard navigation should be seamless", async () => {
    const el = await fixture<MockDropdown>(
      html`<mock-dropdown menuIsOpen close="outside">
        <sgds-dropdown-item>slot 1</sgds-dropdown-item>
        <sgds-dropdown-item disabled>slot 2</sgds-dropdown-item>
        <sgds-dropdown-item>slot 3</sgds-dropdown-item>
        <sgds-dropdown-item>slot 4</sgds-dropdown-item>
      </mock-dropdown> `
    );
    const itemOne = el.querySelectorAll("sgds-dropdown-item")[0] as SgdsDropdownItem;
    itemOne.click();
    await sendKeys({ press: "ArrowDown" });
    expect(el.querySelectorAll("sgds-dropdown-item")[2].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
    await sendKeys({ press: "ArrowDown" });
    expect(el.querySelectorAll("sgds-dropdown-item")[2].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "-1"
    );
    expect(el.querySelectorAll("sgds-dropdown-item")[3].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );

    itemOne.click();
    await sendKeys({ press: "ArrowUp" });
    expect(el.querySelectorAll("sgds-dropdown-item")[3].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
      "tabindex",
      "0"
    );
  }).retries(1);
});

describe("sgds-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-dropdown");
    assert.instanceOf(el, SgdsDropdown);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-dropdown>
      <sgds-button slot="toggler">Dropdown</sgds-button>
    </sgds-dropdown>`);
    assert.shadowDom.equal(
      el,
      `<div class="dropdown">
        <div
          class="toggler-container"
          aria-expanded="false"
          aria-haspopup="menu"
        >
          <slot name="toggler"></slot>
        </div>
        <div class="dropdown-menu" role="menu">
          <slot id="default"></slot>
        </div>
      </div>
    `
    );
  });
  it("when disabled is true, toggle is disabled ", async () => {
    const el = await fixture<SgdsDropdown>(html` <sgds-dropdown disabled>
      <sgds-button slot="toggler">Dropdown</sgds-button>
    </sgds-dropdown>`);
    expect(el.querySelector("sgds-button")).to.have.attribute("disabled");
    el.disabled = false;
    await el.updateComplete;
    expect(el.querySelector("sgds-button")).not.to.have.attribute("disabled");
  });
  it("when menuAlignRight is false (default) on default dropdown, data-popper-placement on div.dropdown-menu is bottom-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    await waitUntil(() => el.shadowRoot?.querySelector("div.dropdown-menu.show"));
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")?.getAttribute("data-popper-placement")).to.equal(
      "bottom-start"
    );
  });
  // //Popper attri data-popper-placemetn not responding to test changes in open-wc
  // //unsure why not working when console logging values are bottom-end
  it("when menuAlignRight is true on default dropdown, dropdownConfig placement is bottom-end ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuAlignRight><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("bottom-end");
  });
  it("when menuAlignRight is true on dropup, dropdownConfig placement is top-end ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuAlignRight drop="up"><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("top-end");
  });
  it("when menuAlignRight is false on dropup, dropdownConfig placement is top-start", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="up"><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("top-start");
  });
  it("when dropright, dropdownConfig placement is right-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="right">><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("right-start");
  });
  it("when dropleft, dropdownConfig placement is left-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="left"><sgds-button slot="toggler">Dropdown</sgds-button>></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();

    expect(el.dropdownConfig.placement).to.equal("left-start");
  });

  it("when noFlip is false, dropdownConfig.modifiers array has only offset obj", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    expect(el.dropdownConfig.modifiers?.length).to.equal(1);
    expect(el.dropdownConfig.modifiers?.[0].name).to.equal("offset");
    expect(el.dropdownConfig.modifiers?.[0].options?.offset[0]).to.equal(0);
    expect(el.dropdownConfig.modifiers?.[0].options?.offset[1]).to.equal(8);
  });
  it("when noFlip is true, dropdownConfig.modifiers array has flip obj", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown noFlip><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    expect(el.dropdownConfig.modifiers?.length).to.equal(2);
    expect(el.dropdownConfig.modifiers?.[1].name).to.equal("flip");
  });
  it("menuIsOpen prop opens menu on first load", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
  });
  // //emits events when dropdown is toggle open/close
  it("emits sgds-show/shown/hide/hidden events when dropdown toggles", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    const showHandler = sinon.spy();
    const shownHandler = sinon.spy();
    const hideHandler = sinon.spy();
    const hiddenHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", shownHandler);
    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", hiddenHandler);

    const button = el.querySelector("sgds-button") as SgdsButton;
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
    const el = await fixture<SgdsDropdown>(html`<sgds-dropdown>
      <sgds-button slot="toggler">Dropdown</sgds-button>
    </sgds-dropdown>`);
    expect(el.menuIsOpen).to.be.false;
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
    el.showMenu();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
    el.hideMenu();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
  });
  // // testing _handleSelectSlot functionality
  it("emits sgds-select event when its slots are clicked on", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-button slot="toggler">Dropdown</sgds-button>
        <sgds-dropdown-item>slot 1</sgds-dropdown-item>
      </sgds-dropdown>`
    );
    const selectHandler = sinon.spy();
    el.addEventListener("sgds-select", selectHandler);
    const item = el.querySelector("sgds-dropdown-item");
    item?.click();
    await el.updateComplete;
    expect(selectHandler).to.be.calledOnce;
  });
  it("does not emit sgds-select event when its disabled slots are clicked on", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-button slot="toggler">Dropdown</sgds-button>
        <sgds-dropdown-item disabled>slot 1</sgds-dropdown-item>
      </sgds-dropdown>`
    );
    const selectHandler = sinon.spy();
    el.addEventListener("sgds-select", selectHandler);

    const item = el.querySelector("sgds-dropdown-item");
    item?.click();
    await el.updateComplete;
    expect(selectHandler).not.to.be.called;
  });
  // // testing _handleSelectSlot functionality
  it("when clicked on slot, menu closes", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-button slot="toggler">Dropdown</sgds-button>
        <sgds-dropdown-item>slot 1</sgds-dropdown-item>
      </sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
    const item = el.querySelector("sgds-dropdown-item");
    item?.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
  });
  // // tests _handleClickOutOfElement & blur event listener
  it("click outside of component, closes the dropdown by default", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-button slot="toggler">Dropdown</sgds-button>
        <sgds-dropdown-item>slot 1</sgds-dropdown-item>
        <sgds-dropdown-item>slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.true;
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
    expect(el.menuIsOpen).to.be.false;
  });
  // it("when close=inside , dropdown menu closes only when clicked on menu item", async () => {
  //   const el = await fixture<SgdsDropdown>(
  //     html`<sgds-dropdown menuIsOpen close="inside">
  //       <sgds-button slot="toggler">Dropdown</sgds-button>
  //       <sgds-dropdown-item>slot 1</sgds-dropdown-item>
  //       <sgds-dropdown-item>slot 2</sgds-dropdown-item>
  //     </sgds-dropdown> `
  //   );
  //   expect(el.menuIsOpen).to.be.true;
  //   expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
  //   // proving that clicking outside of dropdown menu wont trigger menuclose
  //   await sendMouse({ type: "click", position: [0, 0] });
  //   await el.updateComplete;
  //   expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
  //   expect(el.menuIsOpen).to.be.true;
  //   const itemOne = el.querySelectorAll("sgds-dropdown-item")[0] as SgdsDropdownItem;
  //   itemOne.click();
  //   await el.updateComplete;
  //   expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
  //   expect(el.menuIsOpen).to.be.false;
  // });
  // it("when close=outside , dropdown menu closes only when clicked on menu item", async () => {
  //   const el = await fixture<SgdsDropdown>(
  //     html`<sgds-dropdown menuIsOpen close="outside">
  //       <sgds-dropdown-item>slot 1</sgds-dropdown-item>
  //       <sgds-dropdown-item>slot 2</sgds-dropdown-item>
  //     </sgds-dropdown> `
  //   );
  //   expect(el.menuIsOpen).to.be.true;
  //   expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
  //   // proving that clicking inside menu item will not close the menu
  //   const itemOne = el.querySelectorAll("sgds-dropdown-item")[0] as SgdsDropdownItem;
  //   itemOne.click();
  //   await el.updateComplete;
  //   expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
  //   expect(el.menuIsOpen).to.be.true;
  //   // clicking outside closes the menu
  //   await sendMouse({ type: "click", position: [0, 0] });
  //   await el.updateComplete;
  //   expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
  //   expect(el.menuIsOpen).to.be.false;
  // });
  // type close = "default" | "outside" | "inside";
  // const closeValues = ["default", "outside", "inside"];
  // closeValues.forEach(closeVal => {
  //   it(`dropdown menu always closes when click on button regardless of prop close value = ${closeVal}`, async () => {
  //     const el = await fixture<SgdsDropdown>(
  //       html`<sgds-dropdown menuIsOpen close=${closeVal as close}>
  //         <sgds-dropdown-item>slot 1</sgds-dropdown-item>
  //         <sgds-dropdown-item>slot 2</sgds-dropdown-item>
  //       </sgds-dropdown> `
  //     );
  //     expect(el.menuIsOpen).to.be.true;
  //     expect(el.shadowRoot?.querySelector("div.dropdown-menu")).to.have.class("show");
  //     (el.shadowRoot?.querySelector("sgds-button") as SgdsButton).click();
  //     // proving that clicking inside menu item will not close the menu
  //     await el.updateComplete;
  //     expect(el.shadowRoot?.querySelector("div.dropdown-menu")).not.to.have.class("show");
  //     expect(el.menuIsOpen).to.be.false;
  //   });
  // });
});

describe("sgds-dropdown-item", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-dropdown-item");
    assert.instanceOf(el, SgdsDropdownItem);
  });
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item></sgds-dropdown-item>`);
    assert.shadowDom.equal(
      el,
      `   <div
        class="dropdown-item"
        tabindex="0"
      >
        <slot></slot>
      </div>`
    );
  });
  it("active prop is forwarded to .dropdown-item", async () => {
    const el = await fixture(html`<sgds-dropdown-item active>test</sgds-dropdown-item>`);
    expect(el.shadowRoot?.querySelector("div.dropdown-item")).to.have.class("active");
  });
  it("disabled prop is forwarded to <a> class", async () => {
    const el = await fixture(html`<sgds-dropdown-item disabled>test</sgds-dropdown-item>`);
    expect(el.shadowRoot?.querySelector("div.dropdown-item")).to.have.class("disabled");
    expect(el.shadowRoot?.querySelector("div.dropdown-item")).to.have.attribute("tabindex", "-1");
    expect(el.getAttribute("aria-disabled")).to.equal("true")
  });
});
