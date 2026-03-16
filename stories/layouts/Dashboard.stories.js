import { html } from "lit";
import * as echarts from "echarts";

// sgds-sidebar is RC only — load from CDN before the story renders
if (!customElements.get("sgds-sidebar")) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@rc/components/Sidebar/index.umd.min.js";
  document.head.appendChild(script);
}

export default {
  title: "Templates/Dashboard"
};

// SGDS data visualisation palette (from sgds-data-visualisation skill)
const SGDS_COLORS = ["#ac1cdb", "#00758d", "#0e7c3d", "#0269d0", "#7e6917"];

const isNightMode = () => document.documentElement.classList.contains("sgds-night-theme");

function getChartTheme() {
  const night = isNightMode();
  return {
    textColor: night ? "#d1d5db" : "#374151",
    gridColor: night ? "#374151" : "#e5e7eb",
    tooltipBg: night ? "#1f2937" : "#ffffff",
    tooltipBorder: night ? "#374151" : "#e5e7eb",
    tooltipText: night ? "#f9fafb" : "#111827"
  };
}

function buildTrendOption(theme) {
  return {
    color: SGDS_COLORS,
    backgroundColor: "transparent",
    textStyle: { color: theme.textColor, fontFamily: "Inter, sans-serif" },
    tooltip: {
      trigger: "axis",
      backgroundColor: theme.tooltipBg,
      borderColor: theme.tooltipBorder,
      textStyle: { color: theme.tooltipText }
    },
    legend: {
      top: 0,
      textStyle: { color: theme.textColor }
    },
    grid: { top: 40, right: 16, bottom: 0, left: 0, containLabel: true },
    xAxis: {
      type: "category",
      data: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      axisLine: { lineStyle: { color: theme.gridColor } },
      axisTick: { lineStyle: { color: theme.gridColor } },
      axisLabel: { color: theme.textColor }
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: theme.gridColor } },
      axisLabel: { color: theme.textColor }
    },
    series: [
      {
        name: "Submitted",
        type: "line",
        smooth: true,
        data: [820, 932, 901, 934, 1290, 1330],
        areaStyle: { opacity: 0.08 }
      },
      { name: "Approved", type: "line", smooth: true, data: [720, 800, 810, 870, 1100, 1180] },
      { name: "Rejected", type: "line", smooth: true, data: [80, 90, 70, 60, 140, 110] }
    ]
  };
}

function buildDonutOption(theme) {
  return {
    color: SGDS_COLORS,
    backgroundColor: "transparent",
    textStyle: { color: theme.textColor, fontFamily: "Inter, sans-serif" },
    tooltip: {
      trigger: "item",
      backgroundColor: theme.tooltipBg,
      borderColor: theme.tooltipBorder,
      textStyle: { color: theme.tooltipText }
    },
    legend: {
      bottom: 0,
      textStyle: { color: theme.textColor }
    },
    series: [
      {
        name: "Status",
        type: "pie",
        radius: ["48%", "72%"],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: false, position: "center", fontSize: 14, fontWeight: "bold", color: theme.textColor }
        },
        data: [
          { value: 942, name: "Active" },
          { value: 218, name: "Pending" },
          { value: 124, name: "Inactive" }
        ]
      }
    ]
  };
}

function buildBarOption(theme) {
  return {
    color: SGDS_COLORS,
    backgroundColor: "transparent",
    textStyle: { color: theme.textColor, fontFamily: "Inter, sans-serif" },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: theme.tooltipBg,
      borderColor: theme.tooltipBorder,
      textStyle: { color: theme.tooltipText }
    },
    legend: {
      top: 0,
      textStyle: { color: theme.textColor }
    },
    grid: { top: 40, right: 16, bottom: 0, left: 0, containLabel: true },
    xAxis: {
      type: "category",
      data: ["Policy", "Operations", "ICT", "Finance", "Legal", "HR"],
      axisLine: { lineStyle: { color: theme.gridColor } },
      axisTick: { lineStyle: { color: theme.gridColor } },
      axisLabel: { color: theme.textColor }
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: theme.gridColor } },
      axisLabel: { color: theme.textColor }
    },
    series: [
      { name: "Approved", type: "bar", stack: "total", data: [320, 280, 410, 190, 130, 210] },
      { name: "Pending", type: "bar", stack: "total", data: [60, 45, 80, 30, 20, 40] },
      { name: "Rejected", type: "bar", stack: "total", data: [20, 15, 30, 10, 8, 12] }
    ]
  };
}

