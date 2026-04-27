import { html } from "lit";

const SheenTemplate = args =>
  html`
    <div class="d-flex-row">
      <sgds-skeleton width="96px" height="96px" borderRadius="50%" sheen></sgds-skeleton>
      <sgds-skeleton width="96px" height="96px" borderRadius="4px" sheen></sgds-skeleton>
      <sgds-skeleton width="128px" height="64px" borderRadius="4px" sheen></sgds-skeleton>
      <sgds-skeleton width="200px" height="20px" borderRadius="4px" sheen></sgds-skeleton>
    </div>
  `;

const RowsTemplate = () => html`
  <div class="d-flex-row">
    <div class="d-flex-col">
      <h3>10 rows in 240px height</h3>
      <sgds-skeleton width="250px" height="240px" borderRadius="4px" rows="10"></sgds-skeleton>
    </div>
    <div class="d-flex-col">
      <h3>10 rows in 100px height</h3>
      <sgds-skeleton width="250px" height="100px" borderRadius="4px" rows="10"></sgds-skeleton>
    </div>
    <div class="d-flex-col">
      <h3>5 rows in 100px height</h3>
      <sgds-skeleton width="250px" height="100px" borderRadius="4px" rows="5"></sgds-skeleton>
    </div>
  </div>
`;

export const Sheen = {
  render: SheenTemplate.bind({}),
  name: "Sheen",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Rows = {
  render: RowsTemplate.bind({}),
  name: "Rows",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
