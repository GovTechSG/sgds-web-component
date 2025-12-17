import "../../mocks/pagination.ts";
import { html } from "lit-html";

const MockPaginationTemplate = () => html`<mock-pagination></mock-pagination>`;

export const PaginationWithAPI = {
  render: MockPaginationTemplate.bind({}),
  name: "API example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationSizes = {
  render: () => html`
    <sgds-pagination dataLength="50" size="sm"></sgds-pagination>
    <sgds-pagination dataLength="50" size="md"></sgds-pagination>
  `,
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationVariants = {
  render: () => html`
    <sgds-pagination dataLength="50"></sgds-pagination>
    <sgds-pagination dataLength="50" variant="number"></sgds-pagination>
    <sgds-pagination dataLength="50" variant="button"></sgds-pagination>
    <sgds-pagination dataLength="50" variant="description"></sgds-pagination>
  `,
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Navigation = {
  render: () => html`
    <sgds-pagination dataLength="50"></sgds-pagination>
    <sgds-pagination dataLength="50" navigation="button"></sgds-pagination>
  `,
  name: "Navigation button type",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
