
    import { Template, args, parameters, play } from "../templates/ProgressBar/basic.js";

    export default {
      title: 'Components/ProgressBar',
      component: 'sgds-progress-bar',
      argTypes: {"variant":{"defaultValue":"primary","control":"select","options":["primary","neutral"]},"value":{"control":"number"},"ariamin":{"control":"number"},"ariamax":{"control":"number"},"arialabel":{"defaultValue":"","control":"text"},"label":{"defaultValue":"","control":"text"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";

const VariantTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-progress-bar variant="primary" value="50"></sgds-progress-bar>
      <sgds-progress-bar variant="neutral" value="50"></sgds-progress-bar>
    </div>
  `;
};

const LabelTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-progress-bar variant="primary" value="50" label="50%"></sgds-progress-bar>
      <sgds-progress-bar variant="neutral" value="50" label="50%"></sgds-progress-bar>
    </div>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Label = {
  render: LabelTemplate.bind({}),
  name: "Label",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
