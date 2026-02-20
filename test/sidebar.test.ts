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

    it("toggles collapsed state when toggleCollapsed is called", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const initialState = el.collapsed;
      el.toggleCollapsed();
      await elementUpdated(el);
      expect(el.collapsed).to.equal(!initialState);
    });

    it("reflects collapsed attribute changes", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      el.setAttribute("collapsed", "true");
      await elementUpdated(el);
      expect(el.collapsed).to.be.true;
    });

    it("emits sgds-sidebar-toggle event when toggleCollapsed is called", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const toggleHandler = sinon.spy();
      el.addEventListener("sgds-sidebar-toggle", toggleHandler);
      el.toggleCollapsed();
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

  describe("Keyboard Events", () => {
    it("handles Enter key on level 0 option", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-option title="Dashboard" name="dashboard" icon="file-text"></sgds-sidebar-option>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const option = el.querySelector("sgds-sidebar-option") as any;
      option.addEventListener("i-sgds-click", clickHandler);
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-option") as HTMLElement;
      optionDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      expect(clickHandler).to.have.been.calledOnce;
    });

    it("handles Enter key on level 1 nested option", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-option title="Dashboard">
            <sgds-sidebar-option title="Sales" name="sales" icon="chart"></sgds-sidebar-option>
          </sgds-sidebar-option>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const parentOption = el.querySelector("sgds-sidebar-option") as any;
      const childOption = parentOption.querySelector("sgds-sidebar-option") as any;
      childOption.addEventListener("i-sgds-click", clickHandler);
      await elementUpdated(childOption);
      const optionDiv = childOption.shadowRoot?.querySelector(".sidebar-option") as HTMLElement;
      optionDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      expect(clickHandler).to.have.been.calledOnce;
    });

    it("does not trigger on non-Enter keys", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-option title="Dashboard" icon="house"></sgds-sidebar-option>
        </sgds-sidebar>
      `);
      const clickHandler = sinon.spy();
      const option = el.querySelector("sgds-sidebar-option") as any;
      option.addEventListener("i-sgds-click", clickHandler);
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-option") as HTMLElement;
      optionDiv.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      expect(clickHandler).not.to.be.called;
    });

    it("updates active property when Enter key used on option", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-option title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-option>
        </sgds-sidebar>
      `);
      const option = el.querySelector("sgds-sidebar-option") as any;
      await elementUpdated(option);
      const optionDiv = option.shadowRoot?.querySelector(".sidebar-option") as HTMLElement;
      optionDiv.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      await elementUpdated(el);
      expect(el.active).to.equal("dashboard");
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
  });

  describe("Multiple Sections", () => {
    it("renders multiple sections", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" collapsible expanded>
            <sgds-sidebar-option title="Dashboard" icon="house"></sgds-sidebar-option>
          </sgds-sidebar-section>
          <sgds-sidebar-section title="Tools" collapsible expanded>
            <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.querySelectorAll("sgds-sidebar-section").length).to.equal(2);
    });

    it("maintains independent nesting within each section", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main">
            <sgds-sidebar-option title="Dashboard" name="dashboard" icon="house">
              <sgds-sidebar-option title="Summary" icon="building"></sgds-sidebar-option>
            </sgds-sidebar-option>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as HTMLElement;
      const option = section.querySelector("sgds-sidebar-option") as HTMLElement;
      expect(option).to.have.attribute("aria-level", "1");
      const nested = option.querySelector("sgds-sidebar-option") as HTMLElement;
      expect(nested).to.have.attribute("aria-level", "2");
    });

    it("collapses/expands sections independently", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" collapsible expanded></sgds-sidebar-section>
          <sgds-sidebar-section title="Tools" collapsible expanded></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sections = el.querySelectorAll("sgds-sidebar-section") as NodeListOf<any>;
      sections[0].collapsed = true;
      await elementUpdated(sections[0]);
      expect(sections[0].shadowRoot?.querySelector(".sidebar-section-content--collapsed")).to.exist;
      expect(sections[1].shadowRoot?.querySelector(".sidebar-section-content--collapsed")).to.not.exist;
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
  });
});
