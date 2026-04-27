import { html } from "lit";

const Template = () => html`
  <style>
    .empty-state {
      display: none;
    }
    .empty-state.active {
      display: flex;
    }
    .title-clamp {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>

  <!-- Page header block (no breadcrumb) -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div
        class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        style="max-width: var(--sgds-text-max-width);"
      >
        <div
          class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
        >
          Programmes
        </div>
        <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
          Browse Programmes
        </h1>
        <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle sgds:mb-layout-sm">
          Explore available government programmes and services.
        </p>
        <sgds-input
          id="search-input"
          type="search"
          label="Search"
          placeholder="Search by name or keyword..."
          clearable
          style="width: 100%; max-width: 640px;"
        >
          <sgds-icon slot="prefix" name="search"></sgds-icon>
        </sgds-input>
      </div>
    </div>
  </section>

  <!-- Search & Filter Block
       Layout   : sidebar filters (left) + main content (right)
       Includes : filter sidebar, sort, results grid, empty state
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-start">
        <!-- ── Left sidebar: filters ───────────────────────────────────── -->
        <aside class="sgds-col-12 sgds-col-lg-3 sgds:mr-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-2-xl sgds:pt-sm">
            <!-- Sidebar header -->
            <div class="sgds:flex sgds:items-center sgds:justify-between">
              <span
                class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Filters
              </span>
              <sgds-link><a href="#" id="clear-all-btn">Clear all</a></sgds-link>
            </div>

            <!-- Filter: Programme type -->
            <div class="sgds:flex sgds:flex-col sgds:gap-xs">
              <div
                class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Programme type
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="opening-address">Opening Address (1)</sgds-checkbox>
                <sgds-checkbox value="keynote">Keynote (4)</sgds-checkbox>
                <sgds-checkbox value="panel-discussion">Panel Discussion (6)</sgds-checkbox>
                <sgds-checkbox value="presentation">Presentation (12)</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <!-- Filter: Sessions -->
            <div class="sgds:flex sgds:flex-col sgds:gap-xs">
              <div
                class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Sessions
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="morning" checked>Morning (12)</sgds-checkbox>
                <sgds-checkbox value="afternoon">Afternoon (16)</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <!-- Filter: Track -->
            <div class="sgds:flex sgds:flex-col sgds:gap-xs">
              <div
                class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Track
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="ai-cybersecurity" checked>AI x Cybersecurity (4)</sgds-checkbox>
                <sgds-checkbox value="resilient-cloud">Resilient and Secure Cloud (6)</sgds-checkbox>
                <sgds-checkbox value="cisos-future">CISOs of the Future (8)</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <!-- Filter: Event hall -->
            <div class="sgds:flex sgds:flex-col sgds:gap-xs">
              <div
                class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default"
              >
                Event hall
              </div>
              <sgds-checkbox-group>
                <sgds-checkbox value="hall-a">Hall A</sgds-checkbox>
                <sgds-checkbox value="hall-b">Hall B</sgds-checkbox>
                <sgds-checkbox value="hall-c">Hall C</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </div>
        </aside>

        <!-- ── Right main: chips + sort + results ─────────────────── -->
        <div class="sgds-col-12 sgds-col-lg-9">
          <!-- Results meta row: count + sort -->
          <div class="sgds:flex sgds:items-center sgds:justify-between sgds:mb-xl">
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Showing 12 results
            </h5>
            <sgds-select label="" placeholder="Sort by" style="min-width: 200px;">
              <sgds-select-option value="relevance">Most relevant</sgds-select-option>
              <sgds-select-option value="date-asc">Date: Earliest first</sgds-select-option>
              <sgds-select-option value="date-desc">Date: Latest first</sgds-select-option>
              <sgds-select-option value="name-asc">Name: A–Z</sgds-select-option>
              <sgds-select-option value="name-desc">Name: Z–A</sgds-select-option>
            </sgds-select>
          </div>

          <!-- Results grid -->
          <div class="sgds-grid sgds:items-stretch" id="results-grid">
            <!-- Result card 1 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
                <span slot="title" class="title-clamp">Digital Infrastructure for the Next Decade</span>
                <span slot="description"
                  >An overview of Singapore's plans for resilient and future-ready digital infrastructure.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 2 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
                <span slot="title" class="title-clamp">AI Governance in the Public Sector</span>
                <span slot="description"
                  >Panellists explore responsible AI adoption frameworks and inter-agency collaboration.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 3 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
                <span slot="title" class="title-clamp">Zero-Trust Architecture for Government Systems</span>
                <span slot="description"
                  >A deep dive into implementing zero-trust principles across legacy and modern systems.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 4 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
                <span slot="title" class="title-clamp">Securing the Cloud: Lessons from the Field</span>
                <span slot="description"
                  >Key takeaways from real-world cloud migration projects across the Singapore government.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 5 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
                <span slot="title" class="title-clamp">Incident Response Playbooks for CISOs</span>
                <span slot="description"
                  >Practical frameworks for building effective incident response and recovery strategies.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 6 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
                <span slot="title" class="title-clamp">Workforce Upskilling for Cyber Resilience</span>
                <span slot="description"
                  >How agencies are building cyber talent pipelines and fostering a security-aware culture.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 7 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Opening Address</sgds-badge>
                <span slot="title" class="title-clamp">Building a Resilient Digital Government</span>
                <span slot="description"
                  >An opening address on Singapore's whole-of-government approach to digital resilience.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 8 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
                <span slot="title" class="title-clamp">Identity and Access Management at Scale</span>
                <span slot="description"
                  >Strategies for managing digital identities across thousands of government users securely.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 9 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
                <span slot="title" class="title-clamp">The Future of GovTech: People, Process and Platform</span>
                <span slot="description"
                  >How people-centred design and agile delivery are shaping the next wave of government
                  technology.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 10 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
                <span slot="title" class="title-clamp">Data Sharing Across Agencies: Challenges and Solutions</span>
                <span slot="description"
                  >Panellists discuss governance models and technical standards enabling safe cross-agency data
                  sharing.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 11 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
                <span slot="title" class="title-clamp">Automating Compliance Monitoring with AI</span>
                <span slot="description"
                  >Using machine learning to continuously monitor systems for policy and regulatory compliance.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>

            <!-- Result card 12 -->
            <div class="sgds-col-12 sgds-col-md-6 sgds-col-2-xl-4 sgds:flex sgds:flex-col">
              <sgds-card stretchedLink style="height: 100%;">
                <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
                <span slot="title" class="title-clamp">Cybersecurity as a National Imperative</span>
                <span slot="description"
                  >Why cybersecurity investment is central to Singapore's long-term digital sovereignty strategy.</span
                >
                <sgds-link slot="footer"
                  ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
                ></sgds-link>
              </sgds-card>
            </div>
          </div>

          <!-- Empty state (shown when no results) -->
          <div
            class="empty-state sgds:flex-col sgds:items-center sgds:justify-center sgds:py-2-xl sgds:text-center"
            id="empty-state"
          >
            <sgds-icon name="search" size="48" class="sgds:text-body-subtle sgds:mb-md"></sgds-icon>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              No results found
            </h5>
            <p
              class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-md"
              style="max-width: 360px;"
            >
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <sgds-button variant="outline" tone="neutral" id="reset-btn">Clear all filters</sgds-button>
          </div>

          <!-- Pagination -->
          <div class="sgds:mt-layout-sm sgds:flex sgds:justify-end">
            <sgds-pagination length="5" currentPage="1" limit="6" size="sm"></sgds-pagination>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

export default {
  title: "Templates/Search & Filter",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen"
  }
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  play: async ({ canvasElement }) => {
    // Toggle empty state demo
    const resetBtn = canvasElement.querySelector("#reset-btn");
    const clearAllBtn = canvasElement.querySelector("#clear-all-btn");
    const resultsGrid = canvasElement.querySelector("#results-grid");
    const emptyState = canvasElement.querySelector("#empty-state");

    function showEmpty() {
      resultsGrid.style.display = "none";
      emptyState.classList.add("active");
    }

    function showResults() {
      resultsGrid.style.display = "";
      emptyState.classList.remove("active");
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", e => {
        e.preventDefault();
        showResults();
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", e => {
        e.preventDefault();
      });
    }
  }
};
