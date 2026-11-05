/**
 * CEM-driven component template generation for all e2e framework apps.
 * Reads custom-elements.json to auto-derive props, slots, parent-child
 * relationships, and trigger buttons. No hardcoded templates needed
 * for most components — only manual overrides for complex edge cases.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");

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
// Load & parse Custom Elements Manifest
// ---------------------------------------------------------------------------
interface CemField {
  kind: string;
  name: string;
  attribute?: string;
  type?: { text: string };
  default?: string;
  description?: string;
  privacy?: string;
  static?: boolean;
}
interface CemSlot { name: string; description: string; }
interface CemDecl {
  kind: string;
  name: string;
  tagName?: string;
  customElement?: boolean;
  slots?: CemSlot[];
  members?: CemField[];
}
interface CemModule { path?: string; declarations?: CemDecl[]; }
interface Cem { modules: CemModule[]; }

const cem: Cem = JSON.parse(readFileSync(resolve(root, "custom-elements.json"), "utf-8"));
const allDecls = cem.modules.flatMap(m => m.declarations || []);

// Map tagName → CEM module path (e.g., "src/components/Accordion/sgds-accordion.ts")
const modulePathByTag = new Map<string, string>();
for (const mod of cem.modules) {
  for (const d of mod.declarations || []) {
    if (d.customElement && d.tagName && mod.path) {
      modulePathByTag.set(d.tagName, mod.path);
    }
  }
}
const componentDecls = allDecls.filter(
  d => d.customElement && d.tagName && d.tagName.startsWith("sgds-") && d.tagName !== "sgds-element"
    && !d.deprecated && !(d.description && d.description.includes("@deprecated"))
);

// Map tagName → declaration and className → tagName
const declByTag = new Map<string, CemDecl>();
const tagByClass = new Map<string, string>();
const classByTag = new Map<string, string>();
for (const d of componentDecls) {
  declByTag.set(d.tagName!, d);
  tagByClass.set(d.name, d.tagName!);
  classByTag.set(d.tagName!, d.name);
}

/**
 * Get the per-component import path for a tag.
 * e.g., "sgds-accordion" → "@govtechsg/sgds-web-component/components/Accordion/index.js"
 * Extracts the folder name from the CEM module path (src/components/Accordion/sgds-accordion.ts → Accordion)
 */
export function getComponentImportPath(tag: string): string {
  const modPath = modulePathByTag.get(tag);
  if (modPath) {
    // Extract folder: "src/components/Accordion/sgds-accordion.ts" → "Accordion"
    const parts = modPath.split("/");
    const folder = parts[parts.length - 2]; // second to last segment
    return `@govtechsg/sgds-web-component/components/${folder}/index.js`;
  }
  // Fallback: derive from class name
  const cls = classByTag.get(tag);
  if (cls) {
    const folder = cls.replace(/^Sgds/, "");
    return `@govtechsg/sgds-web-component/components/${folder}/index.js`;
  }
  return `@govtechsg/sgds-web-component`;
}

/**
 * Collect all per-component import paths needed for a tag and its children.
 */
export function getComponentImportPaths(tag: string): string[] {
  const paths = new Set<string>();
  paths.add(getComponentImportPath(tag));

  // Add children's imports
  const children = parentChildMap.get(tag);
  if (children) {
    for (const child of children) {
      paths.add(getComponentImportPath(child));
    }
  }

  return [...paths];
}

// ---------------------------------------------------------------------------
// Parent-child detection
// ---------------------------------------------------------------------------

// Inverted naming: child name is the shorter one, parent is the longer one
const reverseParents: Record<string, string> = {
  "sgds-checkbox": "sgds-checkbox-group",
  "sgds-radio": "sgds-radio-group",
  "sgds-tab": "sgds-tab-group",
  "sgds-tab-panel": "sgds-tab-group",
  "sgds-toast": "sgds-toast-container",
};

/**
 * Build parent → children map using strict tag-name prefix matching only.
 * A child tag must start with the parent tag + "-" (e.g., sgds-accordion-item is a child of sgds-accordion).
 * The reverseParents map handles inverted naming (e.g., sgds-checkbox is a child of sgds-checkbox-group).
 * Non-component relationships (e.g., sgds-icon inside sgds-input) are NOT parent-child.
 */

