import { html } from "lit-html";

const SizeTemplate = () => {
  return html`
    <div class="d-flex-row">
      <sgds-icon-list size="sm">
        <div role="listitem"><sgds-icon size="md" name="placeholder"></sgds-icon>item 1</div>
        <div role="listitem"><sgds-icon size="md" name="placeholder"></sgds-icon>item 2</div>
        <div role="listitem"><sgds-icon size="md" name="placeholder"></sgds-icon>item 3</div>
      </sgds-icon-list>
      <sgds-icon-list>
        <div role="listitem"><sgds-icon name="placeholder"></sgds-icon>item 1</div>
        <div role="listitem"><sgds-icon name="placeholder"></sgds-icon>item 2</div>
        <div role="listitem"><sgds-icon name="placeholder"></sgds-icon>item 3</div>
      </sgds-icon-list>
      <sgds-icon-list size="lg">
        <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>item 1</div>
        <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>item 2</div>
        <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>item 3</div>
      </sgds-icon-list>
    </div>
  `;
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
