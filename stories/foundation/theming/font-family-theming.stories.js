import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { Title, Description } from "@storybook/addon-docs/blocks";
import React from "react";

const FONT_OPTIONS = {
  "Sans (Inter)": "var(--sgds-font-family-sans)",
  "Serif (Roboto Serif)": "var(--sgds-font-family-serif)",
  "Mono (Roboto Mono)": "var(--sgds-font-family-mono)",
  Cursive: "cursive"
};

const DOCS = `
SGDS ships seven semantic font-family tokens that control typography across the entire design system. All tokens inherit from \`--sgds-font-family-brand\` by default (except \`--sgds-font-family-code\` which uses the mono stack).

| Token | Default value | Description |
|-------|---------------|-------------|
| \`--sgds-font-family-brand\` | \`var(--sgds-font-family-sans)\` | Master brand font. All other semantic tokens inherit from this unless individually overridden. |
| \`--sgds-font-family-display\` | \`var(--sgds-font-family-brand)\` | Large hero and display headings. |
| \`--sgds-font-family-heading\` | \`var(--sgds-font-family-brand)\` | Section headings. |
| \`--sgds-font-family-subtitle\` | \`var(--sgds-font-family-brand)\` | Subtitles and secondary headings. |
| \`--sgds-font-family-body\` | \`var(--sgds-font-family-brand)\` | Paragraph and body text. |
| \`--sgds-font-family-label\` | \`var(--sgds-font-family-brand)\` | Form labels, buttons, badges, and UI controls. |
| \`--sgds-font-family-code\` | \`var(--sgds-font-family-mono)\` | Code blocks and inline code. |

### Changing the brand font

To use a custom font, first load it via Google Fonts (or any font provider) in your HTML \`<head>\`:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap">
\`\`\`

Then override the brand token in your CSS:

\`\`\`css
:root {
  --sgds-font-family-brand: "Noto Sans", system-ui, sans-serif;
}
\`\`\`

### Mixing fonts per role

You can assign a different font stack to each typographic role. Each semantic token can reference a primitive token or a custom font-family value:

\`\`\`css
:root {
  --sgds-font-family-display: var(--sgds-font-family-serif);
  --sgds-font-family-heading: var(--sgds-font-family-serif);
  --sgds-font-family-subtitle: var(--sgds-font-family-sans);
  --sgds-font-family-body: var(--sgds-font-family-sans);
  --sgds-font-family-label: var(--sgds-font-family-sans);
  --sgds-font-family-code: var(--sgds-font-family-mono);
}
\`\`\`

### Import order

Custom font overrides must come **after** the theme file:

\`\`\`css
@import "@govtechsg/sgds-web-component/themes/day.css";

:root {
  --sgds-font-family-display: var(--sgds-font-family-serif);
  --sgds-font-family-heading: var(--sgds-font-family-serif);
  --sgds-font-family-subtitle: var(--sgds-font-family-sans);
  --sgds-font-family-body: var(--sgds-font-family-sans);
  --sgds-font-family-label: var(--sgds-font-family-sans);
  --sgds-font-family-code: var(--sgds-font-family-mono);
}
\`\`\`
`;

const fontArgType = (name, defaultVar) => ({
  control: "select",
  options: Object.keys(FONT_OPTIONS),
  mapping: FONT_OPTIONS,
  name,
  table: { defaultValue: { summary: defaultVar } }
});

const setToken = (token, value) => {
  document.documentElement.style.setProperty(token, value);
  return unsafeHTML(`<style>:root { ${token}: ${value}; }</style>`);
};

const storyParams = {
  actions: { disable: true },
  interactions: { disable: true },
  controls: { disable: false },
  layout: "padded"
};

const DocsOnlyPage = () =>
  React.createElement(React.Fragment, null, React.createElement(Title), React.createElement(Description));

export default {
  title: "Foundation/Theming/Font Family",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      page: DocsOnlyPage,
      description: { component: DOCS }
    }
  }
};

/* ------------------------------------------------------------------ */
/*  1. Display — display + heading                                     */
/* ------------------------------------------------------------------ */
export const Display = {
  render: args => {
    const style = setToken("--sgds-font-family-display", args.display);
    return html`
      ${style}
      <div>
        <h1 class="sgds:font-display sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter">
          Display Large Bold
        </h1>
        <h1 class="sgds:font-display sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter">
          Display Large Light
        </h1>
        <h1 class="sgds:font-display sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter">
          Display Medium Bold
        </h1>
        <h1 class="sgds:font-display sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter">
          Display Medium Light
        </h1>
        <h1 class="sgds:font-display sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter">
          Display Small Bold
        </h1>
        <h1 class="sgds:font-display sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter">
          Display Small Light
        </h1>
      </div>
    `;
  },
  name: "Display",
  args: {
    display: "Sans (Inter)"
  },
  argTypes: {
    display: fontArgType("--sgds-font-family-display", "var(--sgds-font-family-brand)")
  },
  parameters: {
    ...storyParams,
    docs: { description: { story: DOCS } }
  }
};

