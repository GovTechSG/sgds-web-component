import { html } from "lit";

export default {
  parameters: { controls: { disable: true }, actions: { disable: true }, interactions: { disable: true } },
  title: "Layouts/With Sidebar/Split"
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
    .sidebar-toggler-bar {
      display: none;
    }
    @media screen and (max-width: 767px) {
      .sidebar-toggler-bar {
        display: block;
      }
    }
  </style>
`;

const sidebarNav = html`
  <sgds-sidebar active="dashboard">
    <div slot="brandName">My App</div>
    <sgds-sidebar-section title="Workspace" name="workspace">
      <sgds-sidebar-item name="dashboard" title="Dashboard">
        <sgds-icon name="grid-fill" slot="icon" size="md"></sgds-icon>
        <a href="#"></a>
      </sgds-sidebar-item>
      <sgds-sidebar-item name="analytics" title="Analytics">
        <sgds-icon name="trend-up" slot="icon" size="md"></sgds-icon>
        <a href="#"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Manage" name="manage">
      <sgds-sidebar-item name="team" title="Team">
        <sgds-icon name="user-circle" slot="icon" size="md"></sgds-icon>
        <a href="#"></a>
      </sgds-sidebar-item>
      <sgds-sidebar-item name="settings" title="Settings">
        <sgds-icon name="laptop-gear" slot="icon" size="md"></sgds-icon>
        <a href="#"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-section>
  </sgds-sidebar>
`;

const Template = () => html`
  ${placeholderStyle}
  <div class="sgds:h-screen sgds:flex sgds:flex-col sgds:overflow-hidden">
    <div class="sgds:flex-none">
      <sgds-masthead fluid></sgds-masthead>
      <sgds-mainnav fluid>
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
      <div class="sidebar-toggler-bar sgds:border-b sgds:border-muted sgds:bg-default">
        <div class="sgds:py-md sgds:px-sm sgds:flex sgds:items-center">
          <sgds-icon-button
            data-sidebar-toggler="true"
            size="sm"
            tone="neutral"
            variant="ghost"
            name="sidebar-expand"
            @click=${() => document.querySelector("sgds-sidebar").toggleCollapsed()}
          ></sgds-icon-button>
        </div>
      </div>
    </div>
    <div class="sgds:flex sgds:flex-row sgds:flex-1 sgds:overflow-hidden sgds:relative">
      ${sidebarNav}
      <div class="sgds:flex sgds:flex-col sgds:flex-1 sgds:overflow-y-auto">
        <div class="sgds-container-sidebar sgds:py-layout-md sgds:flex-1">
          <div class="sgds:flex sgds:gap-layout-md">
            <div class="content-placeholder sgds:border sgds:border-muted sgds:flex-1"></div>
            <div class="content-placeholder sgds:border sgds:border-muted sgds:flex-1"></div>
          </div>
        </div>
        <sgds-footer tone="neutral" layout="sidebar"></sgds-footer>
      </div>
    </div>
  </div>
`;

export const SidebarSplit = {
  render: Template.bind({}),
  name: "Split",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
