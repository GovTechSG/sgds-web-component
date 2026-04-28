import { html, svg } from "lit";

export default {
  title: "Utilities/Z-Index",
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

const semanticLayers = [
  {
    token: "sgds:z-base",
    var: "--sgds-z-index-base",
    value: "0",
    label: "base",
    zClass: "sgds:z-base",
    bgClass: "sgds:bg-neutral-surface-default",
    textClass: "sgds:text-default"
  },
  {
    token: "sgds:z-raised",
    var: "--sgds-z-index-raised",
    value: "100",
    label: "raised",
    zClass: "sgds:z-raised",
    bgClass: "sgds:bg-neutral-surface-emphasis",
    textClass: "sgds:text-default"
  },
  {
    token: "sgds:z-sticky",
    var: "--sgds-z-index-sticky",
    value: "200",
    label: "sticky",
    zClass: "sgds:z-sticky",
    bgClass: "sgds:bg-neutral-surface-muted",
    textClass: "sgds:text-default"
  },
  {
    token: "sgds:z-floating",
    var: "--sgds-z-index-floating",
    value: "400",
    label: "floating",
    zClass: "sgds:z-floating",
    bgClass: "sgds:bg-primary-surface-muted",
    textClass: "sgds:text-primary-default"
  },
  {
    token: "sgds:z-overlay",
    var: "--sgds-z-index-overlay",
    value: "800",
    label: "overlay",
    zClass: "sgds:z-overlay",
    bgClass: "sgds:bg-primary-surface-default",
    textClass: "sgds:text-primary-default"
  },
  {
    token: "sgds:z-modal",
    var: "--sgds-z-index-modal",
    value: "1600",
    label: "modal",
    zClass: "sgds:z-modal",
    bgClass: "sgds:bg-primary-default",
    textClass: "sgds:text-fixed-light"
  }
];

export const ZIndexAllStacks = () => {
  // Isometric geometry
  const cx = 380; // centre-x of all rhombuses
  const hw = 130; // half-width  (left ↔ right vertex extent)
  const hd = 52; // half-depth  (top  ↔ bottom vertex extent per layer)
  const layerGap = 45; // vertical spacing between adjacent layer top-vertices
  const baseTopY = 320; // top-vertex y of layer 0 (base / bottommost)
  const n = semanticLayers.length;

  const layerTopY = i => baseTopY - i * layerGap;
  const leftVertex = i => ({ x: cx - hw, y: layerTopY(i) + hd });
  const bottomY = baseTopY + 2 * hd; // bottom vertex of the lowest layer

  // Isometric axis direction: (2/√5, −1/√5) for x/y, straight up for z
  const axLen = 130;
  const isoX = Math.round((axLen * 2) / Math.sqrt(5));
  const isoY = Math.round(axLen / Math.sqrt(5));
  const xAx = { x: cx + isoX, y: bottomY - isoY };
  const yAx = { x: cx - isoX, y: bottomY - isoY };
  const zAx = { x: cx, y: layerTopY(n - 1) - 28 };

  // Layer fills: neutral → purple gradient (base → modal)
  const fills = ["#f7f7fa", "#f0ecfb", "#e4dcf6", "#d3c8ef", "#bfade6", "#9d8dd9"];
  const stroke = "#ccc4e8";
  const dash = "#c4b0df";
  const chip = "#1d1d1f";

  const svgW = 560;
  const svgH = bottomY + 80;

  const annotationOrder = [...semanticLayers].reverse(); // modal first → base last

  return html`
    <div style="padding: 48px 24px 40px;">
      <!-- Isometric visualization -->
      <div style="display: flex; justify-content: center; margin-bottom: 40px;">
        <svg
          width="${svgW}"
          height="${svgH}"
          viewBox="0 0 ${svgW} ${svgH}"
          style="overflow: visible; font-family: system-ui, sans-serif;"
          aria-label="Isometric diagram of SGDS z-index layers"
        >
          <defs>
            <marker id="iso-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <polyline points="0,1 5,3.5 0,6" fill="none" stroke="${dash}" stroke-width="1.2" />
            </marker>
          </defs>

          <!-- Axis lines -->
          <line
            x1="${cx}"
            y1="${bottomY}"
            x2="${zAx.x}"
            y2="${zAx.y}"
            stroke="${dash}"
            stroke-width="1.5"
            marker-end="url(#iso-arrow)"
          />
          <line
            x1="${cx}"
            y1="${bottomY}"
            x2="${xAx.x}"
            y2="${xAx.y}"
            stroke="${dash}"
            stroke-width="1.5"
            marker-end="url(#iso-arrow)"
          />
          <line
            x1="${cx}"
            y1="${bottomY}"
            x2="${yAx.x}"
            y2="${yAx.y}"
            stroke="${dash}"
            stroke-width="1.5"
            marker-end="url(#iso-arrow)"
          />

          <!-- Axis labels -->
          <text x="${zAx.x + 7}" y="${zAx.y + 4}" fill="${dash}" font-size="12" font-weight="600">z</text>
          <text x="${xAx.x + 7}" y="${xAx.y + 4}" fill="${dash}" font-size="12" font-weight="600">x</text>
          <text x="${yAx.x - 18}" y="${yAx.y + 4}" fill="${dash}" font-size="12" font-weight="600">y</text>

          <!-- Rhombus layers — base (i=0) rendered first, modal (i=4) last (on top) -->
          ${semanticLayers.map((_, i) => {
            const t = layerTopY(i);
            return svg`
              <polygon
                points="${cx},${t} ${cx + hw},${t + hd} ${cx},${t + 2 * hd} ${cx - hw},${t + hd}"
                fill="${fills[i]}" stroke="${stroke}" stroke-width="1" opacity="0.8"
              />
            `;
          })}

          <!-- Label chips and dashed connectors -->
          ${semanticLayers.map((layer, i) => {
            const { x: lx, y: ly } = leftVertex(i);
            const cw = 120,
              ch = 26,
              cr = 13,
              connLen = 60;
            return svg`
              <line
                x1="${lx - connLen}" y1="${ly}" x2="${lx}" y2="${ly}"
                stroke="${dash}" stroke-width="1.2" stroke-dasharray="4,3"
              />
              <rect x="${lx - connLen - cw}" y="${ly - ch / 2}" width="${cw}" height="${ch}" rx="${cr}" fill="${chip}"/>
              <text
                x="${lx - connLen - cw / 2}" y="${ly + 4.5}"
                text-anchor="middle" fill="white" font-size="11" font-weight="500"
              >${layer.token}</text>
            `;
          })}
        </svg>
      </div>

      <!-- Token reference table -->
      <div style="max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 4px;">
        <!-- Header -->
        <div
          style="display: grid; grid-template-columns: 1fr 1fr 80px 32px; gap: 8px; padding: 0 12px 8px; border-bottom: 1px solid var(--sgds-color-neutral-border-subtle, #e5e7eb);"
        >
          <span class="sgds:text-label-xs sgds:text-default sgds:font-semibold">Token</span>
          <span class="sgds:text-label-xs sgds:text-default sgds:font-semibold">CSS Variable</span>
          <span class="sgds:text-label-xs sgds:text-default sgds:font-semibold">Value</span>
          <span></span>
        </div>
        <!-- Rows — highest z-index first -->
        ${annotationOrder.map(
          ({ token, var: cssVar, value }) => html`
            <div
              style="display: grid; grid-template-columns: 1fr 1fr 80px 32px; gap: 8px; align-items: center; padding: 8px 12px; border-radius: 6px;"
            >
              <code class="sgds:text-label-xs">${token}</code>
              <code class="sgds:text-label-xs sgds:text-subtle">${cssVar}</code>
              <code class="sgds:text-label-xs sgds:font-semibold">${value}</code>
              <button
                class="sgds:flex sgds:items-center sgds:justify-center sgds:cursor-pointer sgds:opacity-50 sgds:bg-transparent sgds:border-none sgds:p-0"
                style="width: 28px; height: 28px;"
                @click="${e => copyToClipboard(token, e.currentTarget)}"
                title="Copy ${token}"
                aria-label="Copy ${token}"
              >
                <sgds-icon name="files" style="font-size: 14px;"></sgds-icon>
              </button>
            </div>
          `
        )}
      </div>
    </div>
  `;
};
