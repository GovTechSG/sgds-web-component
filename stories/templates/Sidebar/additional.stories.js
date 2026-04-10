import { html } from "lit";

const BasicTemplate = args => html`
  <div class="sgds:h-110">
    <sgds-sidebar active=${args.active} ?collapsed=${args.collapsed} ?scrim=${args.scrim} ?overlay=${args.overlay}>
      <sgds-sidebar-section title="Navigation" name="navigation" ?collapsible=${false}>
        <sgds-sidebar-item title="Dashboard" name="dashboard">
          <sgds-icon name="house" slot="leading-icon"></sgds-icon>
          <sgds-icon name="placeholder" slot="trailing-icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Analytics" name="analytics">
          <sgds-icon name="trend-up" slot="leading-icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Reports" name="reports">
          <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
          <sgds-icon name="placeholder" slot="trailing-icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>

      <sgds-sidebar-section title="Settings" name="settings" collapsible>
        <sgds-sidebar-item title="Account" name="account">
          <sgds-icon name="user-circle" slot="leading-icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Preferences" name="preferences">
          <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
  </div>
`;

const MultiLevelTemplate = args => html`
  <div class="sgds:h-110">
    <sgds-sidebar active=${args.active} ?collapsed=${args.collapsed} ?scrim=${args.scrim} ?overlay=${args.overlay}>
      <sgds-sidebar-section title="Navigation" name="navigation" ?collapsible=${false}>
        <!-- Level 1: Dashboard Group -->
        <sgds-sidebar-group title="Dashboard" name="dashboard">
          <sgds-icon name="house" slot="leading-icon"></sgds-icon>
          <!-- Level 2: Summary Group -->
          <sgds-sidebar-group title="Summary" name="summary">
            <sgds-icon name="building" slot="leading-icon"></sgds-icon>
            <!-- Level 3: Items under Summary -->
            <sgds-sidebar-item title="Latest Sales" name="latest-sales">
              <sgds-icon name="trending-up" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Refunds" name="refunds">
              <sgds-icon name="trending-down" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-group>
          <!-- Level 2: Item -->
          <sgds-sidebar-item title="Meetings" name="meetings">
            <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Gallery" name="gallery">
            <sgds-icon name="image" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar-group>

        <!-- Level 1: Reports Group -->
        <sgds-sidebar-group title="Reports" name="reports">
          <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
          <!-- Level 2: Report Items -->
          <sgds-sidebar-item title="Yearly" name="yearly">
            <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Monthly" name="monthly">
            <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar-group>

        <!-- Level 1: Item -->
        <sgds-sidebar-item title="Members" name="members">
          <sgds-icon name="users" slot="leading-icon"></sgds-icon>
          <sgds-icon name="placeholder" slot="trailing-icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>

      <sgds-sidebar-section title="Settings" name="settings" collapsible>
        <sgds-sidebar-item title="Preferences" name="preferences">
          <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
  </div>
`;

const OverlayTemplate = args => html`
  <div class="sgds:h-110">
    <div class="sgds:bg-surface-raised sgds:p-xs">
      <sgds-icon-button
        data-sidebar-toggler="true"
        size="xs"
        variant="ghost"
        name="sidebar-expand"
        onclick="handleToggle()"
      ></sgds-icon-button>
    </div>

    <div class="sgds:relative sgds:bg-white sgds:h-full">
      <sgds-sidebar overlay ?scrim=${args.scrim} ?collapsed=${args.collapsed} active=${args.active}>
        <div slot="top" class="sgds:font-semibold">Navigation</div>

        <sgds-sidebar-section title="Main" name="main" ?collapsible=${false}>
          <sgds-sidebar-item title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>

          <sgds-sidebar-item title="Analytics" name="analytics">
            <sgds-icon name="trend-up" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>

          <!-- Level 1: Reports Group -->
          <sgds-sidebar-group title="Reports" name="reports">
            <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
            <!-- Level 2: Report Items -->
            <sgds-sidebar-item title="Yearly" name="yearly">
              <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Monthly" name="monthly">
              <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar-section>

        <sgds-sidebar-section title="Settings" name="settings" collapsible>
          <sgds-sidebar-item title="Account" name="account">
            <sgds-icon name="user-circle" slot="leading-icon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar-section>
      </sgds-sidebar>

      <div class="sgds:p-8 sgds:text-default">
        <p>Click "Toggle Sidebar" to open the overlay navigation panel.</p>
      </div>
    </div>

    <script>
      function handleToggle() {
        const sidebar = document.querySelector("sgds-sidebar");
        if (sidebar) {
          sidebar.toggleCollapsed();
        }
      }
    </script>
  </div>
`;

