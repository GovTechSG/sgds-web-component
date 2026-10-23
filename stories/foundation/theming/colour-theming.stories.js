import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { BackgroundColor, Color, Theme } from "@adobe/leonardo-contrast-colors";

/* ── Leonardo palette generation ──────────────────────────────────────────── */

const SHADE_KEYS = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
const SHADE_RATIOS = [1.1, 1.33, 1.78, 2.46, 3.64, 5.33, 7.81, 10.86, 14.35];

function toHex(color) {
  const s = color.trim();
  // Already a hex value
  if (/^#[0-9a-fA-F]{6}$/.test(s)) return s.toUpperCase();
  if (/^#[0-9a-fA-F]{3}$/.test(s)) {
    const [, r, g, b] = s.match(/^#(.)(.)(.)$/);
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  // RGBA/RGB string from Storybook color picker
  const match = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (match) {
    const [r, g, b] = match.slice(1).map(Number);
    return `#${[r, g, b].map(c => c.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
  }
  return "#6B4FEB";
}

function generatePalette(hex) {
  const seed = toHex(hex);
  const ratios = Object.fromEntries(SHADE_KEYS.map((shade, i) => [shade, SHADE_RATIOS[i]]));

  const backgroundColor = new BackgroundColor({
    name: "background",
    colorKeys: ["#FFFFFF"],
    ratios
  });
  const customColor = new Color({
    name: "primary",
    colorKeys: [seed],
    ratios
  });
  const theme = new Theme({
    colors: [customColor],
    backgroundColor,
    lightness: 100
  });

  const primary = theme.contrastColors.find(c => "name" in c && c.name === "primary");
  if (!primary || !("values" in primary)) {
    return Object.fromEntries(SHADE_KEYS.map(shade => [shade, seed]));
  }
  return Object.fromEntries(primary.values.map(v => [v.name, v.value.toUpperCase()]));
}

/* ── Contrast calculations (ported from sgds ColourPalettePage.vue) ─────── */

const CONTRAST_BG_LIGHT = "#FFFFFF";
const CONTRAST_BG_DARK = "#0E0E0E";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  };
}

function hexToRgba(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const channels = [r, g, b].map(c => {
    const n = c / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function wcagContrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// APCA-W3 (0.0.98G 4g)
function apcaLuminance(r, g, b) {
  let Y = 0.2126729 * (r / 255) ** 2.4 + 0.7151522 * (g / 255) ** 2.4 + 0.072175 * (b / 255) ** 2.4;
  return Y < 0.022 ? Y + (0.022 - Y) ** 1.414 : Y;
}

function apcaContrast(textHex, bgHex) {
  const t = hexToRgb(textHex);
  const b = hexToRgb(bgHex);
  const Ytxt = apcaLuminance(t.r, t.g, t.b);
  const Ybg = apcaLuminance(b.r, b.g, b.b);

  if (Math.abs(Ybg - Ytxt) < 0.0005) return "Lc 0";

  let SAPC, Lc;
  if (Ybg > Ytxt) {
    SAPC = (Ybg ** 0.56 - Ytxt ** 0.57) * 1.14;
    if (SAPC < 0.001) Lc = 0;
    else if (SAPC < 0.035991) Lc = (SAPC - SAPC * 27.7847239587675 * 0.027) * 100;
    else Lc = (SAPC - 0.027) * 100;
  } else {
    SAPC = (Ybg ** 0.65 - Ytxt ** 0.62) * 1.14;
    if (SAPC > -0.001) Lc = 0;
    else if (SAPC > -0.035991) Lc = (SAPC - SAPC * 27.7847239587675 * 0.027) * 100;
    else Lc = (SAPC + 0.027) * 100;
  }

  return `Lc ${Math.round(Math.abs(Lc) * 10) / 10}`;
}

function wcagLevel(ratio) {
  const r = parseFloat(ratio);
  if (r >= 7) return "AAA";
  if (r >= 4.5) return "AA";
  if (r >= 3) return "AA18";
  return "Fail";
}

function wcagLevelLabel(level) {
  switch (level) {
    case "AAA":
      return "Pass AAA";
    case "AA":
      return "Pass AA";
    case "AA18":
      return "Pass AA18+";
    default:
      return "Fail";
  }
}

function wcagLevelColor(level) {
  switch (level) {
    case "AAA":
      return "#15803d";
    case "AA":
      return "#15803d";
    case "AA18":
      return "#a16207";
    default:
      return "#dc2626";
  }
}

function apcaLevel(lcStr) {
  const n = parseFloat(lcStr.replace("Lc ", ""));
  if (n >= 75) return { label: "Pass (body)", color: "#15803d" };
  if (n >= 60) return { label: "Pass (large)", color: "#15803d" };
  if (n >= 45) return { label: "Pass (non-text)", color: "#a16207" };
  return { label: "Fail", color: "#dc2626" };
}

function contrastData(shade, hex) {
  const bg = parseInt(shade, 10) <= 500 ? CONTRAST_BG_DARK : CONTRAST_BG_LIGHT;
  const wcag = wcagContrastRatio(hex, bg);
  const apca = apcaContrast(hex, bg);
  const wLevel = wcagLevel(wcag);
  const aLevel = apcaLevel(apca);
  return {
    shade,
    hex,
    wcag,
    wcagLabel: wcagLevelLabel(wLevel),
    wcagColor: wcagLevelColor(wLevel),
    apca,
    apcaLabel: aLevel.label,
    apcaColor: aLevel.color
  };
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

const setToken = (token, value) => {
  document.documentElement.style.setProperty(token, value);
  return `${token}: ${value};`;
};

const storyParams = {
  actions: { disable: true },
  interactions: { disable: true },
  controls: { disable: false },
  layout: "padded"
};

/* ── Story ────────────────────────────────────────────────────────────────── */

export default {
  title: "Theming/Colours",
  tags: ["!autodocs"]
};

export const ProductPrimary = {
  render: args => {
    const palette = generatePalette(args.seedColour);

    const tokens = SHADE_KEYS.map(shade => setToken(`--sgds-product-primary-${shade}`, palette[shade]));
    const style = unsafeHTML(`<style>:root { ${tokens.join(" ")} }</style>`);

    const rows = SHADE_KEYS.map(shade => contrastData(shade, palette[shade]));

    return html`
      ${style}
      <div class="sgds-container sgds:flex sgds:flex-col sgds:gap-layout-md">
        <!-- Generated palette with contrast info -->
        <div>
          <h4
            class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:mb-md"
          >
            Generated Palette
          </h4>
          <p class="sgds:text-body-sm sgds:text-body-default sgds:mb-md">
            Pick a seed colour and the full 100–900 palette is auto-generated using
            <a href="https://leonardocolor.io" target="_blank" rel="noopener" class="sgds:text-link-default"
              >Adobe Leonardo</a
            >
            contrast ratios.
          </p>
          <div class="sgds:flex sgds:gap-md sgds:flex-wrap">
            ${rows.map(
              row => html`
                <div class="sgds:flex sgds:flex-col sgds:gap-sm" style="width: 120px;">
                  <div
                    class="sgds:w-full sgds:rounded-md sgds:shadow-2 sgds:p-2 sgds:flex sgds:flex-col sgds:justify-end sgds:font-mono sgds:text-label-xs sgds:leading-2-xs"
                    style="background-color: ${row.hex}; color: ${parseInt(row.shade, 10) >= 500
                      ? "#ffffff"
                      : "#111111"}; height: 120px;"
                  >
                    <span class="sgds:font-bold">${row.shade}</span>
                    <span>${row.hex}</span>
                  </div>
                  <ul
                    class="sgds:text-label-sm sgds:font-mono sgds:leading-sm"
                    style="list-style: none; padding: 0; margin: 0;"
                  >
                    <li>
                      WCAG ${row.wcag} <span style="color: ${row.wcagColor}; font-weight: 600;">${row.wcagLabel}</span>
                    </li>
                    <li>
                      ${row.apca} <span style="color: ${row.apcaColor}; font-weight: 600;">${row.apcaLabel}</span>
                    </li>
                  </ul>
                </div>
              `
            )}
          </div>
        </div>

        <sgds-divider class="sgds:my-layout-xs"></sgds-divider>

        <!-- Component previews -->
        <div>
          <h4
            class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:mb-md"
          >
            Component Preview
          </h4>

          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <!-- Buttons -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Button
              </h5>
              <div class="sgds:flex sgds:gap-md sgds:items-center sgds:flex-wrap">
                <sgds-button>Primary</sgds-button>
                <sgds-button variant="outlined">Outlined</sgds-button>
                <sgds-button variant="ghost">Ghost</sgds-button>
                <sgds-button disabled>Disabled</sgds-button>
              </div>
            </div>

            <!-- Badge -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Badge
              </h5>
              <div class="sgds:flex sgds:gap-md sgds:items-center sgds:flex-wrap">
                <sgds-badge show>Default</sgds-badge>
                <sgds-badge show variant="subtle">Subtle</sgds-badge>
              </div>
            </div>

            <!-- Alert -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Alert
              </h5>
              <sgds-alert show variant="primary" title="Primary Alert">
                This is a primary alert with your custom brand colour.
              </sgds-alert>
            </div>

            <!-- Switch -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Switch
              </h5>
              <div class="sgds:flex sgds:gap-md sgds:items-center">
                <sgds-switch checked>Enabled</sgds-switch>
                <sgds-switch>Disabled</sgds-switch>
              </div>
            </div>

            <!-- Link -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Link
              </h5>
              <div class="sgds:flex sgds:gap-md sgds:items-center">
                <sgds-link href="#">Primary Link</sgds-link>
              </div>
            </div>

            <!-- Stepper -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Stepper
              </h5>
              <sgds-stepper activeStep="1">
                <sgds-stepper-item>Step One</sgds-stepper-item>
                <sgds-stepper-item>Step Two</sgds-stepper-item>
                <sgds-stepper-item>Step Three</sgds-stepper-item>
              </sgds-stepper>
            </div>

            <!-- Pagination -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Pagination
              </h5>
              <sgds-pagination dataLength="50" currentPage="3" itemsPerPage="10"></sgds-pagination>
            </div>

            <!-- Tab -->
            <div class="sgds:flex sgds:flex-col sgds:gap-sm">
              <h5
                class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Tab
              </h5>
              <sgds-tab-group>
                <sgds-tab slot="nav" panel="tab1" active>Tab One</sgds-tab>
                <sgds-tab slot="nav" panel="tab2">Tab Two</sgds-tab>
                <sgds-tab slot="nav" panel="tab3">Tab Three</sgds-tab>
                <sgds-tab-panel name="tab1">Content for tab one</sgds-tab-panel>
                <sgds-tab-panel name="tab2">Content for tab two</sgds-tab-panel>
                <sgds-tab-panel name="tab3">Content for tab three</sgds-tab-panel>
              </sgds-tab-group>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  name: "Product Primary",
  args: {
    seedColour: "#6b4feb"
  },
  argTypes: {
    seedColour: {
      control: { type: "color" },
      name: "Seed Colour",
      description: "Pick a single colour — the full 100–900 palette is auto-generated using Leonardo contrast ratios.",
      table: { defaultValue: { summary: "#6B4FEB" } }
    }
  },
  parameters: storyParams
};
