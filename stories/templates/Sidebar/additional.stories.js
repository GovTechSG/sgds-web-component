import { html } from "lit";

const Level0OnlyTemplate = args => html`
  <sgds-sidebar>
    <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
    <sgds-sidebar-item title="Analytics" name="analytics" icon="speedometer"></sgds-sidebar-item>
    <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
    <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
  </sgds-sidebar>
`;

const Level0Level1Template = args => html`
  <sgds-sidebar>
    <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
      <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
      <sgds-sidebar-item title="Meetings" name="meetings" icon="calendar"></sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-group title="Reports" name="reports" icon="file-text">
      <sgds-sidebar-item title="Sales Report" name="sales-report" icon="trend-up"></sgds-sidebar-item>
      <sgds-sidebar-item title="Revenue Report" name="revenue-report" icon="trend-up"></sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
  </sgds-sidebar>
`;

const Level0Level1Level2Template = args => html`
  <sgds-sidebar>
    <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
      <sgds-sidebar-group title="Sales" name="sales" icon="trend-up">
        <sgds-sidebar-item title="By Region" name="by-region" icon="geo"></sgds-sidebar-item>
        <sgds-sidebar-item title="By Product" name="by-product" icon="box-seam"></sgds-sidebar-item>
      </sgds-sidebar-group>
      <sgds-sidebar-item title="Revenue" name="revenue" icon="trend-up"></sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
  </sgds-sidebar>
`;

const CollapsedStateTemplate = args => html`
  <sgds-sidebar ?collapsed=${true}>
    <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
      <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Reports" name="reports" icon="file-text"></sgds-sidebar-item>
    <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
  </sgds-sidebar>
`;

const WithSectionsTemplate = args => html`
  <sgds-sidebar>
    <sgds-sidebar-section title="Main" collapsible>
      <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house"></sgds-sidebar-item>
      <sgds-sidebar-item title="Analytics" name="analytics" icon="trend-up"></sgds-sidebar-item>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Organization" collapsible>
      <sgds-sidebar-group title="Team Management" name="team" icon="users">
        <sgds-sidebar-item title="Members" name="members" icon="person"></sgds-sidebar-item>
        <sgds-sidebar-item title="Roles" name="roles" icon="lock"></sgds-sidebar-item>
      </sgds-sidebar-group>
      <sgds-sidebar-item title="Projects" name="projects" icon="layers"></sgds-sidebar-item>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Configuration" collapsible>
      <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
    </sgds-sidebar-section>
  </sgds-sidebar>
`;

const ActiveStateTemplate = args => html`
  <sgds-sidebar active="sales-report">
    <sgds-sidebar-group title="Dashboard" name="dashboard" icon="house">
      <sgds-sidebar-item title="Summary" name="summary" icon="building"></sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-group title="Reports" name="reports" icon="file-text">
      <sgds-sidebar-item title="Sales Report" name="sales-report" icon="chart"></sgds-sidebar-item>
      <sgds-sidebar-item title="Revenue Report" name="revenue-report" icon="trending-up"></sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Settings" name="settings" icon="gear"></sgds-sidebar-item>
  </sgds-sidebar>
`;

const LinkNavigationTemplate = args => html`
  <sgds-sidebar active="profile">
    <sgds-sidebar-item title="Dashboard" name="dashboard" icon="house">
      <a href="#"></a>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Profile" name="profile" icon="person">
      <a href="#"></a>
    </sgds-sidebar-item>
    <sgds-sidebar-group title="Settings" name="settings" icon="gear">
      <sgds-sidebar-item title="Account" name="account" icon="user-circle">
        <a href="#"></a>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Preferences" name="preferences" icon="sliders">
        <a href="#"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
  </sgds-sidebar>
`;

export const Level0Only = {
  render: Level0OnlyTemplate.bind({}),
  name: "Level 0 - Top level items only",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Level0Level1 = {
  render: Level0Level1Template.bind({}),
  name: "Level 0 to Level 1 - With nested groups",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Level0Level1Level2 = {
  render: Level0Level1Level2Template.bind({}),
  name: "Level 0 to Level 2 - Double nested structure",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const CollapsedState = {
  render: CollapsedStateTemplate.bind({}),
  name: "Collapsed state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithSections = {
  render: WithSectionsTemplate.bind({}),
  name: "With sections",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ActiveState = {
  render: ActiveStateTemplate.bind({}),
  name: "Active state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const LinkNavigation = {
  render: LinkNavigationTemplate.bind({}),
  name: "Link navigation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
