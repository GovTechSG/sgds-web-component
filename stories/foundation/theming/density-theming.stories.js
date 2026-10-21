import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const DENSITY_TOKENS = {
  default: {},
  compact: {
    "--sgds-density-padding-3-xs": "var(--sgds-spacer-0)",
    "--sgds-density-padding-2-xs": "var(--sgds-spacer-1)",
    "--sgds-density-padding-xs": "var(--sgds-spacer-2)",
    "--sgds-density-padding-sm": "var(--sgds-spacer-3)",
    "--sgds-density-padding-md": "var(--sgds-spacer-4)",
    "--sgds-density-padding-lg": "var(--sgds-spacer-5)",
    "--sgds-density-padding-xl": "var(--sgds-spacer-6)",
    "--sgds-density-padding-2-xl": "var(--sgds-spacer-7)",
    "--sgds-density-padding-3-xl": "var(--sgds-spacer-8)",
    "--sgds-density-padding-4-xl": "var(--sgds-spacer-9)",
    "--sgds-density-padding-5-xl": "var(--sgds-spacer-10)",
    "--sgds-density-gap-2-xs": "var(--sgds-spacer-1)",
    "--sgds-density-gap-xs": "var(--sgds-spacer-2)",
    "--sgds-density-gap-sm": "var(--sgds-spacer-3)",
    "--sgds-density-gap-md": "var(--sgds-spacer-4)",
    "--sgds-density-gap-lg": "var(--sgds-spacer-5)",
    "--sgds-density-gap-xl": "var(--sgds-spacer-6)",
    "--sgds-density-gap-2-xl": "var(--sgds-spacer-7)",
    "--sgds-density-gap-3-xl": "var(--sgds-spacer-8)"
  },
  spacious: {
    "--sgds-density-padding-3-xs": "var(--sgds-spacer-2)",
    "--sgds-density-padding-2-xs": "var(--sgds-spacer-3)",
    "--sgds-density-padding-xs": "var(--sgds-spacer-4)",
    "--sgds-density-padding-sm": "var(--sgds-spacer-5)",
    "--sgds-density-padding-md": "var(--sgds-spacer-6)",
    "--sgds-density-padding-lg": "var(--sgds-spacer-7)",
    "--sgds-density-padding-xl": "var(--sgds-spacer-8)",
    "--sgds-density-padding-2-xl": "var(--sgds-spacer-9)",
    "--sgds-density-padding-3-xl": "var(--sgds-spacer-10)",
    "--sgds-density-padding-4-xl": "var(--sgds-spacer-11)",
    "--sgds-density-padding-5-xl": "var(--sgds-spacer-12)",
    "--sgds-density-gap-2-xs": "var(--sgds-spacer-3)",
    "--sgds-density-gap-xs": "var(--sgds-spacer-4)",
    "--sgds-density-gap-sm": "var(--sgds-spacer-5)",
    "--sgds-density-gap-md": "var(--sgds-spacer-6)",
    "--sgds-density-gap-lg": "var(--sgds-spacer-7)",
    "--sgds-density-gap-xl": "var(--sgds-spacer-8)",
    "--sgds-density-gap-2-xl": "var(--sgds-spacer-9)",
    "--sgds-density-gap-3-xl": "var(--sgds-spacer-10)"
  }
};

const applyDensity = mode => {
  const root = document.documentElement;
  // Reset to default by removing overrides
  Object.keys(DENSITY_TOKENS.compact).forEach(token => root.style.removeProperty(token));

  const tokens = DENSITY_TOKENS[mode];
  if (tokens && Object.keys(tokens).length) {
    Object.entries(tokens).forEach(([token, value]) => root.style.setProperty(token, value));
    const css = Object.entries(tokens)
      .map(([t, v]) => `${t}: ${v};`)
      .join(" ");
    return unsafeHTML(`<style>:root { ${css} }</style>`);
  }
  return html``;
};

const storyParams = {
  actions: { disable: true },
  interactions: { disable: true },
  controls: { disable: false }
};

const ComponentSection = (name, content) => html`
  <div class="sgds:flex sgds:flex-col sgds:gap-sm sgds:py-md">
    <h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
      ${name}
    </h5>
    <div>${content}</div>
  </div>
`;

const storyWrapper = content =>
  html` <div class="sgds-container sgds:flex sgds:flex-col sgds:gap-layout-md">${content}</div> `;

export default {
  title: "Theming/Density",
  tags: ["!autodocs"]
};

