import { html } from "lit";

const Template = () => html`
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

  <script>
    function syncTogglerIcon() {
      const sidebar = document.querySelector("sgds-sidebar");
      const btn = document.querySelector("[data-sidebar-toggler]");
      if (sidebar && btn) {
        btn.name = sidebar.collapsed ? "menu" : "cross";
      }
    }

    function handleSidebarToggle() {
      const sidebar = document.querySelector("sgds-sidebar");
      sidebar.toggleCollapsed();
      syncTogglerIcon();
    }

    document.addEventListener("DOMContentLoaded", () => {
      const sidebar = document.querySelector("sgds-sidebar");
      if (sidebar) {
        new MutationObserver(() => syncTogglerIcon()).observe(sidebar, {
          attributes: true,
          attributeFilter: ["collapsed"]
        });
      }
    });
  </script>

  <div class="sgds:h-screen sgds:flex sgds:flex-col sgds:overflow-hidden">
    <!-- Appnav top bar -->
    <div class="sgds:flex-none">
      <sgds-appnav tone="gradient-3">
        <sgds-icon-button
          name="cross"
          slot="start"
          variant="ghost"
          tone="fixed-light"
          size="sm"
          ariaLabel="Open side menu"
          data-sidebar-toggler="true"
          onclick="handleSidebarToggle()"
        ></sgds-icon-button>
        <img alt="sgds logo" width="130" src="/logo-white.svg" slot="brand" />
        <sgds-icon-button name="moon" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Toggle dark mode"></sgds-icon-button>
        <sgds-icon-button name="bell" variant="ghost" tone="fixed-light" size="sm" ariaLabel="Notifications"></sgds-icon-button>
        <sgds-appnav-profile slot="profile" label="User Name" secondaryText="Agency (admin)" ariaLabel="Profile menu" close="outside">
          <span slot="avatar" class="sgds:h-10 sgds:w-10 sgds:shrink-0 sgds:overflow-hidden sgds:rounded-full">
            <span
              class="sgds:h-full sgds:w-full sgds:block sgds:bg-neutral-surface-muted sgds:rounded-[50%]"
              style="border-radius: 50%;"
            ></span>
          </span>
          <sgds-dropdown-item readonly>
            <div class="sgds:flex sgds:flex-col sgds:gap-4">
              <span class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal sgds:text-subtle">Account</span>
              <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:py-1">
                <span class="sgds:h-12 sgds:w-12 sgds:shrink-0 sgds:rounded-full sgds:bg-neutral-surface-muted"></span>
                <div class="sgds:flex sgds:flex-col sgds:justify-center">
                  <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">User Name</span>
                  <span class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">user@agency.gov.sg</span>
                </div>
              </div>
            </div>
          </sgds-dropdown-item>
          <sgds-divider thickness="thin"></sgds-divider>
          <sgds-dropdown-item ariaLabel="My profile">
            <span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">My profile</span>
          </sgds-dropdown-item>
          <sgds-dropdown-item ariaLabel="Settings">
            <span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Settings</span>
          </sgds-dropdown-item>
          <sgds-dropdown-item ariaLabel="Log out">
            <span class="sgds:block sgds:w-62 sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default">Log out</span>
          </sgds-dropdown-item>
        </sgds-appnav-profile>
      </sgds-appnav>
    </div>

    <!-- Body with overlay sidebar + content -->
    <div class="sgds:flex sgds:flex-row sgds:flex-1 sgds:overflow-hidden sgds:relative">
      <sgds-sidebar variant="overlay" active="dashboard" scrim>
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
      <div class="sgds:flex sgds:flex-col sgds:flex-1 sgds:overflow-y-auto">
        <div class="sgds-container sgds:py-layout-md sgds:flex sgds:flex-col sgds:flex-1">
          <div class="content-placeholder sgds:border sgds:border-muted sgds:flex-1"></div>
        </div>
        <sgds-footer tone="neutral"></sgds-footer>
      </div>
    </div>
  </div>
`;

export default {
  title: "Templates/Application Shell/Operational",
  tags: ["!autodocs"],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    layout: "fullscreen"
  }
};

export const OperationalAppShell = {
  render: Template.bind({}),
  name: "Operational"
};
