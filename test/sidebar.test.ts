import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { SgdsSidebar } from "../src/components";
import "../src/index";

describe("<sgds-sidebar>", () => {
  let element: SgdsSidebar;

  beforeEach(async () => {
    element = await fixture(html`
      <sgds-sidebar>
        <sgds-sidebar-option label="Dashboard"></sgds-sidebar-option>
        <sgds-sidebar-option label="Settings"></sgds-sidebar-option>
      </sgds-sidebar>
    `);
  });

  describe("Rendering", () => {
    it("should render a sidebar element", () => {
      expect(element).to.exist;
      expect(element).to.be.instanceOf(SgdsSidebar);
    });

    it("should have role navigation", () => {
      expect(element).to.have.attribute("role", "navigation");
    });

    it("should render sidebar header with icon button", () => {
      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button");
      expect(header).to.exist;
      expect(iconButton).to.exist;
    });

    it("should render sidebar content with slot", () => {
      const content = element.shadowRoot?.querySelector(".sidebar-content");
      const slot = content?.querySelector("slot");
      expect(content).to.exist;
      expect(slot).to.exist;
    });

    it("should accept slot content with sidebar options", () => {
      const options = element.querySelectorAll("sgds-sidebar-option");
      expect(options.length).to.equal(2);
    });
  });

  describe("State Management", () => {
    it("should have expanded property set to true by default", () => {
      expect(element.expanded).to.be.true;
    });

    it("should render with expanded class when expanded is true", async () => {
      element.expanded = true;
      await element.updateComplete;
      const sidebar = element.shadowRoot?.querySelector(".sidebar--expanded");
      expect(sidebar).to.exist;
    });

    it("should render with collapsed class when expanded is false", async () => {
      element.expanded = false;
      await element.updateComplete;
      const sidebar = element.shadowRoot?.querySelector(".sidebar--collapsed");
      expect(sidebar).to.exist;
    });

    it("should toggle expanded state when toggleExpanded is called", async () => {
      const initialState = element.expanded;
      element.toggleExpanded();
      await element.updateComplete;
      expect(element.expanded).to.equal(!initialState);
    });

    it("should reflect expanded attribute changes", async () => {
      element.setAttribute("expanded", "false");
      await element.updateComplete;
      expect(element.expanded).to.be.false;
    });
  });

  describe("Events", () => {
    it("should emit sgds-sidebar-toggle event when toggleExpanded is called", async () => {
      let eventFired = false;
      let eventDetail: any = null;

      element.addEventListener("sgds-sidebar-toggle", (e: Event) => {
        eventFired = true;
        eventDetail = (e as CustomEvent).detail;
      });

      element.toggleExpanded();
      await element.updateComplete;

      expect(eventFired).to.be.true;
      expect(eventDetail).to.exist;
      expect(eventDetail.expanded).to.equal(false);
    });

    it("should emit event with correct expanded state", async () => {
      const eventSpy: any[] = [];

      element.addEventListener("sgds-sidebar-toggle", (e: Event) => {
        eventSpy.push((e as CustomEvent).detail);
      });

      element.toggleExpanded(); // true -> false
      await element.updateComplete;
      element.toggleExpanded(); // false -> true
      await element.updateComplete;

      expect(eventSpy[0].expanded).to.be.false;
      expect(eventSpy[1].expanded).to.be.true;
    });
  });

  describe("Accessibility", () => {
    it("should update icon button aria-expanded based on expanded state", async () => {
      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button");

      element.expanded = true;
      await element.updateComplete;
      expect(iconButton).to.have.attribute("aria-expanded", "true");

      element.expanded = false;
      await element.updateComplete;
      expect(iconButton).to.have.attribute("aria-expanded", "false");
    });

    it("should update icon button aria-label based on expanded state", async () => {
      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button");

      element.expanded = true;
      await element.updateComplete;
      expect(iconButton).to.have.attribute("aria-label", "Collapse sidebar");

      element.expanded = false;
      await element.updateComplete;
      expect(iconButton).to.have.attribute("aria-label", "Expand sidebar");
    });
  });

  describe("User Interaction", () => {
    it("should toggle sidebar when icon button is clicked", async () => {
      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button") as HTMLElement;

      const initialState = element.expanded;
      iconButton.click();
      await element.updateComplete;

      expect(element.expanded).to.equal(!initialState);
    });

    it("should dispatch event when icon button is clicked", async () => {
      let eventFired = false;

      element.addEventListener("sgds-sidebar-toggle", () => {
        eventFired = true;
      });

      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button") as HTMLElement;
      iconButton.click();
      await element.updateComplete;

      expect(eventFired).to.be.true;
    });
  });

  describe("Icon Changes", () => {
    it("should show collapse icon when expanded", async () => {
      element.expanded = true;
      await element.updateComplete;
      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button");
      expect(iconButton).to.have.attribute("name", "sidebar-collapse");
    });

    it("should show expand icon when collapsed", async () => {
      element.expanded = false;
      await element.updateComplete;
      const header = element.shadowRoot?.querySelector(".sidebar-header");
      const iconButton = header?.querySelector("sgds-icon-button");
      expect(iconButton).to.have.attribute("name", "sidebar-expand");
    });
  });

  describe("Collapse Behavior", () => {
    it("should hide sidebar-option labels when sidebar is collapsed", async () => {
      element.expanded = true;
      await element.updateComplete;

      const option = element.querySelector("sgds-sidebar-option") as any;
      const optionLabel = option.shadowRoot?.querySelector(".sidebar-option-label");
      let styles = window.getComputedStyle(optionLabel);
      expect(styles.display).to.not.equal("none");

      element.expanded = false;
      await element.updateComplete;
      await option.updateComplete;

      styles = window.getComputedStyle(optionLabel);
      expect(styles.display).to.equal("none");
    });

    it("should hide section title when sidebar is collapsed", async () => {
      const sectionElement = (await fixture(html`
        <sgds-sidebar>
          <sgds-sidebar-section title="Main">
            <sgds-sidebar-option label="Dashboard"></sgds-sidebar-option>
          </sgds-sidebar-section>
        </sgds-sidebar>
      `)) as any;

      sectionElement.expanded = true;
      await sectionElement.updateComplete;

      const section = sectionElement.querySelector("sgds-sidebar-section") as any;
      await section.updateComplete;
      const sectionLabel = section.shadowRoot?.querySelector(".sidebar-section-label");
      let styles = window.getComputedStyle(sectionLabel);
      expect(styles.display).to.not.equal("none");

      sectionElement.expanded = false;
      await sectionElement.updateComplete;
      await section.updateComplete;

      styles = window.getComputedStyle(sectionLabel);
      expect(styles.display).to.equal("none");
    });
  });
});
