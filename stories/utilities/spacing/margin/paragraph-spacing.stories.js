import { html } from "lit";

export default {
  title: "Utilities/Spacing/Margin/Paragraph",
  tags: ["!autodocs"]
};

const CODE_CLASSES = "sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm";
const COPY_BTN_CLASSES =
  "sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0";

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

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

const PARAGRAPH_SPACING_TOKENS = [
  { suffix: "none", value: "0px" },
  { suffix: "sm", value: "0.5rem (8px)" },
  { suffix: "md", value: "1rem (16px)" },
  { suffix: "lg", value: "1.5rem (24px)" },
  { suffix: "xl", value: "2rem (32px)" }
];

export const Paragraph = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${PARAGRAPH_SPACING_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:mb-paragraph-${suffix}`)}
          <sgds-table-cell
            ><code class="${CODE_CLASSES}">--sgds-paragraph-spacing-${suffix}</code></sgds-table-cell
          >
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div>
              <p class="sgds:mb-paragraph-${suffix}">First paragraph.</p>
              <p>Second paragraph.</p>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
