import { html } from "lit";

export default {
  title: "Utilities/Spacing/Margin",
  tags: ["autodocs"]
};

const MARGIN_SCALE = [
  { name: "none", class: "sgds:m-none", variable: "--sgds-margin-none", value: "0px" },
  { name: "3-xs", class: "sgds:m-3-xs", variable: "--sgds-margin-3-xs", value: "2px" },
  { name: "2-xs", class: "sgds:m-2-xs", variable: "--sgds-margin-2-xs", value: "4px" },
  { name: "xs", class: "sgds:m-xs", variable: "--sgds-margin-xs", value: "8px" },
  { name: "sm", class: "sgds:m-sm", variable: "--sgds-margin-sm", value: "12px" },
  { name: "md", class: "sgds:m-md", variable: "--sgds-margin-md", value: "16px" },
  { name: "lg", class: "sgds:m-lg", variable: "--sgds-margin-lg", value: "20px" },
  { name: "xl", class: "sgds:m-xl", variable: "--sgds-margin-xl", value: "24px" },
  { name: "2-xl", class: "sgds:m-2-xl", variable: "--sgds-margin-2-xl", value: "32px" },
  { name: "3-xl", class: "sgds:m-3-xl", variable: "--sgds-margin-3-xl", value: "48px" },
  { name: "4-xl", class: "sgds:m-4-xl", variable: "--sgds-margin-4-xl", value: "64px" },
  { name: "5-xl", class: "sgds:m-5-xl", variable: "--sgds-margin-5-xl", value: "96px" }
];

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const MarginTableRow = (item) => {
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
        <div class="sgds:bg-primary-default sgds:w-40 sgds:h-40" style="position: relative;">
          <div class="sgds:bg-surface-raised sgds:w-12 sgds:h-12 ${item.class}" style="position: absolute; top: 0; left: 0;"></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const Margin = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${MARGIN_SCALE.map((item) => MarginTableRow(item))}
  </sgds-table>
`;
