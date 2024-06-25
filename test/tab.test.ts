import "./sgds-web-component";
import { aTimeout, expect, fixture, html, oneEvent, waitUntil } from "@open-wc/testing";
import type { SgdsTabGroup, SgdsTabPanel, SgdsTab } from "../src/components";
import { clickOnElement } from "../src/utils/test";
import { sendKeys } from "@web/test-runner-commands";

describe("<sgds-tab>", () => {
  it("passes accessibility test", async () => {
    const el = await fixture(html`
      <sgds-tab-group>
        <sgds-tab slot="nav">Test</sgds-tab>
      </sgds-tab-group>
    `);
    await expect(el).to.be.accessible();
  });

  it("should render default tab", async () => {
    const el = await fixture(html`<sgds-tab-group><sgds-tab>Test</sgds-tab></sgds-tab-group>`);
    const sgdsTab = el.querySelector("sgds-tab") as SgdsTab;
    const shadowTab = el.querySelector("sgds-tab")?.shadowRoot?.querySelector("li.nav-item");
    expect(sgdsTab?.getAttribute("role")).to.equal("tab");
    expect(sgdsTab?.getAttribute("aria-disabled")).to.equal("false");
    expect(sgdsTab?.getAttribute("aria-selected")).to.equal("false");
    expect(shadowTab?.getAttribute("tabindex")).to.equal("0");
    expect(shadowTab?.getAttribute("class")).to.equal("nav-item");
    expect(sgdsTab?.active).to.equal(false);
    expect(sgdsTab?.disabled).to.equal(false);
  });

  it("should disable tab by attribute", async () => {
    const el = await fixture<SgdsTab>(html` <sgds-tab-group><sgds-tab disabled>Test</sgds-tab> </sgds-tab-group>`);
    const sgdsTab = el.querySelector("sgds-tab") as SgdsTab;

    const shadowTabLi = sgdsTab?.shadowRoot?.querySelector("li.nav-item");
    const shadowTabNavLink = sgdsTab?.shadowRoot?.querySelector("div.nav-link");

    expect(sgdsTab?.disabled).to.equal(true);
    expect(sgdsTab?.getAttribute("aria-disabled")).to.equal("true");
    expect(shadowTabNavLink?.getAttribute("class")).to.contain("nav-link disabled");
    expect(shadowTabLi?.getAttribute("tabindex")).to.equal("-1");
  });

  it("should set active tab by attribute", async () => {
    const el = await fixture<SgdsTab>(html`<sgds-tab-group><sgds-tab active>Test</sgds-tab> </sgds-tab-group>`);
    const sgdsTab = el.querySelector("sgds-tab") as SgdsTab;
    const shadowTabLi = sgdsTab?.shadowRoot?.querySelector("li.nav-item");
    const shadowTabNavLink = sgdsTab?.shadowRoot?.querySelector("div.nav-link");

    expect(sgdsTab.active).to.equal(true);
    expect(sgdsTab.getAttribute("aria-selected")).to.equal("true");
    expect(shadowTabNavLink?.getAttribute("class")).to.contain("nav-link active");
    expect(shadowTabLi?.getAttribute("tabindex")).to.equal("0");
  });

  describe("focus", () => {
    it("should focus inner button", async () => {
      const el = await fixture(html`<sgds-tab-group><sgds-tab>Test</sgds-tab></sgds-tab-group>`);
      const sgdsTab = el.querySelector("sgds-tab") as SgdsTab;
      const tab = sgdsTab?.shadowRoot?.querySelector("li.nav-item");

      sgdsTab.focus();
      await sgdsTab.updateComplete;

      expect(sgdsTab.shadowRoot?.activeElement).to.equal(tab);
    });
  });

  describe("blur", () => {
    it("should blur inner div", async () => {
      const el = await fixture(html`<sgds-tab-group><sgds-tab>Test</sgds-tab></sgds-tab-group>`);
      const sgdsTab = el.querySelector("sgds-tab") as SgdsTab;

      sgdsTab.focus();
      await sgdsTab.updateComplete;

      sgdsTab.blur();
      await sgdsTab.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(null);
    });
  });
});

