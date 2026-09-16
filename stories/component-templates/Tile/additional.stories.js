import { html } from "lit";

const RadioGroupTemplate = () => html`
  <sgds-tile-group label="Select a plan" hintText="Choose one option" variant="radio" value="pro" name="radioTile">
    <sgds-tile value="basic">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Basic</span>
      <span slot="description">For individuals and small projects</span>
    </sgds-tile>
    <sgds-tile value="pro">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Pro</span>
      <span slot="description">For growing teams and businesses</span>
    </sgds-tile>
    <sgds-tile value="enterprise">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Enterprise</span>
      <span slot="description">For large organisations with advanced needs</span>
    </sgds-tile>
  </sgds-tile-group>
`;

const CheckboxGroupTemplate = () => html`
  <sgds-tile-group label="Select features" hintText="Choose all that apply" variant="checkbox" name="checkboxTile">
    <sgds-tile value="analytics">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Analytics</span>
      <span slot="description">Track and analyse your data</span>
    </sgds-tile>
    <sgds-tile value="reporting">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Reporting</span>
      <span slot="description">Generate detailed reports</span>
    </sgds-tile>
    <sgds-tile value="automation">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Automation</span>
      <span slot="description">Automate repetitive tasks</span>
    </sgds-tile>
  </sgds-tile-group>
`;

const StackedTemplate = () => html`
  <sgds-tile-group label="Select a category" variant="radio" name="stackedRadioTile">
    <div class="sgds:grid sgds:grid-cols-3 sgds:gap-component-md">
      <sgds-tile value="finance" stacked>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Finance</span>
        <span slot="description">Financial services and banking</span>
      </sgds-tile>
      <sgds-tile value="health" stacked>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Health</span>
        <span slot="description">Healthcare and medical services</span>
      </sgds-tile>
      <sgds-tile value="education" stacked>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Education</span>
        <span slot="description">Schools and learning platforms</span>
      </sgds-tile>
    </div>
  </sgds-tile-group>
`;

const StackedCheckboxTemplate = () => html`
  <sgds-tile-group label="Select topics" variant="checkbox" name="stackedCheckboxTile">
    <div class="sgds:grid sgds:grid-cols-3 sgds:gap-component-md">
      <sgds-tile value="design" stacked>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Design</span>
        <span slot="description">UI/UX and visual design</span>
      </sgds-tile>
      <sgds-tile value="development" stacked>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Development</span>
        <span slot="description">Software engineering and coding</span>
      </sgds-tile>
      <sgds-tile value="testing" stacked>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Testing</span>
        <span slot="description">QA and test automation</span>
      </sgds-tile>
    </div>
  </sgds-tile-group>
`;

const InvalidRadioGroupTemplate = () => html`
  <sgds-tile-group
    label="Select a plan"
    variant="radio"
    invalid
    hasFeedback
    invalidFeedback="Please select a plan"
    name="invalidRadioTile"
  >
    <sgds-tile value="basic">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Basic</span>
      <span slot="description">For individuals and small projects</span>
    </sgds-tile>
    <sgds-tile value="pro">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Pro</span>
      <span slot="description">For growing teams and businesses</span>
    </sgds-tile>
    <sgds-tile value="enterprise">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Enterprise</span>
      <span slot="description">For large organisations with advanced needs</span>
    </sgds-tile>
  </sgds-tile-group>
`;

const InvalidCheckboxGroupTemplate = () => html`
  <sgds-tile-group
    label="Select features"
    variant="checkbox"
    invalid
    hasFeedback
    invalidFeedback="Please select at least one feature"
    name="invalidCheckboxTile"
  >
    <sgds-tile value="analytics">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Analytics</span>
      <span slot="description">Track and analyse your data</span>
    </sgds-tile>
    <sgds-tile value="reporting">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Reporting</span>
      <span slot="description">Generate detailed reports</span>
    </sgds-tile>
  </sgds-tile-group>
`;

const ValidationRadioTemplate = () => html`
  <form class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
    <sgds-tile-group label="Select a plan" variant="radio" required hasFeedback name="validationRadioTile">
      <sgds-tile value="basic">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Basic</span>
        <span slot="description">For individuals and small projects</span>
      </sgds-tile>
      <sgds-tile value="pro">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Pro</span>
        <span slot="description">For growing teams and businesses</span>
      </sgds-tile>
      <sgds-tile value="enterprise">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Enterprise</span>
        <span slot="description">For large organisations with advanced needs</span>
      </sgds-tile>
    </sgds-tile-group>
    <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </div>
  </form>
`;

const ValidationCheckboxTemplate = () => html`
  <form class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
    <sgds-tile-group label="Select features" variant="checkbox" required hasFeedback name="validationCheckboxTile">
      <sgds-tile value="analytics">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Analytics</span>
        <span slot="description">Track and analyse your data</span>
      </sgds-tile>
      <sgds-tile value="reporting">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Reporting</span>
        <span slot="description">Generate detailed reports</span>
      </sgds-tile>
      <sgds-tile value="automation">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Automation</span>
        <span slot="description">Automate repetitive tasks</span>
      </sgds-tile>
    </sgds-tile-group>
    <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </div>
  </form>
`;

const SwitchTileTemplate = () => html`
  <div class="sgds:flex sgds:flex-col sgds:gap-component-md">
    <sgds-tile variant="switch">
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Notifications</span>
      <span slot="description">Enable email notifications for updates</span>
    </sgds-tile>
    <sgds-tile variant="switch" checked>
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Dark mode</span>
      <span slot="description">Switch to dark theme</span>
    </sgds-tile>
    <sgds-tile variant="switch" disabled>
      <sgds-icon slot="icon" name="placeholder"></sgds-icon>
      <span slot="title">Beta features</span>
      <span slot="description">Access to experimental features (coming soon)</span>
    </sgds-tile>
  </div>
`;

export const RadioGroup = {
  render: RadioGroupTemplate.bind({}),
  name: "Radio group",
  args: {},
  parameters: {}
};

export const CheckboxGroup = {
  render: CheckboxGroupTemplate.bind({}),
  name: "Checkbox group",
  args: {},
  parameters: {}
};

export const Stacked = {
  render: StackedTemplate.bind({}),
  name: "Stacked radio",
  args: {},
  parameters: {}
};

export const StackedCheckbox = {
  render: StackedCheckboxTemplate.bind({}),
  name: "Stacked checkbox",
  args: {},
  parameters: {}
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {}
};

export const InvalidRadioGroup = {
  render: InvalidRadioGroupTemplate.bind({}),
  name: "Invalid radio group",
  args: {},
  parameters: {}
};

export const InvalidCheckboxGroup = {
  render: InvalidCheckboxGroupTemplate.bind({}),
  name: "Invalid checkbox group",
  args: {},
  parameters: {}
};

export const ValidationRadio = {
  render: ValidationRadioTemplate.bind({}),
  name: "Validation for radio group",
  args: {},
  parameters: {}
};

export const ValidationCheckbox = {
  render: ValidationCheckboxTemplate.bind({}),
  name: "Validation for checkbox group",
  args: {},
  parameters: {}
};

export const SwitchTile = {
  render: SwitchTileTemplate.bind({}),
  name: "Switch tile",
  args: {},
  parameters: {}
};
