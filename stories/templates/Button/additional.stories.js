import { html } from "lit-html";

// export const VariantTemplate = variantArray => {
//   return html`${variantArray.map(v => html`<sgds-button variant=${v}> ${v} </sgds-button>`)}`;
// };
const VariantTemplate = args => {
  const variants = ["primary", "secondary", "info", "success", "secondary", "warning", "danger", "dark", "light"];
  return html`${variants.map(v => html`<sgds-button variant=${v}>${v}</sgds-button>`)} `;
};

const OutlineTemplate = args => {
  const variants = ["primary", "secondary", "info", "success", "secondary", "warning", "danger", "dark", "light"];
  const outlinedVariants = variants.map(v => `outline-${v}`);
  return html`${outlinedVariants.map(v => html`<sgds-button variant=${v}>${v}</sgds-button>`)} `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Outlined = {
  render: OutlineTemplate.bind({}),
  name: "Outlined buttons",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const SizeTemplate = () => {
  return html`<sgds-button size="sm"> sm-button </sgds-button> <sgds-button size="lg"> lg-button </sgds-button>`;
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ActiveTemplate = () => {
  return html` <sgds-button variant="primary" active> primary-button </sgds-button>
    <sgds-button variant="secondary" active> secondary-button </sgds-button>`;
};

export const Active = {
  render: ActiveTemplate.bind({}),
  name: "Active state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: () => html`
    <sgds-button variant="primary" disabled> primary-button </sgds-button>
    <sgds-button variant="secondary" disabled> secondary-button </sgds-button>
  `,
  name: "Disabled state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ButtonWithIcon = {
  render: () => html`
    <sgds-button>
      <svg
        slot="rightIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-box"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"
        />
      </svg>
      Button with Icon
    </sgds-button>
  `,
  name: "Button with Icon",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
