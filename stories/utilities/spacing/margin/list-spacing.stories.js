import { html } from "lit";

export default {
  title: "Utilities/Spacing/Margin/List",
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

const LIST_SPACING_TOKENS = [
  { suffix: "sm", value: "0.5rem (8px)" },
  { suffix: "md", value: "0.75rem (12px)" },
  { suffix: "lg", value: "1rem (16px)" }
];

export const List = () => html`
  <sgds-table class="sgds:mb-2-xl">
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${LIST_SPACING_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:my-list-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-list-spacing-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:gap-2-xl">
              <ul>
                <li class="sgds:my-list-${suffix}">First item</li>
                <li class="sgds:my-list-${suffix}">Second item</li>
                <li class="sgds:mt-list-${suffix}">Third item</li>
              </ul>
              <ol>
                <li class="sgds:my-list-${suffix}">First item</li>
                <li class="sgds:my-list-${suffix}">Second item</li>
                <li class="sgds:mt-list-${suffix}">Third item</li>
              </ol>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
