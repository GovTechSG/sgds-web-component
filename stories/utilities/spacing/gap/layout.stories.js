import { html } from "lit";

export default {
  title: "Utilities/Spacing/Gap/Layout",
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

const CODE_CLASSES = "sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono";
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
  { suffix: "2-xs", value: "4px / 12px / 16px" },
  { suffix: "xs", value: "8px / 16px / 20px" },
  { suffix: "sm", value: "12px / 20px / 24px" },
  { suffix: "md", value: "16px / 24px / 32px" },
  { suffix: "lg", value: "20px / 32px / 48px" },
  { suffix: "xl", value: "24px / 48px / 64px" }
];

export const Layout = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:gap-layout-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-layout-gap-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:gap-layout-${suffix}">
              <div class="sgds:bg-success-default sgds:p-md sgds:rounded-sm sgds:flex-1"></div>
              <div class="sgds:bg-success-default sgds:p-md sgds:rounded-sm sgds:flex-1"></div>
              <div class="sgds:bg-success-default sgds:p-md sgds:rounded-sm sgds:flex-1"></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
