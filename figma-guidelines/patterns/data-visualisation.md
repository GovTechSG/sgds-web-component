# SGDS Data Visualisation

SGDS does not bundle a charting library. Use **Apache ECharts** and apply the SGDS color palette for visual consistency.

## Prerequisites

Complete base project setup per `overview-setup.md`. Install ECharts separately:

```bash
npm install echarts
```

See [https://echarts.apache.org/](https://echarts.apache.org/) for full ECharts documentation.

---

## SGDS Color Palette for Charts

Apply the SGDS palette by setting the `color` array in your chart option. Use raw hex values — ECharts does not resolve CSS custom properties.

| Token | Hex |
|---|---|
| `--sgds-purple-600` | `#ac1cdb` |
| `--sgds-cyan-600` | `#00758d` |
| `--sgds-green-600` | `#0e7c3d` |
| `--sgds-blue-600` | `#0269d0` |
| `--sgds-yellow-600` | `#7e6917` |

Palette order: purple → cyan → green → blue → yellow. ECharts cycles through them automatically across series.

---

## Usage

### Per-chart (recommended)

```js
import * as echarts from "echarts";

const chart = echarts.init(document.getElementById("chart"));
chart.setOption({
  color: ["#ac1cdb", "#00758d", "#0e7c3d", "#0269d0", "#7e6917"],
  // ... rest of chart option
});
```

### Global theme (all charts on the page)

Register once at app startup, then pass the theme name when initialising each chart:

```js
import * as echarts from "echarts";

echarts.registerTheme("sgds", {
  color: ["#ac1cdb", "#00758d", "#0e7c3d", "#0269d0", "#7e6917"],
});

const chart = echarts.init(document.getElementById("chart"), "sgds");
```

---

## Key Rules

1. ECharts is NOT provided by SGDS — install it separately.
2. Use raw hex values in the `color` array — never CSS variables.
3. For a single chart: set `color` in the option object.
4. For multiple charts with the same palette: use `echarts.registerTheme()` once at startup.
