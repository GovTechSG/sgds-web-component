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
      <div class="sgds:sticky sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:top-27 sgds:w-68 sgds:border-r sgds:border-muted">
        <div id="sidebar-component" class="sgds:h-500 sgds:w-full">Place SideBar here</div>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:w-full ">
        <div class="sgds-container-sidebar sgds:py-2-xl">
          <div id="content" class="sgds:h-250 sgds:w-full">Place content here</div>
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
  tags: ["!autodocs"]
};
