import { html } from "lit";

export default {
  title: "Utilities/Spacing/Gap/Form Semantic",
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

const TOKENS = [
  { token: "sgds:gap-form-label", variable: "--sgds-form-label-gap", value: "0.25rem (4px)", description: "Gap between label and hint text" },
  { token: "sgds:gap-form-feedback", variable: "--sgds-form-feedback-gap", value: "0.25rem (4px)", description: "Gap for validation feedback" },
  { token: "sgds:gap-form-fieldset", variable: "--sgds-form-fieldset-gap", value: "2rem (32px)", description: "Gap between fieldset groups" },
  { token: "sgds:gap-form-control", variable: "--sgds-form-control-gap", value: "0.5rem (8px)", description: "Gap between checkbox/radio input and label" },
  { token: "sgds:gap-form-control-group", variable: "--sgds-form-control-group-gap", value: "0.25rem (4px)", description: "Gap between items in a group" }
];

export const Semantic = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Semantic gap tokens for form label, feedback, fieldset, and control group spacing.
    These tokens define the vertical rhythm within and between form elements.
  </p>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Description</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${TOKENS.map(
      ({ token, variable, value, description }) => html`
        <sgds-table-row>
          ${renderTokenCell(token)}
          <sgds-table-cell><code class="${CODE_CLASSES}">${variable}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>${description}</sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:flex-col ${token}">
              <div class="sgds:bg-accent-default sgds:w-20 sgds:h-6"></div>
              <div class="sgds:bg-accent-default sgds:w-20 sgds:h-6"></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
