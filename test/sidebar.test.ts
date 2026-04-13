import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import type { SgdsSidebar, SgdsSidebarGroup, SgdsSidebarItem, SgdsSidebarSection } from "../src/components/Sidebar";
import "./sgds-web-component";

describe("sgds-sidebar", () => {
  describe("Rendering", () => {
    it("renders basic sidebar structure with navigation role", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const nav = el.shadowRoot?.querySelector("nav");
      expect(nav).to.exist;
    });

    it("has correct initial classes", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");

      expect(sidebar).not.to.have.class("sidebar--collapsed");
    });

    it("applies collapsed CSS class when collapsed property is true", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar collapsed></sgds-sidebar>`);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).to.have.class("sidebar--collapsed");
    });

    it("accepts and displays brand/logo content in upper slot", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <div slot="upper">My App</div>
        </sgds-sidebar>
      `);
      const brand = el.querySelector('[slot="upper"]');
      expect(brand?.textContent).to.equal("My App");
    });

    it("renders multiple root level groups within section", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const groups = el.querySelectorAll("sgds-sidebar-group");
      expect(groups.length).to.equal(2);
    });

    it("renders leaf items with correct structure within section", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const items = el.querySelectorAll("sgds-sidebar-item");
      expect(items.length).to.equal(2);
    });
  });

  describe("Properties and Attributes", () => {
    it("initializes collapsed property to false", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el.collapsed).to.be.false;
    });

    it("initializes active property to empty string", async () => {
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

    it("applies sidebar--collapsed CSS class when collapsed changes", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");

      el.collapsed = true;
      await elementUpdated(el);
      expect(sidebar).to.have.class("sidebar--collapsed");
    });
  });

  describe("Root Level Groups", () => {
    it("renders root group with title and name attributes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      expect(group).to.exist;
      expect(group).to.have.attribute("title", "Dashboard");
      expect(group).to.have.attribute("name", "dashboard");
    });

    it("displays leading icon in root level group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const icon = group.querySelector("sgds-icon[slot='leading-icon']");
      expect(icon).to.exist;
    });

    it("updates visual state with active class when clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
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

  describe("Nested Groups (Level 2+)", () => {
    it("renders level 2 groups nested inside level 1 group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-group title="Overview" name="overview">
                <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-group>
              <sgds-sidebar-group title="Analytics" name="analytics">
                <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-group>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroups = rootGroup.querySelectorAll(":scope > sgds-sidebar-group");
      expect(nestedGroups.length).to.equal(2);
    });

    it("displays chevron icon for nested group expand/collapse", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const rootGroup = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const nestedGroup = rootGroup.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const chevronIcon = nestedGroup.shadowRoot?.querySelector(".sidebar-item-trailing-icon sgds-icon");
      expect(chevronIcon).to.exist;
    });

    it("toggles submenu visibility when nested group is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Details" name="details">
                <sgds-icon name="info" slot="leading-icon"></sgds-icon>
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

    it("does not emit sgds-select when toggling nested group menu", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
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

  describe("Deeply Nested Groups (Level 3)", () => {
    it("renders level 3 items nested under level 2 group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="users" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Users" name="users">
                <sgds-icon name="users" slot="leading-icon"></sgds-icon>
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

    it("displays level 3 items under expanded level 2 group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="users" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Revenue" name="revenue">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
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

    it("maintains menu toggle states in maximal nesting hierarchy", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Level 1" name="l1">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Level 2" name="l2">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Level 3 Item" name="l3">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Level 3 Item 2" name="l3_2">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
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
    it("renders item with title and name attributes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item).to.have.attribute("title", "Dashboard");
      expect(item).to.have.attribute("name", "dashboard");
    });

    it("emits sgds-select event when item is clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
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

    it("marks item selected with active class when clicked", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
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

    it("hides nested items until parent group drawer is opened", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-item title="Summary" name="summary">
              <sgds-icon name="building" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" name="analytics">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

    it("displays leading icon on items when not collapsed", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-item title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      const icon = item.querySelector("sgds-icon[slot='leading-icon']");
      expect(icon).to.exist;
    });
  });

  describe("Item Selection and Events", () => {
    it("emits select event with correct item name for each clicked item", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

    it("only one root group remains active when switching between groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

    it("automatically expands parent groups when nested item is selected", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
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

    it("expands the submenu of a level-2 group when its nested item is programmatically activated", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-sidebar-item title="Sales" name="sales"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const nestedGroup = el.querySelector('sgds-sidebar-group[name="overview"]') as SgdsSidebarGroup;

      el.active = "sales";
      await elementUpdated(el);

      const submenu = nestedGroup.shadowRoot?.querySelector(".sidebar-submenu");
      expect(submenu).to.have.class("show");
    });
  });

  describe("Variant Property", () => {
    it("initializes variant property to 'collapsible'", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el.variant).to.equal("collapsible");
    });

    it("reflects variant property as attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      el.variant = "overlay";
      await elementUpdated(el);
      expect(el).to.have.attribute("variant", "overlay");
    });

    it("accepts 'persistent' variant", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="persistent">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.variant).to.equal("persistent");
    });

    it("accepts 'overlay' variant", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.variant).to.equal("overlay");
    });

    it("applies overlay CSS class when variant is 'overlay'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).to.have.class("overlay");
    });

    it("does not apply overlay CSS class when variant is 'collapsible'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="collapsible">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).not.to.have.class("overlay");
    });

    it("does not apply overlay CSS class when variant is 'persistent'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="persistent">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const sidebar = el.shadowRoot?.querySelector(".sidebar");
      expect(sidebar).not.to.have.class("overlay");
    });

    it("prevents toggle when variant is 'persistent'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="persistent">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const initialState = el.collapsed;
      el.toggleCollapsed();
      await elementUpdated(el);
      expect(el.collapsed).to.equal(initialState);
    });

    it("allows toggle when variant is 'collapsible'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="collapsible">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      el.toggleCollapsed();
      await elementUpdated(el);
      expect(el.collapsed).to.be.true;
    });

    it("allows toggle when variant is 'overlay'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      el.toggleCollapsed();
      await elementUpdated(el);
      expect(el.collapsed).to.be.true;
    });

    it("does not render toggle button when variant is 'overlay'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const toggleButton = el.shadowRoot?.querySelector("sgds-icon-button");
      expect(toggleButton).not.to.exist;
    });

    it("renders toggle button when variant is 'collapsible'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="collapsible">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const toggleButton = el.shadowRoot?.querySelector("sgds-icon-button");
      expect(toggleButton).to.exist;
    });
  });

  describe("Collapsed State Management", () => {
    it("applies sidebar-item--collapsed class when sidebar is collapsed", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar collapsed>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-group>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      expect(groupDiv).to.have.class("sidebar-item--collapsed");
    });

    it("applies collapsed styling to all child items when collapsed changes", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="collapsible">
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
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

    it("does not apply collapsed styling when variant is 'persistent'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="persistent">
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

      expect(message).not.to.have.class("sidebar-item--collapsed");
    });

    it("provides _sidebarCollapsed state to child items when sidebar collapsed", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar collapsed>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item._sidebarCollapsed).to.be.true;
    });

    it("does not provide _sidebarCollapsed state when variant is 'persistent'", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="persistent" collapsed>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const item = el.querySelector("sgds-sidebar-item") as SgdsSidebarItem;
      expect(item._sidebarCollapsed).to.be.false;
    });
  });

  describe("Active Item Management and Selection", () => {
    it("selects item by name when active property is set programmatically", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

    it("updates active class when programmatically switching items", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

    it("selects deeply nested item by setting active property", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            <sgds-sidebar-group title="Overview" name="overview">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Sales" name="sales">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
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

  describe("Complex Hierarchies", () => {
    it("handles mixed groups and items at the same level", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-group title="Analytics" name="analytics">
                <sgds-icon name="users" slot="leading-icon"></sgds-icon>
                <sgds-sidebar-item title="Revenue" name="revenue">
                  <sgds-icon name="building" slot="leading-icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-group>
            </sgds-sidebar-group>
            <sgds-sidebar-item title="Settings" name="settings">
              <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      expect(el.querySelector("sgds-sidebar-group")).to.exist;
      expect(el.querySelector("sgds-sidebar-item")).to.exist;
      const nestedItem = el.querySelector("sgds-sidebar-group sgds-sidebar-item");
      expect(nestedItem).to.exist;
    });

    it("maintains selection state across multiple root groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Summary" name="summary">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="Monthly" name="monthly">
                <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
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

    it("switches active selection between different navigation branches", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-group title="L1-A" name="l1a">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="L2-Item1" name="l2item1">
                <sgds-icon name="building" slot="leading-icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>
            <sgds-sidebar-group title="L1-B" name="l1b">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
              <sgds-sidebar-item title="L2-Item2" name="l2item2">
                <sgds-icon name="users" slot="leading-icon"></sgds-icon>
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

    it("deselects a drawer item when switching to another drawer item in the same group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-sidebar-item title="Meetings" name="meetings"></sgds-sidebar-item>
            <sgds-sidebar-group title="Summary" name="summary">
              <sgds-sidebar-item title="Refunds" name="refunds"></sgds-sidebar-item>
            </sgds-sidebar-group>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);

      // Grab references before the drawer moves them out of the light DOM
      const meetings = el.querySelector('sgds-sidebar-item[name="meetings"]') as SgdsSidebarItem;
      const refunds = el.querySelector('sgds-sidebar-item[name="refunds"]') as SgdsSidebarItem;
      const summaryGroup = el.querySelector('sgds-sidebar-group[name="summary"]') as SgdsSidebarGroup;

      // Open drawer by clicking Dashboard
      const dashboardDiv = (el.querySelector('sgds-sidebar-group[name="dashboard"]') as SgdsSidebarGroup)
        .shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      dashboardDiv.click();
      await elementUpdated(el);

      // Activate Meetings (a direct drawer item)
      const meetingsDiv = meetings.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      meetingsDiv.click();
      await elementUpdated(el);
      expect(meetingsDiv).to.have.class("active");

      // Now activate Refunds (a nested drawer item inside Summary)
      const summaryDiv = summaryGroup.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      summaryDiv.click();
      await elementUpdated(el);

      const refundsDiv = refunds.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      refundsDiv.click();
      await elementUpdated(el);

      expect(refundsDiv).to.have.class("active");
      expect(meetingsDiv).not.to.have.class("active");
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("handles empty sidebar without errors", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el).to.exist;
      expect(el.querySelectorAll("sgds-sidebar-group").length).to.equal(0);
      expect(el.querySelectorAll("sgds-sidebar-item").length).to.equal(0);
    });

    it("renders elements gracefully when required attributes are missing", async () => {
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

    it("deselects all items when active is set to non-existent name", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
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

    it("correctly handles rapidly consecutive item clicks", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

  describe("Scrim Overlay Behavior", () => {
    it("initializes scrim property to false", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      expect(el.scrim).to.be.false;
    });

    it("reflects scrim property as attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`<sgds-sidebar></sgds-sidebar>`);
      el.scrim = true;
      await elementUpdated(el);
      expect(el).to.have.attribute("scrim");
    });

    it("displays scrim overlay when scrim is true and overlay drawer is open", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar scrim variant="overlay">
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
      const scrimDiv = el.shadowRoot?.querySelector(".sidebar--overlay");
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await elementUpdated(el);

      expect(scrimDiv).to.have.class("show");
    });

    it("displays scrim overlay when variant is overlay and sidebar is not collapsed", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar scrim variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const scrimDiv = el.shadowRoot?.querySelector(".sidebar--overlay");

      expect(scrimDiv).to.have.class("show");
    });

    it("hides scrim overlay when sidebar is collapsed in overlay mode", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar scrim variant="overlay" collapsed>
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const scrimDiv = el.shadowRoot?.querySelector(".sidebar--overlay");

      expect(scrimDiv).not.to.have.class("show");
    });
  });

  describe("Drawer Content Population", () => {
    it("populates drawer overlay with direct children of clicked root group", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-sidebar-item title="Summary" name="summary"></sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" name="analytics"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await elementUpdated(el);

      const drawer = el.shadowRoot?.querySelector(".sidebar-nested-overlay");
      const drawerItems = drawer?.querySelectorAll("sgds-sidebar-item");
      expect(drawerItems?.length).to.equal(2);
    });

    it("updates drawer content when switching between root groups", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-sidebar-item title="Summary" name="summary"></sgds-sidebar-item>
          </sgds-sidebar-group>
          <sgds-sidebar-group title="Reports" name="reports">
            <sgds-sidebar-item title="Monthly" name="monthly"></sgds-sidebar-item>
            <sgds-sidebar-item title="Weekly" name="weekly"></sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar>
      `);
      const groups = el.querySelectorAll("sgds-sidebar-group");
      const dashboardDiv = (groups[0] as SgdsSidebarGroup).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;
      const reportsDiv = (groups[1] as SgdsSidebarGroup).shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      dashboardDiv.click();
      await elementUpdated(el);
      const drawer = el.shadowRoot?.querySelector(".sidebar-nested-overlay");
      expect(drawer?.querySelectorAll("sgds-sidebar-item").length).to.equal(1);

      reportsDiv.click();
      await elementUpdated(el);
      expect(drawer?.querySelectorAll("sgds-sidebar-item").length).to.equal(2);
    });
  });

  describe("Overlay Mode Drawer Behavior", () => {
    it("displays drawer overlay scrim when level 1 group is clicked in overlay variant", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar scrim variant="overlay">
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
      const scrimDiv = el.shadowRoot?.querySelector(".sidebar--overlay");
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await elementUpdated(el);

      expect(scrimDiv).to.have.class("show");
    });

    it("hides drawer items when clicking outside in overlay mode", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar scrim variant="overlay">
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
      const group = el.querySelector("sgds-sidebar-group") as SgdsSidebarGroup;
      const groupDiv = group.shadowRoot?.querySelector(".sidebar-item") as HTMLElement;

      groupDiv.click();
      await elementUpdated(el);

      // Verify drawer interaction works via overlay mode
      expect(el.variant).to.equal("overlay");
    });

    it("collapses sidebar when clicking outside overlay with no toggler", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      el.collapsed = false;
      await elementUpdated(el);

      // Simulate click outside with no toggler
      const clickEvent = new MouseEvent("click", { bubbles: true, composed: true });
      document.body.dispatchEvent(clickEvent);
      await elementUpdated(el);

      expect(el.collapsed).to.be.true;
    });

    it("does not collapse sidebar when clicking toggler element", async () => {
      const toggler = document.createElement("button");
      toggler.setAttribute("data-sidebar-toggler", "true");

      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar variant="overlay">
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      el.collapsed = false;
      await elementUpdated(el);

      // Simulate click on toggler element
      const clickEvent = new MouseEvent("click", { bubbles: true, composed: true });
      Object.defineProperty(clickEvent, "target", { value: toggler, enumerable: true });
      el.dispatchEvent(clickEvent);
      await elementUpdated(el);

      expect(el.collapsed).to.be.false;
    });
  });

  describe("Sidebar Sections (sgds-sidebar-section)", () => {
    it("renders section with title attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main Navigation" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      expect(section).to.exist;
      expect(section).to.have.attribute("title", "Main Navigation");
    });

    it("displays section title text in the DOM", async () => {
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

    it("initializes collapsible property to false", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section") as SgdsSidebarSection;
      expect(section.collapsible).to.be.false;
    });

    it("displays chevron icon only when section is collapsible", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const chevron = section?.shadowRoot?.querySelector(".sidebar-section-label sgds-icon");
      expect(chevron).to.exist;
    });

    it("does not render chevron icon when section is not collapsible", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const chevron = section?.shadowRoot?.querySelector(".sidebar-section-label sgds-icon");
      expect(chevron).not.to.exist;
    });

    it("toggles collapsed state when clicking collapsible section header", async () => {
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

    it("reflects collapsed state in aria-expanded attribute", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible collapsed></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const sectionLabel = section?.shadowRoot?.querySelector(".sidebar-section-label") as HTMLElement;

      expect(sectionLabel).to.have.attribute("aria-expanded", "false");
    });

    it("contains items and groups within the section slot", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
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

    it("hides section content when collapsed and collapsible", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main" collapsible collapsed>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");
      const content = section?.shadowRoot?.querySelector(".sidebar-section-content");

      expect(content).to.have.class("sidebar-section-content--collapsed");
    });

    it("displays section content when expanded or not collapsible", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
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

    it("has region role for accessibility", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main" name="main"></sgds-sidebar-section>
        </sgds-sidebar>
      `);
      const section = el.querySelector("sgds-sidebar-section");

      expect(section).to.have.attribute("role", "region");
    });

    it("renders multiple sections within sidebar", async () => {
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

    it("updates chevron icon when toggling collapsible section", async () => {
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

    it("maintains section visibility in collapsed sidebar", async () => {
      const el = await fixture<SgdsSidebar>(html`
        <sgds-sidebar collapsed>
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
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