function initCharts(canvasElement) {
  const trend = canvasElement.querySelector("#chart-trend");
  const donut = canvasElement.querySelector("#chart-donut");
  const bar = canvasElement.querySelector("#chart-bar");
  if (!trend || !donut || !bar) return;

  const instances = [echarts.init(trend), echarts.init(donut), echarts.init(bar)];

  function applyTheme() {
    const t = getChartTheme();
    instances[0].setOption(buildTrendOption(t));
    instances[1].setOption(buildDonutOption(t));
    instances[2].setOption(buildBarOption(t));
  }

  applyTheme();

  // Reflow charts when window resizes
  window.addEventListener("resize", () => instances.forEach(c => c.resize()));

  // Re-apply when Storybook toggles the night-mode class on <html>
  const observer = new MutationObserver(applyTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

const Template = () => html`
  <!-- Sticky top bar -->
  <div class="sgds:sticky sgds:top-0 sgds:z-10">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">My App</strong>
      <sgds-button slot="end" variant="ghost" size="sm">John Doe</sgds-button>
    </sgds-mainnav>
  </div>

  <!-- Two-column body -->
  <div class="sgds:flex sgds:flex-row sgds:bg-surface-default">
    <!-- Sticky sidebar (sgds-sidebar is RC — loaded via CDN at module init) -->
    <div
      class="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)] sgds:overflow-y-auto sgds:w-68 sgds:border-r sgds:border-muted sgds:bg-surface-raised"
    >
      <sgds-sidebar active="dashboard">
        <div slot="brandName">My App</div>

        <sgds-sidebar-section title="Analytics" name="analytics">
          <sgds-sidebar-item name="dashboard" title="Dashboard">
            <sgds-icon name="grid-fill" slot="leadingIcon"></sgds-icon>
            <a href="/dashboard"></a>
          </sgds-sidebar-item>
          <sgds-sidebar-group name="submissions" title="Submissions">
            <sgds-icon name="file-earmark-text-fill" slot="leadingIcon"></sgds-icon>
            <sgds-sidebar-item name="all-submissions" title="All submissions"></sgds-sidebar-item>
            <sgds-sidebar-item name="pending" title="Pending review"></sgds-sidebar-item>
            <sgds-sidebar-item name="approved" title="Approved"></sgds-sidebar-item>
          </sgds-sidebar-group>
          <sgds-sidebar-item name="reports" title="Reports">
            <sgds-icon name="bar-chart-fill" slot="leadingIcon"></sgds-icon>
            <a href="/reports"></a>
          </sgds-sidebar-item>
        </sgds-sidebar-section>

        <sgds-sidebar-section title="Manage" name="manage">
          <sgds-sidebar-item name="users" title="Users">
            <sgds-icon name="people-fill" slot="leadingIcon"></sgds-icon>
            <a href="/users"></a>
          </sgds-sidebar-item>
          <sgds-sidebar-item name="settings" title="Settings">
            <sgds-icon name="gear-fill" slot="leadingIcon"></sgds-icon>
            <a href="/settings"></a>
          </sgds-sidebar-item>
        </sgds-sidebar-section>
      </sgds-sidebar>
    </div>

    <!-- Main content -->
    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <div class="sgds-container-sidebar sgds:py-layout-md">
        <!-- Page header -->
        <div class="sgds:flex sgds:items-center sgds:justify-between sgds:mb-layout-sm">
          <div>
            <div
              role="heading"
              aria-level="1"
              class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-color-default"
            >
              Dashboard
            </div>
            <div
              role="paragraph"
              class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted sgds:mt-1"
            >
              Overview of your application metrics
            </div>
          </div>
          <sgds-button variant="primary" size="sm">
            <sgds-icon name="download" slot="leftIcon"></sgds-icon>
            Export
          </sgds-button>
        </div>

        <!-- Single grid: stat cards + charts + table -->
        <div class="sgds-grid sgds:gap-layout-sm">
          <div
            class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card"
          >
            <div
              class="sgds:text-label-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted sgds:mb-1"
            >
              Total Users
            </div>
            <div
              class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-color-default sgds:tabular-nums"
            >
              12,486
            </div>
            <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
              <sgds-icon name="arrow-up" class="sgds:text-success-default" size="sm"></sgds-icon>
              <span
                class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-success-default"
                >+8.2%</span
              >
              <span
                class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted"
                >vs last month</span
              >
            </div>
          </div>
          <div
            class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card"
          >
            <div
              class="sgds:text-label-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted sgds:mb-1"
            >
              Active Sessions
            </div>
            <div
              class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-color-default sgds:tabular-nums"
            >
              3,241
            </div>
            <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
              <sgds-icon name="arrow-up" class="sgds:text-success-default" size="sm"></sgds-icon>
              <span
                class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-success-default"
                >+4.1%</span
              >
              <span
                class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted"
                >vs last month</span
              >
            </div>
          </div>
          <div
            class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card"
          >
            <div
              class="sgds:text-label-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted sgds:mb-1"
            >
              Submissions
            </div>
            <div
              class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-color-default sgds:tabular-nums"
            >
              847
            </div>
            <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
              <sgds-icon name="arrow-down" class="sgds:text-danger-default" size="sm"></sgds-icon>
              <span
                class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-danger-default"
                >-2.4%</span
              >
              <span
                class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted"
                >vs last month</span
              >
            </div>
          </div>
          <div
            class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-3 sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-xs sgds:shadow-card"
          >
            <div
              class="sgds:text-label-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:text-color-muted sgds:mb-1"
            >
              Pending Reviews
            </div>
            <div
              class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-color-default sgds:tabular-nums"
            >
              23
            </div>
            <div class="sgds:flex sgds:items-center sgds:gap-1 sgds:mt-2">
              <sgds-badge variant="warning">Action needed</sgds-badge>
            </div>
          </div>
          <div
            class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-component-xs"
          >
            <div
              role="heading"
              aria-level="2"
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-color-default sgds:mb-component-sm"
            >
              Submission trend
            </div>
            <div id="chart-trend" style="height:260px;width:100%"></div>
          </div>
          <div
            class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-component-xs"
          >
            <div
              role="heading"
              aria-level="2"
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-color-default sgds:mb-component-sm"
            >
              Status breakdown
            </div>
            <div id="chart-donut" style="height:260px;width:100%;overflow:visible"></div>
          </div>
          <div
            class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:p-component-xs"
          >
            <div
              role="heading"
              aria-level="2"
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-color-default sgds:mb-component-sm"
            >
              Submissions by department
            </div>
            <div id="chart-bar" style="height:240px;width:100%"></div>
          </div>

          <!-- Table: full width 12/12 -->
          <div
            class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12 sgds:bg-surface-raised sgds:rounded-lg sgds:border sgds:border-muted sgds:overflow-hidden"
          >
            <div
              class="sgds:flex sgds:items-center sgds:justify-between sgds:p-component-xs sgds:border-b sgds:border-muted"
            >
              <div
                role="heading"
                aria-level="2"
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-color-default"
              >
                Recent submissions
              </div>
              <div class="sgds:flex sgds:gap-component-sm">
                <sgds-input placeholder="Search..." size="sm">
                  <sgds-icon name="search" slot="prefix"></sgds-icon>
                </sgds-input>
                <sgds-button variant="outline" size="sm">
                  <sgds-icon name="funnel" slot="leftIcon"></sgds-icon>
                  Filter
                </sgds-button>
              </div>
            </div>
            <sgds-table>
              <sgds-table-row>
                <sgds-table-head>Name</sgds-table-head>
                <sgds-table-head>Status</sgds-table-head>
                <sgds-table-head>Date</sgds-table-head>
                <sgds-table-head>Actions</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell>Alice Tan</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="success">Approved</sgds-badge></sgds-table-cell>
                <sgds-table-cell>10 Mar 2026</sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell>Bob Lim</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
                <sgds-table-cell>09 Mar 2026</sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell>Carol Ng</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="danger">Rejected</sgds-badge></sgds-table-cell>
                <sgds-table-cell>08 Mar 2026</sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
            <div class="sgds:flex sgds:justify-end sgds:p-component-xs">
              <sgds-pagination length="10" limit="5"></sgds-pagination>
            </div>
          </div>
        </div>
      </div>
      <sgds-footer></sgds-footer>
    </div>
  </div>
`;

export const DashboardTemplate = {
  render: Template.bind({}),
  name: "Dashboard",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
  play: async ({ canvasElement }) => {
    // Give Lit one tick to finish rendering before initialising ECharts
    await new Promise(r => requestAnimationFrame(r));
    initCharts(canvasElement);
  }
};
