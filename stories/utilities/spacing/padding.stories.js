import { html } from "lit";
import { copyToClipboard, CODE_CLASSES, COPY_BTN_CLASSES } from "../shared.js";

export default {
  title: "Utilities/Spacing/Padding",
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

/* ------------------------------------------------------------------ */
/*  Static padding tokens                                             */
/* ------------------------------------------------------------------ */

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

const PaddingTableRow = item => {
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
        <div class="${item.class} sgds:bg-primary-default">
          <div class="sgds:bg-surface-raised sgds:p-xs sgds:text-center">Content</div>
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
    ${PADDING_SCALE.map(item => PaddingTableRow(item))}
  </sgds-table>
`;

/* ------------------------------------------------------------------ */
/*  Component padding tokens                                          */
/* ------------------------------------------------------------------ */

const COMPONENT_TOKENS = [
  { suffix: "xs", value: "16px / 20px / 24px" },
  { suffix: "sm", value: "20px / 24px / 32px" },
  { suffix: "md", value: "24px / 32px / 48px" },
  { suffix: "lg", value: "32px / 48px / 64px" },
  { suffix: "xl", value: "48px / 64px / 96px" }
];

export const Component = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${COMPONENT_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:p-component-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-component-padding-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div
              class="sgds:bg-accent-surface-muted sgds:border sgds:border-accent-default sgds:rounded-sm sgds:inline-block"
            >
              <div
                class="sgds:p-component-${suffix} sgds:bg-accent-default sgds:text-fixed-light sgds:rounded-sm sgds:text-label-sm"
              >
                Button
              </div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

/* ------------------------------------------------------------------ */
/*  Layout padding tokens                                             */
/* ------------------------------------------------------------------ */

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
          ${renderTokenCell(`sgds:p-layout-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-layout-padding-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div
              class="sgds:bg-warning-surface-muted sgds:border sgds:border-warning-default sgds:rounded-sm sgds:inline-block"
            >
              <div
                class="sgds:p-layout-${suffix} sgds:bg-warning-default sgds:text-fixed-dark sgds:rounded-sm sgds:text-label-sm"
              >
                Content
              </div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