// Tags that share a prefix but are independent components, not parent-child
const notChildren = new Set([
  "sgds-icon-button", "sgds-icon-card", "sgds-icon-list",  // sgds-icon-* are standalone, NOT children of sgds-icon
  "sgds-table-of-contents",  // unrelated to sgds-table
]);

function buildParentChildMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const allTags = [...declByTag.keys()];

  // Tags whose parent-child direction is defined by reverseParents — skip prefix matching for these
  const reverseHandled = new Set([
    ...Object.keys(reverseParents),
    ...Object.values(reverseParents),
  ]);

  // Strict prefix matching: child tag starts with parent tag + "-"
  for (const childTag of allTags) {
    if (notChildren.has(childTag)) continue;
    if (reverseHandled.has(childTag)) continue; // handled by reverseParents
    // Walk backwards stripping hyphen-segments to find a parent
    const parts = childTag.split("-");
    for (let i = parts.length - 1; i >= 2; i--) {
      const candidateParent = parts.slice(0, i).join("-");
      if (declByTag.has(candidateParent) && candidateParent !== childTag) {
        const children = map.get(candidateParent) || [];
        if (!children.includes(childTag)) children.push(childTag);
        map.set(candidateParent, children);
        break; // only the closest parent
      }
    }
  }

  // Add reverse-parent entries (inverted naming)
  for (const [child, parent] of Object.entries(reverseParents)) {
    const children = map.get(parent) || [];
    if (!children.includes(child)) children.push(child);
    map.set(parent, children);
  }

  return map;
}

export const parentChildMap = buildParentChildMap();

/** Tags that are children rendered inside a parent — should not get standalone pages */
export const childOnlyTags = new Set<string>();
for (const children of parentChildMap.values()) {
  for (const child of children) {
    childOnlyTags.add(child);
  }
}

// Also export as class names for the generators that filter by React component name
export const childOnlyComponents = new Set<string>();
for (const tag of childOnlyTags) {
  const cls = classByTag.get(tag);
  if (cls) childOnlyComponents.add(cls);
}

// ---------------------------------------------------------------------------
// Prop generation helpers
// ---------------------------------------------------------------------------

/** Props to always skip */
const skipProps = new Set([
  "open", "active", "disabled", "invalid", "expanded", "loading",
  "noAnimation", "contained",
]);

/** Props starting with these prefixes are SSR helpers — skip */
const skipPrefixes = ["has"];

/** Boolean props to force true for demo visibility */
const showByDefault = new Set(["show"]);

/** Props that are form internals or low-value for demos */
const skipFormProps = new Set([
  "name", "value", "form", "formAction", "formMethod",
  "formNoValidate", "formTarget", "noValidate",
  "hasFeedback", "required", "invalidFeedback",
]);

function shouldSkipProp(field: CemField): boolean {
  if (field.static) return true;
  if (field.deprecated || (field.description && field.description.includes("@deprecated"))) return true;
  if (skipProps.has(field.name)) return true;
  if (skipFormProps.has(field.name)) return true;
  if (skipPrefixes.some(p => field.name.startsWith(p) && field.name !== "hintText")) return true;
  if (field.description && /managed by|controlled by/i.test(field.description)) return true;

  const type = field.type?.text || "";
  const def = field.default;

  // Skip booleans that default to false (unless in showByDefault)
  if (type === "boolean" && def === "false" && !showByDefault.has(field.name)) return true;

  // Skip props with no default and no obvious demo value
  if (!def && !["label", "placeholder", "hintText", "ariaLabel"].includes(field.name)) return true;

  return false;
}