export const Density = {
  render: args => {
    const style = applyDensity(args.density);
    return html`
      ${style}
      ${storyWrapper(html`
        ${ComponentSection(
          "Accordion",
          html`
            <sgds-accordion>
              <sgds-accordion-item open>
                <div slot="header">Accordion Item 1</div>
                <div slot="content">Content for accordion item 1.</div>
              </sgds-accordion-item>
              <sgds-accordion-item>
                <div slot="header">Accordion Item 2</div>
                <div slot="content">Content for accordion item 2.</div>
              </sgds-accordion-item>
              <sgds-accordion-item>
                <div slot="header">Accordion Item 3</div>
                <div slot="content">Content for accordion item 3.</div>
              </sgds-accordion-item>
            </sgds-accordion>
          `
        )}
        ${ComponentSection(
          "Cards",
          html`
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-3">
                <p class="sgds:text-body-md sgds:text-body-default sgds:mb-sm">Card</p>
                <sgds-card>
                  <span slot="title">Card Title</span>
                  <span slot="subtitle">Subtitle</span>
                  <span slot="description">This is a card component using density tokens for padding and gap.</span>
                  <sgds-button slot="card-footer" variant="outline">Action</sgds-button>
                </sgds-card>
              </div>
              <div class="sgds-col-3">
                <p class="sgds:text-body-md sgds:text-body-default sgds:mb-sm">Icon Card</p>
                <sgds-icon-card>
                  <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
                  <sgds-badge variant="primary" slot="upper">New</sgds-badge>
                  <span slot="subtitle">EXPLORE THE FEATURES</span>
                  <span slot="title">Innovative solutions for you</span>
                  <span slot="description"
                    >Discover how our platform can streamline your workflow and enhance productivity.</span
                  >
                </sgds-icon-card>
              </div>
              <div class="sgds-col-3">
                <p class="sgds:text-body-md sgds:text-body-default sgds:mb-sm">Image Card</p>
                <sgds-image-card>
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
              </div>
              <div class="sgds-col-3">
                <p class="sgds:text-body-md sgds:text-body-default sgds:mb-sm">Thumbnail Card</p>
                <sgds-thumbnail-card>
                  <img slot="thumbnail" alt="SGDS logo" width="64" height="64" src="/logo.svg" />
                  <sgds-badge variant="primary" slot="upper">Official</sgds-badge>
                  <span slot="subtitle">DESIGN SYSTEM</span>
                  <span slot="title">Singapore Government Design System</span>
                  <span slot="description"
                    >A design system for the Singapore government to build consistent and accessible digital
                    services.</span
                  >
                </sgds-thumbnail-card>
              </div>
            </div>
          `
        )}
        ${ComponentSection(
          "Modal",
          html`
            <sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Modal</sgds-button>
            <sgds-modal>
              <h2 slot="title">Delete application</h2>
              <span slot="description">This action cannot be undone.</span>
              <span
                >Are you sure you want to delete "MyGov Portal"? All associated data, API keys, and user permissions
                will be permanently removed.</span
              >
              <sgds-button slot="footer" variant="link">Cancel</sgds-button>
              <sgds-button slot="footer" variant="danger">Delete</sgds-button>
            </sgds-modal>
          `
        )}
        ${ComponentSection(
          "Drawer",
          html`
            <sgds-button variant="primary" onclick="this.nextElementSibling.open = true">Open Drawer</sgds-button>
            <sgds-drawer>
              <h4 slot="title">Notification settings</h4>
              <span slot="description">Choose how you would like to receive notifications for this service.</span>
              <p class="sgds:text-body-sm sgds:text-body-default">
                Select the channels you want to receive updates on. You can change these settings at any time from your
                account preferences.
              </p>
              <sgds-checkbox-group>
                <sgds-checkbox>Email notifications</sgds-checkbox>
                <sgds-checkbox>SMS alerts</sgds-checkbox>
                <sgds-checkbox>In-app notifications</sgds-checkbox>
                <sgds-checkbox>Push notifications (mobile)</sgds-checkbox>
              </sgds-checkbox-group>
              <sgds-divider class="sgds:my-layout-md"></sgds-divider>
              <h6 class="sgds:text-subtitle-sm sgds:text-heading-default">Frequency</h6>
              <sgds-radio-group>
                <sgds-radio value="immediate">Immediate</sgds-radio>
                <sgds-radio value="daily">Daily digest</sgds-radio>
                <sgds-radio value="weekly">Weekly summary</sgds-radio>
              </sgds-radio-group>
              <div slot="footer" class="sgds:flex sgds:justify-end sgds:gap-sm">
                <sgds-button variant="ghost">Cancel</sgds-button>
                <sgds-button variant="primary">Save preferences</sgds-button>
              </div>
            </sgds-drawer>
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
          "Data Table",
          html`
            <sgds-data-table dataLength="2" itemsPerPage="5" currentPage="1" multiSelect>
              <sgds-data-table-row>
                <sgds-data-table-head>Name</sgds-data-table-head>
                <sgds-data-table-head>Email</sgds-data-table-head>
                <sgds-data-table-head>Role</sgds-data-table-head>
              </sgds-data-table-row>
              <sgds-data-table-row expand>
                <sgds-data-table-cell>John Doe</sgds-data-table-cell>
                <sgds-data-table-cell>john@example.com</sgds-data-table-cell>
                <sgds-data-table-cell>Admin</sgds-data-table-cell>
                <span slot="content">Additional details for John Doe.</span>
              </sgds-data-table-row>
              <sgds-data-table-row expand>
                <sgds-data-table-cell>Jane Smith</sgds-data-table-cell>
                <sgds-data-table-cell>jane@example.com</sgds-data-table-cell>
                <sgds-data-table-cell>Editor</sgds-data-table-cell>
                <span slot="content">Additional details for Jane Smith.</span>
              </sgds-data-table-row>
            </sgds-data-table>
          `
        )}
        ${ComponentSection(
          "Table",
          html`
            <sgds-table tableBorder>
              <sgds-table-row>
                <sgds-table-head>Name</sgds-table-head>
                <sgds-table-head>Email</sgds-table-head>
                <sgds-table-head>Role</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell>John Doe</sgds-table-cell>
                <sgds-table-cell>john@example.com</sgds-table-cell>
                <sgds-table-cell>Admin</sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell>Jane Smith</sgds-table-cell>
                <sgds-table-cell>jane@example.com</sgds-table-cell>
                <sgds-table-cell>Editor</sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          `
        )}
        ${ComponentSection(
          "Select",
          html`
            <sgds-select label="Choose a role" placeholder="Select a role">
              <sgds-select-option value="admin">Administrator</sgds-select-option>
              <sgds-select-option value="editor">Editor</sgds-select-option>
              <sgds-select-option value="viewer">Viewer</sgds-select-option>
            </sgds-select>
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
          "Overflow Menu",
          html`
            <sgds-overflow-menu>
              <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
              <sgds-dropdown-item ariaLabel="Duplicate">Duplicate</sgds-dropdown-item>
              <sgds-dropdown-item ariaLabel="Delete">Delete</sgds-dropdown-item>
            </sgds-overflow-menu>
          `
        )}
        ${ComponentSection(
          "Combo Box",
          html`
            <div>
              <sgds-combo-box label="Search options" placeholder="Search for a fruit">
                <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
                <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
                <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
          `
        )}
        ${ComponentSection(
          "System Banner",
          html`
            <sgds-system-banner show>
              <sgds-system-banner-item>
                <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
                This is a system-wide notification using density tokens for padding.
              </sgds-system-banner-item>
            </sgds-system-banner>
          `
        )}
        ${ComponentSection(
          "Table of Contents",
          html`
            <sgds-table-of-contents>
              <h5>Contents</h5>
              <li slot="contents">
                <sgds-link size="sm"><a href="#section-1">Section 1</a></sgds-link>
              </li>
              <li slot="contents">
                <sgds-link size="sm"><a href="#section-2">Section 2</a></sgds-link>
              </li>
              <li slot="contents">
                <sgds-link size="sm"><a href="#section-3">Section 3</a></sgds-link>
              </li>
            </sgds-table-of-contents>
          `
        )}

        <h5
          class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-4"
        >
          Footer
        </h5>
      `)}

      <sgds-footer contactHref="#" feedbackHref="#" privacyHref="#" termsOfUseHref="#">
        <span slot="title">Footer Title</span>
        <span slot="description">A brief description of the site or service.</span>
        <sgds-footer-item slot="items">
          <span slot="title">Column 1</span>
          <sgds-link><a href="#">Link 1</a></sgds-link>
          <sgds-link><a href="#">Link 2</a></sgds-link>
        </sgds-footer-item>
        <sgds-footer-item slot="items">
          <span slot="title">Column 2</span>
          <sgds-link><a href="#">Link 3</a></sgds-link>
          <sgds-link><a href="#">Link 4</a></sgds-link>
        </sgds-footer-item>
      </sgds-footer>
    `;
  },
  name: "Density",
  args: {
    density: "default"
  },
  argTypes: {
    density: {
      control: "select",
      options: ["default", "compact", "spacious"],
      name: "Density",
      table: { defaultValue: { summary: "default" } }
    }
  },
  parameters: storyParams
};