const DynamicTemplate = args => {
  let activeItem = args.active;

  const handleSetActive = itemName => {
    activeItem = itemName;
    const sidebar = document.querySelector("sgds-sidebar");
    if (sidebar) {
      sidebar.active = itemName;
    }
  };

  return html`
    <div class="sgds:h-110 sgds:flex sgds:flex-col">
      <div class="sgds:bg-surface-raised sgds:p-4 sgds:flex sgds:gap-2">
        <sgds-button size="xs" variant="outline" @click=${() => handleSetActive("dashboard")}> Dashboard </sgds-button>
        <sgds-button size="xs" variant="outline" @click=${() => handleSetActive("analytics")}> Analytics </sgds-button>
        <sgds-button size="xs" variant="outline" @click=${() => handleSetActive("reports")}> Reports </sgds-button>
      </div>

      <div class="sgds:flex-1 sgds:overflow-auto">
        <sgds-sidebar active=${activeItem} ?collapsed=${args.collapsed} ?scrim=${args.scrim} ?overlay=${args.overlay}>
          <sgds-sidebar-section title="Navigation" name="navigation" ?collapsible=${false}>
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Analytics" name="analytics">
              <sgds-icon name="trend-up" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Reports" name="reports">
              <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>

          <sgds-sidebar-section title="Settings" name="settings" collapsible>
            <sgds-sidebar-item title="Account" name="account">
              <sgds-icon name="user-circle" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      </div>
    </div>
  `;
};

const LinkedItemsTemplate = args => html`
  <div class="sgds:h-110">
    <sgds-sidebar active=${args.active} ?collapsed=${args.collapsed} ?scrim=${args.scrim} ?overlay=${args.overlay}>
      <sgds-sidebar-section title="Navigation" name="navigation" ?collapsible=${false}>
        <sgds-sidebar-item title="Dashboard" name="dashboard">
          <sgds-icon name="house" slot="leading-icon"></sgds-icon>
          <a href="/dashboard"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Analytics" name="analytics">
          <sgds-icon name="trend-up" slot="leading-icon"></sgds-icon>
          <a href="/analytics"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Reports" name="reports">
          <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
          <a href="/reports"></a>
        </sgds-sidebar-item>
      </sgds-sidebar-section>

      <sgds-sidebar-section title="Settings" name="settings" collapsible>
        <sgds-sidebar-item title="Account" name="account">
          <sgds-icon name="user-circle" slot="leading-icon"></sgds-icon>
          <a href="/account"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Preferences" name="preferences">
          <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
          <a href="/preferences"></a>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
  </div>
`;

export const Default = {
  render: BasicTemplate.bind({}),
  name: "Level 1",
  args: {
    active: "dashboard",
    collapsed: false,
    scrim: false,
    overlay: false
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: 440
      }
    }
  }
};

export const MultiLevel = {
  render: MultiLevelTemplate.bind({}),
  name: "Level 1-3 Navigation",
  args: {
    active: "latest-sales",
    collapsed: false,
    scrim: false,
    overlay: false
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: 440
      }
    }
  }
};

export const Overlay = {
  render: OverlayTemplate.bind({}),
  name: "Overlay Sidebar",
  args: {
    scrim: true,
    collapsed: true,
    active: "dashboard"
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: 440
      }
    },
    argTypes: {
      attributes: true
    }
  }
};

export const Dynamic = {
  render: DynamicTemplate.bind({}),
  name: "Dynamic Active State",
  args: {
    active: "dashboard",
    collapsed: false,
    scrim: false,
    overlay: false
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: 440
      }
    }
  }
};

export const LinkedItems = {
  render: LinkedItemsTemplate.bind({}),
  name: "Linked Items",
  args: {
    active: "dashboard",
    collapsed: false,
    scrim: false,
    overlay: false
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: 440
      }
    }
  },
  tags: ["!dev"]
};
