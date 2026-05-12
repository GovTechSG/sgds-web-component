import { html } from "lit";

const StructuredElementsTemplate = () => html`
  <sgds-table ?headerbackground=${true} ?tableBorder=${true}>
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
  <sgds-table ?headerbackground=${true} ?tableBorder=${true}>
    <sgds-table-row>
      <sgds-table-head>1</sgds-table-head>
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
      <sgds-table-head>2</sgds-table-head>
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
      <sgds-table-head>3</sgds-table-head>
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

const StructuredElementsTemplateBoth = () => html` <sgds-table ?headerbackground=${true} ?tableBorder=${true}>
  <sgds-table-row>
    <sgds-table-head>#</sgds-table-head>
    <sgds-table-head>First name</sgds-table-head>
    <sgds-table-head>Last name</sgds-table-head>
    <sgds-table-head>Username</sgds-table-head>
    <sgds-table-head>Action</sgds-table-head>
  </sgds-table-row>

  <sgds-table-row>
    <sgds-table-head>1</sgds-table-head>
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
    <sgds-table-head>2</sgds-table-head>
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
    <sgds-table-head>3</sgds-table-head>
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

export const LayoutAuto = {
  render: Template.bind({}),
  name: "Layout Auto",
  args: { layout: "auto", tableBorder: true },
  parameters: {},
  tags: ["!dev"]
};

export const LayoutFixed = {
  render: Template.bind({}),
  name: "Layout Fixed",
  args: { layout: "fixed", tableBorder: true },
  parameters: {},
  tags: ["!dev"]
};

const LayoutFixedCustomWidthTemplate = () => html`
  <sgds-table layout="fixed" ?tableBorder=${true} ?headerBackground=${true}>
    <sgds-table-row>
      <sgds-table-head class="sgds:w-25">#</sgds-table-head>
      <sgds-table-head class="sgds:w-50">Name</sgds-table-head>
      <sgds-table-head>A very long column header indeed</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>1</sgds-table-cell>
      <sgds-table-cell>Alice</sgds-table-cell>
      <sgds-table-cell>Some longer content here</sgds-table-cell>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>2</sgds-table-cell>
      <sgds-table-cell>Bob</sgds-table-cell>
      <sgds-table-cell>Short</sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
`;

export const LayoutFixedCustomWidth = {
  render: LayoutFixedCustomWidthTemplate.bind({}),
  name: "Layout Fixed with Custom Column Widths",
  args: {},
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
