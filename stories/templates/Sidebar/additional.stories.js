import { html } from "lit";

const Level0OnlyTemplate = args => html`
  <sgds-sidebar>
    <sgds-sidebar-option title="Dashboard" icon="house"></sgds-sidebar-option>
    <sgds-sidebar-option title="Analytics" icon="bar-chart"></sgds-sidebar-option>
    <sgds-sidebar-option title="Reports" icon="file-text"></sgds-sidebar-option>
    <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
  </sgds-sidebar>
`;

const Level0Level1Template = args => html`
  <sgds-sidebar>
    <sgds-sidebar-option title="Dashboard" icon="house">
      <sgds-sidebar-option title="Summary" icon="building"></sgds-sidebar-option>
      <sgds-sidebar-option title="Meetings" icon="calendar"></sgds-sidebar-option>
    </sgds-sidebar-option>
    <sgds-sidebar-option title="Reports" icon="file-text">
      <sgds-sidebar-option title="Sales Report" icon="chart"></sgds-sidebar-option>
      <sgds-sidebar-option title="Revenue Report" icon="trending-up"></sgds-sidebar-option>
    </sgds-sidebar-option>
    <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
  </sgds-sidebar>
`;

const Level0Level1Level2Template = args => html`
  <sgds-sidebar>
    <sgds-sidebar-option title="Dashboard" icon="house">
      <sgds-sidebar-option title="Sales" icon="chart">
        <sgds-sidebar-option title="By Region" icon="geo"></sgds-sidebar-option>
        <sgds-sidebar-option title="By Product" icon="box-seam"></sgds-sidebar-option>
      </sgds-sidebar-option>
      <sgds-sidebar-option title="Revenue" icon="trending-up"></sgds-sidebar-option>
    </sgds-sidebar-option>
    <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
  </sgds-sidebar>
`;

const CollapsedStateTemplate = args => html`
  <sgds-sidebar ?collapsed=${true}>
    <sgds-sidebar-option title="Dashboard" icon="house">
      <sgds-sidebar-option title="Summary" icon="building"></sgds-sidebar-option>
    </sgds-sidebar-option>
    <sgds-sidebar-option title="Reports" icon="file-text"></sgds-sidebar-option>
    <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
  </sgds-sidebar>
`;

const WithSectionsTemplate = args => html`
  <sgds-sidebar>
    <sgds-sidebar-section title="Main" expanded collapsible>
      <sgds-sidebar-option title="Dashboard" icon="house"></sgds-sidebar-option>
      <sgds-sidebar-option title="Analytics" icon="bar-chart"></sgds-sidebar-option>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Organization" expanded collapsible>
      <sgds-sidebar-option title="Team Management" icon="users"></sgds-sidebar-option>
      <sgds-sidebar-option title="Projects" icon="layers"></sgds-sidebar-option>
    </sgds-sidebar-section>
    <sgds-sidebar-section title="Configuration" expanded collapsible>
      <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
    </sgds-sidebar-section>
  </sgds-sidebar>
`;

const ActiveStateTemplate = args => html`
  <sgds-sidebar active="sales-report">
    <sgds-sidebar-option title="Dashboard" icon="house">
      <sgds-sidebar-option title="Summary" icon="building"></sgds-sidebar-option>
    </sgds-sidebar-option>
    <sgds-sidebar-option title="Reports" icon="file-text">
      <sgds-sidebar-option title="Sales Report" name="sales-report" icon="chart"></sgds-sidebar-option>
      <sgds-sidebar-option title="Revenue Report" icon="trending-up"></sgds-sidebar-option>
    </sgds-sidebar-option>
    <sgds-sidebar-option title="Settings" icon="gear"></sgds-sidebar-option>
  </sgds-sidebar>
`;

export const Level0Only = {
  render: Level0OnlyTemplate.bind({}),
  name: "Level 0 - Top level options only",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Level0Level1 = {
  render: Level0Level1Template.bind({}),
  name: "Level 0 to Level 1 - Nested options",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Level0Level1Level2 = {
  render: Level0Level1Level2Template.bind({}),
  name: "Level 0 to Level 2 - Double nested options",
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
