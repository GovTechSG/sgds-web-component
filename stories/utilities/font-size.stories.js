import { html } from "lit";

export default {
  title: "Utilities/Font Size",
  tags: ["!autodocs"]
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

const RESPONSIVE_FONT_SIZES = {
  display: [
    {
      name: "Display SM",
      class: "sgds:text-display-sm",
      variable: "--sgds-font-size-display-sm",
      responsive: "32px / 36px / 40px"
    },
    {
      name: "Display MD",
      class: "sgds:text-display-md",
      variable: "--sgds-font-size-display-md",
      responsive: "36px / 44px / 48px"
    },
    {
      name: "Display LG",
      class: "sgds:text-display-lg",
      variable: "--sgds-font-size-display-lg",
      responsive: "40px / 52px / 56px"
    }
  ],
  heading: [
    {
      name: "Heading SM",
      class: "sgds:text-heading-sm",
      variable: "--sgds-font-size-heading-sm",
      responsive: "20px / 22px / 24px"
    },
    {
      name: "Heading MD",
      class: "sgds:text-heading-md",
      variable: "--sgds-font-size-heading-md",
      responsive: "24px / 26px / 28px"
    },
    {
      name: "Heading LG",
      class: "sgds:text-heading-lg",
      variable: "--sgds-font-size-heading-lg",
      responsive: "28px / 30px / 32px"
    },
    {
      name: "Heading XL",
      class: "sgds:text-heading-xl",
      variable: "--sgds-font-size-heading-xl",
      responsive: "32px / 36px / 40px"
    }
  ],
  subtitle: [
    {
      name: "Subtitle SM",
      class: "sgds:text-subtitle-sm",
      variable: "--sgds-font-size-subtitle-sm",
      responsive: "16px / 16px / 16px"
    },
    {
      name: "Subtitle MD",
      class: "sgds:text-subtitle-md",
      variable: "--sgds-font-size-subtitle-md",
      responsive: "18px / 20px / 20px"
    }
  ],
  body: [
    {
      name: "Body SM",
      class: "sgds:text-body-sm",
      variable: "--sgds-font-size-body-sm",
      responsive: "14px / 14px / 14px"
    },
    {
      name: "Body MD",
      class: "sgds:text-body-md",
      variable: "--sgds-font-size-body-md",
      responsive: "16px / 16px / 16px"
    },
    {
      name: "Body LG",
      class: "sgds:text-body-lg",
      variable: "--sgds-font-size-body-lg",
      responsive: "18px / 20px / 20px"
    }
  ],
  label: [
    {
      name: "Label XS",
      class: "sgds:text-label-xs",
      variable: "--sgds-font-size-label-xs",
      responsive: "12px / 12px / 12px"
    },
    {
      name: "Label SM",
      class: "sgds:text-label-sm",
      variable: "--sgds-font-size-label-sm",
      responsive: "14px / 14px / 14px"
    },
    {
      name: "Label MD",
      class: "sgds:text-label-md",
      variable: "--sgds-font-size-label-md",
      responsive: "16px / 16px / 16px"
    },
    {
      name: "Label LG",
      class: "sgds:text-label-lg",
      variable: "--sgds-font-size-label-lg",
      responsive: "18px / 20px / 20px"
    }
  ],
  caption: [
    {
      name: "Caption MD",
      class: "sgds:text-caption-md",
      variable: "--sgds-font-size-caption-md",
      responsive: "14px / 14px / 14px"
    }
  ],
  overline: [
    {
      name: "Overline MD",
      class: "sgds:text-overline-md",
      variable: "--sgds-font-size-overline-md",
      responsive: "14px / 14px / 14px"
    }
  ]
};

const copyToClipboard = (token, buttonEl) => {
  navigator.clipboard.writeText(token);
  const icon = buttonEl.querySelector("sgds-icon");
  icon.setAttribute("name", "check");
  setTimeout(() => {
    icon.setAttribute("name", "files");
  }, 3000);
};

const FontSizeTableRow = item => {
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
        <div class="${item.class}">Sample Text</div>
      </sgds-table-cell>
    </sgds-table-row>
  `;
};

const ResponsiveFontSizeTableRow = (item, customPreview) => {
  const preview = customPreview ? customPreview(item) : html`<div class="${item.class}">${item.name}</div>`;

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
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm sgds:font-mono"
          >${item.responsive}</code
        >
      </sgds-table-cell>
      <sgds-table-cell> ${preview} </sgds-table-cell>
    </sgds-table-row>
  `;
};

export const DisplaySizes = () => html`
  <div class="sgds:mb-md">
    <p class="sgds:mb-md sgds:text-subtle">
      Display sizes adapt across breakpoints: mobile (&lt; 1024px), tablet (≥ 1024px), desktop (≥ 1440px)
    </p>
    <sgds-table>
      <sgds-table-row>
        <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
        <sgds-table-head>CSS Variable</sgds-table-head>
        <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
        <sgds-table-head>Preview</sgds-table-head>
      </sgds-table-row>
      ${RESPONSIVE_FONT_SIZES.display.map(item => ResponsiveFontSizeTableRow(item))}
    </sgds-table>
  </div>
`;

export const HeadingSizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_FONT_SIZES.heading.map(item => ResponsiveFontSizeTableRow(item))}
  </sgds-table>
`;

export const SubtitleSizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_FONT_SIZES.subtitle.map(item => ResponsiveFontSizeTableRow(item))}
  </sgds-table>
`;

export const BodySizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_FONT_SIZES.body.map(item => ResponsiveFontSizeTableRow(item))}
  </sgds-table>
`;

export const LabelSizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_FONT_SIZES.label.map(item => ResponsiveFontSizeTableRow(item))}
  </sgds-table>
`;

export const CaptionSizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_FONT_SIZES.caption.map(item =>
      ResponsiveFontSizeTableRow(
        item,
        item => html`
          <table class="sgds:border-0">
            <caption class="${item.class}">
              ${item.name}
            </caption>
          </table>
        `
      )
    )}
  </sgds-table>
`;

export const OverlineSizes = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Sizes (Mobile / Tablet / Desktop)</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${RESPONSIVE_FONT_SIZES.overline.map(item =>
      ResponsiveFontSizeTableRow(item, item => html`<div class="${item.class} sgds:uppercase">${item.name}</div>`)
    )}
  </sgds-table>
`;

export const StaticFontSizes = () => html`
  <div class="sgds:mb-2-xl">
    <h3 class="sgds:mb-md">Primitive Font Sizes</h3>
    <sgds-table>
      <sgds-table-row>
        <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
        <sgds-table-head>CSS Variable</sgds-table-head>
        <sgds-table-head>Value</sgds-table-head>
        <sgds-table-head>Preview</sgds-table-head>
      </sgds-table-row>
      ${FONT_SIZE_SCALE.map(item => FontSizeTableRow(item))}
    </sgds-table>
  </div>
`;
