
    import { Template, args, parameters, play } from "../templates/Switch/basic.js";

    export default {
      title: 'Components/Switch',
      component: 'sgds-switch',
      argTypes: {"size":{"defaultValue":"md","control":"select","options":["sm","md","lg"]},"icon":{"defaultValue":false,"control":"boolean"},"checked":{"defaultValue":false,"control":"boolean"},"disabled":{"defaultValue":false,"control":"boolean"},"hasDefaultSlot":{"defaultValue":false,"control":"boolean"},"hasLeftLabelSlot":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";

const SizeTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-switch size="sm">small</sgds-switch>
      <sgds-switch size="md">medium (default)</sgds-switch>
      <sgds-switch size="lg">large </sgds-switch>
    </div>
  `;
};

const LabelTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-switch>Label on the right</sgds-switch>
      <sgds-switch><span slot="leftLabel"> Label on the left</span></sgds-switch>
    </div>
  `;
};

const IconTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-switch icon>Off with icon</sgds-switch>
      <sgds-switch icon checked>On with icon</sgds-switch>
    </div>
  `;
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Label = {
  render: LabelTemplate.bind({}),
  name: "Labels",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Icon = {
  render: IconTemplate.bind({}),
  name: "Icon",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
