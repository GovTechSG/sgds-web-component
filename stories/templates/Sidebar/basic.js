import { html } from "lit";

export const Template = args => html`
  <div class="sgds:h-175">
    <sgds-sidebar active=${args.active} ?collapsed=${args.collapsed} ?scrim=${args.scrim}>
      <div slot="upper">SGDS Sidebar</div>

      <!-- Main Navigation Section -->
      <sgds-sidebar-section title="Main" name="main" ?collapsible=${false}>
        <sgds-sidebar-group title="Dashboard" name="dashboard">
          <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
          <sgds-sidebar-group title="Summary" name="summary">
            <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-item title="Latest Sales" name="latest-sales">
              <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
              <a href="#"></a>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Refunds" name="refunds">
              <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-group>

          <sgds-sidebar-item title="Meetings" name="meetings">
            <sgds-icon name="calendar" slot="leadingIcon"></sgds-icon>
            <a href="#"></a>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Gallery" name="gallery">
            <sgds-icon name="camera" slot="leadingIcon"></sgds-icon>
            <a href="#"></a>
          </sgds-sidebar-item>
        </sgds-sidebar-group>

        <sgds-sidebar-group title="Reports" name="reports">
          <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
          <sgds-icon name="placeholder" slot="trailingIcon"></sgds-icon>

          <sgds-sidebar-item title="Yearly" name="yearly">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Monthly" name="monthly">
            <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar-group>

        <sgds-sidebar-item title="Public Members" name="public-members">
          <sgds-icon name="user-circle" slot="leadingIcon"></sgds-icon>
          <sgds-icon name="summary" slot="trailingIcon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>

      <!-- Configuration Section (Collapsible) -->
      <sgds-sidebar-section title="Configuration" name="configuration" collapsible seperator>
        <sgds-sidebar-item title="Settings" name="settings">
          <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>

      <!-- Support Section -->
      <sgds-sidebar-section>
        <sgds-sidebar-item title="Help & Support" name="help-support">
          <sgds-icon name="question-circle" slot="leadingIcon"></sgds-icon>
          <span
            slot="trailingIcon"
            class="sgds:bg-error-default sgds:text-fixed-light sgds:rounded-full sgds:w-5 sgds:h-5 sgds:flex sgds:items-center sgds:justify-center sgds:text-xs sgds:font-semibold"
            >3</span
          >
        </sgds-sidebar-item>
      </sgds-sidebar-section>

      <sgds-sidebar-section slot="lower">
        <sgds-sidebar-item title="Premium Features" name="premium-features">
          <sgds-icon name="star" slot="leadingIcon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-section>
    </sgds-sidebar>
  </div>
`;

export const args = {
  active: "meetings",
  collapsed: false,
  scrim: true
};

export const parameters = {
  layout: "fullscreen",
  docs: {
    story: {
      inline: false,
      height: 700
    }
  }
};

export const play = undefined;
