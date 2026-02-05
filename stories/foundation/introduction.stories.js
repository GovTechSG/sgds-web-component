import { html } from "lit";

export default {
  title: "Foundation/Introduction"
};

const HeaderTemplate = () => {
  return html`
    <div class="d-flex-column">
      <h1>Header H1</h1>
      <h2>Header H2</h2>
      <h3>Header H3</h3>
      <h4>Header H4</h4>
      <h5>Header H5</h5>
      <h6>Header H6</h6>
    </div>
  `;
};
const ParagraphTemplate = () => {
  return html`
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
  `;
};
const LabelTemplate = () => {
  return html` <label>Label</label> `;
};
const CaptionTemplate = () => {
  return html`
    <caption>
      Caption
    </caption>
  `;
};
const AnchorTemplate = () => {
  return html` <a href="#">Anchor link</a> `;
};
const UListTemplate = () => {
  return html`
    <ul>
      <li>hello world</li>
      <li>
        hello world
        <ul>
          <li>Sub of Second</li>
          <li>Another Sub</li>
        </ul>
      </li>
      <li>hello world</li>
      <li>hello world</li>
    </ul>
  `;
};
const OListTemplate = () => {
  return html`
    <ol>
      <li>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..</li>
      <li>
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..
        <ol>
          <li>Sub of Second</li>
          <li>Another Sub</li>
        </ol>
      </li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
      <li>hello world</li>
    </ol>
  `;
};
export const Headings = {
  render: HeaderTemplate.bind({}),
  name: "Headings",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
export const Paragraph = {
  render: ParagraphTemplate.bind({}),
  name: "Paragraph",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
export const Label = {
  render: LabelTemplate.bind({}),
  name: "Label",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
export const Caption = {
  render: CaptionTemplate.bind({}),
  name: "Caption",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
export const Anchor = {
  render: AnchorTemplate.bind({}),
  name: "Anchor",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
export const ULists = {
  render: UListTemplate.bind({}),
  name: "Unordered lists",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
export const OLists = {
  render: OListTemplate.bind({}),
  name: "Ordered lists",
  args: {},
  parameters: {},
  tags: ["!dev", "!autodocs"]
};
