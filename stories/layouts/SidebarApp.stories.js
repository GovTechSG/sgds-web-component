import { html } from "lit";

export default {
  title: "Templates/App layout with sidebar"
};

const Template = () => {
  return html`
    <div class="sgds:sticky sgds:top-0">
      <sgds-masthead fluid></sgds-masthead>
      <sgds-mainnav fluid>
        <strong slot="brand">SGDS</strong>
        <strong slot="end">End</strong>
      </sgds-mainnav>
    </div>
    <div class="sgds:flex sgds:flex-row">
      <div
        class="sgds:sticky sgds:bg-translucent-subtle sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:top-27 sgds:md:w-68 sgds:w-18 "
      >
        <div id="sidebar-component" class="sgds:bg-translucent-subtle sgds:h-500 sgds:w-full">Place SideBar here</div>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:w-full ">
        <div class="sgds-container-sidebar sgds:py-2-xl">
          <div id="content" class="sgds:bg-translucent-subtle sgds:h-250 sgds:w-full">Place content here</div>
        </div>
        <sgds-footer></sgds-footer>
      </div>
    </div>
  `;
};
export const ApplicationLayoutWithSidebar = {
  render: Template.bind({}),
  name: "Application layout with sidebar",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: []
};

const CSSTemplate = () => {
  return html`
    <style>
      .sticky-top {
        position: sticky;
        top: 0;
      }

      .flex-container {
        display: flex;
        flex-direction: row;
      }

      .sidebar {
        position: sticky;
        background-color: var(--sgds-bg-translucent-subtle);
        height: calc(100vh - 108px);
        overflow-y: scroll;
        top: 6.75rem;
        width: 4.5rem;
      }

      @media (min-width: 768px) {
        .sidebar {
          width: 17rem;
        }
      }

      .sidebar-component {
        background-color: var(--sgds-bg-translucent-subtle);
        height: 1000px;
        width: 100%;
      }

      .main-content {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .sgds-container-sidebar {
        padding-top: var(--sgds-padding-2-xl);
        padding-bottom: var(--sgds-padding-2-xl);
      }

      .content {
        background-color: var(--sgds-bg-translucent-subtle);
        height: 1000px;
        width: 100%;
      }
    </style>

    <div>
      <div class="sticky-top">
        <sgds-masthead fluid></sgds-masthead>
        <sgds-mainnav fluid>
          <strong slot="brand">SGDS</strong>
          <strong slot="end">End</strong>
        </sgds-mainnav>
      </div>
      <div class="flex-container">
        <div class="sidebar">
          <div id="sidebar-component" class="sidebar-component">Place SideBar here</div>
        </div>
        <div class="main-content">
          <div class="sgds-container-sidebar">
            <div id="content" class="content">Place content here</div>
          </div>
          <sgds-footer></sgds-footer>
        </div>
      </div>
    </div>
  `;
};

export const ApplicationLayoutWithSidebarCSS = {
  render: CSSTemplate.bind({}),
  name: "Application layout with sidebar (CSS)",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: []
};
