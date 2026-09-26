import { html } from "lit";

const VariantTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-progress-bar
        variant="primary"
        value="50"
        arialabel="Primary progress"
        ariamin="0"
        ariamax="100"
      ></sgds-progress-bar>
      <sgds-progress-bar
        variant="neutral"
        value="50"
        arialabel="Neutral progress"
        ariamin="0"
        ariamax="100"
      ></sgds-progress-bar>
    </div>
  `;
};

const LabelTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-progress-bar
        variant="primary"
        value="50"
        label="50%"
        arialabel="Primary progress"
        ariamin="0"
        ariamax="100"
      ></sgds-progress-bar>
      <sgds-progress-bar
        variant="neutral"
        value="50"
        label="50%"
        arialabel="Neutral progress"
        ariamin="0"
        ariamax="100"
      ></sgds-progress-bar>
    </div>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {}
};
export const Label = {
  render: LabelTemplate.bind({}),
  name: "Label",
  args: {},
  parameters: {}
};
