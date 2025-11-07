import "./sgds-web-component";
import { SgdsDropdown, SgdsDropdownItem } from "../src/components";
import { fixture, assert, expect, waitUntil, oneEvent, nextFrame } from "@open-wc/testing";
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
      await waitUntil(() => !el.menuIsOpen);
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
      await waitUntil(() => el.menuIsOpen);
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
    expect(el.nextDropdownItemNo).to.equal(0);
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
    expect(el.nextDropdownItemNo).to.equal(0);
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
    expect(el.nextDropdownItemNo).to.equal(0);
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
  // // test case: when close="outside" and user mouse clicks on menu and then change to keyboard navigation
  // it("transition from mouse click to keyboard navigation should be seamless", async () => {
  //   const el = await fixture<MockDropdown>(
  //     html`<mock-dropdown menuIsOpen close="outside">
  //       <sgds-dropdown-item>slot 1</sgds-dropdown-item>
  //       <sgds-dropdown-item disabled>slot 2</sgds-dropdown-item>
  //       <sgds-dropdown-item>slot 3</sgds-dropdown-item>
  //       <sgds-dropdown-item>slot 4</sgds-dropdown-item>
  //     </mock-dropdown> `
  //   );
  //   const itemOne = el.querySelectorAll("sgds-dropdown-item")[0] as SgdsDropdownItem;
  //   itemOne.click();
  //   await sendKeys({ press: "ArrowDown" });
  //   expect(el.querySelectorAll("sgds-dropdown-item")[2].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
  //     "tabindex",
  //     "0"
  //   );
  //   await sendKeys({ press: "ArrowDown" });
  //   expect(el.querySelectorAll("sgds-dropdown-item")[2].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
  //     "tabindex",
  //     "-1"
  //   );
  //   expect(el.querySelectorAll("sgds-dropdown-item")[3].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
  //     "tabindex",
  //     "0"
  //   );

  //   itemOne.click();
  //   await sendKeys({ press: "ArrowUp" });
  //   expect(el.querySelectorAll("sgds-dropdown-item")[3].shadowRoot?.querySelector(".dropdown-item")).to.have.attribute(
  //     "tabindex",
  //     "0"
  //   );
  // }).retries(1);
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
  it("when disabled is true, toggle is disabled", async () => {
    const el = await fixture<SgdsDropdown>(html` <sgds-dropdown disabled>
      <sgds-button slot="toggler">Dropdown</sgds-button>
    </sgds-dropdown>`);
    expect(el.querySelector("sgds-button")).to.have.attribute("disabled");
    el.disabled = false;
    await el.updateComplete;
    expect(el.querySelector("sgds-button")).not.to.have.attribute("disabled");
  });
  it("when menuAlignRight is false (default) on default dropdown, floatingOpts.placement is bottom-start", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();

    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    await waitUntil(() => menuEl.getAttribute("data-placement") !== null);

    expect(menuEl.getAttribute("data-placement")).to.equal("bottom-start");
  });

  it("when menuAlignRight is true on default dropdown, floatingOpts placement is bottom-end", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuAlignRight><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();

    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    await waitUntil(() => menuEl.getAttribute("data-placement") !== null);

    expect(menuEl.getAttribute("data-placement")).to.equal("bottom-end");
  });
  it("when menuAlignRight is true on dropup, floatingOpts placement is top-end", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuAlignRight drop="up" .noFlip=${true}
        ><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown
      >`
    );

    await el.showMenu();

    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    await waitUntil(() => menuEl.getAttribute("data-placement") !== null);

    expect(menuEl.getAttribute("data-placement")).to.equal("top-end");
  });
  it("when menuAlignRight is false on dropup, floatingOpts placement is top-start", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="up" .noFlip=${true}><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();

    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    await waitUntil(() => menuEl.getAttribute("data-placement") !== null);

    expect(menuEl.getAttribute("data-placement")).to.equal("top-start");
  });
  it("when dropright, floatingOpts placement is right-start", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="right"><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();

    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    await waitUntil(() => menuEl.getAttribute("data-placement") !== null);

    expect(menuEl.getAttribute("data-placement")).to.equal("right-start");
  });
  it("when dropleft, floatingOpts placement is left-start", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="left"><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();

    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    await waitUntil(() => menuEl.getAttribute("data-placement") !== null);

    expect(menuEl?.getAttribute("data-placement")).to.equal("left-start");
  });
  it("applies flip() middleware when noFlip = false", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="up"><sgds-button slot="toggler">Toggle</sgds-button></sgds-dropdown>`
    );

    el.style.position = "absolute";
    el.style.top = "0px";
    el.style.left = "0px";
    document.body.appendChild(el);

    await el.showMenu();
    const menu = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

    await new Promise(r => setTimeout(r));

    const placement = menu.getAttribute("data-placement");
    expect(placement?.startsWith("bottom")).to.be.true;
  });
  it("does not apply flip() when noFlip = true", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown drop="up"><sgds-button slot="toggler">Toggle</sgds-button></sgds-dropdown>`
    );
    el.noFlip = true;

    el.style.position = "absolute";
    el.style.top = "0px";
    el.style.left = "0px";
    document.body.appendChild(el);

    await el.showMenu();
    const menu = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;

    await new Promise(r => setTimeout(r));

    const placement = menu.getAttribute("data-placement");
    // Should stay top-* even though it's overflowing, since flip is disabled
    expect(placement?.startsWith("top")).to.be.true;
  });
  it("menuIsOpen prop opens menu on first load", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen><sgds-button slot="toggler">Dropdown</sgds-button></sgds-dropdown>`
    );
    const menuEl = el.shadowRoot?.querySelector("div.dropdown-menu") as HTMLUListElement;
    expect(getComputedStyle(menuEl).display).to.equal("block");
  });
  it("fires sgds-show and sgds-after-show when menu opens", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Toggle</sgds-button></sgds-dropdown>`
    );

    setTimeout(() => el.showMenu());
    const showEvent = await oneEvent(el, "sgds-show");
    expect(showEvent).to.exist;

    const afterShowEvent = await oneEvent(el, "sgds-after-show");
    expect(afterShowEvent).to.exist;

    expect(el.menuIsOpen).to.be.true;
  });
  it("fires sgds-show before sgds-after-show", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Toggle</sgds-button></sgds-dropdown>`
    );

    const firedEvents: string[] = [];

    el.addEventListener("sgds-show", () => firedEvents.push("sgds-show"));
    el.addEventListener("sgds-after-show", () => firedEvents.push("sgds-after-show"));

    await el.showMenu();

    // Wait a frame for events to flush
    await nextFrame();

    expect(firedEvents).to.deep.equal(["sgds-show", "sgds-after-show"]);
  });
  it("fires sgds-hide and sgds-after-hide when menu closes", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Toggle</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();
    expect(el.menuIsOpen).to.be.true;

    setTimeout(() => el.hideMenu());
    const hideEvent = await oneEvent(el, "sgds-hide");
    expect(hideEvent).to.exist;

    const afterHideEvent = await oneEvent(el, "sgds-after-hide");
    expect(afterHideEvent).to.exist;

    expect(el.menuIsOpen).to.be.false;
  });
  it("fires sgds-hide before sgds-after-hide", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown><sgds-button slot="toggler">Toggle</sgds-button></sgds-dropdown>`
    );

    await el.showMenu();

    const firedEvents: string[] = [];
    el.addEventListener("sgds-hide", () => firedEvents.push("sgds-hide"));
    el.addEventListener("sgds-after-hide", () => firedEvents.push("sgds-after-hide"));

    await el.hideMenu();

    // wait for the setTimeout in hideMenu()
    await new Promise(r => setTimeout(r, 0));

    expect(firedEvents).to.deep.equal(["sgds-hide", "sgds-after-hide"]);
  });
  it("showMenu/hideMenu method opens/closes menu", async () => {
    const el = await fixture<SgdsDropdown>(html`<sgds-dropdown>
      <sgds-button slot="toggler">Dropdown</sgds-button>
    </sgds-dropdown>`);
    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLUListElement;

    expect(el.menuIsOpen).to.be.false;
    expect(getComputedStyle(menuEl).display).to.equal("none");
    el.showMenu();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.true;
    expect(getComputedStyle(menuEl).display).to.equal("block");
    el.hideMenu();
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
    expect(getComputedStyle(menuEl).display).to.equal("none");
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
    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLUListElement;
    expect(getComputedStyle(menuEl).display).to.equal("block");
    const item = el.querySelector("sgds-dropdown-item");
    item?.click();
    await el.updateComplete;
    expect(getComputedStyle(menuEl).display).to.equal("none");
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
    const menuEl = el.shadowRoot?.querySelector(".dropdown-menu") as HTMLUListElement;

    expect(el.menuIsOpen).to.be.true;
    expect(getComputedStyle(menuEl).display).to.equal("block");
    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    expect(getComputedStyle(menuEl).display).to.equal("none");
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
  it("when clicked on, should trigger a navigation", async () => {
    const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item>
      <a>Example</a>
    </sgds-dropdown-item>`);
    const anchor = el.querySelector("a");
    const anchorSpy = sinon.spy();
    anchor?.addEventListener("click", anchorSpy);
    el.click();
    expect(anchorSpy.calledOnce).to.be.true;
  });
});
