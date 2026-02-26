import { html } from "lit";

export const Template = args => html`
  <sgds-sidebar active=${args.active} ?collapsed=${args.collapsed}>
    <div slot="brandName">SGDS Sidebar</div>

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

    <!-- Organization Section (Collapsible) -->
    <sgds-sidebar-section title="Organization" name="organization" collapsible>
      <sgds-sidebar-item title="Team Management" name="team-management">
        <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>

      <sgds-sidebar-item title="Projects" name="projects">
        <sgds-icon name="layers" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-section>

    <!-- Configuration Section (Collapsible) -->
    <sgds-sidebar-section title="Configuration" name="configuration" collapsible>
      <sgds-sidebar-item title="Settings" name="settings">
        <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-section>

    <!-- Support Section -->
    <sgds-sidebar-item title="Help & Support" name="help-support">
      <sgds-icon name="question-circle" slot="leadingIcon"></sgds-icon>
      <span
        slot="trailingIcon"
        style="
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
        "
        >3</span
      >
    </sgds-sidebar-item>

    <sgds-sidebar-item title="Premium Features" name="premium-features">
      <sgds-icon name="star" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar>
`;

export const args = {
  active: "meetings",
  collapsed: false
};

export const parameters = {};
