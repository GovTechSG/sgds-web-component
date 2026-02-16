import { html } from "lit";

export default {
  title: "Utilities/Border Width",
  tags: ["autodocs"]
};

const WIDTH_SCALE = [
  { name: "0", class: "sgds:border-0", variable: "--sgds-border-width-0", value: "0px" },
  { name: "1", class: "sgds:border-1", variable: "--sgds-border-width-1", value: "1px" },
  { name: "2", class: "sgds:border-2", variable: "--sgds-border-width-2", value: "2px" },
  { name: "3", class: "sgds:border-3", variable: "--sgds-border-width-3", value: "3px" },
  { name: "4", class: "sgds:border-4", variable: "--sgds-border-width-4", value: "4px" }
];

const FORM_WIDTH_SCALE = [
  { name: "default", class: "sgds:border-form-default", variable: "--sgds-form-border-width-default", value: "1px" },
  { name: "thick", class: "sgds:border-form-thick", variable: "--sgds-form-border-width-thick", value: "2px" }
];

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const WidthTableRow = item => {
  return html`
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
            >${item.class}</code
          >
          <button
            class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
            @click="${e => copyToClipboard(item.class, e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >${item.variable}</code
        >
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">${item.value}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div
          style="${item.class === "sgds:border-0"
            ? "border: var(--sgds-border-width-0) solid var(--sgds-border-color-default)"
            : "border: var(" + item.variable + ") solid var(--sgds-border-color-default)"}"
          class="sgds:w-16 sgds:h-16"
        ></div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const Width = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${WIDTH_SCALE.map(item => WidthTableRow(item))}
  </sgds-table>
`;

export const FormWidth = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${FORM_WIDTH_SCALE.map(item => WidthTableRow(item))}
  </sgds-table>
`;
