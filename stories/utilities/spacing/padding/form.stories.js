import { html } from "lit";

export default {
  title: "Utilities/Form/Padding",
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

const SIMPLIFIED_TOKENS = [
  {
    token: "sgds:px-form-md",
    variable: "--sgds-form-padding-x-md",
    value: "0.75rem (12px)",
    description: "Horizontal padding for md form controls"
  },
  {
    token: "sgds:px-form-lg",
    variable: "--sgds-form-padding-x-lg",
    value: "1rem (16px)",
    description: "Horizontal padding for lg form controls"
  },
  {
    token: "sgds:py-form-md",
    variable: "--sgds-form-padding-y-md",
    value: "0.5rem (8px)",
    description: "Vertical padding for md form controls (textarea)"
  },
  {
    token: "sgds:py-form-lg",
    variable: "--sgds-form-padding-y-lg",
    value: "0.75rem (12px)",
    description: "Vertical padding for lg form controls (textarea)"
  }
];

const GRANULAR_TOKENS = [
  {
    token: "sgds:py-form-label",
    variable: "--sgds-form-label-padding-y",
    value: "0.125rem (2px)",
    description: "Vertical padding for form labels"
  },
  {
    token: "sgds:py-form-control",
    variable: "--sgds-form-control-padding-y",
    value: "0.25rem (4px)",
    description: "Vertical padding for checkbox/radio controls"
  },
  {
    token: "sgds:px-form-option-md",
    variable: "--sgds-form-option-padding-x-md",
    value: "0.75rem (12px)",
    description: "Horizontal padding for md form option"
  },
  {
    token: "sgds:px-form-option-lg",
    variable: "--sgds-form-option-padding-x-lg",
    value: "1rem (16px)",
    description: "Horizontal padding for lg form option"
  },
  {
    token: "sgds:py-form-option-md",
    variable: "--sgds-form-option-padding-y-md",
    value: "0.5rem (8px)",
    description: "Vertical padding for md form option"
  },
  {
    token: "sgds:py-form-option-lg",
    variable: "--sgds-form-option-padding-y-lg",
    value: "0.75rem (12px)",
    description: "Vertical padding for lg form option"
  },
  {
    token: "sgds:py-form-menu",
    variable: "--sgds-form-menu-padding-y",
    value: "0.5rem (8px)",
    description: "Vertical padding for form menu container"
  }
];

const renderTable = tokens => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Description</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${tokens.map(
      ({ token, variable, value, description }) => html`
        <sgds-table-row>
          ${renderTokenCell(token)}
          <sgds-table-cell><code class="${CODE_CLASSES}">${variable}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>${description}</sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:bg-primary-default sgds:rounded-form ${token}">
              <span class="sgds:bg-surface-default sgds:text-default sgds:px-xs sgds:py-3-xs sgds:rounded-sm"
                >Content</span
              >
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

export const SimplifiedSemantic = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Simplified semantic padding tokens for form controls, sized for lg and md variants.
  </p>
  ${renderTable(SIMPLIFIED_TOKENS)}
`;

export const GranularSemantic = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Granular semantic padding tokens that encode purpose: label, control, option, and menu padding.
  </p>
  ${renderTable(GRANULAR_TOKENS)}
`;
