import { html } from "lit";

export default {
  title: "Foundation/Theming/GovTech Brand Palettes"
};

const GT_PALETTES = [
  {
    name: "Blue",
    shades: [
      { shade: 100, hex: "#EFF5FC" },
      { shade: 200, hex: "#CEE1F6" },
      { shade: 300, hex: "#A0C5EE" },
      { shade: 400, hex: "#73A9E5" },
      { shade: 500, hex: "#4288D6" },
      { shade: 600, hex: "#356DAC" },
      { shade: 700, hex: "#285483" },
      { shade: 800, hex: "#1E3E62" },
      { shade: 900, hex: "#152B44" }
    ]
  },
  {
    name: "Cyan",
    shades: [
      { shade: 100, hex: "#E0F7FE" },
      { shade: 200, hex: "#A7E9FB" },
      { shade: 300, hex: "#47D1F6" },
      { shade: 400, hex: "#00B3E2" },
      { shade: 500, hex: "#0091B8" },
      { shade: 600, hex: "#007493" },
      { shade: 700, hex: "#005971" },
      { shade: 800, hex: "#004355" },
      { shade: 900, hex: "#002E3B" }
    ]
  },
  {
    name: "Magenta",
    shades: [
      { shade: 100, hex: "#FBF2F9" },
      { shade: 200, hex: "#F2D8ED" },
      { shade: 300, hex: "#E5B2DC" },
      { shade: 400, hex: "#D98BCB" },
      { shade: 500, hex: "#C95EB7" },
      { shade: 600, hex: "#B82EA0" },
      { shade: 700, hex: "#8E247B" },
      { shade: 800, hex: "#6A1B5D" },
      { shade: 900, hex: "#4A1341" }
    ]
  },
  {
    name: "Pink",
    shades: [
      { shade: 100, hex: "#FDF0F6" },
      { shade: 200, hex: "#F9D6E4" },
      { shade: 300, hex: "#F3AECB" },
      { shade: 400, hex: "#ED84AF" },
      { shade: 500, hex: "#E54D8C" },
      { shade: 600, hex: "#C7286A" },
      { shade: 700, hex: "#991F52" },
      { shade: 800, hex: "#74173D" },
      { shade: 900, hex: "#51102B" }
    ]
  },
  {
    name: "Purple",
    shades: [
      { shade: 100, hex: "#F6F3FB" },
      { shade: 200, hex: "#E5DBF2" },
      { shade: 300, hex: "#CEBAE7" },
      { shade: 400, hex: "#B598DC" },
      { shade: 500, hex: "#9A74CF" },
      { shade: 600, hex: "#8055BB" },
      { shade: 700, hex: "#634190" },
      { shade: 800, hex: "#49306B" },
      { shade: 900, hex: "#33214A" }
    ]
  },
  {
    name: "Red",
    shades: [
      { shade: 100, hex: "#FEF0F1" },
      { shade: 200, hex: "#FDD6D8" },
      { shade: 300, hex: "#FBADB1" },
      { shade: 400, hex: "#F88289" },
      { shade: 500, hex: "#F5424B" },
      { shade: 600, hex: "#CB2B33" },
      { shade: 700, hex: "#9E2127" },
      { shade: 800, hex: "#76191E" },
      { shade: 900, hex: "#531115" }
    ]
  }
];

const GT_DOCS = `
GovTech products should use one of the pre-approved colour palettes shipped with SGDS instead of defining custom hex values. Each product must pick **exactly one** colour — do not import multiple GT palettes.

The available palettes are:

| Import path | Colour |
|-------------|--------|
| \`@govtechsg/sgds-web-component/themes/gt/blue.css\` | Blue |
| \`@govtechsg/sgds-web-component/themes/gt/cyan.css\` | Cyan |
| \`@govtechsg/sgds-web-component/themes/gt/magenta.css\` | Magenta |
| \`@govtechsg/sgds-web-component/themes/gt/pink.css\` | Pink |
| \`@govtechsg/sgds-web-component/themes/gt/purple.css\` | Purple |
| \`@govtechsg/sgds-web-component/themes/gt/red.css\` | Red |

Each GT file defines \`--gt-color-100\` through \`--gt-color-900\`. Map these onto the SGDS product primary scale in your custom CSS:

\`\`\`css
/* yourCustomCss.css */
:root {
  --sgds-product-primary-100: var(--gt-color-100);
  --sgds-product-primary-200: var(--gt-color-200);
  --sgds-product-primary-300: var(--gt-color-300);
  --sgds-product-primary-400: var(--gt-color-400);
  --sgds-product-primary-500: var(--gt-color-500);
  --sgds-product-primary-600: var(--gt-color-600);
  --sgds-product-primary-700: var(--gt-color-700);
  --sgds-product-primary-800: var(--gt-color-800);
  --sgds-product-primary-900: var(--gt-color-900);
}
\`\`\`

Import order matters — the GT palette file must come after \`themes/day.css\` and before your custom mapping CSS:

\`\`\`css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/gt/blue.css"; /* pick one colour only */
@import "./yourCustomCss.css";
\`\`\`
`;

const GtPalettesTemplate = () => html`
  <div class="sgds:p-layout-xs sgds:flex sgds:flex-col sgds:gap-layout-lg">
    ${GT_PALETTES.map(
      palette => html`
        <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            GT ${palette.name}
          </h4>
          <div class="sgds:flex">
            ${palette.shades.map(
              (s, i) => html`
                <div
                  class="sgds:relative sgds:w-30 sgds:h-30 sgds:shrink-0 sgds:rounded-md sgds:shadow-2 sgds:p-2 sgds:flex sgds:flex-col sgds:justify-end sgds:font-mono sgds:text-label-xs sgds:leading-2-xs${i > 0 ? " sgds:-ml-12" : ""}"
                  style="background-color: ${s.hex}; color: ${s.shade >= 500 ? "#ffffff" : "#111111"};"
                >
                  <span class="sgds:font-bold">${s.shade}</span>
                  <span>${s.hex}</span>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  </div>
`;

export const GtBrandPalettes = {
  render: GtPalettesTemplate.bind({}),
  name: "GovTech Brand Palettes",
  args: {},
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: GT_DOCS
      }
    }
  },
  tags: ["autodocs"]
};
