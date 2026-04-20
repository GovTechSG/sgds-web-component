import { html } from "lit";

export default {
  title: "Templates/App layout with sidebar"
};

const Template = () => {
  return html`
    <div class="sgds:h-screen sgds:flex sgds:flex-col sgds:overflow-hidden">
      <div class="sgds:flex-none">
        <sgds-masthead fluid></sgds-masthead>
        <sgds-mainnav fluid>
          <strong slot="brand">SGDS</strong>
          <sgds-mainnav-item>
            <a href="#">About</a>
          </sgds-mainnav-item>
          <strong slot="end">End</strong>
        </sgds-mainnav>
      </div>
      <div class="sgds:flex sgds:flex-row sgds:flex-1 sgds:overflow-hidden">
        <sgds-sidebar active="meetings" scrim="" class="sgds:flex-none sgds:h-full">
          <div slot="upper">SGDS Sidebar</div>

          <!-- Main Navigation Section -->
          <sgds-sidebar-section title="Main" name="main">
            <sgds-sidebar-group title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="icon"></sgds-icon>
              <sgds-sidebar-group title="Summary" name="summary">
                <sgds-icon name="building" slot="icon"></sgds-icon>
                <sgds-sidebar-item title="Latest Sales" name="latest-sales">
                  <sgds-icon name="building" slot="icon"></sgds-icon>
                  <a href="#"></a>
                </sgds-sidebar-item>
                <sgds-sidebar-item title="Refunds" name="refunds">
                  <sgds-icon name="building" slot="icon"></sgds-icon>
                </sgds-sidebar-item>
              </sgds-sidebar-group>

              <sgds-sidebar-item title="Meetings" name="meetings">
                <sgds-icon name="calendar" slot="icon"></sgds-icon>
                <a href="#"></a>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Gallery" name="gallery">
                <sgds-icon name="camera" slot="icon"></sgds-icon>
                <a href="#"></a>
              </sgds-sidebar-item>
            </sgds-sidebar-group>

            <sgds-sidebar-group title="Reports" name="reports">
              <sgds-icon name="file-text" slot="icon"></sgds-icon>
              <sgds-icon name="placeholder" slot="indicator"></sgds-icon>

              <sgds-sidebar-item title="Yearly" name="yearly">
                <sgds-icon name="house" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
              <sgds-sidebar-item title="Monthly" name="monthly">
                <sgds-icon name="house" slot="icon"></sgds-icon>
              </sgds-sidebar-item>
            </sgds-sidebar-group>

            <sgds-sidebar-item title="Public Members" name="public-members">
              <sgds-icon name="user-circle" slot="icon"></sgds-icon>
              <sgds-icon name="summary" slot="indicator"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>

          <!-- Configuration Section (Collapsible) -->
          <sgds-sidebar-section title="Configuration" name="configuration" collapsible="" separator="">
            <sgds-sidebar-item title="Settings" name="settings">
              <sgds-icon name="gear" slot="icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>

          <!-- Support Section -->
          <sgds-sidebar-section>
            <sgds-sidebar-item title="Help &amp; Support" name="help-support">
              <sgds-icon name="question-circle" slot="icon"></sgds-icon>
              <span
                slot="indicator"
                class="sgds:bg-error-default sgds:text-fixed-light sgds:rounded-full sgds:w-5 sgds:h-5 sgds:flex sgds:items-center sgds:justify-center sgds:text-xs sgds:font-semibold"
                >3</span
              >
            </sgds-sidebar-item>
          </sgds-sidebar-section>

          <sgds-sidebar-section slot="lower">
            <sgds-sidebar-item title="Premium Features" name="premium-features">
              <sgds-icon name="star" slot="icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
        <div class="sgds:flex sgds:flex-col sgds:flex-1 sgds:overflow-y-auto">
          <div class="sgds-container-sidebar sgds:py-layout-md">
            <div id="content" class="sgds:h-250 sgds:w-full">Place content here</div>
          </div>
          <sgds-footer></sgds-footer>
        </div>
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
