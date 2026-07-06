import { html } from "lit";

const ULBodyMdTemplate = () => html`
  <div style="max-width: var(--sgds-text-max-width);">
    <ul class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
      <li
        class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:my-list-md sgds:text-body-default"
      >
        Unordered list item one with enough text to demonstrate list medium typography and line height.
      </li>
      <li
        class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:my-list-md sgds:text-body-default"
      >
        Unordered list item two with a nested list below.
        <ul class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          <li
            class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:my-list-md sgds:text-body-default"
          >
            Nested item one inside the second top-level item.
          </li>
          <li
            class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:mt-list-md sgds:text-body-default"
          >
            Nested item two continuing the same size and style.
          </li>
        </ul>
      </li>
      <li
        class="sgds:text-list-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:mt-list-md sgds:text-body-default"
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

export const ULBodyMedium = {
  render: ULBodyMdTemplate.bind({}),
  name: "UL List Medium Regular"
};
