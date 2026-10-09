import { html } from "lit";

export default {
  title: "Utilities/Typography/Font Family",
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

const TOKENS = [
  {
    tailwind: "sgds:font-brand",
    cssVar: "--sgds-font-family-brand",
    defaultValue: 'var(--sgds-font-family-sans, "Inter", system-ui, sans-serif)',
    previewClass: "sgds:font-brand",
    element: "span",
    previewText: "Brand font family"
  },
  {
    tailwind: "sgds:font-display",
    cssVar: "--sgds-font-family-display",
    defaultValue: 'var(--sgds-font-family-brand, "Inter", system-ui, sans-serif)',
    previewClass:
      "sgds:font-display sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default",
    element: "h1",
    previewText: "Display Heading"
  },
  {
    tailwind: "sgds:font-heading",
    cssVar: "--sgds-font-family-heading",
    defaultValue: 'var(--sgds-font-family-brand, "Inter", system-ui, sans-serif)',
    previewClass:
      "sgds:font-heading sgds:text-heading-md sgds:font-bold sgds:leading-md sgds:tracking-tight sgds:text-heading-default",
    element: "h2",
    previewText: "Section Heading"
  },
  {
    tailwind: "sgds:font-subtitle",
    cssVar: "--sgds-font-family-subtitle",
    defaultValue: 'var(--sgds-font-family-brand, "Inter", system-ui, sans-serif)',
    previewClass:
      "sgds:font-subtitle sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-body-default",
    element: "h5",
    previewText: "Subtitle Text"
  },
  {
    tailwind: "sgds:font-body",
    cssVar: "--sgds-font-family-body",
    defaultValue: 'var(--sgds-font-family-brand, "Inter", system-ui, sans-serif)',
    previewClass:
      "sgds:font-body sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default",
    element: "p",
    previewText: "Body paragraph text for general content."
  },
  {
    tailwind: "sgds:font-label",
    cssVar: "--sgds-font-family-label",
    defaultValue: 'var(--sgds-font-family-brand, "Inter", system-ui, sans-serif)',
    previewClass:
      "sgds:font-label sgds:text-label-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default",
    element: "label",
    previewText: "Form label text"
  },
  {
    tailwind: "sgds:font-code",
    cssVar: "--sgds-font-family-code",
    defaultValue: 'var(--sgds-font-family-mono, "Roboto Mono", monospace)',
    previewClass: "sgds:font-code sgds:text-body-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal",
    element: "code",
    previewText: 'const x = "hello";'
  }
];

const renderRow = t => html`
  <sgds-table-row>
    <sgds-table-cell>
      <div class="sgds:flex sgds:items-center sgds:gap-xs">
        <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${t.tailwind}</code>
        <button
          class="sgds:flex sgds:items-center sgds:justify-center sgds:w-8 sgds:h-8 sgds:cursor-pointer sgds:opacity-60 sgds:bg-transparent sgds:border-none sgds:p-0"
          @click="${e => copyToClipboard(t.tailwind, e.target.closest("button"))}"
          aria-label="Copy token"
        >
          <sgds-icon name="files"></sgds-icon>
        </button>
      </div>
    </sgds-table-cell>
    <sgds-table-cell>
      <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${t.cssVar}</code>
    </sgds-table-cell>
    <sgds-table-cell>
      <code class="sgds:bg-surface-raised sgds:px-xs sgds:py-3-xs sgds:rounded-sm">${t.defaultValue}</code>
    </sgds-table-cell>
    <sgds-table-cell> ${renderPreview(t)} </sgds-table-cell>
  </sgds-table-row>
`;

const renderPreview = t => {
  switch (t.element) {
    case "h1":
      return html`<h1 class="${t.previewClass} sgds:m-0">${t.previewText}</h1>`;
    case "h2":
      return html`<h2 class="${t.previewClass} sgds:m-0">${t.previewText}</h2>`;
    case "h5":
      return html`<h5 class="${t.previewClass} sgds:m-0">${t.previewText}</h5>`;
    case "p":
      return html`<p class="${t.previewClass} sgds:m-0">${t.previewText}</p>`;
    case "label":
      return html`<label class="${t.previewClass}">${t.previewText}</label>`;
    case "code":
      return html`<code class="${t.previewClass}">${t.previewText}</code>`;
    default:
      return html`<span class="${t.previewClass}">${t.previewText}</span>`;
  }
};

export const FontFamily = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Default Value</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    ${TOKENS.map(renderRow)}
  </sgds-table>
`;
