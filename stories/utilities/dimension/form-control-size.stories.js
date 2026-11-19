import { html } from "lit";

export default {
  title: "Utilities/Dimension/Form Control Size",
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
  { suffix: "2-xs", value: "20px", description: "Checkbox/radio input (md size)" },
  { suffix: "xs", value: "24px", description: "Checkbox/radio input (lg size)" },
  { suffix: "sm", value: "32px", description: "Button xs, close button sm" },
  { suffix: "md", value: "40px", description: "Form input height (md size)" },
  { suffix: "lg", value: "48px", description: "Form input height (lg size)" }
];

export const ControlSize = () => html`
  <p class="sgds:text-body-md sgds:mb-lg">
    Height tokens for form control elements. These define the standard heights for
    form inputs, icon buttons, and checkbox/radio inputs across lg and md sizes.
  </p>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Usage</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${TOKENS.map(
      ({ suffix, value, description }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:h-form-control-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-form-control-size-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>${description}</sgds-table-cell>
          <sgds-table-cell>
            <div
              class="sgds:bg-primary-default sgds:w-20 sgds:rounded-form sgds:h-form-control-${suffix}"
            ></div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
