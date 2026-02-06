import { html } from "lit";

export default {
  title: "Utilities/Spacing/Padding",
  tags: ["autodocs"]
};

const PADDING_SCALE = [
  { name: "none", class: "sgds:p-none", variable: "--sgds-padding-none", value: "0px" },
  { name: "3-xs", class: "sgds:p-3-xs", variable: "--sgds-padding-3-xs", value: "2px" },
  { name: "2-xs", class: "sgds:p-2-xs", variable: "--sgds-padding-2-xs", value: "4px" },
  { name: "xs", class: "sgds:p-xs", variable: "--sgds-padding-xs", value: "8px" },
  { name: "sm", class: "sgds:p-sm", variable: "--sgds-padding-sm", value: "12px" },
  { name: "md", class: "sgds:p-md", variable: "--sgds-padding-md", value: "16px" },
  { name: "lg", class: "sgds:p-lg", variable: "--sgds-padding-lg", value: "20px" },
  { name: "xl", class: "sgds:p-xl", variable: "--sgds-padding-xl", value: "24px" },
  { name: "2-xl", class: "sgds:p-2-xl", variable: "--sgds-padding-2-xl", value: "32px" },
  { name: "3-xl", class: "sgds:p-3-xl", variable: "--sgds-padding-3-xl", value: "48px" },
  { name: "4-xl", class: "sgds:p-4-xl", variable: "--sgds-padding-4-xl", value: "64px" },
  { name: "5-xl", class: "sgds:p-5-xl", variable: "--sgds-padding-5-xl", value: "96px" }
];

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const PaddingTableRow = (item) => {
  return html`
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">${item.class}</code>
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${(e) => copyToClipboard(item.class, e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">${item.variable}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">${item.value}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="${item.class} sgds:bg-primary-default">
          <div class="sgds:bg-surface-raised sgds:p-xs sgds:rounded sgds:text-xs sgds:text-center">
            Content
          </div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const Padding = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${PADDING_SCALE.map((item) => PaddingTableRow(item))}
  </sgds-table>
`;
