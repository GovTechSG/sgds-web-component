import React, { useState, useEffect } from "react";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
import "./index.css";
import * as Components from "@govtechsg/sgds-web-component/react";

const nestingMap = {
  SgdsAccordion: ["SgdsAccordionItem"],
  SgdsBreadcrumb: ["SgdsBreadcrumbItem"],
  SgdsCheckboxGroup: ["SgdsCheckbox"],
  SgdsComboBox: ["SgdsComboBoxOption"],
  SgdsDataTable: ["SgdsDataTableHead", "SgdsDataTableRow", "SgdsDataTableCell"],
  SgdsDescriptionList: ["SgdsDescriptionListGroup"],
  SgdsDropdown: ["SgdsDropdownItem"],
  SgdsFooter: ["SgdsFooterItem"],
  SgdsMainnav: ["SgdsMainnavItem", "SgdsMainnavDropdown", "SgdsMainnavProfile"],
  SgdsRadioGroup: ["SgdsRadio"],
  SgdsSelect: ["SgdsSelectOption"],
  SgdsSidebar: ["SgdsSidebarItem", "SgdsSidebarGroup", "SgdsSidebarSection"],
  SgdsSidenav: ["SgdsSidenavItem", "SgdsSidenavLink"],
  SgdsStepper: ["SgdsStep"],
  SgdsSubnav: ["SgdsSubnavItem"],
  SgdsSystemBanner: ["SgdsSystemBannerItem"],
  SgdsTabGroup: ["SgdsTab", "SgdsTabPanel"],
  SgdsTable: ["SgdsTableHead", "SgdsTableRow", "SgdsTableCell"],
  SgdsToastContainer: ["SgdsToast"],
};

const childNames = new Set(Object.values(nestingMap).flat());

function isReactComponent(value) {
  return typeof value === "function" || (typeof value === "object" && value !== null && "$$typeof" in value);
}

function App() {
  const [argsMap, setArgsMap] = useState({});

  useEffect(() => {
    fetch("/component-args.json")
      .then(r => r.json())
      .then(setArgsMap)
      .catch(() => setArgsMap({}));
  }, []);

  const allNames = Object.keys(Components).filter(
    name => name.startsWith("Sgds") && isReactComponent(Components[name])
  );

  const rendered = [];

  for (const name of allNames) {
    if (childNames.has(name)) continue;

    const Component = Components[name];
    const dirName = name.replace(/^Sgds/, "");
    const props = argsMap[dirName] ? { ...argsMap[dirName] } : {};

    const children = [];
    if (nestingMap[name]) {
      for (const childName of nestingMap[name]) {
        const ChildComponent = Components[childName];
        if (ChildComponent) {
          children.push(React.createElement(ChildComponent, { key: childName }));
        }
      }
    }

    if (children.length === 0 && !nestingMap[name]) {
      children.push(dirName);
    }

    rendered.push(
      <section key={name} className="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12">
        <h2 className="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:text-subtle sgds:mb-gap-text-sm">{dirName}</h2>
        <sgds-divider></sgds-divider>
        <div className="sgds:mt-gap-text-md">
          {React.createElement(Component, { ...props, "data-testid": name }, ...children)}
        </div>
      </section>
    );
  }

  return (
    <main className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
        SGDS React E2E — {rendered.length} components (React wrappers)
      </h1>
      <div className="sgds-grid sgds:gap-layout-md">
        {rendered}
      </div>
    </main>
  );
}

export default App;
