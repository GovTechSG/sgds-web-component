import { html } from "lit";
import "../../mocks/color-item.ts";

export default {
  title: "Utilities/Form/Background Color",
  tags: ["!autodocs"]
};

const ColorItem = (token, variable, bgClass, textClass = "") => {
  return html`
    <color-item token="${token}" variable="${variable}" bgClass="${bgClass}" textClass="${textClass}"></color-item>
  `;
};

const ColorGrid = (...items) => html`
  <div class="sgds:grid sgds:gap-2-xl sgds:p-2-xl" style="grid-template-columns: repeat(3, 1fr);">${items}</div>
`;

export const Form = () =>
  ColorGrid(
    ColorItem("sgds:bg-form-surface-default", "--sgds-form-surface-default", "sgds:bg-form-surface-default"),
    ColorItem("sgds:bg-form-surface-raised", "--sgds-form-surface-raised", "sgds:bg-form-surface-raised"),
    ColorItem(
      "sgds:bg-form-surface-emphasis",
      "--sgds-form-surface-emphasis",
      "sgds:bg-form-surface-emphasis",
      "sgds:text-fixed-dark"
    ),
    ColorItem("sgds:bg-form-surface-subtle", "--sgds-form-surface-subtle", "sgds:bg-form-surface-subtle"),
    ColorItem("sgds:bg-form-surface-muted", "--sgds-form-surface-muted", "sgds:bg-form-surface-muted"),
    ColorItem(
      "sgds:bg-form-surface-inverse",
      "--sgds-form-surface-inverse",
      "sgds:bg-form-surface-inverse",
      "sgds:text-fixed-dark"
    ),
    ColorItem(
      "sgds:bg-form-surface-fixed-light",
      "--sgds-form-surface-fixed-light",
      "sgds:bg-form-surface-fixed-light",
      "sgds:text-fixed-dark"
    ),
    ColorItem(
      "sgds:bg-form-surface-fixed-dark",
      "--sgds-form-surface-fixed-dark",
      "sgds:bg-form-surface-fixed-dark",
      "sgds:text-fixed-light"
    ),
    ColorItem(
      "sgds:bg-form-primary-surface-default",
      "--sgds-form-primary-surface-default",
      "sgds:bg-form-primary-surface-default",
      "sgds:text-fixed-light"
    ),
    ColorItem(
      "sgds:bg-form-primary-surface-emphasis",
      "--sgds-form-primary-surface-emphasis",
      "sgds:bg-form-primary-surface-emphasis",
      "sgds:text-fixed-light"
    ),
    ColorItem(
      "sgds:bg-form-success-surface-default",
      "--sgds-form-success-surface-default",
      "sgds:bg-form-success-surface-default",
      "sgds:text-fixed-light"
    ),
    ColorItem(
      "sgds:bg-form-danger-surface-default",
      "--sgds-form-danger-surface-default",
      "sgds:bg-form-danger-surface-default",
      "sgds:text-fixed-light"
    )
  );
