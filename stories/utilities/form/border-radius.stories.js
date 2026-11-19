import { html } from "lit";

export default {
  title: "Utilities/Form/Border Radius",
  tags: ["!autodocs"]
};

const FORM_RADIUS_SCALE = [
  { name: "none", class: "sgds:rounded-form-none", variable: "--sgds-form-border-radius-none", value: "0px" },
  { name: "xs", class: "sgds:rounded-form-xs", variable: "--sgds-form-border-radius-xs", value: "2px" },
  { name: "sm", class: "sgds:rounded-form-sm", variable: "--sgds-form-border-radius-sm", value: "4px" },
  { name: "md", class: "sgds:rounded-form-md", variable: "--sgds-form-border-radius-md", value: "8px" },
  { name: "full", class: "sgds:rounded-form-full", variable: "--sgds-form-border-radius-full", value: "999px" },
  { name: "form (semantic)", class: "sgds:rounded-form", variable: "--sgds-form-border-radius", value: "md (8px)" },
  {
    name: "form-subtle (semantic)",
    class: "sgds:rounded-form-subtle",
    variable: "--sgds-form-border-radius-subtle",
    value: "md (8px)"
  },
  {
    name: "form-menu",
    class: "sgds:rounded-form-menu",
    variable: "--sgds-form-menu-border-radius",
    value: "lg (12px)"
  }
];

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const RadiusTableRow = item => {
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
          class="sgds:flex sgds:items-center sgds:justify-center sgds:w-20 sgds:h-20 sgds:bg-primary-default ${item.class}"
        ></div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const BorderRadius = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${FORM_RADIUS_SCALE.map(item => RadiusTableRow(item))}
  </sgds-table>
`;
