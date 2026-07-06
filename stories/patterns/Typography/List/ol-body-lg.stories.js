import { html } from "lit";

const OLBodyLgTemplate = () => html`
  <div style="max-width: var(--sgds-text-max-width);">
    <ol class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
      <li
        class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg sgds:text-body-default"
      >
        Ordered list item one with enough text to demonstrate list large typography and line height.
      </li>
      <li
        class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg sgds:text-body-default"
      >
        Ordered list item two with a nested list below.
        <ol class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
          <li
            class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg sgds:text-body-default"
          >
            Nested item one inside the second top-level item.
          </li>
          <li
            class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:mt-list-lg sgds:text-body-default"
          >
            Nested item two continuing the same size and style.
          </li>
        </ol>
      </li>
      <li
        class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:mt-list-lg sgds:text-body-default"
      >
        Ordered list item three to complete the example set.
      </li>
    </ol>
  </div>
`;

export default {
  title: "Patterns/Typography/List",
  tags: ["!autodocs"],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
    layout: "padded"
  }
};

export const OLBodyLarge = {
  render: OLBodyLgTemplate.bind({}),
  name: "OL List Large Regular"
};
