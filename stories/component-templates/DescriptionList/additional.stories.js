export const OptionalTitleDescription = {
  render: Template.bind({}),
  name: "Optional title and description",
  args: { title: true, description: true },
  parameters: { controls: { disable: true } }
};
export const Stacked = {
  render: Template.bind({}),
  name: "Stacked layout",
  args: { stacked: true },
  parameters: { controls: { disable: true } }
};
export const Bordered = {
  render: Template.bind({}),
  name: "Bordered",
  args: { bordered: true },
  parameters: { controls: { disable: true } }
};
