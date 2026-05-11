import { html } from "lit";

export default {
  title: "Layouts/Full Width/Aside Left"
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
      <div class="sgds-container sgds:py-layout-md">
        <div class="sgds-grid sgds:gap-layout-md sgds:items-stretch">
          <aside
            class="content-placeholder sgds:border sgds:border-muted sgds-col-4 sgds-col-sm-8 sgds-col-lg-4"
          ></aside>
          <div class="content-placeholder sgds:border sgds:border-muted sgds-col-8 sgds-col-sm-8 sgds-col-lg-8"></div>
        </div>
      </div>
    </main>
    <sgds-footer></sgds-footer>
  </div>
`;

export const AsideLeft = {
  render: Template.bind({}),
  name: "Aside Left",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
