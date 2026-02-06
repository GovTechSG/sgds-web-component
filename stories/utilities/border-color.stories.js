import { html } from "lit";
import "../../mocks/color-item.ts";

export default {
  title: "Utilities/Border Color",
  tags: ["autodocs"]
};

const ColorItem = (token, variable, borderColorValue = true) => {
  return html`
    <color-item
      token="${token}"
      variable="${variable}"
      borderColorValue="${borderColorValue ? "true" : ""}"
    ></color-item>
  `;
};

const ColorGrid = (...items) => html`
  <div class="sgds:grid sgds:gap-2-xl sgds:p-2-xl" style="grid-template-columns: repeat(3, 1fr);">${items}</div>
`;

export const DefaultBorderColors = () =>
  ColorGrid(
    ColorItem("sgds:border-default", "--sgds-border-color-default"),
    ColorItem("sgds:border-emphasis", "--sgds-border-color-emphasis"),
    ColorItem("sgds:border-muted", "--sgds-border-color-muted"),
    ColorItem("sgds:border-fixed-light", "--sgds-border-color-fixed-light"),
    ColorItem("sgds:border-fixed-dark", "--sgds-border-color-fixed-dark"),
    ColorItem("sgds:border-translucent", "--sgds-border-color-translucent"),
    ColorItem("sgds:border-transparent", "--sgds-border-color-transparent")
  );

export const PrimaryBorderColors = () =>
  ColorGrid(
    ColorItem("sgds:border-primary-default", "--sgds-primary-border-color-default"),
    ColorItem("sgds:border-primary-emphasis", "--sgds-primary-border-color-emphasis"),
    ColorItem("sgds:border-primary-muted", "--sgds-primary-border-color-muted")
  );

export const AccentBorderColors = () =>
  ColorGrid(
    ColorItem("sgds:border-accent-default", "--sgds-accent-border-color-default"),
    ColorItem("sgds:border-accent-emphasis", "--sgds-accent-border-color-emphasis"),
    ColorItem("sgds:border-accent-muted", "--sgds-accent-border-color-muted")
  );

export const SuccessBorderColors = () =>
  ColorGrid(
    ColorItem("sgds:border-success-default", "--sgds-success-border-color-default"),
    ColorItem("sgds:border-success-emphasis", "--sgds-success-border-color-emphasis"),
    ColorItem("sgds:border-success-muted", "--sgds-success-border-color-muted")
  );

export const DangerBorderColors = () =>
  ColorGrid(
    ColorItem("sgds:border-danger-default", "--sgds-danger-border-color-default"),
    ColorItem("sgds:border-danger-emphasis", "--sgds-danger-border-color-emphasis"),
    ColorItem("sgds:border-danger-subtle", "--sgds-danger-border-color-subtle")
  );

export const WarningBorderColors = () =>
  ColorGrid(
    ColorItem("sgds:border-warning-default", "--sgds-warning-border-color-default"),
    ColorItem("sgds:border-warning-emphasis", "--sgds-warning-border-color-emphasis")
  );
