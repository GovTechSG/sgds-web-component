import { html } from "lit";

export default {
  title: "Utilities/Form/Border Width",
  tags: ["!autodocs"]
};

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
          <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${item.class}</code>
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
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${item.variable}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${item.value}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div
          style="border: var(${item.variable}) solid var(--sgds-border-color-default)"
          class="sgds:w-16 sgds:h-16"
        ></div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const BorderWidth = () => html`
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
