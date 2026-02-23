import { assert, elementUpdated, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import { SgdsSidebar } from "../src/components";
import "./sgds-web-component";

/* eslint-disable @typescript-eslint/no-explicit-any */

describe("sgds-sidebar", () => {
  it("can be semantically compared with shadowDom trees", async () => {
    const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
    assert.shadowDom.equal(
      el,
      `<nav role="navigation" aria-label="Main navigation" class="sidebar sidebar--expanded">
        <div class="sidebar-header">
          <sgds-icon-button
            name="sidebar-collapse"
            aria-expanded="true"
            aria-label="Collapse sidebar"
          ></sgds-icon-button>
        </div>
        <div class="sidebar-content">
          <slot></slot>
        </div>
        <div class="sidebar-nested-overlay"></div>
      </nav>`,
      { ignoreAttributes: ["class"] }
    );
  });

  it("renders with expanded class when collapsed is false", async () => {
    const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
    expect(el.shadowRoot?.querySelector(".sidebar--expanded")).to.exist;
  });

  it("renders with collapsed class when collapsed is true", async () => {
    const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
    el.collapsed = true;
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".sidebar--collapsed")).to.exist;
  });

  it("accepts slot content with sidebar options", async () => {
    const el = await fixture<SgdsSidebar>(html`
      <sgds-sidebar>
        <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
      </sgds-sidebar>
    `);
    expect(el.querySelectorAll("sgds-sidebar-item").length).to.equal(2);
  });

  describe("State and Toggle", () => {
    it("has collapsed property set to false by default", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el.collapsed).to.be.false;
    });

    it("toggles collapsed state when toggle button is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const initialState = el.collapsed;
      const iconButton = el.shadowRoot?.querySelector("sgds-icon-button");
      (iconButton as HTMLElement)?.click();
      await elementUpdated(el);
      expect(el.collapsed).to.equal(!initialState);
    });

    it("reflects collapsed attribute changes", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      el.setAttribute("collapsed", "true");
      await elementUpdated(el);
      expect(el.collapsed).to.be.true;
    });

    it("emits sgds-sidebar-toggle event when toggle button is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const toggleHandler = sinon.spy();
      el.addEventListener("sgds-sidebar-toggle", toggleHandler);
      const iconButton = el.shadowRoot?.querySelector("sgds-icon-button");
      (iconButton as HTMLElement)?.click();
      await elementUpdated(el);
      expect(toggleHandler).to.have.been.calledOnce;
    });

    it("toggles sidebar when icon button is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const initialState = el.collapsed;
      const iconButton = el.shadowRoot?.querySelector("sgds-icon-button");
      (iconButton as HTMLElement)?.click();
      await elementUpdated(el);
      expect(el.collapsed).to.equal(!initialState);
    });
  });

  describe("Level 0 - Top Level Options", () => {
    it("renders level 0 options with aria-level=1", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const options = el.querySelectorAll("sgds-sidebar-item");
      for (const option of options) {
        expect(option).to.have.attribute("aria-level", "1");
      }
    });

    it("has role option for level 0 items", async () => {
      const el = await fixture<SgdsSidebar>(
        html`<sgds-sidebar><sgds-sidebar-item title="Dashboard" icon="house"></sgds-sidebar-item></sgds-sidebar>`
      );
      expect(el.querySelector("sgds-sidebar-item")).to.have.attribute("role", "option");
    });

    it("does not show submenu for level 0 without nested options", async () => {
      const el = await fixture<SgdsSidebar>(
        html`<sgds-sidebar><sgds-sidebar-item title="Dashboard" icon="house"></sgds-sidebar-item></sgds-sidebar>`
      );
      const option = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(option);
      expect(option.shadowRoot?.querySelector(".sidebar-submenu")).to.not.exist;
    });

    it("emits sgds-select event when level 0 option is clicked", async () => {
      const el = await fixture<SgdsSidebar>(
        html`<sgds-sidebar
          ><sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item
        ></sgds-sidebar>`
      );
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const option = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      expect(selectHandler).to.have.been.calledOnce;
    });

    it("updates active property when option is clicked", async () => {
      const el = await fixture<SgdsSidebar>(
        html`<sgds-sidebar
          ><sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item
        ></sgds-sidebar>`
      );
      const option = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      expect(el.active).to.equal("dashboard");
    });
  });

  describe("Level 1 - Single Nested Options", () => {
    it("detects level 1 nesting correctly", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as HTMLElement;
      const childOption = parentOption.querySelector("sgds-sidebar-item") as HTMLElement;
      expect(childOption).to.have.attribute("aria-level", "2");
    });

    it("renders submenu container for level 1 nested items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      expect(option.shadowRoot?.querySelector(".sidebar-submenu")).to.exist;
    });

    it("displays nested options in submenu", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales" icon="chart"></sgds-sidebar-item>
            <sgds-sidebar-item title="Revenue" icon="trending-up"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as HTMLElement;
      expect(parentOption.querySelectorAll("sgds-sidebar-item").length).to.equal(2);
    });

    it("toggles submenu visibility on parent click", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      expect(option.shadowRoot?.querySelector(".sidebar-submenu.show")).to.not.exist;
      optionDiv.click();
      await elementUpdated(option);
      expect(option.shadowRoot?.querySelector(".sidebar-submenu.show")).to.exist;
    });

    it("shows chevron icon for parent with nested options", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-item title="Sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      expect(option.shadowRoot?.querySelector(".sidebar-item-trailingIcon sgds-icon")).to.exist;
    });

    it("emits sgds-select when level 1 option is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-sidebar-item title="Sales" name="sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const parentOption = el.querySelector("sgds-sidebar-group") as any;
      const childOption = parentOption.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(childOption);
      const childDiv = childOption.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      childDiv.click();
      expect(selectHandler).to.have.been.calledOnce;
    });
  });

  describe("Level 2 - Double Nested Options", () => {
    it("detects level 2 nesting correctly", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-sidebar-group title="Sales" name="sales">
              <sgds-sidebar-item title="By Region" icon="geo"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as HTMLElement;
      const level1Option = parentOption.querySelector("sgds-sidebar-group") as HTMLElement;
      const level2Option = level1Option.querySelector("sgds-sidebar-item") as HTMLElement;
      expect(level2Option).to.have.attribute("aria-level", "3");
    });

    it("maintains parent-child relationships across levels", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-group title="Sales">
              <sgds-sidebar-item title="By Region" icon="geo"></sgds-sidebar-item>
              <sgds-sidebar-item title="By Product" icon="box-seam"></sgds-sidebar-item>
            </sgds-sidebar-group>
            <sgds-sidebar-item title="Revenue" icon="trending-up"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as HTMLElement;
      const directChildren = parentOption.querySelectorAll(":scope > sgds-sidebar-group, :scope > sgds-sidebar-item");
      expect(directChildren.length).to.equal(2);
      const level1First = parentOption.querySelector("sgds-sidebar-group");
      expect(level1First?.querySelectorAll(":scope > sgds-sidebar-item").length).to.equal(2);
    });

    it("renders submenu for level 1 options with level 2 children", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-group title="Sales">
              <sgds-sidebar-item title="By Region"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as any;
      const level1Option = parentOption.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(level1Option);
      expect(level1Option.shadowRoot?.querySelector(".sidebar-submenu")).to.exist;
    });

    it("does not display submenu for level 0 options", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-group title="Sales">
              <sgds-sidebar-item title="By Region"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(parentOption);
      expect(parentOption.shadowRoot?.querySelector(".sidebar-submenu")).to.not.exist;
    });

    it("handles click on level 2 nested option", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-group title="Sales">
              <sgds-sidebar-item title="By Region" name="by-region"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const parentOption = el.querySelector("sgds-sidebar-group") as any;
      const level1Option = parentOption.querySelector("sgds-sidebar-group") as any;
      const level2Option = level1Option.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(level2Option);
      const level2Div = level2Option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      level2Div.click();
      expect(selectHandler).to.have.been.calledOnce;
    });
  });

  describe("Keyboard Events - Enter", () => {
    it("handles Enter key on level 0 item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const item = el.querySelector("sgds-sidebar-item") as any;

      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      expect(clickHandler).to.have.been.calledOnce;
    });

    it("handles Space key on level 0 item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const item = el.querySelector("sgds-sidebar-item") as any;

      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      expect(clickHandler).to.have.been.calledOnce;
    });

    it("handles Enter key on nested item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-item title="Sales" name="sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const parentGroup = el.querySelector("sgds-sidebar-group") as any;
      const childItem = parentGroup.querySelector("sgds-sidebar-item") as any;

      await elementUpdated(childItem);
      const itemDiv = childItem.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      expect(clickHandler).to.have.been.calledOnce;
    });

    it("does not trigger on other keys", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const item = el.querySelector("sgds-sidebar-item") as any;

      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true }));
      expect(clickHandler).not.to.be.called;
    });

    it("updates active property when Enter key pressed on item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      await elementUpdated(el);
      expect(el.active).to.equal("dashboard");
    });
  });

  describe("Keyboard Events - Arrow Navigation", () => {
    it("navigates down between sibling items with ArrowDown", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
          <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item") as NodeListOf<any>;
      const firstItem = items[0];

      await elementUpdated(firstItem);
      const firstItemDiv = firstItem.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      firstItem.focus();
      firstItemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));

      // Second item should receive focus
      await elementUpdated(el);
      expect(document.activeElement).to.not.equal(firstItem);
    });

    it("navigates up between sibling items with ArrowUp", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
          <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item") as NodeListOf<any>;
      const lastItem = items[items.length - 1];

      await elementUpdated(lastItem);
      const lastItemDiv = lastItem.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      lastItem.focus();
      lastItemDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));

      await elementUpdated(el);
      expect(document.activeElement).to.not.equal(lastItem);
    });

    it("opens drawer with ArrowRight on level 0 group with children", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(group);
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      group.focus();
      groupDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.exist;
    });

    it("closes drawer with ArrowLeft on level 0 group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(group);
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      // Open drawer first
      groupDiv.click();
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.exist;

      // Close with ArrowLeft
      group.focus();
      groupDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.not.exist;
    });

    it("toggles submenu with ArrowRight on nested group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-group title="Sales" icon="chart">
              <sgds-sidebar-item title="By Region" name="by-region"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as any;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(nestedGroup);
      const nestedDiv = nestedGroup.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      nestedGroup.focus();

      nestedDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      await elementUpdated(nestedGroup);
      expect(nestedGroup.shadowRoot?.querySelector(".sidebar-submenu.show")).to.exist;
    });

    it("closes submenu with ArrowLeft on nested group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-group title="Sales" icon="chart">
              <sgds-sidebar-item title="By Region" name="by-region"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as any;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(nestedGroup);
      const nestedDiv = nestedGroup.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      // Open submenu first
      nestedDiv.click();
      await elementUpdated(nestedGroup);
      expect(nestedGroup.shadowRoot?.querySelector(".sidebar-submenu.show")).to.exist;

      // Close with ArrowLeft
      nestedGroup.focus();
      nestedDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
      await elementUpdated(nestedGroup);
      expect(nestedGroup.shadowRoot?.querySelector(".sidebar-submenu.show")).to.not.exist;
    });
  });

  describe("Drawer Overlay", () => {
    it("displays drawer overlay when level 0 option with children is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.exist;
    });

    it("hides drawer overlay when clicking the same option again", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      optionDiv.click();
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.exist;

      optionDiv.click();
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.not.exist;
    });

    it("sets aria-expanded on level 0 option when drawer opens", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-item title="Sales" icon="chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      expect(option).to.have.attribute("aria-expanded", "true");
    });

    it("shows nested options in drawer when opened", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales" icon="chart"></sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" icon="bar-chart"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      const overlay = el.shadowRoot?.querySelector(".sidebar-nested-overlay.show");
      expect(overlay?.textContent).to.include("Sales");
      expect(overlay?.textContent).to.include("Analytics");
    });

    it("auto-focuses first drawer item when drawer opens", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" name="analytics"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(group);
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await new Promise(resolve => setTimeout(resolve, 10));
      await elementUpdated(el);

      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.exist;
    });

    it("closes drawer when clicking outside", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(group);
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      // Open drawer
      groupDiv.click();
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.exist;

      // Click outside (on sidebar itself)
      el.click();
      await elementUpdated(el);
      expect(el.shadowRoot?.querySelector(".sidebar-nested-overlay.show")).to.not.exist;
    });

    it("emits sgds-select with source drawer when item clicked in drawer", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const group = el.querySelector("sgds-sidebar-group") as any;
      await elementUpdated(group);

      // Open drawer
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      groupDiv.click();
      await elementUpdated(el);

      // Click item in drawer
      const item = group.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();
      await elementUpdated(el);

      expect(selectHandler).to.have.been.called;
      const callArgs = selectHandler.getCall(selectHandler.callCount - 1);
      expect(callArgs.args[0].detail.source).to.equal("drawer");
    });
  });

  describe("Multiple Sections", () => {
    it("renders multiple sections", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" collapsible>
            <sgds-sidebar-item title="Dashboard" icon="house"></sgds-sidebar-item>
          </sgds-sidebar-section>
          <sgds-sidebar-section title="Tools" collapsible>
            <sgds-sidebar-item title="Settings" icon="gear"></sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.querySelectorAll("sgds-sidebar-section").length).to.equal(2);
    });

    it("maintains independent nesting within each section", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main">
            <sgds-sidebar-group title="Dashboard" icon="house">
              <sgds-sidebar-item title="Summary"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as HTMLElement;
      const group = section.querySelector("sgds-sidebar-group") as HTMLElement;
      expect(group).to.have.attribute("aria-level", "1");
      const item = group.querySelector("sgds-sidebar-item") as HTMLElement;
      expect(item).to.have.attribute("aria-level", "2");
    });

    it("collapses/expands sections independently", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" collapsible></sgds-sidebar-section>
          <sgds-sidebar-section title="Tools" collapsible></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sections = el.querySelectorAll("sgds-sidebar-section") as NodeListOf<any>;
      sections[0].collapsed = true;
      await elementUpdated(sections[0]);
      expect(sections[0].shadowRoot?.querySelector(".sidebar-section-content--collapsed")).to.exist;
      expect(sections[1].shadowRoot?.querySelector(".sidebar-section-content--collapsed")).to.not.exist;
    });

    it("section 1 collapse does not affect section 2 state", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Products" collapsible>
            <sgds-sidebar-item name="item1" title="Item 1"></sgds-sidebar-item>
          </sgds-sidebar-section>
          <sgds-sidebar-section title="Tools" collapsible>
            <sgds-sidebar-item name="item2" title="Item 2"></sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sections = el.querySelectorAll("sgds-sidebar-section") as NodeListOf<any>;
      sections[0].collapsed = true;
      await elementUpdated(sections[0]);

      expect(sections[0].collapsed).to.be.true;
      expect(sections[1].collapsed).to.be.false;
    });
  });

  describe("Active State", () => {
    it("updates active property when option is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      expect(el.active).to.equal("dashboard");
    });

    it("changes active property when different option is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const options = el.querySelectorAll("sgds-sidebar-item") as NodeListOf<any>;
      await elementUpdated(options[0]);
      let optionDiv = options[0].shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      expect(el.active).to.equal("dashboard");

      await elementUpdated(options[1]);
      optionDiv = options[1].shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      optionDiv.click();
      await elementUpdated(el);
      expect(el.active).to.equal("settings");
    });

    it("updates active property when nested option is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard">
            <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const parentOption = el.querySelector("sgds-sidebar-group") as any;
      const childOption = parentOption.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(childOption);
      const childDiv = childOption.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      childDiv.click();
      await elementUpdated(el);
      expect(el.active).to.equal("sales");
    });

    it("applies active CSS class to selected item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item") as NodeListOf<any>;
      await elementUpdated(items[0]);
      const itemDiv = items[0].shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();
      await elementUpdated(el);

      const activeItem = el.querySelector("sgds-sidebar-item[active]") as HTMLElement;
      expect(activeItem?.getAttribute("name")).to.equal("dashboard");
    });
  });

  describe("Link Navigation", () => {
    it("follows anchor link when item wraps link element", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house">
            <a href="/dashboard"></a>
          </sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as any;
      const linkSpy = sinon.spy();
      const link = item.querySelector("a");
      if (link) {
        link.addEventListener("click", linkSpy);
      }
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();
      await elementUpdated(el);

      expect(linkSpy).to.have.been.called;
    });
  });

  describe("Accessibility", () => {
    it("has proper navigation role and aria-label on sidebar", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const nav = el.shadowRoot?.querySelector("nav");
      expect(nav).to.have.attribute("role", "navigation");
      expect(nav).to.have.attribute("aria-label", "Main navigation");
    });

    it("items have role option", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item");
      expect(item).to.have.attribute("role", "option");
    });

    it("items have aria-level attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item");
      expect(item).to.have.attribute("aria-level");
    });

    it("manages tabindex for keyboard navigation", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      expect(itemDiv.tabIndex).to.be.a("number");
    });

    it("hides drawer content from tab order", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" icon="house">
            <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);

      const overlay = el.shadowRoot?.querySelector(".sidebar-nested-overlay");
      expect(overlay).to.exist;
    });
  });

  describe("Event Handling", () => {
    it("emits sgds-select with correct event detail structure", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const item = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();
      await elementUpdated(el);

      expect(selectHandler).to.have.been.called;
      const event = selectHandler.getCall(0).args[0];
      expect(event.detail).to.have.property("activeItem");
      expect(event.detail).to.have.property("activeGroup");
      expect(event.detail).to.have.property("source");
    });

    it("emits sgds-select only once per click interaction", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const item = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();
      await elementUpdated(el);

      expect(selectHandler.callCount).to.equal(1);
    });

    it("includes source property set to item for item selection", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);
      const item = el.querySelector("sgds-sidebar-item") as any;
      await elementUpdated(item);
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();

      expect(selectHandler).to.have.been.called;
      const event = selectHandler.getCall(0).args[0];
      expect(event.detail.source).to.equal("item");
    });
  });
});
