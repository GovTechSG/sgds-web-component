import { html } from "lit-html";

export const AlwaysResponsive = {
  render: Template.bind({}),
  name: "Always Responsive",
  args: { responsive: "always" },
  parameters: {},
  tags: ["!dev"]
};

export const Responsive = {
  render: Template.bind({}),
  name: "Responsive",
  args: { responsive: "sm" },
  parameters: {},
  tags: ["!dev"]
};

const StructuredElementsTemplate = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>#</sgds-table-head>
      <sgds-table-head>First name</sgds-table-head>
      <sgds-table-head>Last name</sgds-table-head>
      <sgds-table-head>Username</sgds-table-head>
      <sgds-table-head>Action</sgds-table-head>
    </sgds-table-row>

    <sgds-table-row>
      <sgds-table-cell>1</sgds-table-cell>
      <sgds-table-cell>John</sgds-table-cell>
      <sgds-table-cell>Doe</sgds-table-cell>
      <sgds-table-cell>
        <sgds-link>
          <a href="#">@johndoe</a>
        </sgds-link>
      </sgds-table-cell>
      <sgds-table-cell>
        <sgds-icon-button name="three-dots-vertical"></sgds-icon-button>
      </sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>2</sgds-table-cell>
      <sgds-table-cell>Jane</sgds-table-cell>
      <sgds-table-cell>Doe</sgds-table-cell>
      <sgds-table-cell>
        <sgds-link>
          <a href="#">@janedoe</a>
        </sgds-link>
      </sgds-table-cell>
      <sgds-table-cell>-</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>3</sgds-table-cell>
      <sgds-table-cell>Bob</sgds-table-cell>
      <sgds-table-cell>Smith</sgds-table-cell>
      <sgds-table-cell>
        <sgds-link>
          <a href="#">@bobsmith</a>
        </sgds-link>
      </sgds-table-cell>
      <sgds-table-cell>
        <sgds-badge outlined> active </sgds-badge>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;

export const StructuredElements = {
  render: StructuredElementsTemplate.bind({}),
  name: "Structured Elements",
  args: { responsive: "sm" },
  parameters: {},
  tags: ["!dev"]
};
