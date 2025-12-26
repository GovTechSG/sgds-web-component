import { html } from "lit";
import "../../mocks/searchInput.ts";

export const Loading = {
  render: Template.bind({}),
  name: "Loading state",
  args: { ...args, loading: true },
  parameters: {},
  tags: ["!dev"]
};

const EmptyTemplate = () => {
  return html` <sgds-search-input placeholder="Inital State: no options" id="search-input-empty"></sgds-search-input> `;
};

export const Empty = {
  render: EmptyTemplate.bind({}),
  name: "Initial state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const UserTypesAndLoadsTemplate = () => {
  return html`
    <sgds-search-input
      placeholder="Type more than 2 characters"
      id="search-input-user-types-and-loads"
    ></sgds-search-input>
    <script>
      const searchInput = document.getElementById("search-input-user-types-and-loads");
      searchInput.addEventListener("sgds-input", event => {
        const displayValue = event.detail.displayValue;
        if (displayValue.length > 2) {
          searchInput.loading = true;
          setTimeout(() => {
            searchInput.loading = false;
          }, 5000);
        }
      });
    </script>
  `;
};
export const UserTypesAndLoads = {
  render: UserTypesAndLoadsTemplate.bind({}),
  name: "User types and loads",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const DataLoadsTemplate = () => {
  return html`
    <sgds-search-input placeholder="Type S and I characters" id="search-input-user-types-and-loads">
      <sgds-search-input-option value="1">Singapore</sgds-search-input-option>
      <sgds-search-input-option value="2">Sierra Leone</sgds-search-input-option></sgds-search-input
    >
  `;
};

export const DataLoaded = {
  render: DataLoadsTemplate.bind({}),
  name: "Data loaded",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const FullUsageExample = {
  render: () => html` <mock-search-input></mock-search-input> `,
  name: "Full usage example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
