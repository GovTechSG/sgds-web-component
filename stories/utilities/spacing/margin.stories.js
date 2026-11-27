import { html } from "lit";
import { copyToClipboard, CODE_CLASSES, COPY_BTN_CLASSES } from "../shared.js";

export default {
  title: "Utilities/Spacing/Margin",
  tags: ["!autodocs"]
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

// --- Static margin scale ---

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

const MarginTableRow = item => {
  return html`
    <sgds-table-row>
      <sgds-table-cell>
        <div class="sgds:flex sgds:items-center sgds:gap-xs">
          <code class="${CODE_CLASSES}">${item.class}</code>
          <button
            class="${COPY_BTN_CLASSES}"
            @click="${e => copyToClipboard(item.class, e.target.closest("button"))}"
            aria-label="Copy token"
          >
            <sgds-icon name="files"></sgds-icon>
          </button>
        </div>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="${CODE_CLASSES}">${item.variable}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <code class="${CODE_CLASSES}">${item.value}</code>
      </sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:w-40 sgds:h-40" style="position: relative;">
          <div
            class="sgds:bg-surface-raised sgds:w-12 sgds:h-12 ${item.class}"
            style="position: absolute; top: 0; left: 0;"
          ></div>
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const Static = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${MARGIN_SCALE.map(item => MarginTableRow(item))}
  </sgds-table>
`;

// --- Layout margin ---

const LAYOUT_TOKENS = [
  { suffix: "xs", value: "16px / 20px / 24px" },
  { suffix: "sm", value: "20px / 24px / 32px" },
  { suffix: "md", value: "24px / 32px / 48px" },
  { suffix: "lg", value: "32px / 48px / 64px" },
  { suffix: "xl", value: "48px / 64px / 96px" }
];

export const Layout = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${LAYOUT_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:m-layout-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-layout-padding-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:bg-primary-default sgds:w-40 sgds:h-40" style="position: relative;">
              <div
                class="sgds:bg-surface-raised sgds:w-12 sgds:h-12 sgds:m-layout-${suffix}"
                style="position: absolute; top: 0; left: 0;"
              ></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

// --- Paragraph spacing ---

const PARAGRAPH_SPACING_TOKENS = [
  { suffix: "none", value: "0px" },
  { suffix: "sm", value: "0.5rem (8px)" },
  { suffix: "md", value: "1rem (16px)" },
  { suffix: "lg", value: "1.5rem (24px)" },
  { suffix: "xl", value: "2rem (32px)" }
];

export const Paragraph = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${PARAGRAPH_SPACING_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:mb-paragraph-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-paragraph-spacing-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div>
              <p class="sgds:mb-paragraph-${suffix}">First paragraph.</p>
              <p>Second paragraph.</p>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

// --- List spacing ---

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
