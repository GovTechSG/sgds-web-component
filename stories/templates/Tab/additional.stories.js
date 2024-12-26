export const SolidVariant = {
  render: Template.bind({}),
  name: "Solid variant",
  args: { variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};
export const UnderlinedDensityCompact = {
  render: Template.bind({}),
  name: "Compact density for underlined tabs",
  args: { density: "compact" },
  parameters: {},
  tags: ["!dev"]
};
export const SolidDensityCompact = {
  render: Template.bind({}),
  name: "Compact density for solid tabs",
  args: { density: "compact", variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};

export const OrientationUnderlined = {
  render: Template.bind({}),
  name: "Vertical orientation for underlined tabs",
  args: { orientation: "vertical" },
  parameters: {},
  tags: ["!dev"]
};
export const OrientationSolid = {
  render: Template.bind({}),
  name: "Vertical orientation for solid tabs",
  args: { orientation: "vertical", variant: "solid" },
  parameters: {},
  tags: ["!dev"]
};
