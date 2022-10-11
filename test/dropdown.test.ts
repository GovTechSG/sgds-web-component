import { SgdsDropdown, SgdsDropdownItem } from "../src/Dropdown";
import "../src/Dropdown";
import {
  fixture,
  assert,
  expect,
  waitUntil,
  elementUpdated,
  oneEvent,
  fixtureCleanup,
  aTimeout,
} from "@open-wc/testing";
import sinon from "sinon";
import { html } from "lit";
import { sendKeys, sendMouse } from "@web/test-runner-commands";
import {
  updateLanguageServiceSourceFile,
  walkUpBindingElementsAndPatterns,
} from "typescript";
import { playwright } from "@web/test-runner-playwright";

describe("sgds-dropdown", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-dropdown");
    assert.instanceOf(el, SgdsDropdown);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(
      html`<sgds-dropdown toggleBtnId="dropdown-test-id"></sgds-dropdown>`
    );
    assert.shadowDom.equal(
      el,
      `  <div class="dropdown sgds">
         <button
           aria-expanded="false"
         class="btn btn-outline-secondary dropdown-toggle"
         data-bs-toggle="dropdown"
         id="dropdown-test-id"
           type="button"
         >
         </button>
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
  it("when menuAlignRight is false (default) on default dropdown, data-popper-placement on ul.dropdown-menu is bottom-start ", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown></sgds-dropdown>`
    );
    el.shadowRoot?.querySelector("button")?.click();
    await waitUntil(() =>
      el.shadowRoot?.querySelector("ul.dropdown-menu.show")
    );
    expect(
      el.shadowRoot
        ?.querySelector("ul.dropdown-menu")
        ?.getAttribute("data-popper-placement")
    ).to.equal("bottom-start");
  });
  //Popper not responding to test changes in open-wc
  //unsure why not working when console logging values are bottom-end
  // it("when menuAlignRight is true on default dropdown, data-popper-placement on ul.dropdown-menu is bottom-end ", async () => {
  //     const parentNode = document.createElement('div');
  //     document.body.appendChild(parentNode)
  //     const el = await fixture<SgdsDropdown>(
  //     html`<sgds-dropdown menuAlignRight></sgds-dropdown>`, {parentNode}
  //   );
  //      el.shadowRoot?.querySelector('button')?.click()
  //   await waitUntil(() => el.shadowRoot?.querySelector('ul.dropdown-menu.show'))
  //  el.requestUpdate()
  //   await elementUpdated(el)
  //   expect(
  //     el.shadowRoot?.querySelector("ul.dropdown-menu.show")?.getAttribute("data-popper-placement")
  //   ).to.equal("bottom-end");
  // })
  // it("when menuAlignRight is false on dropup, data-popper-placement on ul.dropdown-menu is top-start ", async () => {
  //     const el = await fixture<SgdsDropdown>(
  //     html`<sgds-dropdown drop="up"></sgds-dropdown>`
  //   );
  //  el.shadowRoot?.querySelector('button')?.click()
  //   await waitUntil(() => el.shadowRoot?.querySelector('ul.dropdown-menu.show'))
  // // //   await elementUpdated(el)
  //   expect(
  //     el.shadowRoot?.querySelector("ul.dropdown-menu.show")?.getAttribute("data-popper-placement")
  //   ).to.equal("top-start");
  // });
  it("buttonText prop is forwarded to text content of button element", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown buttonText="Hello World"></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("button")?.textContent).to.contain(
      "Hello World"
    );
  });
  it("variant prop is forwarded to text content of button element", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown variant="primary"></sgds-dropdown>`
    );
    expect(el.shadowRoot?.querySelector("button")).to.have.class(
      "btn-outline-primary"
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
  // testing _handleSelectSlot functionality
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
  // testing _handleSelectSlot functionality
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
  // tests _handleClickOutOfElement & blur event listener
  it("click outside of component, closes the dropdown", async () => {
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
  //keyboard navigation
  it(`should close an opened menu on Enter press`, async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.true;
    el.shadowRoot?.querySelector("button")?.focus();
    await el.updateComplete;
    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
  });
  it(`should close an opened menu on Escape press`, async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown menuIsOpen>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.true;
    el.shadowRoot?.querySelector("button")?.focus();
    await el.updateComplete;
    await sendKeys({ press: "Escape" });
    await el.updateComplete;
    expect(el.menuIsOpen).to.be.false;
  });
  // tried looping the similar tests using map/forEach but test turns out flaky in firefox. Something to do with the timing 
  it("should open menu on arrow down key", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.false;
    el.shadowRoot?.querySelector("button")?.focus();
    await sendKeys({ press: "ArrowDown" });
    await waitUntil(() =>
      el.shadowRoot?.querySelector("ul.dropdown-menu.show")
    );
    expect(el.menuIsOpen).to.be.true;
  });
  it("should open menu on arrow up key", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.false;
    el.shadowRoot?.querySelector("button")?.focus();
    await sendKeys({ press: "ArrowUp" });
    await waitUntil(() =>
      el.shadowRoot?.querySelector("ul.dropdown-menu.show")
    );
    expect(el.menuIsOpen).to.be.true;
  });
  it("should open menu on enter key", async () => {
    const el = await fixture<SgdsDropdown>(
      html`<sgds-dropdown>
        <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
        <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
      </sgds-dropdown> `
    );
    expect(el.menuIsOpen).to.be.false;
    el.shadowRoot?.querySelector("button")?.focus();
    await sendKeys({ press: "Enter" });
    await waitUntil(() =>
      el.shadowRoot?.querySelector("ul.dropdown-menu.show")
    );
    expect(el.menuIsOpen).to.be.true;
  });

  it('for a newly opened menu with no focus on any items, ArrowDown key will navigate to the first dropdown-item on the menu and continue looping once it reaches the last menu item', async() => {
    const el = await fixture<SgdsDropdown>(
        html`<sgds-dropdown menuIsOpen>
          <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
        </sgds-dropdown> `
      );
      expect(el.nextDropdownItemNo).to.equal(0)
      expect(el.prevDropdownItemNo).to.equal(-1)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).not.to.have.attribute('tabindex')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).not.to.have.attribute('tabindex')

      el.shadowRoot?.querySelector("button")?.focus();
      await sendKeys({press: "ArrowDown"})
      // currentItem = 0
      await el.updateComplete
      expect(el.nextDropdownItemNo).to.equal(1)
      expect(el.prevDropdownItemNo).to.equal(-1)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).to.have.attribute('tabindex', '0')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).to.have.attribute('tabindex', '-1')
      await sendKeys({press: "ArrowDown"})
      //currentItem = 1
      await el.updateComplete
      expect(el.nextDropdownItemNo).to.equal(2)
      expect(el.prevDropdownItemNo).to.equal(0)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).to.have.attribute('tabindex', '-1')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).to.have.attribute('tabindex', '0')
      await sendKeys({press: "ArrowDown"})
      //currentItem = 0
      await el.updateComplete
      expect(el.nextDropdownItemNo).to.equal(1)
      expect(el.prevDropdownItemNo).to.equal(-1)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).to.have.attribute('tabindex', '0')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).to.have.attribute('tabindex', '-1')
  
  })
  it('for a newly opened menu with no focus on any items, ArrowUp key will navigate to the last dropdown-item on the menu and continue looping once it reaches the last menu item', async() => {
    const el = await fixture<SgdsDropdown>(
        html`<sgds-dropdown menuIsOpen>
          <sgds-dropdown-item value="1">slot 1</sgds-dropdown-item>
          <sgds-dropdown-item value="2">slot 2</sgds-dropdown-item>
        </sgds-dropdown> `
      );
      expect(el.nextDropdownItemNo).to.equal(0)
      expect(el.prevDropdownItemNo).to.equal(-1)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).not.to.have.attribute('tabindex')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).not.to.have.attribute('tabindex')
      el.shadowRoot?.querySelector("button")?.focus();
      await sendKeys({press: "ArrowUp"})
      // currentItem = 1
      await el.updateComplete
      expect(el.nextDropdownItemNo).to.equal(2)
      expect(el.prevDropdownItemNo).to.equal(0)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).to.have.attribute('tabindex', '-1')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).to.have.attribute('tabindex', '0')
      await sendKeys({press: "ArrowUp"})
      //currentItem = 0
      await el.updateComplete
      expect(el.nextDropdownItemNo).to.equal(1)
      expect(el.prevDropdownItemNo).to.equal(-1)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).to.have.attribute('tabindex', '0')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).to.have.attribute('tabindex', '-1')
      await sendKeys({press: "ArrowUp"})
      //currentItem = 1
      await el.updateComplete
      expect(el.nextDropdownItemNo).to.equal(2)
      expect(el.prevDropdownItemNo).to.equal(0)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).to.have.attribute('tabindex', '-1')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).to.have.attribute('tabindex', '0')

      //closing the menu resets the states nextDropdownItemNo and prevDropdownItemNo
      await sendKeys({press: "Escape"})
      await el.updateComplete
      expect(el.menuIsOpen).to.be.false
      expect(el.nextDropdownItemNo).to.equal(0)
      expect(el.prevDropdownItemNo).to.equal(-1)
      expect(el.querySelectorAll('sgds-dropdown-item')[0]).not.to.have.attribute('tabindex')
      expect(el.querySelectorAll('sgds-dropdown-item')[1]).not.to.have.attribute('tabindex')
  })
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
      `  <li>
        <a
          class="dropdown-item"
          aria-disabled="false"
          href=""
        >
          <slot>
          </slot>
        </a>
      </li>`
    );
    expect(el.value).to.be.undefined
  });
    it("href prop is forwarded to a tag href attr", async () => {
      const el = await fixture(html`<sgds-dropdown-item href="#">test</sgds-dropdown-item>`);
      expect(el.shadowRoot?.querySelector("a")).to.have.attribute("href", "#");
    });
    it("active prop is forwarded to <a> class", async () => {
      const el = await fixture(html`<sgds-dropdown-item  active>test</sgds-dropdown-item >`);
      expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
    });
    it("disabled prop is forwarded to <a> class", async () => {
      const el = await fixture(html`<sgds-dropdown-item  disabled>test</sgds-dropdown-item >`);
      expect(el.shadowRoot?.querySelector("a")).to.have.class("disabled");
      expect(el.shadowRoot?.querySelector("a")).to.have.attribute("aria-disabled", 'true');
    });
    it("value prop assigns the element target its value", async () => {
      const el = await fixture<SgdsDropdownItem>(html`<sgds-dropdown-item  value="hello">test</sgds-dropdown-item >`);
      expect(el.value).to.equal("hello");
    });
});
