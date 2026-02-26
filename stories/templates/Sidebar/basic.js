import { html } from "lit";

export const Template = args => html`
  <sgds-sidebar active=${args.active} ?collapsed=${args.collapsed}>
    <div slot="brandName">SGDS Sidebar</div>
    <!-- Main Navigation Section -->
    <sgds-sidebar-section title="Main" name="main" collapsible>
      <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
        <sgds-icon name="placeholder" slot="trailingIcon"></sgds-icon>
        <sgds-sidebar-group title="Summary" name="summary" icon="building">
          <sgds-sidebar-item title="Latest Sales" name="latest-sales">
            <a href="#"></a>
          </sgds-sidebar-item>
          <sgds-sidebar-item title="Refunds" name="refunds"> </sgds-sidebar-item>
        </sgds-sidebar-group>

        <sgds-sidebar-item title="Meetings" name="meetings" icon="calendar">
          <a href="#"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Gallery" name="gallery" icon="camera">
          <a href="#"></a>
        </sgds-sidebar-item>
      </sgds-sidebar-group>

      <sgds-sidebar-item title="Team Management" name="team-management-2" icon="users"> </sgds-sidebar-item>

      <sgds-sidebar-group title="Reports" name="reports-1" icon="file-text">
        <sgds-sidebar-item title="Yearly" name="yearly-1" icon="house">
          <a href="#"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Monthly" name="monthly-1" icon="house">
          <a href="#"></a>
        </sgds-sidebar-item>
      </sgds-sidebar-group>
    </sgds-sidebar-section>

    <!-- Organization Section (Collapsible) -->
    <sgds-sidebar-section title="Organization" name="organization">
      <sgds-sidebar-item title="Team Management" name="team-management" icon="users">
        <a href="#"></a>
      </sgds-sidebar-item>

      <sgds-sidebar-item title="Projects" name="projects" icon="layers">
        <a href="#"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-section>

    <!-- Configuration Section (Collapsible) -->
    <sgds-sidebar-section title="Configuration" name="configuration" collapsible>
      <sgds-sidebar-item title="Settings" name="settings" icon="gear"> </sgds-sidebar-item>
    </sgds-sidebar-section>

    <!-- Support Section -->
    <sgds-sidebar-section title="Support" name="support" collapsible ?collapsed=${true}>
      <sgds-sidebar-item title="Help & Support" name="help-support" icon="question-circle"> </sgds-sidebar-item>

      <sgds-sidebar-item title="Premium Features" name="premium-features" icon="star" disabled> </sgds-sidebar-item>
    </sgds-sidebar-section>
  </sgds-sidebar>
`;

export const args = {
  active: "team-management",
  collapsed: false
};

export const parameters = {};
