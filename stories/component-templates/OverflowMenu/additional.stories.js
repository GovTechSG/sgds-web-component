import { html } from "lit";

const SizeTemplate = args => {
  return html`
    <sgds-overflow-menu size=${args.size}>
      <sgds-dropdown-item ariaLabel="View">View</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Delete">Delete</sgds-dropdown-item>
    </sgds-overflow-menu>
  `;
};

export const SmallSize = {
  render: SizeTemplate.bind({}),
  name: "Small size",
  args: { size: "sm" },
  parameters: {}
};
export const MediumSize = {
  render: SizeTemplate.bind({}),
  name: "Medium size",
  args: { size: "md" },
  parameters: {}
};
