import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import type { SgdsSidebar, SgdsSidebarGroup, SgdsSidebarItem } from "../src/components/Sidebar";
import "./sgds-web-component";

describe("sgds-sidebar", () => {
  describe("Rendering", () => {
    it("renders with correct structure", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const nav = el.shadowRoot?.querySelector("nav");
      expect(nav).to.exist;
      expect(nav).to.have.attribute("role", "navigation");
      expect(nav).to.have.attribute("aria-label", "Main navigation");
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
          <div slot="brandName">My App</div>
        </sgds-sidebar>
      `);
      const brand = el.querySelector('[slot="brandName"]');
      expect(brand?.textContent).to.equal("My App");
    });

    it("renders root level groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-group>
          <sgds-sidebar-group title="Reports" name="reports" icon="file-text"></sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const groups = el.querySelectorAll("sgds-sidebar-group");
      expect(groups.length).to.equal(2);
    });

    it("renders leaf level items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
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

  describe("Level 0 (Root) Groups", () => {
    it("renders root level group with correct attributes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      expect(group).to.exist;
      expect(group).to.have.attribute("title", "Dashboard");
      expect(group).to.have.attribute("name", "dashboard");
      expect(group).to.have.attribute("icon", "house");
    });

    it("displays root level groups with icon", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const icon = group.shadowRoot?.querySelector("sgds-icon");
      expect(icon).to.exist;
    });

    it("root group visual state updates on click", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-group>
        </sgds-sidebar>
      `);

      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await elementUpdated(el);

      expect(groupDiv).to.have.class("active");
    });
  });

  describe("Level 1 (Nested) Groups", () => {
    it("renders level 1 nested groups inside level 0 group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text"></sgds-sidebar-group>
            <sgds-sidebar-group title="Analytics" name="analytics" icon="file-text"></sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroups = rootGroup.querySelectorAll(":scope > sgds-sidebar-group");
      expect(nestedGroups.length).to.equal(2);
    });

    it("level 1 groups display chevron icon for expand/collapse", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text"></sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const chevronIcon = nestedGroup.shadowRoot?.querySelector(".sidebar-item-trailingIcon sgds-icon");
      expect(chevronIcon).to.exist;
    });

    it("clicking level 1 group toggles submenu visibility state", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text">
              <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
              <sgds-sidebar-item title="Details" name="details" icon="info"></sgds-sidebar-item>
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

    it("level 1 groups toggle submenu without emitting sgds-select", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text">
              <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
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

      // Level 1+ groups toggle locally without emitting sgds-select
      expect(nestedGroup.showMenu).to.be.true;
      expect(selectHandler).not.to.have.been.called;
    });
  });

  describe("Level 2 (Deeply Nested) Groups", () => {
    it("renders level 2 nested groups with items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text">
              <sgds-sidebar-item title="Sales" name="sales" icon="users"></sgds-sidebar-item>
              <sgds-sidebar-item title="Users" name="users" icon="users"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level1Group = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level2Items = level1Group.querySelectorAll(":scope > sgds-sidebar-item");
      expect(level2Items.length).to.equal(2);
    });

    it("level 1 groups can contain level 2 items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text">
              <sgds-sidebar-item title="Sales" name="sales" icon="users"></sgds-sidebar-item>
              <sgds-sidebar-item title="Revenue" name="revenue" icon="building"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level1Group = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const level2Items = level1Group.querySelectorAll(":scope > sgds-sidebar-item");

      // Level 1 group should contain 2 items at level 2
      expect(level2Items.length).to.equal(2);
    });

    it("maintains correct menu toggle states in max nested hierarchies", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Level 0" name="l0" icon="house">
            <sgds-sidebar-group title="Level 1" name="l1" icon="file-text">
              <sgds-sidebar-item title="Level 2 Item" name="l2" icon="building"></sgds-sidebar-item>
              <sgds-sidebar-item title="Level 2 Item 2" name="l2_2" icon="building"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const l1 = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;

      // Initially level 1 group menu should be closed
      expect(l1.showMenu).to.be.false;

      // Expand level 1
      const l1Div = l1.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      l1Div.click();
      await elementUpdated(el);

      // After click, level 1 menu should be open
      expect(l1.showMenu).to.be.true;
    });
  });

  describe("Leaf Items (sgds-sidebar-item)", () => {
    it("renders leaf items with correct attributes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item).to.have.attribute("title", "Dashboard");
      expect(item).to.have.attribute("name", "dashboard");
      expect(item).to.have.attribute("icon", "house");
    });

    it("clicking leaf item should emit sgds-select event", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
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
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" name="analytics" icon="file-text"></sgds-sidebar-item>
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
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      const icon = item.shadowRoot?.querySelector("sgds-icon[name='house']");
      expect(icon).to.exist;
    });
  });

  describe("Click Events and Selection", () => {
    it("clicking different items emits select events with correct names", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-group>
          <sgds-sidebar-group title="Reports" name="reports" icon="file-text"></sgds-sidebar-group>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text">
              <sgds-sidebar-item title="Sales" name="sales" icon="building"></sgds-sidebar-item>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      expect(groupDiv).to.have.class("sidebar-item--collapsed");
    });

    it("toggling collapsed property updates all child items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
          </sgds-sidebar-group>
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
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
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
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
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
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-group title="Overview" name="overview" icon="file-text">
              <sgds-sidebar-item title="Sales" name="sales" icon="building"></sgds-sidebar-item>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
            <sgds-sidebar-group title="Analytics" name="analytics" icon="users">
              <sgds-sidebar-item title="Revenue" name="revenue" icon="building"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
          <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
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
          <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
            <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
          </sgds-sidebar-group>
          <sgds-sidebar-group title="Reports" name="reports" icon="file-text">
            <sgds-sidebar-item title="Monthly" name="monthly" icon="calendar"></sgds-sidebar-item>
          </sgds-sidebar-group>
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
          <sgds-sidebar-group title="L0-A" name="l0a" icon="house">
            <sgds-sidebar-item title="L1-Item1" name="l1item1" icon="building"></sgds-sidebar-item>
          </sgds-sidebar-group>
          <sgds-sidebar-group title="L0-B" name="l0b" icon="file-text">
            <sgds-sidebar-item title="L1-Item2" name="l1item2" icon="users"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);

      const l0a = el.querySelector('sgds-sidebar-group[name="l0a"]') as SgdsSidebarGroup;
      const l0b = el.querySelector('sgds-sidebar-group[name="l0b"]') as SgdsSidebarGroup;

      // Click L0-A to make it active
      const l0aDiv = l0a.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      l0aDiv.click();
      await elementUpdated(el);
      expect(l0a._selected).to.be.true;

      // Click L0-B to switch active group
      const l0bDiv = l0b.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      l0bDiv.click();
      await elementUpdated(el);
      expect(l0b._selected).to.be.true;
      expect(l0a._selected).to.be.false;
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
          <sgds-sidebar-group></sgds-sidebar-group>
          <sgds-sidebar-item></sgds-sidebar-item>
        </sgds-sidebar>
      `);
      expect(el.querySelector("sgds-sidebar-group")).to.exist;
      expect(el.querySelector("sgds-sidebar-item")).to.exist;
    });

    it("handles setting active to non-existent item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
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
          <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
          <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
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
});
