import { html } from "lit";

export default {
  title: "Layouts/Full Width/Breadcrumb"
};

const placeholderStyle = html`
  <style>
    .content-placeholder {
      min-height: calc(100vh - 108px);
      background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 6px,
        var(--sgds-color-border-muted, #e5e7eb) 6px,
        var(--sgds-color-border-muted, #e5e7eb) 7px
      );
    }
  </style>
`;

const Template = () => html`
  ${placeholderStyle}
  <div>
    <sgds-masthead></sgds-masthead>
    <sgds-mainnav>
      <strong slot="brand">My App</strong>
      <sgds-mainnav-dropdown>
        <span slot="toggler">Workspace</span>
        <sgds-dropdown-item><a href="#">Dashboard</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Analytics</a></sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <sgds-mainnav-dropdown>
        <span slot="toggler">Manage</span>
        <sgds-dropdown-item><a href="#">Team</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Reports</a></sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <div slot="end">
        <sgds-button variant="primary" size="sm">New</sgds-button>
      </div>
    </sgds-mainnav>
  </div>
  <div class="sgds:flex sgds:flex-col">
    <main>
      <div class="sgds:border-b sgds:border-muted sgds:text-body-sm">
        <div class="sgds-container sgds:py-md">
          <sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Section</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item active><a href="#">Current Page</a></sgds-breadcrumb-item>
          </sgds-breadcrumb>
        </div>
      </div>
      <div class="sgds-container sgds:py-layout-md sgds:flex sgds:flex-col">
        <div class="content-placeholder sgds:border sgds:border-muted sgds:flex-1"></div>
      </div>
    </main>
    <sgds-footer></sgds-footer>
  </div>
`;

export const Breadcrumb = {
  render: Template.bind({}),
  name: "Breadcrumb",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
