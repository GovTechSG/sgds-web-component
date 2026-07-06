import { html } from "lit";

const ULBodyLgTemplate = () => html`
  <div style="max-width: var(--sgds-text-max-width);">
    <ul class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
      <li
        class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg sgds:text-body-default"
      >
        Unordered list item one with enough text to demonstrate list large typography and line height.
      </li>
      <li
        class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:my-list-lg sgds:text-body-default"
      >
        Unordered list item two with a nested list below.
        <ul class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">
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
        </ul>
      </li>
      <li
        class="sgds:text-list-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:mt-list-lg sgds:text-body-default"
      >
        Unordered list item three to complete the example set.
      </li>
    </ul>
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

export const ULBodyLarge = {
  render: ULBodyLgTemplate.bind({}),
  name: "UL List Large Regular"
};