function getPropValue(field: CemField, displayName: string): string | number | boolean | null {
  if (showByDefault.has(field.name)) return true;

  const type = field.type?.text || "";
  const def = field.default;

  if (type === "boolean") {
    return def === "true" ? true : null;
  }

  if (def) {
    // Strip surrounding quotes from string defaults
    const stripped = def.replace(/^["']|["']$/g, "");
    if (stripped === "" || stripped === "undefined") {
      // Empty default — generate a value for known prop names
      if (field.name === "label") return displayName;
      if (field.name === "ariaLabel") return displayName;
      return null;
    }
    // Skip object/array/complex defaults (contain braces, brackets, or nested quotes)
    if (stripped.includes("{") || stripped.includes("[") || stripped.includes('"')) return null;
    // Number default
    if (type === "number" || /^\d+$/.test(stripped)) return Number(stripped);
    return stripped;
  }

  // No default — generate for known names
  if (field.name === "label") return displayName;
  if (field.name === "ariaLabel") return displayName;
  if (field.name === "placeholder") return "Enter text...";
  if (field.name === "hintText") return "Hint text";

  return null;
}

function getComponentProps(decl: CemDecl): { name: string; attr: string; value: string | number | boolean }[] {
  const displayName = decl.name.replace(/^Sgds/, "");
  const fields = (decl.members || []).filter(m => m.kind === "field" && m.attribute);
  const result: { name: string; attr: string; value: string | number | boolean }[] = [];

  for (const f of fields) {
    if (shouldSkipProp(f)) continue;
    const val = getPropValue(f, displayName);
    if (val === null) continue;
    result.push({ name: f.name, attr: f.attribute!, value: val });
  }

  return result;
}

// ---------------------------------------------------------------------------
// Slot content generation
// ---------------------------------------------------------------------------

function generateSlotHtml(slot: CemSlot, tag: string, indent: string): string | null {
  // Skip deprecated slots
  if (slot.description && slot.description.includes("@deprecated")) return null;

  const displayName = (classByTag.get(tag) || tag).replace(/^Sgds/, "");
  const n = slot.name;

  if (n === "default") return null; // handled separately (children or text)
  if (n === "title") return `${indent}<span slot="title">${displayName}</span>`;
  if (n === "description") return `${indent}<span slot="description">Description of the ${displayName.toLowerCase()}.</span>`;
  if (n === "header") return `${indent}<div slot="header">Header text</div>`;
  if (n === "content") return `${indent}<div slot="content">Content goes here.</div>`;
  if (n === "footer") return `${indent}<span slot="footer">Footer content</span>`;
  if (n === "icon") return `${indent}<sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>`;
  if (n === "brand") return `${indent}<strong slot="brand">${displayName}</strong>`;
  if (n === "nav") return null; // handled in tab-group special case

  // Skip optional/deprecated/SSR slots
  return null;
}

// ---------------------------------------------------------------------------
// Override templates for complex components
// ---------------------------------------------------------------------------

type HtmlOverrideFn = () => string;
type JsxOverrideFn = () => { imports: string[]; jsx: string };

const htmlOverrides: Record<string, HtmlOverrideFn> = {
  "sgds-data-table": () => `<sgds-data-table data-length="3" current-page="1" items-per-page="5">
        <sgds-data-table-row>
          <sgds-data-table-head sorting sort-key="id">ID</sgds-data-table-head>
          <sgds-data-table-head sorting sort-key="name">Name</sgds-data-table-head>
          <sgds-data-table-head sort-key="role">Role</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
          <sgds-data-table-cell>Engineer</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>2</sgds-data-table-cell>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
          <sgds-data-table-cell>Designer</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>3</sgds-data-table-cell>
          <sgds-data-table-cell>Charlie</sgds-data-table-cell>
          <sgds-data-table-cell>Analyst</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>`,

  "sgds-appnav": () => `<sgds-appnav tone="gradient-3">
        <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" aria-label="Open side menu"></sgds-icon-button>
        <a slot="brand" href="/"><strong style="color: white">My App</strong></a>
        <sgds-icon-button name="bell" variant="ghost" tone="fixed-light" size="sm" aria-label="Notifications"></sgds-icon-button>
        <sgds-appnav-profile slot="profile" label="User Name" secondary-text="Agency" aria-label="Profile menu">
          <sgds-dropdown-item aria-label="My profile"><span>My profile</span></sgds-dropdown-item>
          <sgds-dropdown-item aria-label="Log out"><span>Log out</span></sgds-dropdown-item>
        </sgds-appnav-profile>
      </sgds-appnav>`,

  "sgds-footer": () => `<sgds-footer
        contact-href="https://form.gov.sg/"
        feedback-href="https://form.gov.sg/"
        privacy-href="/privacy"
        terms-of-use-href="/terms"
      ></sgds-footer>`,

  "sgds-table": () => `<sgds-table header-background table-border>
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
};

const jsxOverrides: Record<string, JsxOverrideFn> = {
  "sgds-data-table": () => ({
    imports: ["SgdsDataTable", "SgdsDataTableHead", "SgdsDataTableRow", "SgdsDataTableCell"],
    jsx: `      <SgdsDataTable dataLength={3} currentPage={1} itemsPerPage={5}>
        <SgdsDataTableRow>
          <SgdsDataTableHead sorting sortKey="id">ID</SgdsDataTableHead>
          <SgdsDataTableHead sorting sortKey="name">Name</SgdsDataTableHead>
          <SgdsDataTableHead sortKey="role">Role</SgdsDataTableHead>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>1</SgdsDataTableCell>
          <SgdsDataTableCell>Alice</SgdsDataTableCell>
          <SgdsDataTableCell>Engineer</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>2</SgdsDataTableCell>
          <SgdsDataTableCell>Bob</SgdsDataTableCell>
          <SgdsDataTableCell>Designer</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>3</SgdsDataTableCell>
          <SgdsDataTableCell>Charlie</SgdsDataTableCell>
          <SgdsDataTableCell>Analyst</SgdsDataTableCell>
        </SgdsDataTableRow>
      </SgdsDataTable>`,
  }),

  "sgds-appnav": () => ({
    imports: ["SgdsAppnav", "SgdsAppnavProfile", "SgdsIconButton", "SgdsDropdownItem"],
    jsx: `      <SgdsAppnav tone="gradient-3">
        <SgdsIconButton name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Open side menu"></SgdsIconButton>
        <a slot="brand" href="/"><strong style={{color: "white"}}>My App</strong></a>
        <SgdsIconButton name="bell" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Notifications"></SgdsIconButton>
        <SgdsAppnavProfile slot="profile" label="User Name" secondaryText="Agency" ariaLabel="Profile menu">
          <SgdsDropdownItem ariaLabel="My profile"><span>My profile</span></SgdsDropdownItem>
          <SgdsDropdownItem ariaLabel="Log out"><span>Log out</span></SgdsDropdownItem>
        </SgdsAppnavProfile>
      </SgdsAppnav>`,
  }),

  "sgds-footer": () => ({
    imports: ["SgdsFooter"],
    jsx: `      <SgdsFooter
        contactHref="https://form.gov.sg/"
        feedbackHref="https://form.gov.sg/"
        privacyHref="/privacy"
        termsOfUseHref="/terms"
      ></SgdsFooter>`,
  }),

  "sgds-table": () => ({
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
};

// ---------------------------------------------------------------------------
// Detect if a component needs a trigger button (open + show method)
// ---------------------------------------------------------------------------

function needsTriggerButton(decl: CemDecl): boolean {
  const hasOpen = (decl.members || []).some(
    m => m.kind === "field" && m.name === "open" && m.default === "false"
  );
  const hasShow = (decl.members || []).some(
    m => m.kind === "method" && m.name === "show" && m.privacy === "public"
  );
  return hasOpen && hasShow && !childOnlyTags.has(decl.tagName!);
}

// ---------------------------------------------------------------------------
// HTML template generation (Vue / Nuxt / Angular)
// ---------------------------------------------------------------------------

function generateChildHtml(parentTag: string, indent: string): string {
  const children = parentChildMap.get(parentTag) || [];
  const parentDecl = declByTag.get(parentTag)!;
  const slots = parentDecl.slots || [];

  // Special case: tab-group needs tabs in "nav" slot and panels in default
  if (parentTag === "sgds-tab-group") {
    return `${indent}<sgds-tab slot="nav" panel="tab1" aria-label="Tab 1">Tab 1</sgds-tab>
${indent}<sgds-tab slot="nav" panel="tab2" aria-label="Tab 2">Tab 2</sgds-tab>
${indent}<sgds-tab-panel name="tab1">Content for tab 1</sgds-tab-panel>
${indent}<sgds-tab-panel name="tab2">Content for tab 2</sgds-tab-panel>`;
  }

  // For each child, generate a simple instance with its slots filled
  const parts: string[] = [];
  for (const childTag of children) {
    const childDecl = declByTag.get(childTag);
    if (!childDecl) continue;

    const childProps = getComponentProps(childDecl);
    const propsStr = childProps.map(p => {
      const attr = p.name.replace(/([A-Z])/g, "-$1").toLowerCase();
      if (typeof p.value === "boolean") return p.value ? attr : "";
      return `${attr}="${p.value}"`;
    }).filter(Boolean).join(" ");

    const childSlots = (childDecl.slots || []);
    const slotContent: string[] = [];
    for (const s of childSlots) {
      const html = generateSlotHtml(s, childTag, indent + "  ");
      if (html) slotContent.push(html);
    }

    // Default slot content for the child
    const defaultSlot = childSlots.find(s => s.name === "default");
    if (defaultSlot) {
      const displayName = childDecl.name.replace(/^Sgds/, "");
      slotContent.push(`${indent}  ${displayName} content`);
    }

    const openTag = propsStr ? `<${childTag} ${propsStr}>` : `<${childTag}>`;
    if (slotContent.length > 0) {
      parts.push(`${indent}${openTag}\n${slotContent.join("\n")}\n${indent}</${childTag}>`);
    } else {
      parts.push(`${indent}${openTag}</${childTag}>`);
    }
  }

  return parts.join("\n");
}

export function generateHtmlTemplate(tag: string): string {
  // Check for manual override
  if (htmlOverrides[tag]) return htmlOverrides[tag]();

  const decl = declByTag.get(tag);
  if (!decl) return `<${tag}></${tag}>`;

  const displayName = decl.name.replace(/^Sgds/, "");
  const props = getComponentProps(decl);
  const slots = decl.slots || [];
  const children = parentChildMap.get(tag);
  const hasTrigger = needsTriggerButton(decl);

  // Build props string
  const propsStr = props.map(p => {
    const attr = p.name.replace(/([A-Z])/g, "-$1").toLowerCase();
    if (typeof p.value === "boolean") return p.value ? attr : "";
    return `${attr}="${p.value}"`;
  }).filter(Boolean).join(" ");

  // Build slot content
  const indent = "        ";
  const slotParts: string[] = [];

  // Named slots
  for (const s of slots) {
    const html = generateSlotHtml(s, tag, indent);
    if (html) slotParts.push(html);
  }

  // Default slot: children or text
  if (children && children.length > 0) {
    slotParts.push(generateChildHtml(tag, indent));
  } else {
    const defaultSlot = slots.find(s => s.name === "default");
    if (defaultSlot) {
      slotParts.push(`${indent}${displayName}`);
    }
  }

  const openTag = propsStr ? `<${tag} ${propsStr}>` : `<${tag}>`;
  let html: string;
  if (slotParts.length > 0) {
    html = `${openTag}\n${slotParts.join("\n")}\n      </${tag}>`;
  } else {
    html = `${openTag}</${tag}>`;
  }

  // Prepend trigger button if needed
  if (hasTrigger) {
    html = `<sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open ${displayName}</sgds-button>\n      ${html}`;
  }

  return html;
}

// ---------------------------------------------------------------------------
// JSX template generation (React / Next.js)
// ---------------------------------------------------------------------------

function generateChildJsx(parentTag: string, indent: string): { imports: string[]; jsx: string } {
  const children = parentChildMap.get(parentTag) || [];
  const imports: string[] = [];

  // Special case: tab-group
  if (parentTag === "sgds-tab-group") {
    imports.push("SgdsTab", "SgdsTabPanel");
    return {
      imports,
      jsx: `${indent}<SgdsTab slot="nav" panel="tab1" ariaLabel="Tab 1">Tab 1</SgdsTab>
${indent}<SgdsTab slot="nav" panel="tab2" ariaLabel="Tab 2">Tab 2</SgdsTab>
${indent}<SgdsTabPanel name="tab1">Content for tab 1</SgdsTabPanel>
${indent}<SgdsTabPanel name="tab2">Content for tab 2</SgdsTabPanel>`,
    };
  }

  const parts: string[] = [];
  for (const childTag of children) {
    const childDecl = declByTag.get(childTag);
    if (!childDecl) continue;

    const childClass = childDecl.name;
    imports.push(childClass);

    const childProps = getComponentProps(childDecl);
    const propsStr = childProps.map(p => {
      if (typeof p.value === "boolean") return p.value ? p.name : "";
      if (typeof p.value === "number") return `${p.name}={${p.value}}`;
      return `${p.name}="${p.value}"`;
    }).filter(Boolean).join(" ");

    const childSlots = (childDecl.slots || []);
    const slotContent: string[] = [];
    for (const s of childSlots) {
      if (s.name === "default") continue;
      if (s.name === "icon") {
        imports.push("SgdsIcon");
        slotContent.push(`${indent}  <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>`);
      } else if (s.name === "header") {
        slotContent.push(`${indent}  <div slot="header">Header text</div>`);
      } else if (s.name === "content") {
        slotContent.push(`${indent}  <div slot="content">Content goes here.</div>`);
      } else if (s.name === "title") {
        const dn = childDecl.name.replace(/^Sgds/, "");
        slotContent.push(`${indent}  <span slot="title">${dn}</span>`);
      } else if (s.name === "description") {
        const dn = childDecl.name.replace(/^Sgds/, "");
        slotContent.push(`${indent}  <span slot="description">Description of the ${dn.toLowerCase()}.</span>`);
      }
    }

    // Default slot content
    const defaultSlot = childSlots.find(s => s.name === "default");
    if (defaultSlot) {
      const dn = childDecl.name.replace(/^Sgds/, "");
      slotContent.push(`${indent}  ${dn} content`);
    }

    const openTag = propsStr ? `<${childClass} ${propsStr}>` : `<${childClass}>`;
    if (slotContent.length > 0) {
      parts.push(`${indent}${openTag}\n${slotContent.join("\n")}\n${indent}</${childClass}>`);
    } else {
      parts.push(`${indent}${openTag}</${childClass}>`);
    }
  }

  return { imports, jsx: parts.join("\n") };
}

export function generateJsxTemplate(tag: string): { imports: string[]; jsx: string } {
  // Check for manual override
  if (jsxOverrides[tag]) return jsxOverrides[tag]();

  const decl = declByTag.get(tag);
  if (!decl) return { imports: [], jsx: `      <${tag}></${tag}>` };

  const className = decl.name;
  const displayName = className.replace(/^Sgds/, "");
  const props = getComponentProps(decl);
  const slots = decl.slots || [];
  const children = parentChildMap.get(tag);
  const hasTrigger = needsTriggerButton(decl);
  const imports: string[] = [className];

  // Build props string (camelCase for React)
  const propsStr = props.map(p => {
    if (typeof p.value === "boolean") return p.value ? p.name : "";
    if (typeof p.value === "number") return `${p.name}={${p.value}}`;
    return `${p.name}="${p.value}"`;
  }).filter(Boolean).join(" ");

  // Build slot content
  const indent = "        ";
  const slotParts: string[] = [];

  // Named slots (JSX syntax)
  for (const s of slots) {
    if (s.name === "default" || s.name === "nav") continue;
    if (s.name === "title") slotParts.push(`${indent}<span slot="title">${displayName}</span>`);
    else if (s.name === "description") slotParts.push(`${indent}<span slot="description">Description of the ${displayName.toLowerCase()}.</span>`);
    else if (s.name === "header") slotParts.push(`${indent}<div slot="header">Header text</div>`);
    else if (s.name === "content") slotParts.push(`${indent}<div slot="content">Content goes here.</div>`);
    else if (s.name === "footer") slotParts.push(`${indent}<span slot="footer">Footer content</span>`);
    else if (s.name === "icon") {
      imports.push("SgdsIcon");
      slotParts.push(`${indent}<SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>`);
    }
    else if (s.name === "brand") slotParts.push(`${indent}<strong slot="brand">${displayName}</strong>`);
  }

  // Default slot: children or text
  if (children && children.length > 0) {
    const childResult = generateChildJsx(tag, indent);
    imports.push(...childResult.imports);
    slotParts.push(childResult.jsx);
  } else {
    const defaultSlot = slots.find(s => s.name === "default");
    if (defaultSlot) {
      slotParts.push(`${indent}${displayName}`);
    }
  }

  const openTag = propsStr ? `<${className} ${propsStr}>` : `<${className}>`;
  let jsx: string;
  if (slotParts.length > 0) {
    jsx = `      ${openTag}\n${slotParts.join("\n")}\n      </${className}>`;
  } else {
    jsx = `      ${openTag}</${className}>`;
  }

  // Prepend trigger button if needed
  if (hasTrigger) {
    imports.push("SgdsButton");
    jsx = `      <SgdsButton variant="primary" onClick={(e) => { const el = e.currentTarget.nextElementSibling; if (el) el.open = true; }}>Open ${displayName}</SgdsButton>\n${jsx}`;
  }

  return { imports: [...new Set(imports)], jsx };
}
