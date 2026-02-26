import { html } from "lit";

const Level0OnlyTemplate = args => html`
  <sgds-sidebar>
    <sgds-sidebar-item title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Analytics" name="analytics">
      <sgds-icon name="speedometer" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Reports" name="reports">
      <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Settings" name="settings">
      <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar>
`;

const Level0Level1Template = args => html`
  <sgds-sidebar>
    <sgds-sidebar-group title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-item title="Summary" name="summary">
        <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Meetings" name="meetings">
        <sgds-icon name="calendar" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-group title="Reports" name="reports">
      <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-item title="Sales Report" name="sales-report">
        <sgds-icon name="trend-up" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Revenue Report" name="revenue-report">
        <sgds-icon name="trend-up" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Settings" name="settings">
      <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar>
`;

const Level0Level1Level2Template = args => html`
  <sgds-sidebar>
    <sgds-sidebar-group title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-group title="Sales" name="sales">
        <sgds-icon name="trend-up" slot="leadingIcon"></sgds-icon>
        <sgds-sidebar-item title="By Region" name="by-region">
          <sgds-icon name="geo" slot="leadingIcon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="By Product" name="by-product">
          <sgds-icon name="box-seam" slot="leadingIcon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-group>
      <sgds-sidebar-item title="Revenue" name="revenue">
        <sgds-icon name="trend-up" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Settings" name="settings">
      <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar>
`;

const CollapsedStateTemplate = args => html`
  <sgds-sidebar ?collapsed=${true}>
    <sgds-sidebar-group title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-item title="Summary" name="summary">
        <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Reports" name="reports">
      <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Settings" name="settings">
      <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar>
`;

const WithSectionsTemplate = args => html`
  <sgds-sidebar>
    <sgds-sidebar-section title="Main" name="main" ?collapsible=${false}>
      <sgds-sidebar-item title="Dashboard" name="dashboard">
        <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Analytics" name="analytics">
        <sgds-icon name="trend-up" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Organization" name="organization" collapsible>
      <sgds-sidebar-group title="Team Management" name="team">
        <sgds-icon name="users" slot="leadingIcon"></sgds-icon>
        <sgds-sidebar-item title="Members" name="members">
          <sgds-icon name="person" slot="leadingIcon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Roles" name="roles">
          <sgds-icon name="lock" slot="leadingIcon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-group>
      <sgds-sidebar-item title="Projects" name="projects">
        <sgds-icon name="layers" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Configuration" name="configuration" collapsible>
      <sgds-sidebar-item title="Settings" name="settings">
        <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-section>
  </sgds-sidebar>
`;

const ActiveStateTemplate = args => html`
  <sgds-sidebar active="sales-report">
    <sgds-sidebar-group title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-item title="Summary" name="summary">
        <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-group title="Reports" name="reports">
      <sgds-icon name="file-text" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-item title="Sales Report" name="sales-report">
        <sgds-icon name="building" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Revenue Report" name="revenue-report">
        <sgds-icon name="trend-up" slot="leadingIcon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>
    <sgds-sidebar-item title="Settings" name="settings">
      <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar>
`;

const LinkNavigationTemplate = args => html`
  <sgds-sidebar active="profile">
    <sgds-sidebar-item title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leadingIcon"></sgds-icon>
      <a href="#"></a>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Profile" name="profile">
      <sgds-icon name="person" slot="leadingIcon"></sgds-icon>
      <a href="#"></a>
    </sgds-sidebar-item>
    <sgds-sidebar-group title="Settings" name="settings">
      <sgds-icon name="gear" slot="leadingIcon"></sgds-icon>
      <sgds-sidebar-item title="Account" name="account">
        <sgds-icon name="user-circle" slot="leadingIcon"></sgds-icon>
        <a href="#"></a>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Preferences" name="preferences">
        <sgds-icon name="sliders" slot="leadingIcon"></sgds-icon>
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
