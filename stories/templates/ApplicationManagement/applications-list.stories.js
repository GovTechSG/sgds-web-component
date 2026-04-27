import { html } from "lit";

const Template = () => html`
  <div class="sgds:bg-surface-subtle">
    <!-- ── Application Shell ───────────────────────────────────────────── -->
    <div>
      <sgds-masthead fluid></sgds-masthead>
      <sgds-mainnav fluid>
        <strong slot="brand">Logo</strong>
        <sgds-mainnav-item href="#">Home</sgds-mainnav-item>
        <sgds-mainnav-item href="#" active>Applications</sgds-mainnav-item>
        <sgds-mainnav-item href="#">Reports</sgds-mainnav-item>
      </sgds-mainnav>
    </div>

    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <div class="sgds-container sgds:py-2-xl sgds:flex sgds:flex-col sgds:gap-2-xl">
        <!-- ── Page Header block ─────────────────────────────────────────── -->
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <!-- Breadcrumb -->
          <sgds-breadcrumb>
            <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
            <sgds-breadcrumb-item><a href="#">Applications</a></sgds-breadcrumb-item>
          </sgds-breadcrumb>

          <!-- Title row: left content + right action -->
          <div class="sgds:flex sgds:items-start sgds:justify-between">
            <!-- Left: icon + title + description -->
            <div class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:flex-1">
              <div class="sgds:flex sgds:items-center sgds:gap-text-sm">
                <div
                  class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:w-10 sgds:h-10 sgds:shrink-0 sgds:p-2 sgds:rounded-md sgds:bg-accent-surface-muted"
                >
                  <sgds-icon name="grid-fill" size="24"></sgds-icon>
                </div>
                <h1
                  class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default sgds:mb-0"
                >
                  Applications
                </h1>
              </div>
              <div
                class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
              >
                Browse and manage all registered applications in your organisation.
              </div>
            </div>

            <!-- Right: CTA -->
            <sgds-button variant="primary">
              <sgds-icon name="plus" slot="leftIcon"></sgds-icon>
              Create application
            </sgds-button>
          </div>
        </div>

        <!-- ── Two-column: filter sidebar + table filter ──────────────── -->
        <div class="sgds:flex sgds:gap-layout-md sgds:items-start">
          <!-- Filter Sidebar block -->
          <aside class="sgds:shrink-0 sgds:w-64 sgds:flex sgds:flex-col sgds:gap-2-xl">
            <!-- Filter header -->
            <div class="sgds:flex sgds:gap-4 sgds:items-center">
              <span class="sgds:text-subtitle-md sgds:font-semibold sgds:text-heading-default">Filter by</span>
              <sgds-link><a href="#">Clear all</a></sgds-link>
            </div>

            <!-- Status -->
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <div
                class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
              >
                Status
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="active">Active (8)</sgds-checkbox>
                <sgds-checkbox value="pending">Pending (3)</sgds-checkbox>
                <sgds-checkbox value="rejected">Rejected (2)</sgds-checkbox>
                <sgds-checkbox value="suspended">Suspended (1)</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <!-- Environment -->
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <div
                class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
              >
                Environment
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="production">Production (6)</sgds-checkbox>
                <sgds-checkbox value="staging">Staging (5)</sgds-checkbox>
                <sgds-checkbox value="development">Development (3)</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <!-- API type -->
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <div
                class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
              >
                API type
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="rest">REST (10)</sgds-checkbox>
                <sgds-checkbox value="graphql">GraphQL (2)</sgds-checkbox>
                <sgds-checkbox value="soap">SOAP (2)</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </aside>

          <!-- Table Filter block -->
          <div
            class="sgds:flex-1 sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-lg sgds:p-layout-xs sgds:flex sgds:flex-col sgds:gap-5"
          >
            <!-- Card header: icon + title -->
            <div class="sgds:flex sgds:items-center sgds:gap-text-md">
              <div
                class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:w-10 sgds:h-10 sgds:shrink-0 sgds:p-2 sgds:rounded-md sgds:bg-accent-surface-muted"
              >
                <sgds-icon name="grid-fill" size="24"></sgds-icon>
              </div>
              <h5
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
              >
                All applications
              </h5>
            </div>

            <!-- Search + filter toolbar -->
            <div class="sgds:flex sgds:items-center sgds:gap-layout-sm">
              <div class="sgds:flex-1">
                <sgds-input type="search" placeholder="Search applications" name="search"></sgds-input>
              </div>
              <sgds-button variant="outline" tone="neutral">
                <sgds-icon name="sliders" slot="leftIcon"></sgds-icon>
                Filter
              </sgds-button>
            </div>

            <!-- Results count -->
            <div
              class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              Showing 6/14 result(s)
            </div>

            <!-- Table -->
            <sgds-table>
              <sgds-table-row>
                <sgds-table-head>Application name</sgds-table-head>
                <sgds-table-head>Organisation</sgds-table-head>
                <sgds-table-head>Environment</sgds-table-head>
                <sgds-table-head>Status</sgds-table-head>
                <sgds-table-head>Actions</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell
                  ><sgds-link><a href="#">APEX Gateway v2.1.0</a></sgds-link></sgds-table-cell
                >
                <sgds-table-cell>[GVT] APEX</sgds-table-cell>
                <sgds-table-cell>Production</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell
                  ><sgds-link><a href="#">MyInfo Bridge v1.4.0</a></sgds-link></sgds-table-cell
                >
                <sgds-table-cell>[GVT] NDI</sgds-table-cell>
                <sgds-table-cell>Staging</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="warning">Pending</sgds-badge></sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell
                  ><sgds-link><a href="#">FormSG Webhook v3.0.0</a></sgds-link></sgds-table-cell
                >
                <sgds-table-cell>[GVT] OGP</sgds-table-cell>
                <sgds-table-cell>Production</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell
                  ><sgds-link><a href="#">SingPass Auth v1.2.0</a></sgds-link></sgds-table-cell
                >
                <sgds-table-cell>[GVT] GDS</sgds-table-cell>
                <sgds-table-cell>Production</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="danger">Rejected</sgds-badge></sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell
                  ><sgds-link><a href="#">Data.gov Sync v2.0.0</a></sgds-link></sgds-table-cell
                >
                <sgds-table-cell>[GVT] SNDGO</sgds-table-cell>
                <sgds-table-cell>Development</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="neutral">Suspended</sgds-badge></sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell
                  ><sgds-link><a href="#">CorpPass Verify v1.0.0</a></sgds-link></sgds-table-cell
                >
                <sgds-table-cell>[GVT] ACRA</sgds-table-cell>
                <sgds-table-cell>Staging</sgds-table-cell>
                <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
                <sgds-table-cell><sgds-button variant="ghost" size="sm">View</sgds-button></sgds-table-cell>
              </sgds-table-row>
            </sgds-table>

            <!-- Pagination -->
            <sgds-pagination total-items="14" items-per-page="6" page="1"></sgds-pagination>
          </div>
        </div>
      </div>
      <sgds-footer></sgds-footer>
    </div>
  </div>
`;

export default {
  title: "Templates/Application Management/Application list",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen"
  }
};

export const ApplicationList = {
  render: Template.bind({}),
  name: "Application list"
};
