import { html } from "lit";
import "../../mocks/radius-item.ts";

export default {
  title: "Utilities/Border Radius",
  tags: ["autodocs"]
};

const RadiusItem = (token, variable, radiusValue) => {
  return html` <radius-item token="${token}" variable="${variable}" radiusValue="${radiusValue}"></radius-item> `;
};

const RadiusGrid = (...items) => html`
  <div class="sgds:grid sgds:gap-2-xl sgds:p-2-xl" style="grid-template-columns: repeat(5, 1fr);">${items}</div>
`;

export const DefaultRadius = () =>
  RadiusGrid(
    RadiusItem("sgds:rounded-none", "--sgds-border-radius-none", "--sgds-border-radius-none"),
    RadiusItem("sgds:rounded-xs", "--sgds-border-radius-xs", "--sgds-border-radius-xs"),
    RadiusItem("sgds:rounded-sm", "--sgds-border-radius-sm", "--sgds-border-radius-sm"),
    RadiusItem("sgds:rounded-md", "--sgds-border-radius-md", "--sgds-border-radius-md"),
    RadiusItem("sgds:rounded-lg", "--sgds-border-radius-lg", "--sgds-border-radius-lg"),
    RadiusItem("sgds:rounded-xl", "--sgds-border-radius-xl", "--sgds-border-radius-xl"),
    RadiusItem("sgds:rounded-2-xl", "--sgds-border-radius-2-xl", "--sgds-border-radius-2-xl"),
    RadiusItem("sgds:rounded-full", "--sgds-border-radius-full", "--sgds-border-radius-full")
  );

export const FormRadius = () =>
  RadiusGrid(
    RadiusItem("sgds:rounded-form-none", "--sgds-form-border-radius-none", "--sgds-form-border-radius-none"),
    RadiusItem("sgds:rounded-form-xs", "--sgds-form-border-radius-xs", "--sgds-form-border-radius-xs"),
    RadiusItem("sgds:rounded-form-sm", "--sgds-form-border-radius-sm", "--sgds-form-border-radius-sm"),
    RadiusItem("sgds:rounded-form-md", "--sgds-form-border-radius-md", "--sgds-form-border-radius-md"),
    RadiusItem("sgds:rounded-form-full", "--sgds-form-border-radius-full", "--sgds-form-border-radius-full")
  );
