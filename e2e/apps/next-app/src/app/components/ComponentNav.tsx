'use client';

import { SgdsSidenav, SgdsSidenavItem, SgdsSidenavLink } from '@govtechsg/sgds-web-component/react';

const components = [
  "Accordion", "AlertLink", "Alert", "Breadcrumb", "Button", "Appnav", "Badge", "Card",
  "CheckboxGroup", "CloseButton", "ComboBox", "DataTable", "DescriptionList", "Divider",
  "Drawer", "Datepicker", "Dropdown", "FileUpload", "Icon", "Footer", "IconButton",
  "IconCard", "IconList", "ImageCard", "Input", "Link", "Mainnav", "OverflowMenu",
  "Modal", "Masthead", "Pagination", "QuantityToggle", "RadioGroup", "ProgressBar",
  "Select", "Sidebar", "Sidenav", "Skeleton", "Spinner", "Stepper", "Subnav", "Switch",
  "SystemBanner", "TabGroup", "Table", "TableOfContents", "Textarea", "ThumbnailCard",
  "ToastContainer", "Tooltip"
];

export const ComponentNav = () => {
  return (
    <SgdsSidenav>
      <SgdsSidenavItem active ariaLabel="Components">
        <span slot="title">Components</span>
        {components.map((name) => (
          <SgdsSidenavLink key={name}>
            <a href={`#${name.toLowerCase()}`}>{name}</a>
          </SgdsSidenavLink>
        ))}
      </SgdsSidenavItem>
    </SgdsSidenav>
  );
};
