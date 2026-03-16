import { html } from "lit";

export default {
  title: "Foundation/Typography/Blockquote"
};

const BlockquoteTemplate = () => html`
  <blockquote
    class="sgds:text-body-default sgds:text-lg sgds:font-medium sgds:leading-relaxed sgds:italic sgds:border-l-4 sgds:border-primary-default sgds:pl-6 sgds:my-6"
  >
    "A meaningful quote that stands out from the main content."
  </blockquote>
`;

export const Blockquote = {
  render: BlockquoteTemplate.bind({}),
  name: "Blockquote"
};
