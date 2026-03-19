import { html } from "lit";

export default {
  title: "Foundation/Typography/Code"
};

const InlineCodeTemplate = () => html`
  <p class="sgds:text-body-default">
    Use the
    <code class="sgds:font-mono sgds:text-sm sgds:bg-surface-raised sgds:px-1 sgds:rounded">import</code> statement.
  </p>
`;

const CodeBlockTemplate = () => html`
  <pre class="sgds:font-mono sgds:text-sm sgds:leading-relaxed sgds:bg-surface-raised sgds:p-4 sgds:rounded">
function hello() {
  return 'world';
}</pre
  >
`;

export const InlineCode = {
  render: InlineCodeTemplate.bind({}),
  name: "Inline Code"
};

export const CodeBlock = {
  render: CodeBlockTemplate.bind({}),
  name: "Code Block"
};
