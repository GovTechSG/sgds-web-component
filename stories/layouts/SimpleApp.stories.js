import { html } from "lit";

export default {
  title: "Templates/App layout simple"
};

const Template = () => {
  return html`
    <div>
      <sgds-masthead fluid></sgds-masthead>
      <sgds-mainnav fluid>
        <strong slot="brand">SGDS</strong>
        <strong slot="end">End</strong>
      </sgds-mainnav>
    </div>
    <div class="sgds:flex sgds:flex-col sgds:w-full">
      <div class="sgds-container sgds:py-2-xl">
        <div id="content" class="sgds:h-250 sgds:w-full">Place content here</div>
      </div>
      <sgds-footer></sgds-footer>
    </div>
  `;
};
export const ApplicationLayoutSimple = {
  render: Template.bind({}),
  name: "Application layout simple",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
