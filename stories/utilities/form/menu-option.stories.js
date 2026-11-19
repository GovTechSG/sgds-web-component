import { html } from "lit";

export default {
  title: "Utilities/Form/Menu and Option",
  tags: ["!autodocs"]
};

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const CODE_CLASSES = "sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm";
const COPY_BTN_CLASSES =
  "sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0";

const renderTokenCell = token => html`
  <sgds-table-cell>
    <div class="sgds:flex sgds:items-center sgds:gap-xs">
      <code class="${CODE_CLASSES}">${token}</code>
      <button
        class="${COPY_BTN_CLASSES}"
        @click="${e => copyToClipboard(token, e.target.closest("button"))}"
        aria-label="Copy token"
      >
        <sgds-icon name="files"></sgds-icon>
      </button>
    </div>
  </sgds-table-cell>
`;

const MENU_TOKENS = [
  {
    token: "sgds:py-form-menu",
    variable: "--sgds-form-menu-padding-y",
    description: "Vertical padding for form menu container"
  },
  {
    token: "sgds:max-h-form-menu",
    variable: "--sgds-form-menu-max-height",
    description: "Maximum height for form menu container"
  },
  {
    token: "sgds:rounded-form-menu",
    variable: "--sgds-form-menu-border-radius",
    description: "Border radius for form menu container"
  }
];

const OPTION_TOKENS = [
  {
    token: "sgds:px-form-option-md",
    variable: "--sgds-form-option-padding-x-md",
    description: "Horizontal padding for md form option"
  },
  {
    token: "sgds:px-form-option-lg",
    variable: "--sgds-form-option-padding-x-lg",
    description: "Horizontal padding for lg form option"
  },
  {
    token: "sgds:py-form-option-md",
    variable: "--sgds-form-option-padding-y-md",
    description: "Vertical padding for md form option"
  },
  {
    token: "sgds:py-form-option-lg",
    variable: "--sgds-form-option-padding-y-lg",
    description: "Vertical padding for lg form option"
  },
  {
    token: "sgds:gap-form-option",
    variable: "--sgds-form-option-gap",
    description: "Gap between items in a form option"
  }
];

export const Menu = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Tokens for form menu containers used in dropdowns, combo boxes, and select menus.
  </p>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Description</sgds-table-head>
    </sgds-table-row>
    ${MENU_TOKENS.map(
      ({ token, variable, description }) => html`
        <sgds-table-row>
          ${renderTokenCell(token)}
          <sgds-table-cell><code class="${CODE_CLASSES}">${variable}</code></sgds-table-cell>
          <sgds-table-cell>${description}</sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

export const Option = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Tokens for individual form option items within menus. Sized for md and lg variants.
  </p>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Description</sgds-table-head>
    </sgds-table-row>
    ${OPTION_TOKENS.map(
      ({ token, variable, description }) => html`
        <sgds-table-row>
          ${renderTokenCell(token)}
          <sgds-table-cell><code class="${CODE_CLASSES}">${variable}</code></sgds-table-cell>
          <sgds-table-cell>${description}</sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
