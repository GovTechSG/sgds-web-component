import { html } from "lit";

const Template = () => html`
  <!-- Page Header Block (with breadcrumb)
       Layout : breadcrumb on top, then overline + h1 + body description
       Typography : h1 pattern (overline, heading-xl bold, body-lg)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:gap-layout-md" class="sgds:max-w-text">
        <!-- Breadcrumb -->
        <sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Section</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item active><a href="#">Current Page</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>

        <!-- Heading group -->
        <div>
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Overline Label
          </div>

          <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
            Page Heading Goes Here
          </h1>

          <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
            Supporting body text that provides context and detail for the page or section above.
          </p>
        </div>
      </div>
    </div>
  </section>
`;

export default {
  title: "Blocks/Header",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const PageHeaderBreadcrumb = {
  render: Template.bind({}),
  name: "Page header with breadcrumb"
};
