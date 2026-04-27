import { html } from "lit";

const OLBodySmTemplate = () => html`
  <div style="max-width: var(--sgds-text-max-width);">
    <ol style="padding-left: var(--sgds-spacing-lg); margin: 0;">
      <li class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
        Ordered list item one with enough text to demonstrate body small typography and line height.
      </li>
      <li class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
        Ordered list item two with a nested list below.
        <ol style="padding-left: var(--sgds-spacing-lg); margin: 0;">
          <li class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
            Nested item one inside the second top-level item.
          </li>
          <li class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
            Nested item two continuing the same size and style.
          </li>
        </ol>
      </li>
      <li class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-default">
        Ordered list item three to complete the example set.
      </li>
    </ol>
  </div>
`;

export default {
  title: "Patterns/Typography/List",
  tags: ["!autodocs"],
  parameters: { layout: "padded"
  }
};

export const OLBodySmall = {
  render: OLBodySmTemplate.bind({}),
  name: "OL Body Small"
};
