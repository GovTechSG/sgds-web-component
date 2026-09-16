import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
      <sgds-tile-group
        label=${ifDefined(args.label)}
        hintText=${ifDefined(args.hintText)}
        variant=${ifDefined(args.variant)}
        value=${ifDefined(args.value)}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?hasFeedback=${args.hasFeedback}
        invalidFeedback=${ifDefined(args.invalidFeedback)}
        name=${ifDefined(args.name)}
      >
        <sgds-tile value="basic" ?stacked=${args.stacked}>
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          <span slot="title">Basic</span>
          <span slot="description">For individuals and small projects</span>
        </sgds-tile>
        <sgds-tile value="pro" ?stacked=${args.stacked}>
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          <span slot="title">Pro</span>
          <span slot="description">For growing teams and businesses</span>
        </sgds-tile>
        <sgds-tile value="enterprise" ?stacked=${args.stacked}>
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          <span slot="title">Enterprise</span>
          <span slot="description">For large organisations with advanced needs</span>
        </sgds-tile>
      </sgds-tile-group>

      <sgds-tile-group
        label=${ifDefined(args.checkboxLabel)}
        hintText=${ifDefined(args.checkboxHintText)}
        variant="checkbox"
        value=${ifDefined(args.checkboxValue)}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?hasFeedback=${args.hasFeedback}
        name=${ifDefined(args.checkboxName)}
      >
        <sgds-tile value="analytics" ?stacked=${args.stacked}>
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          <span slot="title">Analytics</span>
          <span slot="description">Track and analyse your data</span>
        </sgds-tile>
        <sgds-tile value="reporting" ?stacked=${args.stacked}>
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          <span slot="title">Reporting</span>
          <span slot="description">Generate detailed reports</span>
        </sgds-tile>
        <sgds-tile value="automation" ?stacked=${args.stacked}>
          <sgds-icon slot="icon" name="placeholder"></sgds-icon>
          <span slot="title">Automation</span>
          <span slot="description">Automate repetitive tasks</span>
        </sgds-tile>
      </sgds-tile-group>

      <sgds-tile variant="switch">
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <span slot="title">Notifications</span>
        <span slot="description">Enable email notifications for updates</span>
      </sgds-tile>
    </div>
  `;
};

export const args = {
  label: "Select a plan",
  hintText: "Choose the plan that best fits your needs",
  name: "tilePlan",
  variant: "radio",
  checkboxLabel: "Select features",
  checkboxHintText: "Choose all that apply",
  checkboxName: "tileFeatures"
};

export const parameters = {};

export const play = undefined;
