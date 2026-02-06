import { html } from "lit";

export default {
  title: "Utilities/Font Size",
  tags: ["autodocs"]
};

const FONT_SIZE_SCALE = [
  { name: "0", class: "sgds:text-0", variable: "--sgds-font-size-0", value: "12px (0.75rem)" },
  { name: "1", class: "sgds:text-1", variable: "--sgds-font-size-1", value: "14px (0.875rem)" },
  { name: "2", class: "sgds:text-2", variable: "--sgds-font-size-2", value: "16px (1rem)" },
  { name: "3", class: "sgds:text-3", variable: "--sgds-font-size-3", value: "20px (1.25rem)" },
  { name: "4", class: "sgds:text-4", variable: "--sgds-font-size-4", value: "24px (1.5rem)" },
  { name: "5", class: "sgds:text-5", variable: "--sgds-font-size-5", value: "28px (1.75rem)" },
  { name: "6", class: "sgds:text-6", variable: "--sgds-font-size-6", value: "32px (2rem)" },
  { name: "7", class: "sgds:text-7", variable: "--sgds-font-size-7", value: "40px (2.5rem)" },
  { name: "8", class: "sgds:text-8", variable: "--sgds-font-size-8", value: "48px (3rem)" },
  { name: "9", class: "sgds:text-9", variable: "--sgds-font-size-9", value: "56px (3.5rem)" }
];

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const FontSizeTableRow = (item) => {
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
        <div class="${item.class}">Sample Text</div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const FontSizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${FONT_SIZE_SCALE.map((item) => FontSizeTableRow(item))}
  </sgds-table>
`;