/* ------------------------------------------------------------------ */
/*  2. Heading — heading + body                                        */
/* ------------------------------------------------------------------ */
export const Heading = {
  render: args => {
    const style = setToken("--sgds-font-family-heading", args.heading);
    return html`
      ${style}
      <div>
        <h1 class="sgds:font-heading sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight">
          Heading XL Bold
        </h1>
        <h1 class="sgds:font-heading sgds:text-heading-xl sgds:font-light sgds:leading-xl sgds:tracking-tight">
          Heading XL Light
        </h1>
        <h2 class="sgds:font-heading sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">
          Heading Large Bold
        </h2>
        <h2 class="sgds:font-heading sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight">
          Heading Large Light
        </h2>
        <h3 class="sgds:font-heading sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">
          Heading Medium Semibold
        </h3>
        <h3 class="sgds:font-heading sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight">
          Heading Medium Light
        </h3>
        <h4 class="sgds:font-heading sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
          Heading Small Semibold
        </h4>
        <h4 class="sgds:font-heading sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight">
          Heading Small Light
        </h4>
      </div>
    `;
  },
  name: "Heading",
  args: {
    heading: "Sans (Inter)"
  },
  argTypes: {
    heading: fontArgType("--sgds-font-family-heading", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  3. Subtitle — subtitle + body                                      */
/* ------------------------------------------------------------------ */
export const Subtitle = {
  render: args => {
    const style = setToken("--sgds-font-family-subtitle", args.subtitle);
    return html`
      ${style}
      <div>
        <h5 class="sgds:font-subtitle sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
          Subtitle Medium Semibold
        </h5>
        <h5 class="sgds:font-subtitle sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal">
          Subtitle Medium Light
        </h5>
        <h6 class="sgds:font-subtitle sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
          Subtitle Small Semibold
        </h6>
        <h6 class="sgds:font-subtitle sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal">
          Subtitle Small Light
        </h6>
      </div>
    `;
  },
  name: "Subtitle",
  args: {
    subtitle: "Sans (Inter)"
  },
  argTypes: {
    subtitle: fontArgType("--sgds-font-family-subtitle", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  4. Body — body                                                     */
/* ------------------------------------------------------------------ */
export const Body = {
  render: args => {
    const style = setToken("--sgds-font-family-body", args.body);
    return html`
      ${style}
      <div>
        <p class="sgds:font-body sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal">
          Body Large Semibold
        </p>
        <p class="sgds:font-body sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
          Body Large Regular
        </p>
        <p class="sgds:font-body sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
          Body Medium Semibold
        </p>
        <p class="sgds:font-body sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Body Medium Regular
        </p>
        <p class="sgds:font-body sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
          Body Small Semibold
        </p>
        <p class="sgds:font-body sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
          Body Small Regular
        </p>
      </div>
    `;
  },
  name: "Body",
  args: {
    body: "Sans (Inter)"
  },
  argTypes: {
    body: fontArgType("--sgds-font-family-body", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  5. Label — label                                                   */
/* ------------------------------------------------------------------ */
export const Label = {
  render: args => {
    const style = setToken("--sgds-font-family-label", args.label);
    return html`
      ${style}
      <div>
        <div class="sgds:font-label sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal">
          Label Large Semibold
        </div>
        <div class="sgds:font-label sgds:text-label-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
          Label Large Regular
        </div>
        <div class="sgds:font-label sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
          Label Medium Semibold
        </div>
        <div class="sgds:font-label sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Label Medium Regular
        </div>
        <div class="sgds:font-label sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal">
          Label Medium Light
        </div>
        <div class="sgds:font-label sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
          Label Small Semibold
        </div>
        <div class="sgds:font-label sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
          Label Small Regular
        </div>
        <div class="sgds:font-label sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal">
          Label XS Semibold
        </div>
        <div class="sgds:font-label sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal">
          Label XS Regular
        </div>
      </div>
    `;
  },
  name: "Label",
  args: {
    label: "Sans (Inter)"
  },
  argTypes: {
    label: fontArgType("--sgds-font-family-label", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  6. Code — code                                                     */
/* ------------------------------------------------------------------ */
// temporarily hidden
const _Code = {
  render: args => {
    const style = setToken("--sgds-font-family-code", args.code);
    return html`
      ${style}
      <div>
        <code class="sgds:font-code sgds:text-label-md sgds:leading-xs sgds:tracking-normal"
          >Code Medium: const app = document.querySelector("#app");</code
        >
        <br />
        <code class="sgds:font-code sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal"
          >Code Small: app.innerHTML = "&lt;sgds-masthead&gt;";</code
        >
        <br />
        <code class="sgds:font-code sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal"
          >Code XS: import "@govtechsg/sgds-web-component";</code
        >
      </div>
    `;
  },
  name: "Code",
  args: {
    code: "Mono (Roboto Mono)"
  },
  argTypes: {
    code: {
      control: "select",
      options: ["Mono (Roboto Mono)", "Mono (System)"],
      mapping: {
        "Mono (Roboto Mono)": "var(--sgds-font-family-mono)",
        "Mono (System)": "monospace"
      },
      name: "--sgds-font-family-code",
      table: { defaultValue: { summary: "var(--sgds-font-family-mono)" } }
    }
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  7. Caption — label                                                 */
/* ------------------------------------------------------------------ */
export const Caption = {
  render: args => {
    const style = setToken("--sgds-font-family-label", args.caption);
    return html`
      ${style}
      <div>
        <div class="sgds:font-label sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
          Caption Semibold
        </div>
        <div class="sgds:font-label sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
          Caption Regular
        </div>
      </div>
    `;
  },
  name: "Caption",
  args: {
    caption: "Sans (Inter)"
  },
  argTypes: {
    caption: fontArgType("--sgds-font-family-label", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  8. Overline — label                                                */
/* ------------------------------------------------------------------ */
export const Overline = {
  render: args => {
    const style = setToken("--sgds-font-family-label", args.overline);
    return html`
      ${style}
      <div>
        <div
          class="sgds:font-label sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase"
        >
          Overline Semibold
        </div>
        <div
          class="sgds:font-label sgds:text-overline-md sgds:font-regular sgds:leading-2-xs sgds:tracking-wide sgds:uppercase"
        >
          Overline Regular
        </div>
      </div>
    `;
  },
  name: "Overline",
  args: {
    overline: "Sans (Inter)"
  },
  argTypes: {
    overline: fontArgType("--sgds-font-family-label", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  9. Link — label                                                    */
/* ------------------------------------------------------------------ */
export const Link = {
  render: args => {
    const style = setToken("--sgds-font-family-label", args.link);
    return html`
      ${style}
      <div>
        <a
          href="#"
          class="sgds:font-label sgds:text-link-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:underline"
          >Link Large</a
        ><br />
        <a
          href="#"
          class="sgds:font-label sgds:text-link-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:underline"
          >Link Medium</a
        ><br />
        <a
          href="#"
          class="sgds:font-label sgds:text-link-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:underline"
          >Link Small</a
        ><br />
        <a
          href="#"
          class="sgds:font-label sgds:text-link-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:underline"
          >Link XS</a
        >
      </div>
    `;
  },
  name: "Link",
  args: {
    link: "Sans (Inter)"
  },
  argTypes: {
    link: fontArgType("--sgds-font-family-label", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  10. List — body                                                    */
/* ------------------------------------------------------------------ */
export const List = {
  render: args => {
    const style = setToken("--sgds-font-family-body", args.list);
    return html`
      ${style}
      <div>
        <ul class="sgds:font-body sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
          <li>List Large — First item</li>
          <li>List Large — Second item</li>
        </ul>
        <ul class="sgds:font-body sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          <li>List Medium — First item</li>
          <li>List Medium — Second item</li>
        </ul>
        <ul class="sgds:font-body sgds:text-list-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
          <li>List Small — First item</li>
          <li>List Small — Second item</li>
        </ul>
      </div>
    `;
  },
  name: "List",
  args: {
    list: "Sans (Inter)"
  },
  argTypes: {
    list: fontArgType("--sgds-font-family-body", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};

/* ------------------------------------------------------------------ */
/*  11. Pairing Fonts                                                  */
/* ------------------------------------------------------------------ */
export const PairingFonts = {
  render: args => {
    const styles = [
      setToken("--sgds-font-family-display", args.display),
      setToken("--sgds-font-family-heading", args.heading),
      setToken("--sgds-font-family-label", args.label)
    ];
    return html`
      ${styles}
      <div>
        <div
          class="sgds:font-label sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:mb-xs"
        >
          Overline Label
        </div>
        <h1
          class="sgds:font-display sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:mb-sm"
        >
          Display Medium Bold
        </h1>
        <h3
          class="sgds:font-heading sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight sgds:mb-md"
        >
          Supporting heading that provides context for the section
        </h3>
      </div>
    `;
  },
  name: "Pairing Fonts",
  args: {
    display: "Serif (Roboto Serif)",
    heading: "Sans (Inter)",
    label: "Sans (Inter)"
  },
  argTypes: {
    display: fontArgType("--sgds-font-family-display", "var(--sgds-font-family-brand)"),
    heading: fontArgType("--sgds-font-family-heading", "var(--sgds-font-family-brand)"),
    label: fontArgType("--sgds-font-family-label", "var(--sgds-font-family-brand)")
  },
  parameters: storyParams
};
