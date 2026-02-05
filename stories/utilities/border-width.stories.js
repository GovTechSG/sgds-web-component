import { html } from "lit";
import "../../mocks/width-item.ts";

export default {
  title: "Utilities/Border Width",
  tags: ["autodocs"],
};

const WidthItem = (token, variable, widthValue) => {
  return html`
    <width-item
      token="${token}"
      variable="${variable}"
      widthValue="${widthValue}"
    ></width-item>
  `;
};

const WidthGrid = (...items) => html`
  <div
    class="sgds:grid sgds:gap-2-xl sgds:p-2-xl"
    style="grid-template-columns: repeat(5, 1fr);"
  >
    ${items}
  </div>
`;

export const DefaultWidth = () =>
  WidthGrid(
    WidthItem(
      "sgds:border-0",
      "--sgds-border-width-0",
      "--sgds-border-width-0"
    ),
    WidthItem(
      "sgds:border-1",
      "--sgds-border-width-1",
      "--sgds-border-width-1"
    ),
    WidthItem(
      "sgds:border-2",
      "--sgds-border-width-2",
      "--sgds-border-width-2"
    ),
    WidthItem(
      "sgds:border-3",
      "--sgds-border-width-3",
      "--sgds-border-width-3"
    ),
    WidthItem(
      "sgds:border-4",
      "--sgds-border-width-4",
      "--sgds-border-width-4"
    )
  );

export const FormWidth = () =>
  WidthGrid(
    WidthItem(
      "sgds:border-form-default",
      "--sgds-form-border-width-default",
      "--sgds-form-border-width-default"
    ),
    WidthItem(
      "sgds:border-form-thick",
      "--sgds-form-border-width-thick",
      "--sgds-form-border-width-thick"
    )
  );
