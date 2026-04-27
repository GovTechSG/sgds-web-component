
    import { Template, args, parameters, play } from "../templates/Divider/basic.js";

    export default {
      title: 'Components/Divider',
      component: 'sgds-divider',
      argTypes: {"orientation":{"defaultValue":"horizontal","control":"select","options":["horizontal","vertical"]},"thickness":{"defaultValue":"thin","control":"select","options":["thin","thick","thicker"]}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";

const ThicknessTemplate = args =>
  html`
    <div class="d-flex-column">
      <div class="d-flex-row">
        <sgds-divider></sgds-divider>
        <sgds-divider thickness="thick"></sgds-divider>
        <sgds-divider thickness="thicker"></sgds-divider>
      </div>
      <div class="d-flex-row" style="height: 100px">
        <sgds-divider orientation="vertical"></sgds-divider>
        <sgds-divider orientation="vertical" thickness="thick"></sgds-divider>
        <sgds-divider orientation="vertical" thickness="thicker"></sgds-divider>
      </div>
    </div>
  `;
const OrientationTeamplate = args =>
  html`
    <div class="d-flex-row" style="height: 500px">
      <sgds-divider orientation="vertical"></sgds-divider>
      <sgds-divider orientation="vertical" thickness="thick"></sgds-divider>
      <sgds-divider orientation="vertical" thickness="thicker"></sgds-divider>
    </div>
  `;

export const Orientation = {
  render: OrientationTeamplate.bind({}),
  name: "Vertical",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Thickness = {
  render: ThicknessTemplate.bind({}),
  name: "Thickness",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
