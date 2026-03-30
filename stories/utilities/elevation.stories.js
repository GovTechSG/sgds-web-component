import { html } from "lit";

export default {
  title: "Utilities/Elevation",
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

const createShadowRow = (tokenName, cssVariable, value, shadowClass) => html`
  <sgds-table-row>
    <sgds-table-cell>
      <div class="sgds:flex sgds:items-center sgds:gap-xs">
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">sgds:${shadowClass}</code>
        <button
          class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
          @click="${e => copyToClipboard(`sgds:${shadowClass}`, e.target.closest("button"))}"
          aria-label="Copy token"
        >
          <sgds-icon name="files"></sgds-icon>
        </button>
      </div>
    </sgds-table-cell>
    <sgds-table-cell>
      <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${cssVariable}</code>
    </sgds-table-cell>
    <sgds-table-cell>
      <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${value}</code>
    </sgds-table-cell>
    <sgds-table-cell>
      <div class="sgds:bg-surface-raised sgds:${shadowClass} sgds:p-xl sgds:rounded-sm sgds:text-center sgds:min-w-100">
        Sample Div
      </div>
    </sgds-table-cell>
  </sgds-table-row>
`;

export const Elevation = () => html`
  <div>
    <h2 class="sgds:mb-lg">Surface Elevation</h2>
    <sgds-table class="sgds:mb-2-xl">
      <sgds-table-row>
        <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
        <sgds-table-head>CSS Variable</sgds-table-head>
        <sgds-table-head>Value</sgds-table-head>
        <sgds-table-head>Preview</sgds-table-head>
      </sgds-table-row>
      ${createShadowRow("1", "--sgds-elevation-surface-1", "0 0 2px 0 rgba(14, 14, 14, 0.16);", "shadow-1")}
      ${createShadowRow(
        "2",
        "--sgds-elevation-surface-2",
        "0 0 2px 0 rgba(14, 14, 14, 0.16), 0 2px 4px 0 rgba(14, 14, 14, 0.08);",
        "shadow-2"
      )}
      ${createShadowRow(
        "3",
        "--sgds-elevation-surface-3",
        "0 0 2px 0 rgba(14, 14, 14, 0.16), 0 4px 8px 0 rgba(14, 14, 14, 0.08);",
        "shadow-3"
      )}
      ${createShadowRow(
        "4",
        "--sgds-elevation-surface-4",
        "0 0 2px 0 rgba(14, 14, 14, 0.16), 0 8px 16px 0 rgba(14, 14, 14, 0.08);",
        "shadow-4"
      )}
      ${createShadowRow(
        "5",
        "--sgds-elevation-surface-5",
        "0 0 2px 0 rgba(14, 14, 14, 0.16), 0 16px 32px 0 rgba(14, 14, 14, 0.08);",
        "shadow-5"
      )}
    </sgds-table>
    <h2 class="sgds:my-lg">Edge Elevation</h2>
    <sgds-table>
      <sgds-table-row>
        <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
        <sgds-table-head>CSS Variable</sgds-table-head>
        <sgds-table-head>Description</sgds-table-head>
        <sgds-table-head>Preview</sgds-table-head>
      </sgds-table-row>
      ${createShadowRow(
        "edge-top",
        "--sgds-elevation-edge-top",
        "0 -2px 4px 0 rgba(14, 14, 14, 0.08)",
        "shadow-edge-top"
      )}
      ${createShadowRow(
        "edge-bottom",
        "--sgds-elevation-edge-bottom",
        "0 2px 4px 0 rgba(14, 14, 14, 0.08)",
        "shadow-edge-bottom"
      )}
    </sgds-table>
  </div>
`;
