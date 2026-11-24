import { html } from "lit";
import { copyToClipboard, CODE_CLASSES, COPY_BTN_CLASSES } from "../shared.js";

export default {
  title: "Utilities/Spacing/Gap",
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
/*  Static                                                            */
/* ------------------------------------------------------------------ */

const STATIC_TOKENS = [
  { suffix: "none", css: "--sgds-gap-none", value: "0px" },
  { suffix: "2-xs", css: "--sgds-gap-2-xs", value: "4px" },
  { suffix: "xs", css: "--sgds-gap-xs", value: "8px" },
  { suffix: "sm", css: "--sgds-gap-sm", value: "12px" },
  { suffix: "md", css: "--sgds-gap-md", value: "16px" },
  { suffix: "lg", css: "--sgds-gap-lg", value: "20px" },
  { suffix: "xl", css: "--sgds-gap-xl", value: "24px" },
  { suffix: "2-xl", css: "--sgds-gap-2-xl", value: "32px" },
  { suffix: "3-xl", css: "--sgds-gap-3-xl", value: "48px" }
];

export const Static = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${STATIC_TOKENS.map(
      ({ suffix, css, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:gap-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">${css}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:gap-${suffix}">
              <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
              <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
              <div class="sgds:bg-primary-default sgds:w-6 sgds:h-6"></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const COMPONENT_TOKENS = [
  { suffix: "xs", value: "8px / 16px / 20px" },
  { suffix: "sm", value: "12px / 20px / 24px" },
  { suffix: "md", value: "16px / 24px / 32px" },
  { suffix: "lg", value: "20px / 32px / 48px" },
  { suffix: "xl", value: "24px / 48px / 64px" }
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
          ${renderTokenCell(`sgds:gap-component-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-component-gap-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div
              class="sgds:flex sgds:items-center sgds:gap-component-${suffix} sgds:bg-primary-default sgds:text-fixed-light sgds:px-sm sgds:py-2-xs sgds:rounded-full sgds:w-fit"
            >
              <sgds-icon name="star-fill"></sgds-icon>
              <span class="sgds:text-label-sm">Badge</span>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

/* ------------------------------------------------------------------ */
/*  Layout                                                            */
/* ------------------------------------------------------------------ */

const LAYOUT_TOKENS = [
  { suffix: "2-xs", value: "4px / 12px / 16px" },
  { suffix: "xs", value: "8px / 16px / 20px" },
  { suffix: "sm", value: "12px / 20px / 24px" },
  { suffix: "md", value: "16px / 24px / 32px" },
  { suffix: "lg", value: "20px / 32px / 48px" },
  { suffix: "xl", value: "24px / 48px / 64px" }
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
          ${renderTokenCell(`sgds:gap-layout-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-layout-gap-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:gap-layout-${suffix}">
              <div class="sgds:bg-success-default sgds:p-md sgds:rounded-sm sgds:flex-1"></div>
              <div class="sgds:bg-success-default sgds:p-md sgds:rounded-sm sgds:flex-1"></div>
              <div class="sgds:bg-success-default sgds:p-md sgds:rounded-sm sgds:flex-1"></div>
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;

/* ------------------------------------------------------------------ */
/*  Text                                                              */
/* ------------------------------------------------------------------ */

const TEXT_TOKENS = [
  { suffix: "2-xs", value: "4px / 4px / 4px" },
  { suffix: "xs", value: "8px / 8px / 8px" },
  { suffix: "sm", value: "8px / 12px / 12px" },
  { suffix: "md", value: "12px / 16px / 16px" },
  { suffix: "lg", value: "16px / 20px / 20px" },
  { suffix: "xl", value: "20px / 24px / 24px" },
  { suffix: "2-xl", value: "24px / 32px / 32px" }
];

export const Text = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Value (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${TEXT_TOKENS.map(
      ({ suffix, value }) => html`
        <sgds-table-row>
          ${renderTokenCell(`sgds:gap-text-${suffix}`)}
          <sgds-table-cell><code class="${CODE_CLASSES}">--sgds-text-gap-${suffix}</code></sgds-table-cell>
          <sgds-table-cell><code class="${CODE_CLASSES}">${value}</code></sgds-table-cell>
          <sgds-table-cell>
            <div class="sgds:flex sgds:flex-col sgds:gap-text-${suffix}">
              <span class="sgds:bg-primary-surface-muted sgds:px-sm sgds:py-3-xs sgds:rounded-sm sgds:text-label-sm"
                >Heading</span
              >
              <span class="sgds:bg-primary-surface-muted sgds:px-sm sgds:py-3-xs sgds:rounded-sm sgds:text-label-sm"
                >Body text</span
              >
            </div>
          </sgds-table-cell>
        </sgds-table-row>
      `
    )}
  </sgds-table>
`;
