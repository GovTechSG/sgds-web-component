export const OptionalTitleDescription = {
  render: Template.bind({}),
  name: "Optional title and description",
  args: { title: true, description: true },
  parameters: { selectedPanel: "storybook/docs/panel" }
};
export const Stacked = {
  render: Template.bind({}),
  name: "Stacked layout",
  args: { stacked: true },
  parameters: { selectedPanel: "storybook/docs/panel" }
};
export const Bordered = {
  render: Template.bind({}),
  name: "Bordered",
  args: { bordered: true },
  parameters: { selectedPanel: "storybook/docs/panel" }
};
