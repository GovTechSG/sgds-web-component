import { html } from "lit";

export const BorderVariant = {
  render: Template.bind({}),
  name: "Border variant",
  args: { variant: "border" },
  parameters: {},
  tags: ["!dev"]
};

export const DensityVariant = {
  render: Template.bind({}),
  name: "Compact density",
  args: { density: "compact" },
  parameters: {},
  tags: ["!dev"]
};

export const SpaciousDensity = {
  render: Template.bind({}),
  name: "Spacious density",
  args: { density: "spacious" },
  parameters: {},
  tags: ["!dev"]
};

export const AllowMultiple = {
  render: Template.bind({}),
  name: "Allow multiple active accordion",
  args: { allowMultiple: true },
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled state",
  args: { disabled: true },
  parameters: {},
  tags: ["!dev"]
};


const LeadingIconTemplate = iconSize => html`
<sgds-accordion >
  <sgds-accordion-item open density="compact">
    <sgds-icon slot="leadingIcon" name="info-circle" size="md"></sgds-icon>
    <div slot="header">Accordion density compact</div>
    <div slot="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
    </div>
  </sgds-accordion-item>
    <sgds-accordion-item density="default">
    <sgds-icon slot="leadingIcon" name="info-circle" size="lg"></sgds-icon>
    <div slot="header">Accordion density default</div>
    <div slot="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
    </div>
  </sgds-accordion-item>
    <sgds-accordion-item density="spacious">
    <sgds-icon slot="leadingIcon" name="info-circle" size="xl"></sgds-icon>
    <div slot="header">Accordion density spacious</div>
    <div slot="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
    </div>
  </sgds-accordion-item>
  </sgds-accordion>


`;

export const LeadingIconSlot = {
  render: LeadingIconTemplate.bind({}),
  name: "Leading icon slot",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const BadgeTemplate = args => html`
  <sgds-accordion
    ?allowMultiple=${args.allowMultiple}
    variant=${args.variant}
    density=${args.density}
  >
    <sgds-accordion-item ?open=${args.open} ?disabled=${args.disabled}>
      <div slot="header">Accordion title #1</div>
      <sgds-badge slot="badge" variant="primary">New</sgds-badge>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
    <sgds-accordion-item>
      <div slot="header">Accordion title #2</div>
      <sgds-badge slot="badge" variant="warning">Updated</sgds-badge>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
    <sgds-accordion-item open>
      <div slot="header">Accordion title #3</div>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
  </sgds-accordion>
`;

export const BadgeSlot = {
  render: BadgeTemplate.bind({}),
  name: "Badge slot",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
