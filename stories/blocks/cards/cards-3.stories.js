import { html } from "lit";

const Template = () => html`
  <!-- Cards Block — 3 columns × 3 rows
       Background : bg-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <!-- Section header -->
      <div class="sgds:mb-layout-md" class="sgds:max-w-text">
        <div
          class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
        >
          Programmes
        </div>
        <h2 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
          Featured Programmes
        </h2>
        <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
          Explore our curated selection of programmes designed to strengthen digital capabilities across the public
          sector.
        </p>
      </div>

      <!-- Card grid: 3 per row -->
      <div class="sgds-grid sgds:items-stretch">
        <!-- Row 1 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Digital Infrastructure for the Next Decade</span>
            <span slot="description"
              >An overview of Singapore's plans for resilient and future-ready digital infrastructure.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">AI Governance in the Public Sector</span>
            <span slot="description"
              >Panellists explore responsible AI adoption frameworks and inter-agency collaboration.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Zero-Trust Architecture for Government Systems</span>
            <span slot="description"
              >A deep dive into implementing zero-trust principles across legacy and modern systems.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <!-- Row 2 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Securing the Cloud: Lessons from the Field</span>
            <span slot="description"
              >Key takeaways from real-world cloud migration projects across the Singapore government.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Incident Response Playbooks for CISOs</span>
            <span slot="description"
              >Practical frameworks for building effective incident response and recovery strategies.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Panel Discussion</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Workforce Upskilling for Cyber Resilience</span>
            <span slot="description"
              >How agencies are building cyber talent pipelines and fostering a security-aware culture.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <!-- Row 3 -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Opening Address</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Building a Resilient Digital Government</span>
            <span slot="description"
              >An opening address on Singapore's whole-of-government approach to digital resilience.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Keynote</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">The Future of GovTech: People, Process and Platform</span>
            <span slot="description"
              >How people-centred design and agile delivery are shaping the next wave of government technology.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>

        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 sgds:flex sgds:flex-col">
          <sgds-card stretchedLink class="sgds:h-full">
            <sgds-badge slot="upper" outlined>Presentation</sgds-badge>
            <span slot="title" class="sgds:line-clamp-2">Automating Compliance Monitoring with AI</span>
            <span slot="description"
              >Using machine learning to continuously monitor systems for policy and regulatory compliance.</span
            >
            <sgds-link slot="footer"
              ><a href="#">View details <sgds-icon name="arrow-right"></sgds-icon></a
            ></sgds-link>
          </sgds-card>
        </div>
      </div>
    </div>
  </section>
`;

export default {
  title: "Blocks/Cards",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const Cards3 = {
  render: Template.bind({}),
  name: "3 per column"
};
