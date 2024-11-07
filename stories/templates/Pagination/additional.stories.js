import { MockPagination } from "../../mocks/pagination.ts";
import { html } from "lit-html";

const MockPaginationTemplate = () => Object.assign(new MockPagination());

export const PaginationWithAPI = {
  render: MockPaginationTemplate.bind({}),
  name: "API example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationSizes = {
  render: () => html`
    <sgds-pagination dataLength="50"></sgds-pagination>
    <sgds-pagination dataLength="50" size="md"></sgds-pagination>
    <sgds-pagination dataLength="50" size="lg"></sgds-pagination>
  `,
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationDirectionVariant = {
  render: () => html`
    <sgds-pagination dataLength="50"></sgds-pagination>
    <sgds-pagination dataLength="50" directionVariant="text"></sgds-pagination>
    <sgds-pagination dataLength="50" directionVariant="icon"></sgds-pagination>
  `,
  name: "Direction Variant",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationLimit = {
  render: () => html`
    <sgds-pagination dataLength="10" itemsPerPage="1" limit="3"></sgds-pagination>
    <sgds-pagination dataLength="10" itemsPerPage="1" limit="5"></sgds-pagination>
    <sgds-pagination dataLength="10" itemsPerPage="1" limit="8"></sgds-pagination>
  `,
  name: "Limit",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const EllipsisOn = {
  render: () => html`
    <sgds-pagination dataLength="50" itemsPerPage="5" limit="3"></sgds-pagination>
    <sgds-pagination dataLength="50" itemsPerPage="5" limit="5" ellipsisOn></sgds-pagination>
  `,
  name: "Ellipsis",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const EllipsisJump = {
  render: () => html`
    <sgds-pagination dataLength="50" ellipsisOn currentPage="2"></sgds-pagination>
    <sgds-pagination dataLength="50" ellipsisOn ellipsisJump="6" currentPage="2"></sgds-pagination>
    <sgds-pagination dataLength="50" ellipsisOn ellipsisJump="12" currentPage="2"></sgds-pagination>
  `,
  name: "Ellipsis Jump",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const ShowFirstPage = {
  render: () => html`
    Show first page: <sgds-pagination dataLength="50" currentPage="4" showFirstPage></sgds-pagination> Show last page:
    <sgds-pagination dataLength="50" currentPage="4" showLastPage></sgds-pagination> Show first and last
    page<sgds-pagination dataLength="50" currentPage="4" showFirstPage showLastPage></sgds-pagination>
  `,
  name: "Show First Last Page",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
