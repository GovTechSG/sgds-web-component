import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const RADIUS_OPTIONS = {
  "none (0px)": "var(--sgds-border-radius-none)",
  "xs (2px)": "var(--sgds-border-radius-xs)",
  "sm (4px)": "var(--sgds-border-radius-sm)",
  "md (8px)": "var(--sgds-border-radius-md)",
  "lg (12px)": "var(--sgds-border-radius-lg)",
  "xl (16px)": "var(--sgds-border-radius-xl)",
  "2-xl (24px)": "var(--sgds-border-radius-2-xl)",
  "3-xl (32px)": "var(--sgds-border-radius-3-xl)"
};

const radiusArgType = (name, defaultVar) => ({
  control: "select",
  options: Object.keys(RADIUS_OPTIONS),
  mapping: RADIUS_OPTIONS,
  name,
  table: { defaultValue: { summary: defaultVar } }
});

const setToken = (token, value) => {
  document.documentElement.style.setProperty(token, value);
  return unsafeHTML(`<style>:root { ${token}: ${value}; }</style>`);
};

const storyParams = {
  actions: { disable: true },
  interactions: { disable: true },
  controls: { disable: false },
  layout: "padded"
};

const TokenHeader = (cssVar, first = false) => html`
  ${first ? "" : html`<sgds-divider class="sgds:my-layout-md"></sgds-divider>`}
  <div class="sgds:pt-layout-md sgds:pb-lg">
    <code
      class="sgds:text-label-md sgds:text-body-subtle sgds:font-semibold sgds:mb-lg sgds:inline-block sgds:bg-surface-raised sgds:px-sm sgds:py-2-xs sgds:rounded-sm"
      >${cssVar}</code
    >
  </div>
`;

const ComponentSection = (name, content) => html`
  <div class="sgds-grid sgds:gap-layout-md sgds:py-md">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
      <h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
        ${name}
      </h5>
    </div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">${content}</div>
  </div>
`;

const storyWrapper = content => html` <div class="sgds-container sgds:flex sgds:flex-col">${content}</div> `;

export default {
  title: "Foundation/Theming/Border Radius",
  tags: ["!autodocs"]
};

