# Data Visualisation

SGDS does not bundle a charting library. Use **Apache ECharts** and apply the SGDS colour palette to keep charts consistent with the design system.

---

## Setup

Install ECharts separately from the SGDS package:

```bash
npm install echarts
```

---

## SGDS Colour Palette for Charts

Use this fixed colour array in all ECharts configurations. These are the raw hex values of SGDS data-visualisation primitive tokens — ECharts does not resolve CSS custom properties, so hex values are required here.

| Token | Hex | Colour |
|---|---|---|
| `--sgds-purple-600` | `#ac1cdb` | Purple |
| `--sgds-cyan-600` | `#00758d` | Cyan |
| `--sgds-green-600` | `#0e7c3d` | Green |
| `--sgds-blue-600` | `#0269d0` | Blue |
| `--sgds-yellow-600` | `#7e6917` | Yellow |

ECharts cycles through colours sequentially across series: purple → cyan → green → blue → yellow.

---

## Applying the Palette

### Per-chart (recommended for most cases)

Set `color` directly in the chart option:

```js
import * as echarts from "echarts";

const chart = echarts.init(document.getElementById("chart"));

chart.setOption({
  color: ["#ac1cdb", "#00758d", "#0e7c3d", "#0269d0", "#7e6917"],
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  yAxis: { type: "value" },
  series: [{ type: "bar", data: [120, 200, 150, 80, 70] }],
});
```

### Global theme (for multiple charts on the same page)

Register the SGDS theme once at app startup, then pass `"sgds"` when initialising each chart:

```js
import * as echarts from "echarts";

// Call once at app startup
echarts.registerTheme("sgds", {
  color: ["#ac1cdb", "#00758d", "#0e7c3d", "#0269d0", "#7e6917"],
});

// Use the theme on every chart
const chart1 = echarts.init(document.getElementById("chart1"), "sgds");
const chart2 = echarts.init(document.getElementById("chart2"), "sgds");
```

---

## Layout Integration

Wrap charts in a container that uses SGDS layout and surface tokens:

```jsx
<div className="sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-md sgds:shadow-1">
  <h3 className="sgds:text-heading-sm sgds:font-semibold sgds:mb-4">Chart Title</h3>
  <div id="chart" style={{ height: "300px" }}></div>
</div>
```
