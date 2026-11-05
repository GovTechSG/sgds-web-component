/**
 * Auto-generates Next.js component wrapper files matching the cypress pattern.
 * Each component gets a 'use client' wrapper that imports from @govtechsg/sgds-web-component/react.
 * Components use proper API: correct slots, required props, and children per the SGDS component docs.
 *
 * Run from root: tsx e2e/utils/generate-next-components.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");
const outDir = resolve(__dirname, "../apps/next-app/src/app/components");
const templatesDir = resolve(root, "stories/component-templates");

// Parse src/react/index.ts for React component names
const reactIndex = readFileSync(resolve(root, "src/react/index.ts"), "utf-8");
const reactRegex = /export \{ default as (\w+) \} from '\.\/([^']+)'/g;
const reactComponentNames: string[] = [];
let match: RegExpExecArray | null;
while ((match = reactRegex.exec(reactIndex)) !== null) {
  reactComponentNames.push(match[1]);
}

// Load Storybook args for each component
async function loadArgs(dirName: string): Promise<Record<string, unknown>> {
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

function propsToJsx(args: Record<string, unknown>): string {
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

/**
 * Component templates with proper API usage.
 * Each returns { imports: string[], jsx: string } where imports are React wrapper names.
 */
type TemplateResult = { imports: string[]; jsx: string };

const componentTemplates: Record<string, (args: Record<string, unknown>) => TemplateResult> = {
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
    imports: ["SgdsDrawer"],
    jsx: `      <SgdsDrawer label="Drawer Title">Drawer content goes here.</SgdsDrawer>`,
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
    imports: ["SgdsModal"],
    jsx: `      <SgdsModal label="Modal Title">Modal content goes here.</SgdsModal>`,
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

// Simple components: just render with args as props + text content
function simpleTemplate(name: string, args: Record<string, unknown>): TemplateResult {
  const propsStr = propsToJsx(args);
  const dirName = name.replace(/^Sgds/, "");
  const jsx = propsStr
    ? `      <${name}\n${propsStr}\n      >${dirName}</${name}>`
    : `      <${name}>${dirName}</${name}>`;
  return { imports: [name], jsx };
}

// Components that are children-only (rendered inside parents) — skip these
const childOnlyComponents = new Set([
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

async function main() {
  mkdirSync(outDir, { recursive: true });

  const generated: string[] = [];

  for (const name of reactComponentNames) {
    if (childOnlyComponents.has(name)) continue;

    const dirName = name.replace(/^Sgds/, "");
    const args = await loadArgs(dirName);

    // Use custom template if available, otherwise simple fallback
    const templateFn = componentTemplates[dirName];
    const result = templateFn ? templateFn(args) : simpleTemplate(name, args);

    const importLine = `import { ${[...new Set(result.imports)].join(", ")} } from '@govtechsg/sgds-web-component/react';`;

    const fileContent = `'use client';

${importLine}

export const ${dirName} = () => {
  return (
    <>
${result.jsx}
    </>
  );
};
`;

    writeFileSync(resolve(outDir, `${dirName}.tsx`), fileContent);
    generated.push(dirName);
  }

  // Generate individual route pages: /[component]/page.tsx
  const appDir = resolve(outDir, "..");
  for (const name of generated) {
    const slug = name.toLowerCase();
    const routeDir = resolve(appDir, slug);
    mkdirSync(routeDir, { recursive: true });

    const routeContent = `import { ${name} } from "../components/${name}";

export default function ${name}Page() {
  return (
    <div className="sgds-container-sidebar sgds:py-layout-md">
      <h1 className="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">${name}</h1>
      <div className="sgds:mt-gap-text-md">
        <${name} />
      </div>
    </div>
  );
}
`;
    writeFileSync(resolve(routeDir, "page.tsx"), routeContent);
  }

  // Generate sidebar layout that wraps all routes
  const sidebarItems = generated
    .map(name => `          <SgdsSidebarItem name="${name.toLowerCase()}" title="${name}">
            <a href="/${name.toLowerCase()}"></a>
          </SgdsSidebarItem>`)
    .join("\n");

  const sidebarLayoutContent = `'use client';

import { usePathname } from "next/navigation";
import { SgdsSidebar, SgdsSidebarItem, SgdsSidebarSection } from "@govtechsg/sgds-web-component/react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname.replace("/", "") || "accordion";

  return (
    <div className="sgds:flex sgds:min-h-screen">
      <SgdsSidebar active={active} variant="persistent" className="sgds:h-screen sgds:sticky sgds:top-0">
        <div slot="upper" className="sgds:text-subtitle-sm sgds:font-semibold">SGDS E2E NextJS</div>
        <SgdsSidebarSection name="components" title="Components">
${sidebarItems}
        </SgdsSidebarSection>
      </SgdsSidebar>
      <div className="sgds:flex sgds:flex-col sgds:w-full">
        {children}
      </div>
    </div>
  );
}
`;
  writeFileSync(resolve(appDir, "sidebar-layout.tsx"), sidebarLayoutContent);

  // Generate root layout that includes the sidebar
  // Generate root page.tsx (landing — redirects to first component)
  const pageContent = `import { redirect } from "next/navigation";

export default function Home() {
  redirect("/${generated[0].toLowerCase()}");
}
`;
  writeFileSync(resolve(appDir, "page.tsx"), pageContent);

  console.log(`Generated ${generated.length} component wrappers, ${generated.length} route pages, sidebar layout, and page.tsx for Next.js`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
