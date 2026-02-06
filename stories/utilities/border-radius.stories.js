import { html } from "lit";

export default {
  title: "Utilities/Border Radius",
  tags: ["autodocs"]
};

const RADIUS_SCALE = [
  { name: "none", class: "sgds:rounded-none", variable: "--sgds-border-radius-none", value: "0px" },
  { name: "xs", class: "sgds:rounded-xs", variable: "--sgds-border-radius-xs", value: "2px" },
  { name: "sm", class: "sgds:rounded-sm", variable: "--sgds-border-radius-sm", value: "4px" },
  { name: "md", class: "sgds:rounded-md", variable: "--sgds-border-radius-md", value: "8px" },
  { name: "lg", class: "sgds:rounded-lg", variable: "--sgds-border-radius-lg", value: "12px" },
  { name: "xl", class: "sgds:rounded-xl", variable: "--sgds-border-radius-xl", value: "16px" },
  { name: "2-xl", class: "sgds:rounded-2-xl", variable: "--sgds-border-radius-2-xl", value: "24px" },
  { name: "3-xl", class: "sgds:rounded-3-xl", variable: "--sgds-border-radius-3-xl", value: "32px" },
  { name: "full", class: "sgds:rounded-full", variable: "--sgds-border-radius-full", value: "999px" }
];

const FORM_RADIUS_SCALE = [
  { name: "none", class: "sgds:rounded-form-none", variable: "--sgds-form-border-radius-none", value: "0px" },
  { name: "xs", class: "sgds:rounded-form-xs", variable: "--sgds-form-border-radius-xs", value: "2px" },
  { name: "sm", class: "sgds:rounded-form-sm", variable: "--sgds-form-border-radius-sm", value: "4px" },
  { name: "md", class: "sgds:rounded-form-md", variable: "--sgds-form-border-radius-md", value: "8px" },
  { name: "full", class: "sgds:rounded-form-full", variable: "--sgds-form-border-radius-full", value: "999px" }
];

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const RadiusTableRow = (item) => {
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
        <div class="sgds:flex sgds:items-center sgds:justify-center sgds:w-20 sgds:h-20 sgds:bg-primary-default ${item.class}"></div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const Radius = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RADIUS_SCALE.map((item) => RadiusTableRow(item))}
  </sgds-table>
`;

export const FormRadius = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${FORM_RADIUS_SCALE.map((item) => RadiusTableRow(item))}
  </sgds-table>
`;
