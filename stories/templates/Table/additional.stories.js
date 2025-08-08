import { html } from "lit-html";

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

const StructuredElementsTemplateVertical = () => html`
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head noborder>1</sgds-table-head>
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
      <sgds-table-head noborder>2</sgds-table-head>
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
      <sgds-table-head noborder>3</sgds-table-head>
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

const StructuredElementsTemplateBoth = () => html`<sgds-table>
  <sgds-table-row>
    <sgds-table-head>#</sgds-table-head>
    <sgds-table-head>First name</sgds-table-head>
    <sgds-table-head>Last name</sgds-table-head>
    <sgds-table-head>Username</sgds-table-head>
    <sgds-table-head>Action</sgds-table-head>
  </sgds-table-row>

  <sgds-table-row>
    <sgds-table-head noborder>1</sgds-table-head>
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
    <sgds-table-head noborder>2</sgds-table-head>
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
    <sgds-table-head noborder>3</sgds-table-head>
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
</sgds-table>`;

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

export const StructuredElements = {
  render: StructuredElementsTemplate.bind({}),
  name: "Structured elements",
  args: { responsive: "sm" },
  parameters: {},
  tags: ["!dev"]
};

export const StructuredElementsVertical = {
  render: StructuredElementsTemplateVertical.bind({}),
  name: "Structured elements with vertical",
  args: { responsive: "sm" },
  parameters: {},
  tags: ["!dev"]
};

export const StructuredElementsBoth = {
  render: StructuredElementsTemplateBoth.bind({}),
  name: "Structured elements with both header",
  args: { responsive: "sm" },
  parameters: {},
  tags: ["!dev"]
};
