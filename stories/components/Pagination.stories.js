
    import { Template, args, parameters, play } from "../templates/Pagination/basic.js";

    export default {
      title: 'Components/Pagination',
      component: 'sgds-pagination',
      argTypes: {"dataLength":{"defaultValue":"0","control":"number"},"currentPage":{"defaultValue":"1","control":"number"},"itemsPerPage":{"defaultValue":"5","control":"number"},"variant":{"defaultValue":"default","control":"select","options":["default","number","button","description"]},"navigation":{"defaultValue":"icon-button","control":"select","options":["button","icon-button"]},"size":{"defaultValue":"md","control":"select","options":["sm","md"]}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import "../../mocks/pagination.ts";
import { html } from "lit";

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
