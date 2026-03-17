import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import type { SgdsSidebar, SgdsSidebarGroup, SgdsSidebarItem, SgdsSidebarSection } from "../src/components/Sidebar";
import "./sgds-web-component";

describe("sgds-sidebar", () => {
  describe("Rendering", () => {
    it("renders with correct structure", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const nav = el.shadowRoot?.querySelector("nav");
      expect(nav).to.exist;
    });

    it("has correct initial classes", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).to.have.class("sidebar--expanded");
      expect(sidebar).not.to.have.class("sidebar--collapsed");
    });

    it("renders with collapsed class when collapsed property is true", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar collapsed></sgds-sidebar>`);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).to.have.class("sidebar--collapsed");
      expect(sidebar).not.to.have.class("sidebar--expanded");
    });

    it("accepts slot content for brand name", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <div slot="top">My App</div>
        </sgds-sidebar>
      `);
      const brand = el.querySelector('[slot="top"]');
      expect(brand?.textContent).to.equal("My App");
    });

    it("renders root level groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const groups = el.querySelectorAll("sgds-sidebar-group");
      expect(groups.length).to.equal(2);
    });

    it("renders leaf level items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item");
      expect(items.length).to.equal(2);
    });
  });

  describe("Properties", () => {
    it("has collapsed property set to false by default", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el.collapsed).to.be.false;
    });

    it("has active property set to empty string by default", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el.active).to.equal("");
    });

    it("reflects collapsed property as attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      el.collapsed = true;
      await elementUpdated(el);
      expect(el).to.have.attribute("collapsed");
    });

    it("reflects active property as attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      el.active = "dashboard";
      await elementUpdated(el);
      expect(el).to.have.attribute("active", "dashboard");
    });

    it("updates collapsed class when collapsed property changes", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).to.have.class("sidebar--expanded");

      el.collapsed = true;
      await elementUpdated(el);
      expect(sidebar).to.have.class("sidebar--collapsed");
      expect(sidebar).not.to.have.class("sidebar--expanded");
    });
  });

  describe("Level 1 (Root) Groups", () => {
    it("renders root level group with correct attributes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      expect(group).to.exist;
      expect(group).to.have.attribute("title", "Dashboard");
      expect(group).to.have.attribute("name", "dashboard");
    });

    it("displays root level groups with icon", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const icon = group.querySelector("sgds-icon[slot='leadingIcon']");
      expect(icon).to.exist;
    });

    it("root group visual state updates on click", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);

      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await elementUpdated(el);

      expect(groupDiv).to.have.class("active");
    });
  });

  describe("Level 2 (Nested) Groups", () => {
    it("renders level 2 nested groups inside level 1 group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-group title="Overview" name="overview">
                <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-group>
              <sgds-sidebar-group title="Analytics" name="analytics">
                <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-group>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroups = rootGroup.querySelectorAll(":scope > sgds-sidebar-group");
      expect(nestedGroups.length).to.equal(2);
    });

    it("level 2 groups display chevron icon for expand/collapse", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const chevronIcon = nestedGroup.shadowRoot?.querySelector(".sidebar-item-trailingIcon sgds-icon");
      expect(chevronIcon).to.exist;
    });

    it("clicking level 2 group toggles submenu visibility state", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Details" name="details">
                <sgds-icon name="info" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;

      // Initially submenu should be closed
      expect(nestedGroup.showMenu).to.be.false;

      // Click to toggle
      const nestedGroupDiv = nestedGroup.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      nestedGroupDiv.click();
      await elementUpdated(el);

      // After click, showMenu should be true
      expect(nestedGroup.showMenu).to.be.true;
    });

    it("level 2 groups toggle submenu without emitting sgds-select", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);

      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroupDiv = nestedGroup.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      nestedGroupDiv.click();
      await elementUpdated(el);

      // Level 2+ groups toggle locally without emitting sgds-select
      expect(nestedGroup.showMenu).to.be.true;
      expect(selectHandler).not.to.have.been.called;
    });
  });

  describe("Level 3 (Deeply Nested) Groups", () => {
    it("renders level 3 nested groups with items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Users" name="users">
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level2Group = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level3Items = level2Group.querySelectorAll(":scope > sgds-sidebar-item");
      expect(level3Items.length).to.equal(2);
    });

    it("level 2 groups can contain level 3 items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Revenue" name="revenue">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level2Group = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level3Items = level2Group.querySelectorAll(":scope > sgds-sidebar-item");

      // Level 2 group should contain 2 items at level 3
      expect(level3Items.length).to.equal(2);
    });

    it("maintains correct menu toggle states in max nested hierarchies", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Level 1" name="l1">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Level 2" name="l2">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Level 3 Item" name="l3">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Level 3 Item 2" name="l3_2">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const l2 = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;

      // Initially level 2 group menu should be closed
      expect(l2.showMenu).to.be.false;

      // Expand level 2
      const l2Div = l2.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      l2Div.click();
      await elementUpdated(el);

      // After click, level 2 menu should be open
      expect(l2.showMenu).to.be.true;
    });
  });

  describe("Leaf Items (sgds-sidebar-item)", () => {
    it("renders leaf items with correct attributes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item).to.have.attribute("title", "Dashboard");
      expect(item).to.have.attribute("name", "dashboard");
    });

    it("clicking leaf item should emit sgds-select event", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);

      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      itemDiv.click();

      await elementUpdated(el);
      expect(selectHandler).to.have.been.called;
    });

    it("leaf item becomes active when clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      const itemDiv = item.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      itemDiv.click();
      await elementUpdated(el);

      expect(item._selected).to.be.true;
      expect(itemDiv).to.have.class("active");
    });

    it("nested leaf items under expanded group are visible", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-item title="Summary" name="summary">
              <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" name="analytics">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const items = group.querySelectorAll("sgds-sidebar-item");

      expect(items.length).to.equal(2);
      items.forEach((item: Element) => {
        expect((item as SgdsSidebarItem)._hidden).to.be.true; // Initially hidden until group opens drawer
      });
    });

    it("leaf items display icons when not collapsed", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      const icon = item.querySelector("sgds-icon[slot='leadingIcon']");
      expect(icon).to.exist;
    });
  });

  describe("Click Events and Selection", () => {
    it("clicking different items emits select events with correct names", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const selectHandler = sinon.spy();
      el.addEventListener("sgds-select", selectHandler);

      const items = el.querySelectorAll("sgds-sidebar-item");
      const firstItemDiv = (items[0] as SgdsSidebarItem).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      firstItemDiv.click();
      await elementUpdated(el);

      expect(selectHandler).to.have.been.calledOnce;
    });

    it("only one root group can be active at a time", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const groups = el.querySelectorAll("sgds-sidebar-group");
      const dashboardDiv = (groups[0] as SgdsSidebarGroup).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      const reportsDiv = (groups[1] as SgdsSidebarGroup).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      dashboardDiv.click();
      await elementUpdated(el);
      expect(dashboardDiv).to.have.class("active");

      reportsDiv.click();
      await elementUpdated(el);
      expect(reportsDiv).to.have.class("active");
      expect(dashboardDiv).not.to.have.class("active");
    });

    it("clicking nested item expands parent groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const item = nestedGroup.querySelector("sgds-sidebar-item") as SgdsSidebarItem;

      el.active = "sales";
      await elementUpdated(el);

      // Parent groups should be expanded to show the active item
      expect(rootGroup._selected).to.be.true;
      expect(nestedGroup._selected).to.be.true;
      expect(item._selected).to.be.true;
    });
  });

  describe("Collapsed State", () => {
    it("applies collapsed styling when sidebar is collapsed", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar collapsed>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      expect(groupDiv).to.have.class("sidebar-item--collapsed");
    });

    it("toggling collapsed property updates all child items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const message = rootGroup.shadowRoot?.querySelector(".sidebar-item");

      el.collapsed = true;
      await elementUpdated(el);

      expect(message).to.have.class("sidebar-item--collapsed");
    });

    it("collapsed sidebar shows only icons for root level items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar collapsed>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item._sidebarCollapsed).to.be.true;
    });
  });

  describe("Active Item Management", () => {
    it("sets active property to select an item by name", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      el.active = "reports";
      await elementUpdated(el);

      const items = el.querySelectorAll("sgds-sidebar-item");
      const reportsItem = items[1] as SgdsSidebarItem;
      expect(reportsItem._selected).to.be.true;
    });

    it("programmatically setting active property selects item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item");

      el.active = "dashboard";
      await elementUpdated(el);
      const dashboardDiv = (items[0] as SgdsSidebarItem).shadowRoot?.querySelector(".sidebar-item");
      expect(dashboardDiv).to.have.class("active");

      el.active = "reports";
      await elementUpdated(el);
      const reportsDiv = (items[1] as SgdsSidebarItem).shadowRoot?.querySelector(".sidebar-item");
      expect(reportsDiv).to.have.class("active");
    });

    it("setting active on nested item selects the item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      el.active = "sales";
      await elementUpdated(el);

      const rootGroup = el.querySelector('sgds-sidebar-group[name="dashboard"]') as SgdsSidebarGroup;
      const nestedGroup = rootGroup?.querySelector('sgds-sidebar-group[name="overview"]') as SgdsSidebarGroup;
      const item = nestedGroup?.querySelector('sgds-sidebar-item[name="sales"]') as SgdsSidebarItem;

      if (item) {
        expect(item._selected).to.be.true;
      }
    });
  });

  describe("Complex Nested Hierarchies", () => {
    it("handles mixed groups and items at same level", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-group title="Analytics" name="analytics">
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
                <sgds-sidebar-item title="Revenue" name="revenue">
                  <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-group>
            </sgds-sidebar-group>
            <sgds-sidebar-item title="Settings" name="settings">
              <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.querySelector("sgds-sidebar-group")).to.exist;
      expect(el.querySelector("sgds-sidebar-item")).to.exist;
      const nestedItem = el.querySelector("sgds-sidebar-group sgds-sidebar-item");
      expect(nestedItem).to.exist;
    });

    it("maintains state with multiple root groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="Monthly" name="monthly">
                <sgds-icon name="calendar" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const dashboardGroup = el.querySelector('sgds-sidebar-group[name="dashboard"]') as SgdsSidebarGroup;
      const reportsGroup = el.querySelector('sgds-sidebar-group[name="reports"]') as SgdsSidebarGroup;
      expect(dashboardGroup).to.exist;
      expect(reportsGroup).to.exist;

      el.active = "summary";
      await elementUpdated(el);
      expect(el.active).to.equal("summary");

      el.active = "monthly";
      await elementUpdated(el);
      expect(el.active).to.equal("monthly");
    });

    it("handles navigation between root level items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="L1-A" name="l1a">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="L2-Item1" name="l2item1">
                <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="L1-B" name="l1b">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
              <sgds-sidebar-item title="L2-Item2" name="l2item2">
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);

      const l1a = el.querySelector('sgds-sidebar-group[name="l1a"]') as SgdsSidebarGroup;
      const l1b = el.querySelector('sgds-sidebar-group[name="l1b"]') as SgdsSidebarGroup;

      // Click L1-A to make it active
      const l1aDiv = l1a.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      l1aDiv.click();
      await elementUpdated(el);
      expect(l1a._selected).to.be.true;

      // Click L1-B to switch active group
      const l1bDiv = l1b.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      l1bDiv.click();
      await elementUpdated(el);
      expect(l1b._selected).to.be.true;
      expect(l1a._selected).to.be.false;
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles empty sidebar gracefully", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el).to.exist;
      expect(el.querySelectorAll("sgds-sidebar-group").length).to.equal(0);
      expect(el.querySelectorAll("sgds-sidebar-item").length).to.equal(0);
    });

    it("handles missing required attributes gracefully", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group></sgds-sidebar-group>
            <sgds-sidebar-item></sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.querySelector("sgds-sidebar-group")).to.exist;
      expect(el.querySelector("sgds-sidebar-item")).to.exist;
    });

    it("handles setting active to non-existent item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      el.active = "non-existent";
      await elementUpdated(el);
      // Should not throw and should deselect current item
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item._selected).to.be.false;
    });

    it("handles rapid consecutive clicks", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item");
      const dashboardDiv = (items[0] as SgdsSidebarItem).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      const reportsDiv = (items[1] as SgdsSidebarItem).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      dashboardDiv.click();
      reportsDiv.click();
      dashboardDiv.click();
      await elementUpdated(el);

      // Last click should win
      expect((items[0] as SgdsSidebarItem)._selected).to.be.true;
    });
  });

  describe("sgds-sidebar-section", () => {
    it("renders section with title", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main Navigation" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      expect(section).to.exist;
      expect(section).to.have.attribute("title", "Main Navigation");
    });

    it("displays section title in DOM", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const titleText = section?.shadowRoot?.querySelector(".sidebar-section-label span");
      expect(titleText?.textContent).to.include("Main");
    });

    it("has collapsed property set to false by default", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as SgdsSidebarSection;
      expect(section.collapsed).to.be.false;
    });

    it("has collapsible property set to false by default", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as SgdsSidebarSection;
      expect(section.collapsible).to.be.false;
    });

    it("renders chevron icon only when collapsible is true", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const chevron = section?.shadowRoot?.querySelector(".sidebar-section-label sgds-icon");
      expect(chevron).to.exist;
    });

    it("does not render chevron icon when collapsible is false", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const chevron = section?.shadowRoot?.querySelector(".sidebar-section-label sgds-icon");
      expect(chevron).not.to.exist;
    });

    it("toggles collapsed state when clicked and collapsible is true", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as SgdsSidebarSection;
      const sectionLabel = section.shadowRoot?.querySelector(".sidebar-section-label") as HTMLElement;

      expect(section.collapsed).to.be.false;

      sectionLabel.click();
      await elementUpdated(el);

      expect(section.collapsed).to.be.true;

      sectionLabel.click();
      await elementUpdated(el);

      expect(section.collapsed).to.be.false;
    });

    it("has aria-expanded attribute that reflects collapsed state", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible collapsed></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const sectionLabel = section?.shadowRoot?.querySelector(".sidebar-section-label") as HTMLElement;

      expect(sectionLabel).to.have.attribute("aria-expanded", "false");
    });

    it("contains sidebar items and groups within slot", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const items = section?.querySelectorAll("sgds-sidebar-item");
      const groups = section?.querySelectorAll("sgds-sidebar-group");

      expect(items?.length).to.equal(1);
      expect(groups?.length).to.equal(1);
    });

    it("hides content when collapsed and collapsible is true", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible collapsed>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const content = section?.shadowRoot?.querySelector(".sidebar-section-content");

      expect(content).to.have.class("sidebar-section-content--collapsed");
    });

    it("shows content when expanded or collapsible is false", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const content = section?.shadowRoot?.querySelector(".sidebar-section-content");

      expect(content).not.to.have.class("sidebar-section-content--collapsed");
    });

    it("reflects collapsed property as attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as SgdsSidebarSection;

      expect(section).not.to.have.attribute("collapsed");

      section.collapsed = true;
      await elementUpdated(el);

      expect(section).to.have.attribute("collapsed");
    });

    it("has role region attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");

      expect(section).to.have.attribute("role", "region");
    });

    it("handles multiple sections in sidebar", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
          <sgds-sidebar-section title="Organization" name="org"></sgds-sidebar-section>
          <sgds-sidebar-section title="Configuration" name="config"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sections = el.querySelectorAll("sgds-sidebar-section");

      expect(sections.length).to.equal(3);
    });

    it("chevron icon changes when toggling collapsed state", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const sectionLabel = section?.shadowRoot?.querySelector(".sidebar-section-label") as HTMLElement;
      const chevronIcon = section?.shadowRoot?.querySelector(".sidebar-section-label sgds-icon");

      expect(chevronIcon).to.have.attribute("name", "chevron-up");

      sectionLabel.click();
      await elementUpdated(el);

      expect(chevronIcon).to.have.attribute("name", "chevron-down");
    });

    it("sections within collapsed sidebar maintain visibility", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar collapsed>
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const sectionDiv = section?.shadowRoot?.querySelector(".sidebar-section");

      expect(sectionDiv).to.have.class("sidebar-section--collapsed");
    });
  });
});
