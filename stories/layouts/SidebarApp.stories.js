import { html } from "lit";

export default {
  title: "Templates/App layout with sidebar"
};

const Template = () => {
  return html`
    <div class="sgds:sticky sgds:top-0 sgds:z-10">
      <sgds-masthead fluid></sgds-masthead>
      <sgds-mainnav fluid>
        <strong slot="brand">SGDS</strong>
        <strong slot="end">End</strong>
      </sgds-mainnav>
    </div>
    <div class="sgds:flex sgds:flex-row">
      <div class="sgds:sticky sgds:h-[calc(100vh-108px)] sgds:top-27 sgds:shrink-0">
        <div id="sidebar-component" class="sgds:w-full sgds:h-full">
          <sgds-sidebar active="team-management">
            <div slot="brandName">SGDS Sidebar</div>
            <!-- Main Navigation Section -->
            <sgds-sidebar-section title="Main" name="main" collapsible>
              <sgds-sidebar-group title="Dashboard" name="dashboard">
                <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
                <sgds-sidebar-group title="Summary" name="summary">
                  <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
                  <sgds-sidebar-item title="Latest Sales" name="latest-sales">
                    <a href="#"></a>
                  </sgds-sidebar-item>
                  <sgds-sidebar-item title="Refunds" name="refunds"> </sgds-sidebar-item>
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

              <sgds-sidebar-item title="Team Management" name="team-management-2">
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
              </sgds-sidebar-item>

              <sgds-sidebar-group title="Reports" name="reports-1">
                <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
                <sgds-sidebar-item title="Yearly" name="yearly-1">
                  <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Monthly" name="monthly-1">
                  <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-group>
            </sgds-sidebar-section>

            <!-- Organization Section (Collapsible) -->
            <sgds-sidebar-section title="Organization" name="organization">
              <sgds-sidebar-item title="Team Management" name="team-management" >
                <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
                 </sgds-sidebar-item>

              <sgds-sidebar-item title="Projects" name="projects" >
                <sgds-icon name="layers" slot="leadingIcon"></sgds-icon>
                 </sgds-sidebar-item>
            </sgds-sidebar-section>

            <!-- Configuration Section (Collapsible) -->
            <sgds-sidebar-section title="Configuration" name="configuration" collapsible>
              <sgds-sidebar-item title="Settings" name="settings" >
                <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
                 </sgds-sidebar-item>
            </sgds-sidebar-section>

            <!-- Support Section -->
            <sgds-sidebar-section title="Support" name="support">
              <sgds-sidebar-item title="Help & Support" name="help-support" icon=">
              <sgds-icon name-circle" slot="leadingIcon"></sgds-icon>
                 </sgds-sidebar-item>

              <sgds-sidebar-item title="Premium Features" name="premium-features" >
                <sgds-icon name="star" slot="leadingIcon"></sgds-icon>
                 </sgds-sidebar-item>
            </sgds-sidebar-section>
          </sgds-sidebar>
        </div>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:w-full">
        <div class="sgds-container-sidebar sgds:p-2-xl sgds:box-border">
          <div id="content" class="sgds:h-250 sgds:w-full">Place content here</div>
        </div>
        <sgds-footer></sgds-footer>
      </div>
    </div>
  `;
};
export const ApplicationLayoutWithSidebar = {
  render: Template.bind({}),
  name: "Application layout with sidebar",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
