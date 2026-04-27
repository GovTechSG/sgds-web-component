import { html } from "lit";

const ULBodyLgTemplate = () => html`
  <div style="max-width: var(--sgds-text-max-width);">
    <ul style="padding-left: var(--sgds-spacing-lg); margin: 0;">
      <li class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:text-body-default">
        Unordered list item one with enough text to demonstrate body large typography and line height.
      </li>
      <li class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:text-body-default">
        Unordered list item two with a nested list below.
        <ul style="padding-left: var(--sgds-spacing-lg); margin: 0;">
          <li class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:text-body-default">
            Nested item one inside the second top-level item.
          </li>
          <li class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:text-body-default">
            Nested item two continuing the same size and style.
          </li>
        </ul>
      </li>
      <li class="sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:text-body-default">
        Unordered list item three to complete the example set.
      </li>
    </ul>
  </div>
`;

export default {
  title: "Patterns/Typography/List",
  tags: ["!autodocs"],
  parameters: { layout: "padded"
  }
};

export const ULBodyLarge = {
  render: ULBodyLgTemplate.bind({}),
  name: "UL Body Large"
};
