import { html } from "lit";

export default {
  title: "Foundation/Grid System"
};

/** 🎨 Basic Grid Example */
const BasicGrid = () => html`
  <div class="sgds-container">
    <div class="sgds-grid">
      <div class="sgds-col-2 grid-item">1</div>
      <div class="sgds-col-2 grid-item">2</div>
      <div class="sgds-col-2 grid-item">3</div>
      <div class="sgds-col-2 grid-item">4</div>
    </div>
  </div>
`;

/** 📲 Responsive Grid Example */
const ResponsiveGrid = () => html`
  <div class="sgds-container">
    <div class="sgds-grid">
      <div class="sgds-col-4 sgds-col-sm-4 sgds-col-md-3 sgds-col-lg-3 grid-item">Col 1</div>
      <div class="sgds-col-4 sgds-col-sm-4 sgds-col-md-3 sgds-col-lg-3 grid-item">Col 2</div>
      <div class="sgds-col-4 sgds-col-sm-4 sgds-col-md-3 sgds-col-lg-3 grid-item">Col 3</div>
      <div class="sgds-col-4 sgds-col-sm-4 sgds-col-md-3 sgds-col-lg-3 grid-item">Col 4</div>
    </div>
  </div>
`;

/** 👀 Hidden Columns Example */
const HiddenColumns = () => html`
  <div class="sgds-container">
    <div class="sgds-grid">
      <div class="sgds-col-2 sgds-col-sm-4 sgds-col-md-none grid-item">Hidden in md</div>
      <div class="sgds-col-none sgds-col-2 sgds-col-sm-4 grid-item">Hidden in xs</div>
    </div>
  </div>
`;

/** 👀 Center Column Example */
const CenterColumn = () => html`
  <div class="sgds-container">
    <div class="sgds-grid">
      <div
        class="sgds-col-center-2 sgds-col-sm-center-4 sgds-col-md-center-4 sgds-col-lg-center-6 sgds-col-xl-center-6 sgds-col-2-xl-center-6 grid-item"
      >
        Center
      </div>
    </div>
  </div>
`;

export const Basic = {
  render: BasicGrid.bind({}),
  name: "Basic Grid",
  args: {},
  tags: ["!dev", "!autodocs"]
};

export const Responsive = {
  render: ResponsiveGrid.bind({}),
  name: "Responsive Grid",
  args: {},
  tags: ["!dev", "!autodocs"]
};

export const HiddenCol = {
  render: HiddenColumns.bind({}),
  name: "Hidden Columns",
  args: {},
  tags: ["!dev", "!autodocs"]
};

export const CenterCol = {
  render: CenterColumn.bind({}),
  name: "Hidden Columns",
  args: {},
  tags: ["!dev", "!autodocs"]
};
