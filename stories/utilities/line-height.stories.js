import { html } from "lit";

export default {
  title: "Utilities/Line Height",
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
      <button class="${COPY_BTN_CLASSES}" @click="${e => copyToClipboard(token, e.target.closest("button"))}" aria-label="Copy token">
        <sgds-icon name="files"></sgds-icon>
      </button>
    </div>
  </sgds-table-cell>
`;

const STATIC_TOKENS = [
  { suffix: "16", value: "16px" },
  { suffix: "20", value: "20px" },
  { suffix: "24", value: "24px" },
  { suffix: "28", value: "28px" },
  { suffix: "32", value: "32px" },
  { suffix: "36", value: "36px" },
  { suffix: "40", value: "40px" },
  { suffix: "44", value: "44px" },
  { suffix: "48", value: "48px" },
  { suffix: "52", value: "52px" },
  { suffix: "56", value: "56px" },
  { suffix: "60", value: "60px" },
  { suffix: "64", value: "64px" }
];

const RESPONSIVE_TOKENS = [
  { suffix: "3-xs", value: "16px / 16px / 16px" },
  { suffix: "2-xs", value: "20px / 20px / 20px" },
  { suffix: "xs", value: "24px / 24px / 24px" },
  { suffix: "sm", value: "24px / 28px / 28px" },
  { suffix: "md", value: "28px / 32px / 32px" },
  { suffix: "lg", value: "32px / 36px / 40px" },
  { suffix: "xl", value: "40px / 44px / 48px" },
  { suffix: "2-xl", value: "44px / 52px / 56px" },
  { suffix: "3-xl", value: "48px / 60px / 64px" }
];

export const LineHeight = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:leading-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-line-height-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell><div class="sgds:leading-${suffix}">The quick brown fox jumps over the lazy dog.</div></sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

export const StaticLineHeight = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${STATIC_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:leading-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-line-height-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:leading-${suffix}">
              The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
