import { html } from "lit";

export default {
  title: "Utilities/Line Height",
  tags: ["autodocs"]
};

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const lineHeightTokens = [
  { size: 16, previewClass: "sgds:text-sm" },
  { size: 20, previewClass: "sgds:text-sm" },
  { size: 24, previewClass: "" },
  { size: 28, previewClass: "" },
  { size: 32, previewClass: "sgds:text-lg" },
  { size: 36, previewClass: "sgds:text-lg" },
  { size: 40, previewClass: "sgds:text-xl" },
  { size: 44, previewClass: "sgds:text-2xl" },
  { size: 48, previewClass: "sgds:text-2xl" },
  { size: 52, previewClass: "sgds:text-3xl" },
  { size: 56, previewClass: "sgds:text-3xl" },
  { size: 60, previewClass: "sgds:text-4xl" },
  { size: 64, previewClass: "sgds:text-4xl" }
];

export const LineHeight = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${lineHeightTokens.map(
      ({ size, previewClass }) => html`
        <sgds-table-row>
          <sgds-table-cell>
            <div class="sgds:flex sgds:items-center sgds:gap-xs">
              <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
                >sgds:leading-${size}</code
              >
              <button
                class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
                @click="${e => copyToClipboard(`sgds:leading-${size}`, e.target.closest("button"))}"
                aria-label="Copy token"
              >
                <sgds-icon name="files"></sgds-icon>
              </button>
            </div>
          </sgds-table-cell>
          <sgds-table-cell>
            <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
              >--sgds-line-height-${size}</code
            >
          </sgds-table-cell>
          <sgds-table-cell>
            <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono">${size}px</code>
          </sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:leading-${size} ${previewClass}">
              The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick
              daft zebras jump.
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

