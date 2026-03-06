import { html } from "lit";

export default {
  title: "Utilities/Spacing/Gap/Text",
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
  { suffix: "2-xs", value: "4px / 4px / 4px" },
  { suffix: "xs",   value: "8px / 8px / 8px" },
  { suffix: "sm",   value: "8px / 12px / 12px" },
  { suffix: "md",   value: "12px / 16px / 16px" },
  { suffix: "lg",   value: "16px / 20px / 20px" },
  { suffix: "xl",   value: "20px / 24px / 24px" },
  { suffix: "2-xl", value: "24px / 32px / 32px" }
];

export const Text = () => html`
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
          ${renderTokenCell(`sgds:gap-text-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-text-gap-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:flex-col sgds:gap-text-${suffix}">
              <span class="sgds:bg-primary-surface-muted sgds:px-sm sgds:py-3-xs sgds:rounded-sm sgds:text-label-sm">Heading</span>
              <span class="sgds:bg-primary-surface-muted sgds:px-sm sgds:py-3-xs sgds:rounded-sm sgds:text-label-sm">Body text</span>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
