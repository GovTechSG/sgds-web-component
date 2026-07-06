import { html } from "lit";

export const BorderVariant = {
  render: Template.bind({}),
  name: "Border variant",
  args: { variant: "border" },
  parameters: {}
};

export const DensityVariant = {
  render: Template.bind({}),
  name: "Compact density",
  args: { density: "compact" },
  parameters: {}
};

export const SpaciousDensity = {
  render: Template.bind({}),
  name: "Spacious density",
  args: { density: "spacious" },
  parameters: {}
};

export const AllowMultiple = {
  render: Template.bind({}),
  name: "Allow multiple active accordion",
  args: { allowMultiple: true },
  parameters: {}
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled state",
  args: { disabled: true },
  parameters: {}
};

const LeadingIconTemplate = iconSize => html`
  <sgds-accordion>
    <sgds-accordion-item open density="compact" ariaLabel="Accordion density compact">
      <sgds-icon slot="icon" name="info-circle" size="md"></sgds-icon>
      <div slot="header">Accordion density compact</div>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
    <sgds-accordion-item density="default" ariaLabel="Accordion density default">
      <sgds-icon slot="icon" name="info-circle" size="lg"></sgds-icon>
      <div slot="header">Accordion density default</div>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
    <sgds-accordion-item density="spacious" ariaLabel="Accordion density spacious">
      <sgds-icon slot="icon" name="info-circle" size="xl"></sgds-icon>
      <div slot="header">Accordion density spacious</div>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
  </sgds-accordion>
`;

export const LeadingIconSlot = {
  render: LeadingIconTemplate.bind({}),
  name: "Icon slot",
  args: {},
  parameters: {}
};

const BadgeTemplate = args => html`
  <sgds-accordion ?allowMultiple=${args.allowMultiple} variant=${args.variant} density=${args.density}>
    <sgds-accordion-item ?open=${args.open} ?disabled=${args.disabled} ariaLabel="Accordion title #1">
      <div slot="header">Accordion title #1</div>
      <sgds-badge slot="badge" variant="primary">New</sgds-badge>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
    <sgds-accordion-item ariaLabel="Accordion title #2">
      <div slot="header">Accordion title #2</div>
      <sgds-badge slot="badge" variant="warning">Updated</sgds-badge>
      <div slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
      </div>
    </sgds-accordion-item>
    <sgds-accordion-item open ariaLabel="Accordion title #3">
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
  parameters: {}
};
