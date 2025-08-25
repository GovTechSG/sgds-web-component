import { html } from "lit-html";

const SizeTemplate = args => {
  return html`
    <sgds-overflow-menu size=${args.size}>
      <sgds-dropdown-item>View</sgds-dropdown-item>
      <sgds-dropdown-item>Edit</sgds-dropdown-item>
      <sgds-dropdown-item>Delete</sgds-dropdown-item>
    </sgds-overflow-menu>
  `;
};

export const SmallSize = {
  render: SizeTemplate.bind({}),
  name: "Small size",
  args: { size: "sm" },
  parameters: {
    docs: {
      story: {
        height: "300px"
      }
    }
  },
  tags: ["!dev"]
};
export const MediumSize = {
  render: SizeTemplate.bind({}),
  name: "Medium size",
  args: { size: "md" },
  parameters: {
    docs: {
      story: {
        height: "300px"
      }
    }
  },
  tags: ["!dev"]
};