describe("<sgds-tab-panel>", () => {
  it("passes accessibility test", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);
    await expect(el).to.be.accessible();
  });

  it("default properties", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);

    expect(el.id).to.equal("sgds-tab-panel-2");
    expect(el.name).to.equal("");
    expect(el.active).to.equal(false);
    expect(el.getAttribute("role")).to.equal("tabpanel");
    expect(el.getAttribute("aria-hidden")).to.equal("true");
  });

  it("properties should reflect", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);

    el.name = "test";
    el.active = true;
    await aTimeout(100);
    expect(el.getAttribute("name")).to.equal("test");
    expect(el.hasAttribute("active")).to.equal(true);
  });

  it("changing active should always update aria-hidden role", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel>Test</sgds-tab-panel> `);

    el.active = true;
    await aTimeout(100);
    expect(el.getAttribute("aria-hidden")).to.equal("false");
  });

  it("passed id should be used", async () => {
    const el = await fixture<SgdsTabPanel>(html` <sgds-tab-panel id="test-id">Test</sgds-tab-panel> `);

    expect(el.id).to.equal("test-id");
  });
});

describe("<sgds-tab-group>", () => {
  it("renders", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general">General</sgds-tab>
        <sgds-tab-panel name="general">This is the general tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    expect(tabGroup).to.be.visible;
  });
  it("is accessible", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general">General</sgds-tab>
        <sgds-tab-panel name="general">This is the general tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    await expect(tabGroup).to.be.accessible();
  });
  it("displays all tabs", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general" data-testid="general-tab-header">General</sgds-tab>
        <sgds-tab slot="nav" panel="disabled" disabled data-testid="disabled-tab-header">Disabled</sgds-tab>
        <sgds-tab-panel name="general">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="disabled">This is a disabled tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    expectHeaderToBeVisible(tabGroup, "general-tab-header");
    expectHeaderToBeVisible(tabGroup, "disabled-tab-header");
  });
  it("shows the first tab to be active by default", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general">General</sgds-tab>
        <sgds-tab slot="nav" panel="custom">Custom</sgds-tab>
        <sgds-tab-panel name="general" data-testid="general-tab-content">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="custom">This is the custom tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    await expectOnlyOneTabPanelToBeActive(tabGroup, "general-tab-content");
  });
});

const expectHeaderToBeVisible = (container: HTMLElement, dataTestId: string): void => {
  const generalHeader = container.querySelector<SgdsTabGroup>(`[data-testid="${dataTestId}"]`);
  expect(generalHeader).not.to.be.null;
  expect(generalHeader).to.be.visible;
};

const expectOnlyOneTabPanelToBeActive = async (container: HTMLElement, dataTestIdOfActiveTab: string) => {
  await waitUntil(() => {
    const tabPanels = Array.from(container.getElementsByTagName("sgds-tab-panel"));
    const activeTabPanels = tabPanels.filter((element: Element) => element.hasAttribute("active"));
    return activeTabPanels.length === 1;
  });
  const tabPanels = Array.from(container.getElementsByTagName("sgds-tab-panel"));
  const activeTabPanels = tabPanels.filter((element: Element) => element.hasAttribute("active"));
  expect(activeTabPanels).to.have.lengthOf(1);
  expect(activeTabPanels[0]).to.have.attribute("data-testid", dataTestIdOfActiveTab);
};
const expectPromiseToHaveName = async (showEventPromise: Promise<CustomEvent>, expectedName: string) => {
  const showEvent = await showEventPromise;
  expect(showEvent.detail.name).to.equal(expectedName);
};
const waitForHeaderToBeActive = async (container: HTMLElement, headerTestId: string): Promise<SgdsTab> => {
  const generalHeader = container.querySelector<SgdsTab>(`[data-testid="${headerTestId}"]`);
  await waitUntil(() => {
    return generalHeader?.hasAttribute("active");
  });
  if (generalHeader) {
    return generalHeader;
  } else {
    throw new Error(`did not find error with testid=${headerTestId}`);
  }
};
const expectCustomTabToBeActiveAfter = async (tabGroup: SgdsTabGroup, action: () => Promise<void>): Promise<void> => {
  const generalHeader = await waitForHeaderToBeActive(tabGroup, "general-header");
  generalHeader.focus();

  const customHeader = tabGroup.querySelector<SgdsTab>('[data-testid="custom-header"]');
  expect(customHeader).not.to.have.attribute("active");

  const showEventPromise = oneEvent(tabGroup, "sgds-tab-show") as Promise<CustomEvent>;
  await action();

  expect(customHeader).to.have.attribute("active");
  await expectPromiseToHaveName(showEventPromise, "custom");
  return expectOnlyOneTabPanelToBeActive(tabGroup, "custom-tab-content");
};

const expectGeneralTabToBeStillActiveAfter = async (
  tabGroup: SgdsTabGroup,
  action: () => Promise<void>
): Promise<void> => {
  const generalHeader = await waitForHeaderToBeActive(tabGroup, "general-header");
  generalHeader.focus();

  let showEventFired = false;
  let hideEventFired = false;
  oneEvent(tabGroup, "sgds-tab-show").then(() => (showEventFired = true));
  oneEvent(tabGroup, "sgds-tab-hide").then(() => (hideEventFired = true));
  await action();

  expect(generalHeader).to.have.attribute("active");
  expect(showEventFired).to.be.false;
  expect(hideEventFired).to.be.false;
  return expectOnlyOneTabPanelToBeActive(tabGroup, "general-tab-content");
};

describe("tab selection", () => {
  it("selects a tab by clicking on it", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general" data-testid="general-header">General</sgds-tab>
        <sgds-tab slot="nav" panel="custom" data-testid="custom-header">Custom</sgds-tab>
        <sgds-tab-panel name="general">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="custom" data-testid="custom-tab-content">This is the custom tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    const customHeader = tabGroup.querySelector<SgdsTab>('[data-testid="custom-header"]');

    return customHeader && expectCustomTabToBeActiveAfter(tabGroup, () => clickOnElement(customHeader));
  });
  it("does not change if a disabled tab is clicked", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general" data-testid="general-header">General</sgds-tab>
        <sgds-tab slot="nav" panel="disabled" data-testid="disabled-header" disabled>disabled</sgds-tab>
        <sgds-tab-panel name="general" data-testid="general-tab-content">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="disabled">This is the disabled tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    const disabledHeader = tabGroup.querySelector<SgdsTab>('[data-testid="disabled-header"]');
    return disabledHeader && expectGeneralTabToBeStillActiveAfter(tabGroup, () => clickOnElement(disabledHeader));
  });
  it("selects a tab by using the arrow keys", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general" data-testid="general-header">General</sgds-tab>
        <sgds-tab slot="nav" panel="custom" data-testid="custom-header">Custom</sgds-tab>
        <sgds-tab-panel name="general">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="custom" data-testid="custom-tab-content">This is the custom tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    return expectCustomTabToBeActiveAfter(tabGroup, () => sendKeys({ press: "ArrowRight" }));
  });
  it("does not allow selection of disabled tabs with arrow keys", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general" data-testid="general-header">General</sgds-tab>
        <sgds-tab slot="nav" panel="disabled" disabled>Disabled</sgds-tab>
        <sgds-tab-panel name="general" data-testid="general-tab-content">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="disabled">This is the custom tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    return expectGeneralTabToBeStillActiveAfter(tabGroup, () => sendKeys({ press: "ArrowRight" }));
  });

  it("selects a tab by using the show function", async () => {
    const tabGroup = await fixture<SgdsTabGroup>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav" panel="general" data-testid="general-header">General</sgds-tab>
        <sgds-tab slot="nav" panel="custom" data-testid="custom-header">Custom</sgds-tab>
        <sgds-tab-panel name="general">This is the general tab panel.</sgds-tab-panel>
        <sgds-tab-panel name="custom" data-testid="custom-tab-content">This is the custom tab panel.</sgds-tab-panel>
      </sgds-tab-group>
    `);

    return expectCustomTabToBeActiveAfter(tabGroup, () => {
      tabGroup.show("custom");
      return aTimeout(0);
    });
  });
});
