import { html } from "lit-html";

const SizeTemplate = args => {
  const sizes = ["sm", "md", "lg", "xl", "2-xl", "3-xl"];
  return html`${sizes.map(s => html` <sgds-icon name="house-door" size=${s}></sgds-icon> `)} `;
};

const ColorTemplate = args => {
  const colors = ["red", "blue", "green", "purple", "pink"];
  return html`
    ${colors.map(
      c => html`
        <span style="color:${c}">
          <sgds-icon name="house-door"></sgds-icon>
        </span>
      `
    )}
  `;
};

export const Size = {
  render: SizeTemplate.bind({}),
  name: "Size",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Color = {
  render: ColorTemplate.bind({}),
  name: "Color",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
