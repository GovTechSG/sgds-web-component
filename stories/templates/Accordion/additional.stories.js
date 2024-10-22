import { html } from "lit-html";

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
