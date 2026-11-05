/**
 * Shared component templates, utilities, and constants used by all framework
 * generation scripts (Next, Nuxt, React, Vue, Angular).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");
const templatesDir = resolve(root, "stories/component-templates");

// ---------------------------------------------------------------------------
// Parse src/react/index.ts for React component names
// ---------------------------------------------------------------------------
const reactIndex = readFileSync(resolve(root, "src/react/index.ts"), "utf-8");
const reactRegex = /export \{ default as (\w+) \} from '\.\/([^']+)'/g;
export const reactComponentNames: string[] = [];
let match: RegExpExecArray | null;
while ((match = reactRegex.exec(reactIndex)) !== null) {
  reactComponentNames.push(match[1]);
}

// ---------------------------------------------------------------------------
// Load Storybook args for a component directory
// ---------------------------------------------------------------------------
export async function loadArgs(dirName: string): Promise<Record<string, unknown>> {
  const basicPath = resolve(templatesDir, dirName, "basic.js");
  if (!existsSync(basicPath)) return {};
  try {
    const mod = await import(pathToFileURL(basicPath).href);
    const args = mod.args || {};
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(args)) {
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        clean[k] = v;
      }
    }
    return clean;
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Props serializers
// ---------------------------------------------------------------------------
export function propsToJsx(args: Record<string, unknown>): string {
  return Object.entries(args)
    .map(([k, v]) => {
      if (typeof v === "boolean") return v ? k : "";
      if (typeof v === "string") return `${k}="${v}"`;
      if (typeof v === "number") return `${k}={${v}}`;
      return "";
    })
    .filter(Boolean)
    .map(p => `      ${p}`)
    .join("\n");
}

export function propsToHtml(args: Record<string, unknown>): string {
  return Object.entries(args)
    .map(([k, v]) => {
      const attr = k.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (typeof v === "boolean") return v ? attr : "";
      if (typeof v === "string") return `${attr}="${v}"`;
      if (typeof v === "number") return `${attr}="${v}"`;
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

// ---------------------------------------------------------------------------
// Components that are children-only (rendered inside parents) — skip these
// ---------------------------------------------------------------------------
export const childOnlyComponents = new Set([
  "SgdsAccordionItem", "SgdsAppnavProfile", "SgdsBreadcrumbItem", "SgdsCheckbox", "SgdsComboBoxOption",
  "SgdsDataTableHead", "SgdsDataTableRow", "SgdsDataTableCell",
  "SgdsDescriptionListGroup", "SgdsDropdownItem", "SgdsFooterItem",
  "SgdsMainnavItem", "SgdsMainnavDropdown", "SgdsMainnavProfile",
  "SgdsRadio", "SgdsSelectOption",
  "SgdsSidebarItem", "SgdsSidebarGroup", "SgdsSidebarSection",
  "SgdsSidenavItem", "SgdsSidenavLink",
  "SgdsStep", "SgdsSubnavItem", "SgdsSystemBannerItem",
  "SgdsTab", "SgdsTabPanel",
  "SgdsTableHead", "SgdsTableRow", "SgdsTableCell",
  "SgdsToast",
]);

// ---------------------------------------------------------------------------
// JSX templates (React / Next.js)
// ---------------------------------------------------------------------------
export type JsxTemplateResult = { imports: string[]; jsx: string };

export const jsxTemplates: Record<string, (args: Record<string, unknown>) => JsxTemplateResult> = {
  Accordion: () => ({
    imports: ["SgdsAccordion", "SgdsAccordionItem"],
    jsx: `      <SgdsAccordion>
        <SgdsAccordionItem ariaLabel="Accordion title #1">
          <div slot="header">Accordion title #1</div>
          <div slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </SgdsAccordionItem>
        <SgdsAccordionItem ariaLabel="Accordion title #2">
          <div slot="header">Accordion title #2</div>
          <div slot="content">Maiores soluta eaque fugit fuga distinctio.</div>
        </SgdsAccordionItem>
      </SgdsAccordion>`,
  }),

  Appnav: () => ({
    imports: ["SgdsAppnav", "SgdsAppnavProfile", "SgdsIconButton", "SgdsDropdownItem", "SgdsDivider"],
    jsx: `      <SgdsAppnav tone="gradient-3">
        <SgdsIconButton
          name="menu"
          slot="start"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Open side menu"
        ></SgdsIconButton>
        <a slot="brand" href="/"><strong style={{color: "white"}}>My App</strong></a>
        <SgdsIconButton
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Toggle dark mode"
        ></SgdsIconButton>
        <SgdsIconButton
          name="bell"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Notifications"
        ></SgdsIconButton>
        <SgdsAppnavProfile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu">
          <span slot="avatar" className="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
            <span className="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-full"></span>
          </span>
          <SgdsDropdownItem ariaLabel="My profile"><span>My profile</span></SgdsDropdownItem>
          <SgdsDropdownItem ariaLabel="Settings"><span>Settings</span></SgdsDropdownItem>
          <SgdsDivider thickness="thin"></SgdsDivider>
          <SgdsDropdownItem ariaLabel="Log out"><span className="sgds:text-danger-default">Log out</span></SgdsDropdownItem>
        </SgdsAppnavProfile>
      </SgdsAppnav>`,
  }),

  Alert: () => ({
    imports: ["SgdsAlert"],
    jsx: `      <SgdsAlert variant="info" show>This is an informational alert.</SgdsAlert>`,
  }),

  Badge: () => ({
    imports: ["SgdsBadge"],
    jsx: `      <SgdsBadge>Badge</SgdsBadge>`,
  }),

  Breadcrumb: () => ({
    imports: ["SgdsBreadcrumb", "SgdsBreadcrumbItem"],
    jsx: `      <SgdsBreadcrumb>
        <SgdsBreadcrumbItem><a href="/">Home</a></SgdsBreadcrumbItem>
        <SgdsBreadcrumbItem><a href="/about">About</a></SgdsBreadcrumbItem>
        <SgdsBreadcrumbItem><a href="/current">Current Page</a></SgdsBreadcrumbItem>
      </SgdsBreadcrumb>`,
  }),

  Button: () => ({
    imports: ["SgdsButton"],
    jsx: `      <SgdsButton variant="primary">Primary</SgdsButton>`,
  }),

  Card: () => ({
    imports: ["SgdsCard", "SgdsLink"],
    jsx: `      <SgdsCard>
        <span slot="title">Card Title</span>
        <span slot="description">This is a description of the card content.</span>
        <SgdsLink slot="footer"><a href="#">Read more</a></SgdsLink>
      </SgdsCard>`,
  }),

  CheckboxGroup: () => ({
    imports: ["SgdsCheckboxGroup", "SgdsCheckbox"],
    jsx: `      <SgdsCheckboxGroup label="Select options">
        <SgdsCheckbox value="a">Option A</SgdsCheckbox>
        <SgdsCheckbox value="b">Option B</SgdsCheckbox>
      </SgdsCheckboxGroup>`,
  }),

  CloseButton: () => ({
    imports: ["SgdsCloseButton"],
    jsx: `      <SgdsCloseButton ariaLabel="Close"></SgdsCloseButton>`,
  }),

  ComboBox: () => ({
    imports: ["SgdsComboBox", "SgdsComboBoxOption"],
    jsx: `      <SgdsComboBox label="Select a country" placeholder="Search...">
        <SgdsComboBoxOption value="sg">Singapore</SgdsComboBoxOption>
        <SgdsComboBoxOption value="my">Malaysia</SgdsComboBoxOption>
        <SgdsComboBoxOption value="id">Indonesia</SgdsComboBoxOption>
      </SgdsComboBox>`,
  }),

  DataTable: () => ({
    imports: ["SgdsDataTable", "SgdsDataTableHead", "SgdsDataTableRow", "SgdsDataTableCell"],
    jsx: `      <SgdsDataTable multiSelect dataLength={5} currentPage={1} itemsPerPage={5}>
        <SgdsDataTableRow>
          <SgdsDataTableHead sorting sortKey="id">ID</SgdsDataTableHead>
          <SgdsDataTableHead sorting sortKey="name">Name</SgdsDataTableHead>
          <SgdsDataTableHead sorting sortKey="role">Role</SgdsDataTableHead>
          <SgdsDataTableHead textAlign="right">Amount</SgdsDataTableHead>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>1</SgdsDataTableCell>
          <SgdsDataTableCell>Alice</SgdsDataTableCell>
          <SgdsDataTableCell>Engineer</SgdsDataTableCell>
          <SgdsDataTableCell>1250.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>2</SgdsDataTableCell>
          <SgdsDataTableCell>Bob</SgdsDataTableCell>
          <SgdsDataTableCell>Designer</SgdsDataTableCell>
          <SgdsDataTableCell>980.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>3</SgdsDataTableCell>
          <SgdsDataTableCell>Charlie</SgdsDataTableCell>
          <SgdsDataTableCell>Analyst</SgdsDataTableCell>
          <SgdsDataTableCell>1100.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>4</SgdsDataTableCell>
          <SgdsDataTableCell>Diana</SgdsDataTableCell>
          <SgdsDataTableCell>Manager</SgdsDataTableCell>
          <SgdsDataTableCell>1500.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>5</SgdsDataTableCell>
          <SgdsDataTableCell>Eve</SgdsDataTableCell>
          <SgdsDataTableCell>Engineer</SgdsDataTableCell>
          <SgdsDataTableCell>1300.00</SgdsDataTableCell>
        </SgdsDataTableRow>
      </SgdsDataTable>`,
  }),

  Datepicker: (args) => ({
    imports: ["SgdsDatepicker"],
    jsx: `      <SgdsDatepicker label="${args.label || "Select a date"}" name="date"></SgdsDatepicker>`,
  }),

  DescriptionList: () => ({
    imports: ["SgdsDescriptionList", "SgdsDescriptionListGroup"],
    jsx: `      <SgdsDescriptionListGroup bordered>
        <SgdsDescriptionList>Name<span slot="data">John Doe</span></SgdsDescriptionList>
        <SgdsDescriptionList>Email<span slot="data">john@example.com</span></SgdsDescriptionList>
      </SgdsDescriptionListGroup>`,
  }),

  Divider: () => ({
    imports: ["SgdsDivider"],
    jsx: `      <SgdsDivider></SgdsDivider>`,
  }),

  Drawer: () => ({
    imports: ["SgdsDrawer", "SgdsButton"],
    jsx: `      <SgdsButton variant="primary" onClick={(e) => { const d = e.currentTarget.nextElementSibling; if (d) d.open = true; }}>Open Drawer</SgdsButton>
      <SgdsDrawer label="Drawer Title">Drawer content goes here.</SgdsDrawer>`,
  }),

  Dropdown: () => ({
    imports: ["SgdsDropdown", "SgdsDropdownItem", "SgdsButton"],
    jsx: `      <SgdsDropdown>
        <SgdsButton slot="toggler" ariaLabel="Options menu">Options</SgdsButton>
        <SgdsDropdownItem ariaLabel="View"><a href="#">View</a></SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Edit"><a href="#">Edit</a></SgdsDropdownItem>
        <SgdsDropdownItem ariaLabel="Delete"><a href="#">Delete</a></SgdsDropdownItem>
      </SgdsDropdown>`,
  }),

  FileUpload: (args) => ({
    imports: ["SgdsFileUpload"],
    jsx: `      <SgdsFileUpload label="${args.label || "Upload file"}" name="file"></SgdsFileUpload>`,
  }),

  Footer: (args) => ({
    imports: ["SgdsFooter"],
    jsx: `      <SgdsFooter
        contactHref="${args.contactHref || "https://form.gov.sg/"}"
        feedbackHref="${args.feedbackHref || "https://form.gov.sg/"}"
        privacyHref="${args.privacyHref || "/privacy"}"
        termsOfUseHref="${args.termsOfUseHref || "/terms"}"
      ></SgdsFooter>`,
  }),

  Icon: () => ({
    imports: ["SgdsIcon"],
    jsx: `      <SgdsIcon name="placeholder" size="md"></SgdsIcon>`,
  }),

  IconButton: () => ({
    imports: ["SgdsIconButton"],
    jsx: `      <SgdsIconButton name="gear" ariaLabel="Settings" variant="ghost"></SgdsIconButton>`,
  }),

  IconCard: () => ({
    imports: ["SgdsIconCard"],
    jsx: `      <SgdsIconCard>
        <span slot="title">Icon Card Title</span>
        <span slot="description">Description of the icon card.</span>
      </SgdsIconCard>`,
  }),

  IconList: () => ({
    imports: ["SgdsIconList"],
    jsx: `      <SgdsIconList icon="check-circle-fill">This is an icon list item.</SgdsIconList>`,
  }),

  ImageCard: () => ({
    imports: ["SgdsImageCard"],
    jsx: `      <SgdsImageCard>
        <span slot="title">Image Card</span>
        <span slot="description">Description of the image card.</span>
      </SgdsImageCard>`,
  }),

  Input: (args) => ({
    imports: ["SgdsInput"],
    jsx: `      <SgdsInput
        type="${args.type || "text"}"
        label="${args.label || "Label"}"
        name="${args.name || "input-field"}"
        placeholder="${args.placeholder || "Placeholder text"}"
        hintText="${args.hintText || "Hint text"}"
      ></SgdsInput>`,
  }),

  Link: () => ({
    imports: ["SgdsLink"],
    jsx: `      <SgdsLink><a href="#">This is a link</a></SgdsLink>`,
  }),

  Mainnav: () => ({
    imports: ["SgdsMainnav", "SgdsMainnavItem"],
    jsx: `      <SgdsMainnav>
        <strong slot="brand">My App</strong>
        <SgdsMainnavItem><a href="/">Home</a></SgdsMainnavItem>
        <SgdsMainnavItem><a href="/about">About</a></SgdsMainnavItem>
      </SgdsMainnav>`,
  }),

  Masthead: () => ({
    imports: ["SgdsMasthead"],
    jsx: `      <SgdsMasthead></SgdsMasthead>`,
  }),

  Modal: () => ({
    imports: ["SgdsModal", "SgdsButton"],
    jsx: `      <SgdsButton variant="primary" onClick={(e) => { const m = e.currentTarget.nextElementSibling; if (m) m.open = true; }}>Open Modal</SgdsButton>
      <SgdsModal label="Modal Title">Modal content goes here.</SgdsModal>`,
  }),

  OverflowMenu: () => ({
    imports: ["SgdsOverflowMenu"],
    jsx: `      <SgdsOverflowMenu ariaLabel="More actions"></SgdsOverflowMenu>`,
  }),

  Pagination: () => ({
    imports: ["SgdsPagination"],
    jsx: `      <SgdsPagination dataLength={50} currentPage={1} itemsPerPage={10}></SgdsPagination>`,
  }),

  ProgressBar: () => ({
    imports: ["SgdsProgressBar"],
    jsx: `      <SgdsProgressBar label="Loading" value={60}></SgdsProgressBar>`,
  }),

  QuantityToggle: () => ({
    imports: ["SgdsQuantityToggle"],
    jsx: `      <SgdsQuantityToggle label="Quantity" name="qty"></SgdsQuantityToggle>`,
  }),

  RadioGroup: () => ({
    imports: ["SgdsRadioGroup", "SgdsRadio"],
    jsx: `      <SgdsRadioGroup name="gender" label="Gender">
        <SgdsRadio value="male">Male</SgdsRadio>
        <SgdsRadio value="female">Female</SgdsRadio>
      </SgdsRadioGroup>`,
  }),

  Select: () => ({
    imports: ["SgdsSelect", "SgdsSelectOption"],
    jsx: `      <SgdsSelect label="Country" name="country" placeholder="Select a country">
        <SgdsSelectOption value="sg">Singapore</SgdsSelectOption>
        <SgdsSelectOption value="my">Malaysia</SgdsSelectOption>
        <SgdsSelectOption value="id">Indonesia</SgdsSelectOption>
      </SgdsSelect>`,
  }),

  Sidebar: () => ({
    imports: ["SgdsSidebar", "SgdsSidebarSection", "SgdsSidebarItem", "SgdsSidebarGroup", "SgdsIcon"],
    jsx: `      <SgdsSidebar active="dashboard">
        <SgdsSidebarSection title="Main" name="main">
          <SgdsSidebarItem name="dashboard" title="Dashboard">
            <SgdsIcon slot="icon" name="grid-fill" size="md"></SgdsIcon>
            <a href="#"></a>
          </SgdsSidebarItem>
          <SgdsSidebarGroup name="reports" title="Reports">
            <SgdsIcon slot="icon" name="file-earmark-text" size="md"></SgdsIcon>
            <SgdsSidebarItem name="yearly" title="Yearly">
              <SgdsIcon slot="icon" name="calendar" size="md"></SgdsIcon>
            </SgdsSidebarItem>
          </SgdsSidebarGroup>
        </SgdsSidebarSection>
      </SgdsSidebar>`,
  }),

  Sidenav: () => ({
    imports: ["SgdsSidenav", "SgdsSidenavItem", "SgdsSidenavLink"],
    jsx: `      <SgdsSidenav>
        <SgdsSidenavItem active ariaLabel="Getting Started">
          <span slot="title">Getting Started</span>
          <SgdsSidenavLink active><a href="/">Overview</a></SgdsSidenavLink>
          <SgdsSidenavLink><a href="/install">Installation</a></SgdsSidenavLink>
        </SgdsSidenavItem>
      </SgdsSidenav>`,
  }),

  Skeleton: () => ({
    imports: ["SgdsSkeleton"],
    jsx: `      <SgdsSkeleton></SgdsSkeleton>`,
  }),

  Spinner: () => ({
    imports: ["SgdsSpinner"],
    jsx: `      <SgdsSpinner></SgdsSpinner>`,
  }),

  Stepper: () => ({
    imports: ["SgdsStepper", "SgdsStep"],
    jsx: `      <SgdsStepper activeStep={0}>
        <SgdsStep stepHeader="Personal Info"></SgdsStep>
        <SgdsStep stepHeader="Contact Details"></SgdsStep>
        <SgdsStep stepHeader="Review"></SgdsStep>
      </SgdsStepper>`,
  }),

  Subnav: () => ({
    imports: ["SgdsSubnav", "SgdsSubnavItem"],
    jsx: `      <SgdsSubnav>
        <SgdsSubnavItem active><a href="/">Home</a></SgdsSubnavItem>
        <SgdsSubnavItem><a href="/about">About</a></SgdsSubnavItem>
      </SgdsSubnav>`,
  }),

  Switch: () => ({
    imports: ["SgdsSwitch"],
    jsx: `      <SgdsSwitch>Enable notifications</SgdsSwitch>`,
  }),

  SystemBanner: () => ({
    imports: ["SgdsSystemBanner", "SgdsSystemBannerItem", "SgdsIcon"],
    jsx: `      <SgdsSystemBanner show>
        <SgdsSystemBannerItem>
          <SgdsIcon slot="icon" name="info-circle-fill" size="md"></SgdsIcon>
          System maintenance is scheduled for this weekend.
        </SgdsSystemBannerItem>
      </SgdsSystemBanner>`,
  }),

  TabGroup: () => ({
    imports: ["SgdsTabGroup", "SgdsTab", "SgdsTabPanel"],
    jsx: `      <SgdsTabGroup>
        <SgdsTab slot="nav" panel="tab1" ariaLabel="Tab 1">Tab 1</SgdsTab>
        <SgdsTab slot="nav" panel="tab2" ariaLabel="Tab 2">Tab 2</SgdsTab>
        <SgdsTabPanel name="tab1">Content for tab 1</SgdsTabPanel>
        <SgdsTabPanel name="tab2">Content for tab 2</SgdsTabPanel>
      </SgdsTabGroup>`,
  }),

  Table: () => ({
    imports: ["SgdsTable", "SgdsTableHead", "SgdsTableRow", "SgdsTableCell"],
    jsx: `      <SgdsTable headerBackground tableBorder>
        <SgdsTableRow>
          <SgdsTableHead>Name</SgdsTableHead>
          <SgdsTableHead>Role</SgdsTableHead>
        </SgdsTableRow>
        <SgdsTableRow>
          <SgdsTableCell>Alice</SgdsTableCell>
          <SgdsTableCell>Engineer</SgdsTableCell>
        </SgdsTableRow>
        <SgdsTableRow>
          <SgdsTableCell>Bob</SgdsTableCell>
          <SgdsTableCell>Designer</SgdsTableCell>
        </SgdsTableRow>
      </SgdsTable>`,
  }),

  TableOfContents: () => ({
    imports: ["SgdsTableOfContents"],
    jsx: `      <SgdsTableOfContents></SgdsTableOfContents>`,
  }),

  Textarea: (args) => ({
    imports: ["SgdsTextarea"],
    jsx: `      <SgdsTextarea
        label="${args.label || "Comments"}"
        name="${args.name || "comments"}"
        placeholder="${args.placeholder || "Enter your comments"}"
      ></SgdsTextarea>`,
  }),

  ThumbnailCard: () => ({
    imports: ["SgdsThumbnailCard"],
    jsx: `      <SgdsThumbnailCard>
        <span slot="title">Thumbnail Card</span>
        <span slot="description">Description of the thumbnail card.</span>
      </SgdsThumbnailCard>`,
  }),

  ToastContainer: () => ({
    imports: ["SgdsToastContainer", "SgdsToast", "SgdsIcon"],
    jsx: `      <SgdsToastContainer position="bottom-end">
        <SgdsToast show title="Notification" variant="info">
          <SgdsIcon slot="icon" name="info-circle-fill" size="md"></SgdsIcon>
          Your changes have been saved.
        </SgdsToast>
      </SgdsToastContainer>`,
  }),

  Tooltip: () => ({
    imports: ["SgdsTooltip", "SgdsButton"],
    jsx: `      <SgdsTooltip content="This is a tooltip">
        <SgdsButton>Hover me</SgdsButton>
      </SgdsTooltip>`,
  }),
};

// ---------------------------------------------------------------------------
// HTML templates (Vue / Nuxt / Angular) — native web component markup
// ---------------------------------------------------------------------------
export const htmlTemplates: Record<string, (args: Record<string, unknown>) => string> = {
  Accordion: () => `<sgds-accordion>
        <sgds-accordion-item aria-label="Accordion title #1">
          <div slot="header">Accordion title #1</div>
          <div slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </sgds-accordion-item>
        <sgds-accordion-item aria-label="Accordion title #2">
          <div slot="header">Accordion title #2</div>
          <div slot="content">Maiores soluta eaque fugit fuga distinctio.</div>
        </sgds-accordion-item>
      </sgds-accordion>`,

  Appnav: () => `<sgds-appnav tone="gradient-3">
        <sgds-icon-button
          name="menu"
          slot="start"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          aria-label="Open side menu"
        ></sgds-icon-button>
        <a slot="brand" href="/"><strong style="color: white">My App</strong></a>
        <sgds-icon-button
          name="moon"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          aria-label="Toggle dark mode"
        ></sgds-icon-button>
        <sgds-icon-button
          name="bell"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          aria-label="Notifications"
        ></sgds-icon-button>
        <sgds-appnav-profile slot="profile" label="User Name" secondary-text="Agency (admin)" aria-label="Profile menu">
          <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
            <span class="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-full"></span>
          </span>
          <sgds-dropdown-item aria-label="My profile"><span>My profile</span></sgds-dropdown-item>
          <sgds-dropdown-item aria-label="Settings"><span>Settings</span></sgds-dropdown-item>
          <sgds-divider thickness="thin"></sgds-divider>
          <sgds-dropdown-item aria-label="Log out"><span class="sgds:text-danger-default">Log out</span></sgds-dropdown-item>
        </sgds-appnav-profile>
      </sgds-appnav>`,

  Alert: () => `<sgds-alert variant="info" show>This is an informational alert.</sgds-alert>`,
  Badge: () => `<sgds-badge>Badge</sgds-badge>`,

  Breadcrumb: () => `<sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="/about">About</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="/current">Current Page</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>`,

  Button: () => `<sgds-button variant="primary">Primary</sgds-button>`,

  Card: () => `<sgds-card>
        <span slot="title">Card Title</span>
        <span slot="description">This is a description of the card content.</span>
        <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
      </sgds-card>`,

  CheckboxGroup: () => `<sgds-checkbox-group label="Select options">
        <sgds-checkbox value="a">Option A</sgds-checkbox>
        <sgds-checkbox value="b">Option B</sgds-checkbox>
      </sgds-checkbox-group>`,

  CloseButton: () => `<sgds-close-button aria-label="Close"></sgds-close-button>`,

  ComboBox: () => `<sgds-combo-box label="Select a country" placeholder="Search...">
        <sgds-combo-box-option value="sg">Singapore</sgds-combo-box-option>
        <sgds-combo-box-option value="my">Malaysia</sgds-combo-box-option>
        <sgds-combo-box-option value="id">Indonesia</sgds-combo-box-option>
      </sgds-combo-box>`,

  DataTable: () => `<sgds-data-table multi-select data-length="5" current-page="1" items-per-page="5">
        <sgds-data-table-row>
          <sgds-data-table-head sorting sort-key="id">ID</sgds-data-table-head>
          <sgds-data-table-head sorting sort-key="name">Name</sgds-data-table-head>
          <sgds-data-table-head sorting sort-key="role">Role</sgds-data-table-head>
          <sgds-data-table-head text-align="right">Amount</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
          <sgds-data-table-cell>Engineer</sgds-data-table-cell>
          <sgds-data-table-cell>1250.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>2</sgds-data-table-cell>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
          <sgds-data-table-cell>Designer</sgds-data-table-cell>
          <sgds-data-table-cell>980.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>3</sgds-data-table-cell>
          <sgds-data-table-cell>Charlie</sgds-data-table-cell>
          <sgds-data-table-cell>Analyst</sgds-data-table-cell>
          <sgds-data-table-cell>1100.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>4</sgds-data-table-cell>
          <sgds-data-table-cell>Diana</sgds-data-table-cell>
          <sgds-data-table-cell>Manager</sgds-data-table-cell>
          <sgds-data-table-cell>1500.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>5</sgds-data-table-cell>
          <sgds-data-table-cell>Eve</sgds-data-table-cell>
          <sgds-data-table-cell>Engineer</sgds-data-table-cell>
          <sgds-data-table-cell>1300.00</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>`,

  Datepicker: (args) => `<sgds-datepicker label="${args.label || "Select a date"}" name="date"></sgds-datepicker>`,

  DescriptionList: () => `<sgds-description-list-group bordered>
        <sgds-description-list>Name<span slot="data">John Doe</span></sgds-description-list>
        <sgds-description-list>Email<span slot="data">john@example.com</span></sgds-description-list>
      </sgds-description-list-group>`,

  Divider: () => `<sgds-divider></sgds-divider>`,
  Drawer: () => `<sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Drawer</sgds-button>
      <sgds-drawer label="Drawer Title">Drawer content goes here.</sgds-drawer>`,

  Dropdown: () => `<sgds-dropdown>
        <sgds-button slot="toggler" aria-label="Options menu">Options</sgds-button>
        <sgds-dropdown-item aria-label="View"><a href="#">View</a></sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Edit"><a href="#">Edit</a></sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Delete"><a href="#">Delete</a></sgds-dropdown-item>
      </sgds-dropdown>`,

  FileUpload: (args) => `<sgds-file-upload label="${args.label || "Upload file"}" name="file"></sgds-file-upload>`,

  Footer: (args) => `<sgds-footer
        contact-href="${args.contactHref || "https://form.gov.sg/"}"
        feedback-href="${args.feedbackHref || "https://form.gov.sg/"}"
        privacy-href="${args.privacyHref || "/privacy"}"
        terms-of-use-href="${args.termsOfUseHref || "/terms"}"
      ></sgds-footer>`,

  Icon: () => `<sgds-icon name="placeholder" size="md"></sgds-icon>`,
  IconButton: () => `<sgds-icon-button name="gear" aria-label="Settings" variant="ghost"></sgds-icon-button>`,

  IconCard: () => `<sgds-icon-card>
        <span slot="title">Icon Card Title</span>
        <span slot="description">Description of the icon card.</span>
      </sgds-icon-card>`,

  IconList: () => `<sgds-icon-list icon="check-circle-fill">This is an icon list item.</sgds-icon-list>`,

  ImageCard: () => `<sgds-image-card>
        <span slot="title">Image Card</span>
        <span slot="description">Description of the image card.</span>
      </sgds-image-card>`,

  Input: (args) => `<sgds-input
        type="${args.type || "text"}"
        label="${args.label || "Label"}"
        name="${args.name || "input-field"}"
        placeholder="${args.placeholder || "Placeholder text"}"
        hint-text="${args.hintText || "Hint text"}"
      ></sgds-input>`,

  Link: () => `<sgds-link><a href="#">This is a link</a></sgds-link>`,

  Mainnav: () => `<sgds-mainnav>
        <strong slot="brand">My App</strong>
        <sgds-mainnav-item><a href="/">Home</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="/about">About</a></sgds-mainnav-item>
      </sgds-mainnav>`,

  Masthead: () => `<sgds-masthead></sgds-masthead>`,
  Modal: () => `<sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Modal</sgds-button>
      <sgds-modal label="Modal Title">Modal content goes here.</sgds-modal>`,
  OverflowMenu: () => `<sgds-overflow-menu aria-label="More actions"></sgds-overflow-menu>`,
  Pagination: () => `<sgds-pagination data-length="50" current-page="1" items-per-page="10"></sgds-pagination>`,
  ProgressBar: () => `<sgds-progress-bar label="Loading" value="60"></sgds-progress-bar>`,
  QuantityToggle: () => `<sgds-quantity-toggle label="Quantity" name="qty"></sgds-quantity-toggle>`,

  RadioGroup: () => `<sgds-radio-group name="gender" label="Gender">
        <sgds-radio value="male">Male</sgds-radio>
        <sgds-radio value="female">Female</sgds-radio>
      </sgds-radio-group>`,

  Select: () => `<sgds-select label="Country" name="country" placeholder="Select a country">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="my">Malaysia</sgds-select-option>
        <sgds-select-option value="id">Indonesia</sgds-select-option>
      </sgds-select>`,

  Sidebar: () => `<sgds-sidebar active="dashboard">
        <sgds-sidebar-section title="Main" name="main">
          <sgds-sidebar-item name="dashboard" title="Dashboard">
            <sgds-icon slot="icon" name="grid-fill" size="md"></sgds-icon>
            <a href="#"></a>
          </sgds-sidebar-item>
          <sgds-sidebar-group name="reports" title="Reports">
            <sgds-icon slot="icon" name="file-earmark-text" size="md"></sgds-icon>
            <sgds-sidebar-item name="yearly" title="Yearly">
              <sgds-icon slot="icon" name="calendar" size="md"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar-section>
      </sgds-sidebar>`,

  Sidenav: () => `<sgds-sidenav>
        <sgds-sidenav-item active aria-label="Getting Started">
          <span slot="title">Getting Started</span>
          <sgds-sidenav-link active><a href="/">Overview</a></sgds-sidenav-link>
          <sgds-sidenav-link><a href="/install">Installation</a></sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav>`,

  Skeleton: () => `<sgds-skeleton></sgds-skeleton>`,
  Spinner: () => `<sgds-spinner></sgds-spinner>`,

  Stepper: () => `<sgds-stepper active-step="0">
        <sgds-step step-header="Personal Info"></sgds-step>
        <sgds-step step-header="Contact Details"></sgds-step>
        <sgds-step step-header="Review"></sgds-step>
      </sgds-stepper>`,

  Subnav: () => `<sgds-subnav>
        <sgds-subnav-item active><a href="/">Home</a></sgds-subnav-item>
        <sgds-subnav-item><a href="/about">About</a></sgds-subnav-item>
      </sgds-subnav>`,

  Switch: () => `<sgds-switch>Enable notifications</sgds-switch>`,

  SystemBanner: () => `<sgds-system-banner show>
        <sgds-system-banner-item>
          <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
          System maintenance is scheduled for this weekend.
        </sgds-system-banner-item>
      </sgds-system-banner>`,

  TabGroup: () => `<sgds-tab-group>
        <sgds-tab slot="nav" panel="tab1" aria-label="Tab 1">Tab 1</sgds-tab>
        <sgds-tab slot="nav" panel="tab2" aria-label="Tab 2">Tab 2</sgds-tab>
        <sgds-tab-panel name="tab1">Content for tab 1</sgds-tab-panel>
        <sgds-tab-panel name="tab2">Content for tab 2</sgds-tab-panel>
      </sgds-tab-group>`,

  Table: () => `<sgds-table header-background table-border>
        <sgds-table-row>
          <sgds-table-head>Name</sgds-table-head>
          <sgds-table-head>Role</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Alice</sgds-table-cell>
          <sgds-table-cell>Engineer</sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Bob</sgds-table-cell>
          <sgds-table-cell>Designer</sgds-table-cell>
        </sgds-table-row>
      </sgds-table>`,

  TableOfContents: () => `<sgds-table-of-contents></sgds-table-of-contents>`,

  Textarea: (args) => `<sgds-textarea
        label="${args.label || "Comments"}"
        name="${args.name || "comments"}"
        placeholder="${args.placeholder || "Enter your comments"}"
      ></sgds-textarea>`,

  ThumbnailCard: () => `<sgds-thumbnail-card>
        <span slot="title">Thumbnail Card</span>
        <span slot="description">Description of the thumbnail card.</span>
      </sgds-thumbnail-card>`,

  ToastContainer: () => `<sgds-toast-container position="bottom-end">
        <sgds-toast show title="Notification" variant="info">
          <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
          Your changes have been saved.
        </sgds-toast>
      </sgds-toast-container>`,

  Tooltip: () => `<sgds-tooltip content="This is a tooltip">
        <sgds-button>Hover me</sgds-button>
      </sgds-tooltip>`,
};

// ---------------------------------------------------------------------------
// Simple template fallbacks
// ---------------------------------------------------------------------------
export function simpleJsxTemplate(name: string, args: Record<string, unknown>): JsxTemplateResult {
  const p = propsToJsx(args);
  const dirName = name.replace(/^Sgds/, "");
  const jsx = p
    ? `      <${name}\n${p}\n      >${dirName}</${name}>`
    : `      <${name}>${dirName}</${name}>`;
  return { imports: [name], jsx };
}

export function toTagName(name: string): string {
  return "sgds-" + name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}

export function simpleHtmlTemplate(name: string, args: Record<string, unknown>): string {
  const dirName = name.replace(/^Sgds/, "");
  const tagName = toTagName(dirName);
  const p = propsToHtml(args);
  return p
    ? `<${tagName} ${p}>${dirName}</${tagName}>`
    : `<${tagName}>${dirName}</${tagName}>`;
}
