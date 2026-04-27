import { html } from "lit";

const Template = () => html`
  <style>
    .stats-row { display: flex; flex-wrap: wrap; gap: var(--sgds-gap-layout-md); }
    .stats-row > * { width: 100%; }
    @media (width >= 768px) {
      .stats-row { flex-wrap: nowrap; }
      .stats-row > * { flex: 1; width: auto; }
    }
  </style>

  <sgds-masthead></sgds-masthead>
  <sgds-mainnav>
    <strong slot="brand">LifeSG</strong>
  </sgds-mainnav>

  <!--   PAGE HEADER - breadcrumb + overline + h1 + body-lg               -->
  <section class="sgds:bg-alternate sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:gap-layout-md" style="max-width: var(--sgds-text-max-width);">

        <sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Stories</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item active><a href="#">LifeSG Parenting Journey</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>

        <div>
          <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
            Success Story
          </div>
          <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
            How LifeSG Helped 180,000 New Parents Navigate Government Services
          </h1>
          <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            A look at how the Parenting Journey feature reduced time-to-access for critical family services by 60% in its first year.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!--   INTRODUCTION - body-lg paragraphs                                 -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div style="max-width: var(--sgds-text-max-width);">

        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          When a child is born in Singapore, parents suddenly find themselves navigating a maze of government agencies - the Immigration and Checkpoints Authority for the birth certificate, HDB for housing grants, Baby Bonus from MSF, and CPF contributions. Each carries its own eligibility rules, deadlines, and application portals.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:mb-0">
          The LifeSG Parenting Journey was built to change this. By aggregating services across agencies into a single, guided flow, it removed the burden of discovery from parents during one of the most demanding periods of their lives.
        </p>

      </div>
    </div>
  </section>

  <!--   CHALLENGE - h2 + body-md + ol list                                -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div style="max-width: var(--sgds-text-max-width);">

        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
          The Challenge
        </h2>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          User research conducted in 2022 revealed three persistent pain points that parents faced when trying to access post-birth government services.
        </p>

        <ol style="padding-left: var(--sgds-spacing-lg); margin: 0;">
          <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
            <strong>Fragmented entry points.</strong> Parents had to know which agency offered each benefit before they could begin. Many missed out on grants simply because they were unaware of them.
          </li>
          <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
            <strong>Repeated data entry.</strong> The same personal and household details were required across six separate agency forms, leading to fatigue and errors.
          </li>
          <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
            <strong>No status visibility.</strong> Once applications were submitted, parents had no unified view of their status across agencies - each required a separate login to check progress.
          </li>
        </ol>

      </div>
    </div>
  </section>

  <!--   SOLUTION - h2 + h3 subsections + body-md                          -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div style="max-width: var(--sgds-text-max-width);">

        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
          The Solution
        </h2>

        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
          A unified parenting checklist
        </h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          LifeSG introduced a dynamic checklist that surfaces relevant services based on the child's date of birth and the family's profile. Parents see only what applies to them, with clear deadlines and direct links to each application - no knowledge of agency structure required.
        </p>

        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
          Pre-filled forms with Myinfo
        </h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          By integrating Myinfo, the platform pre-populates personal and household data across all participating agency forms. Parents confirm rather than retype - reducing average form completion time from 18 minutes to under 4 minutes.
        </p>

        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
          Cross-agency status tracking
        </h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:mb-0">
          A single dashboard aggregates application statuses from ICA, HDB, CPF, and MSF. Push notifications alert parents when action is required, replacing the need to check multiple portals independently.
        </p>

      </div>
    </div>
  </section>

  <!--   RESULTS - h2 + display-sm stats + h5 labels + body-sm             -->
  <section class="sgds:bg-alternate sgds:py-layout-md">
    <div class="sgds-container">
      <div style="max-width: var(--sgds-text-max-width);">

        <div class="sgds:mb-layout-md">
          <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
            Results After 12 Months
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Measured against a baseline cohort from the year prior to launch.
          </p>
        </div>

        <div class="stats-row">

          <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
            <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
              60%
            </div>
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
              Reduction in time-to-access
            </h5>
            <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
              Average time from birth registration to first benefit received fell from 14 days to 5.5 days.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
            <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
              180K
            </div>
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
              Parents onboarded
            </h5>
            <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
              Representing 94% of all new births registered in Singapore during the period.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
            <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
              4.7
            </div>
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
              Satisfaction score (out of 5)
            </h5>
            <p class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-subtle sgds:mb-0">
              Based on 12,400 post-task survey responses collected in-app.
            </p>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!--   CLOSING - body-md + h6 caption + CTA right-aligned               -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div style="max-width: var(--sgds-text-max-width);">

        <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
          What's Next
        </h2>

        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          Building on the success of the Parenting Journey, the team is now expanding the life-moments model to cover eldercare transitions, housing upgrades, and retirement planning - applying the same cross-agency integration approach to new resident cohorts.
        </p>

        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
          The underlying platform improvements - Myinfo pre-fill, cross-agency status APIs, and the guided checklist component - are being made available as shared infrastructure for other agencies to adopt independently.
        </p>

        <h6 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">
          Published April 2026
        </h6>
        <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
          Government Digital Services, Smart Nation and Digital Government Office
        </p>

        <sgds-button variant="primary" size="md">Read More Stories</sgds-button>

      </div>
    </div>
  </section>

  <sgds-footer></sgds-footer>
`;

export default {
  title: "Templates/Success Story",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen"
  }
};

export const Default = {
  render: Template.bind({}),
  name: "Default"
};