/* ------------------------------------------------------------------ */
/*  1. Indicator — Badge, Skeleton                                     */
/* ------------------------------------------------------------------ */
export const Indicator = {
  render: args => {
    const style = setToken("--sgds-indicator-border-radius", args.indicator);
    return html`
      ${style}
      ${storyWrapper(html`
        ${TokenHeader("--sgds-indicator-border-radius", true)}
        ${ComponentSection(
          "Badge",
          html`
            <div class="sgds:flex sgds:gap-md sgds:items-center sgds:flex-wrap">
              <sgds-badge variant="info">Info</sgds-badge>
              <sgds-badge variant="success">Success</sgds-badge>
              <sgds-badge variant="warning">Warning</sgds-badge>
              <sgds-badge variant="danger">Danger</sgds-badge>
              <sgds-badge variant="neutral">Neutral</sgds-badge>
              <sgds-badge outlined variant="info">Outlined</sgds-badge>
            </div>
          `
        )}
        ${ComponentSection(
          "Skeleton",
          html`
            <div class="sgds:flex sgds:gap-md sgds:items-center">
              <sgds-skeleton width="128px" height="24px"></sgds-skeleton>
              <sgds-skeleton width="64px" height="64px"></sgds-skeleton>
              <sgds-skeleton width="200px" height="16px"></sgds-skeleton>
            </div>
          `
        )}
      `)}
    `;
  },
  name: "Indicator",
  args: {
    indicator: "sm (4px)"
  },
  argTypes: {
    indicator: radiusArgType("--sgds-indicator-border-radius", "var(--sgds-border-radius-sm)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  2. Interactive — Button, CloseButton, Datepicker, IconButton,      */
/*     OverflowMenu, Pagination, Sidebar, Sidenav, Tab                 */
/* ------------------------------------------------------------------ */
export const Interactive = {
  render: args => {
    const style = setToken("--sgds-interactive-border-radius", args.interactive);
    return html`
      ${style}
      ${storyWrapper(html`
        ${TokenHeader("--sgds-interactive-border-radius", true)}
        ${ComponentSection(
          "Button",
          html`
            <div class="sgds:flex sgds:gap-md sgds:items-center sgds:flex-wrap">
              <sgds-button variant="primary">Primary</sgds-button>
              <sgds-button variant="outline">Outline</sgds-button>
              <sgds-button variant="ghost">Ghost</sgds-button>
              <sgds-button variant="danger">Danger</sgds-button>
            </div>
          `
        )}
        ${ComponentSection(
          "Close Button",
          html`
            <div class="sgds:flex sgds:gap-md sgds:items-center">
              <sgds-close-button size="sm"></sgds-close-button>
              <sgds-close-button size="md"></sgds-close-button>
              <sgds-close-button size="lg"></sgds-close-button>
            </div>
          `
        )}
        ${ComponentSection(
          "Datepicker (calendar cells)",
          html`<sgds-datepicker label="Select date" menuIsOpen></sgds-datepicker>`
        )}
        ${ComponentSection(
          "Icon Button",
          html`
            <div class="sgds:flex sgds:gap-md sgds:items-center">
              <sgds-icon-button variant="primary" name="plus" ariaLabel="Add"></sgds-icon-button>
              <sgds-icon-button variant="outline" name="pencil" ariaLabel="Edit"></sgds-icon-button>
              <sgds-icon-button variant="ghost" name="trash" ariaLabel="Delete"></sgds-icon-button>
            </div>
          `
        )}
        ${ComponentSection(
          "Overflow Menu",
          html`
            <sgds-overflow-menu size="md">
              <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
              <sgds-dropdown-item ariaLabel="Delete">Delete</sgds-dropdown-item>
              <sgds-dropdown-item ariaLabel="Share">Share</sgds-dropdown-item>
            </sgds-overflow-menu>
          `
        )}
        ${ComponentSection(
          "Pagination",
          html`<sgds-pagination dataLength="50" currentPage="3" itemsPerPage="5"></sgds-pagination>`
        )}
        ${ComponentSection(
          "Sidebar",
          html`
            <div style="position: relative; height: 200px;">
              <sgds-sidebar active="item1">
                <sgds-sidebar-section title="Section">
                  <sgds-sidebar-item title="Item 1" name="item1">
                    <sgds-icon slot="icon" name="house" size="md"></sgds-icon>
                  </sgds-sidebar-item>
                  <sgds-sidebar-item title="Item 2" name="item2">
                    <sgds-icon slot="icon" name="gear" size="md"></sgds-icon>
                  </sgds-sidebar-item>
                </sgds-sidebar-section>
              </sgds-sidebar>
            </div>
          `
        )}
        ${ComponentSection(
          "Sidenav",
          html`
            <div class="sgds-grid">
              <sgds-sidenav class="sgds-col-4">
                <sgds-sidenav-item ariaLabel="Item 1">
                  <span slot="title">Navigation Item 1</span>
                  <sgds-sidenav-link><a href="#">Link 1</a></sgds-sidenav-link>
                  <sgds-sidenav-link><a href="#">Link 2</a></sgds-sidenav-link>
                </sgds-sidenav-item>
                <sgds-sidenav-item ariaLabel="Item 2">
                  <span slot="title">Navigation Item 2</span>
                  <sgds-sidenav-link><a href="#">Link 3</a></sgds-sidenav-link>
                </sgds-sidenav-item>
              </sgds-sidenav>
            </div>
          `
        )}
        ${ComponentSection(
          "Tab (solid variant)",
          html`
            <sgds-tab-group variant="solid">
              <sgds-tab slot="nav" panel="tab1" ariaLabel="Tab 1">Tab 1</sgds-tab>
              <sgds-tab slot="nav" panel="tab2" ariaLabel="Tab 2">Tab 2</sgds-tab>
              <sgds-tab slot="nav" panel="tab3" ariaLabel="Tab 3">Tab 3</sgds-tab>
              <sgds-tab-panel name="tab1">Content for Tab 1</sgds-tab-panel>
              <sgds-tab-panel name="tab2">Content for Tab 2</sgds-tab-panel>
              <sgds-tab-panel name="tab3">Content for Tab 3</sgds-tab-panel>
            </sgds-tab-group>
          `
        )}
      `)}
    `;
  },
  name: "Interactive",
  args: {
    interactive: "md (8px)"
  },
  argTypes: {
    interactive: radiusArgType("--sgds-interactive-border-radius", "var(--sgds-border-radius-md)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  3. Form — Checkbox, ComboBox, Datepicker, FileUpload, Input,       */
/*     QuantityToggle, Select, Switch, Textarea                        */
/* ------------------------------------------------------------------ */
export const Form = {
  render: args => {
    const styles = [
      setToken("--sgds-form-border-radius", args.form),
      setToken("--sgds-form-border-radius-dense", args.formDense)
    ];
    return html`
      ${styles}
      ${storyWrapper(html`
        ${TokenHeader("--sgds-form-border-radius-dense", true)}
        ${ComponentSection(
          "Checkbox",
          html`
            <div class="sgds:flex sgds:gap-lg">
              <sgds-checkbox checked>Checked</sgds-checkbox>
              <sgds-checkbox>Unchecked</sgds-checkbox>
              <sgds-checkbox indeterminate>Indeterminate</sgds-checkbox>
            </div>
          `
        )}
        ${TokenHeader("--sgds-form-border-radius")}
        ${ComponentSection(
          "Combo Box",
          html`
            <div>
              <sgds-combo-box
                label="Search options"
                placeholder="Search for a fruit"
                .menuList=${["Apple", "Banana", "Cherry", "Date", "Elderberry"]}
              ></sgds-combo-box>
            </div>
          `
        )}
        ${ComponentSection("Datepicker (input)", html`<sgds-datepicker label="Select date"></sgds-datepicker>`)}
        ${ComponentSection(
          "File Upload",
          html`<sgds-file-upload id="form-file-upload" label="Upload file" hintText="Accepted formats: .jpg, .png"
            >Choose file</sgds-file-upload
          >`
        )}
        ${ComponentSection(
          "Input",
          html`
            <div class="sgds:flex sgds:flex-col sgds:gap-md">
              <sgds-input label="Text input" placeholder="Enter text"></sgds-input>
              <sgds-input label="Disabled" placeholder="Disabled" disabled></sgds-input>
            </div>
          `
        )}
        ${ComponentSection(
          "Quantity Toggle",
          html`<sgds-quantity-toggle value="1" step="1" label="Quantity"></sgds-quantity-toggle>`
        )}
        ${ComponentSection(
          "Select",
          html`
            <div>
              <sgds-select label="Select option" placeholder="Choose an option">
                <sgds-select-option value="1">Option 1</sgds-select-option>
                <sgds-select-option value="2">Option 2</sgds-select-option>
                <sgds-select-option value="3">Option 3</sgds-select-option>
              </sgds-select>
            </div>
          `
        )}
        ${ComponentSection(
          "Textarea",
          html`
            <div>
              <sgds-textarea label="Message" placeholder="Enter your message"></sgds-textarea>
            </div>
          `
        )}
      `)}
    `;
  },
  name: "Form",
  play: async ({ canvasElement }) => {
    const fileUpload = canvasElement.querySelector("#form-file-upload");
    if (fileUpload) {
      await fileUpload.updateComplete;
      const mockFile = new File(["hello"], "document.pdf", { type: "application/pdf" });
      const dt = new DataTransfer();
      dt.items.add(mockFile);
      const input = fileUpload.shadowRoot?.querySelector("input[type='file']");
      if (input) {
        Object.defineProperty(input, "files", { value: dt.files, writable: true });
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  },
  args: {
    form: "md (8px)",
    formDense: "md (8px)"
  },
  argTypes: {
    form: radiusArgType("--sgds-form-border-radius", "var(--sgds-border-radius-md)"),
    formDense: radiusArgType("--sgds-form-border-radius-dense", "var(--sgds-border-radius-md)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  4. Surface — Accordion, Alert, Card, DescriptionList, IconCard,    */
/*     ImageCard, ThumbnailCard                                        */
/* ------------------------------------------------------------------ */
export const Surface = {
  render: args => {
    const style = setToken("--sgds-surface-border-radius", args.surface);
    return html`
      ${style}
      ${storyWrapper(html`
        ${TokenHeader("--sgds-surface-border-radius", true)}
        ${ComponentSection(
          "Accordion (border variant)",
          html`
            <sgds-accordion variant="border">
              <sgds-accordion-item>
                <span slot="header">Accordion Item 1</span>
                <span slot="content">Content for the first accordion item.</span>
              </sgds-accordion-item>
              <sgds-accordion-item>
                <span slot="header">Accordion Item 2</span>
                <span slot="content">Content for the second accordion item.</span>
              </sgds-accordion-item>
            </sgds-accordion>
          `
        )}
        ${ComponentSection(
          "Alert",
          html`
            <div class="sgds:flex sgds:flex-col sgds:gap-md">
              <sgds-alert variant="info" title="Information" show>
                <sgds-icon slot="icon" name="info-circle"></sgds-icon>
                This is an informational alert.
              </sgds-alert>
              <sgds-alert variant="success" title="Success" show>
                <sgds-icon slot="icon" name="check-circle"></sgds-icon>
                Operation completed successfully.
              </sgds-alert>
            </div>
          `
        )}
        ${ComponentSection(
          "Card",
          html`
            <sgds-card class="sgds:w-[350px]">
              <span slot="title">Card Title</span>
              <span slot="subtitle">Subtitle</span>
              <span slot="description">This is a card component using the surface border radius token.</span>
              <sgds-button slot="card-footer" variant="outline">Action</sgds-button>
            </sgds-card>
          `
        )}
        ${ComponentSection(
          "Description List",
          html`
            <sgds-description-list-group bordered>
              <sgds-description-list>Full name<span slot="data">John Doe</span></sgds-description-list>
              <sgds-description-list>Email<span slot="data">john@example.com</span></sgds-description-list>
              <sgds-description-list>Role<span slot="data">Administrator</span></sgds-description-list>
            </sgds-description-list-group>
          `
        )}
        ${ComponentSection(
          "Icon Card",
          html`
            <sgds-icon-card class="sgds:w-[350px]">
              <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
              <sgds-badge variant="primary" slot="upper">New</sgds-badge>
              <span slot="subtitle">EXPLORE THE FEATURES</span>
              <span slot="title">Innovative solutions for you</span>
              <span slot="description"
                >Discover how our platform can streamline your workflow and enhance productivity.</span
              >
            </sgds-icon-card>
          `
        )}
        ${ComponentSection(
          "Image Card",
          html`
            <sgds-image-card class="sgds:w-[350px]">
              <img
                slot="image"
                alt="Photo by Jirath Ninchaikovit on Unsplash"
                src="https://images.unsplash.com/photo-1547982982-448b6fdad3a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0"
              />
              <span slot="subtitle">HERITAGE</span>
              <span slot="title">Singapore Shophouses</span>
              <span slot="description"
                >Colourful heritage shophouses are an iconic feature of Singapore's architectural landscape.</span
              >
            </sgds-image-card>
          `
        )}
        ${ComponentSection(
          "Thumbnail Card",
          html`
            <sgds-thumbnail-card class="sgds:w-[350px]">
              <img slot="thumbnail" alt="SGDS logo" width="64" height="64" src="/logo.svg" />
              <sgds-badge variant="primary" slot="upper">Official</sgds-badge>
              <span slot="subtitle">DESIGN SYSTEM</span>
              <span slot="title">Singapore Government Design System</span>
              <span slot="description"
                >A design system for the Singapore government to build consistent and accessible digital services.</span
              >
            </sgds-thumbnail-card>
          `
        )}
      `)}
    `;
  },
  name: "Surface",
  args: {
    surface: "lg (12px)"
  },
  argTypes: {
    surface: radiusArgType("--sgds-surface-border-radius", "var(--sgds-border-radius-lg)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  5. Overlay — Dropdown, Modal, Toast, Tooltip                       */
/* ------------------------------------------------------------------ */
export const Overlay = {
  render: args => {
    const style = setToken("--sgds-overlay-border-radius", args.overlay);
    return html`
      ${style}
      ${storyWrapper(html`
        ${TokenHeader("--sgds-overlay-border-radius", true)}
        ${ComponentSection(
          "Datepicker (calendar panel)",
          html`<sgds-datepicker label="Select date" menuIsOpen></sgds-datepicker>`
        )}
        ${ComponentSection(
          "Mainnav Dropdown",
          html`
            <sgds-mainnav>
              <img alt="sgds logo" width="130" src="/logo.svg" slot="brand" />
              <sgds-mainnav-dropdown ariaLabel="Dropdown menu">
                <span slot="toggler">Dropdown</span>
                <sgds-dropdown-item ariaLabel="Item 1">Item 1</sgds-dropdown-item>
                <sgds-dropdown-item ariaLabel="Item 2">Item 2</sgds-dropdown-item>
                <sgds-dropdown-item ariaLabel="Item 3">Item 3</sgds-dropdown-item>
              </sgds-mainnav-dropdown>
            </sgds-mainnav>
          `
        )}
        ${ComponentSection(
          "Dropdown",
          html`
            <sgds-dropdown>
              <sgds-button slot="toggler" variant="outline">Open Dropdown</sgds-button>
              <sgds-dropdown-item>Action 1</sgds-dropdown-item>
              <sgds-dropdown-item>Action 2</sgds-dropdown-item>
              <sgds-dropdown-item>Action 3</sgds-dropdown-item>
            </sgds-dropdown>
          `
        )}
        ${ComponentSection(
          "Modal",
          html`
            <sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Modal</sgds-button>
            <sgds-modal>
              <h2 slot="title">Modal Title</h2>
              <p slot="description">This modal uses the overlay border radius token.</p>
              <sgds-button slot="footer" variant="primary">Confirm</sgds-button>
            </sgds-modal>
          `
        )}
        ${ComponentSection(
          "Toast",
          html`
            <sgds-toast show variant="info" title="Notification">
              <sgds-icon slot="icon" name="info-circle"></sgds-icon>
              This is a toast message.
            </sgds-toast>
          `
        )}
        ${ComponentSection(
          "Tooltip",
          html`
            <sgds-tooltip content="This is a tooltip" placement="top">
              <sgds-button variant="outline">Hover me</sgds-button>
            </sgds-tooltip>
          `
        )}
      `)}
    `;
  },
  name: "Overlay",
  args: {
    overlay: "lg (12px)"
  },
  argTypes: {
    overlay: radiusArgType("--sgds-overlay-border-radius", "var(--sgds-border-radius-lg)")
  },
  parameters: storyParams
};
