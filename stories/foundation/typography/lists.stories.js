import { html } from "lit";

export default {
  title: "Foundation/Typography/Lists"
};

const UListTemplate = () => html`
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

const OListTemplate = () => html`
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

export const ULists = {
  render: UListTemplate.bind({}),
  name: "Unordered Lists"
};

export const OLists = {
  render: OListTemplate.bind({}),
  name: "Ordered Lists"
};
