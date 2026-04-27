import { html } from "lit";

const ULBodyMdTemplate = () => html`
  <div style="max-width: var(--sgds-text-max-width);">
    <ul style="padding-left: var(--sgds-spacing-lg); margin: 0;">
      <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        Unordered list item one with enough text to demonstrate body medium typography and line height.
      </li>
      <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        Unordered list item two with a nested list below.
        <ul style="padding-left: var(--sgds-spacing-lg); margin: 0;">
          <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
            Nested item one inside the second top-level item.
          </li>
          <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
            Nested item two continuing the same size and style.
          </li>
        </ul>
      </li>
      <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
        Unordered list item three to complete the example set.
      </li>
    </ul>
  </div>
`;

export default {
  title: "Patterns/Typography/List",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const ULBodyMedium = {
  render: ULBodyMdTemplate.bind({}),
  name: "UL Body Medium"
};
