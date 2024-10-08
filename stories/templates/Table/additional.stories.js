import { html } from "lit-html";

export const SgdsTablePlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
          <head>
            <link
              href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css"
              rel="stylesheet"
              type="text/css"
            />
            <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>
            <script src="./events.js">&lt;/script>

            <style>
              sgds-table {
                --table-bg;
                --table-accent-bg;
                --table-striped-color;
                --table-striped-bg;
                --table-active-color;
                --table-active-bg;
                --table-hover-color;
                --table-hover-bg;
              }
            </style>
          </head>
          <body>
            <sgds-table></sgds-table>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the SgdsTable's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-table {
          --table-bg: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsTable responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener("insert component event", () => {
          console.log("event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsTable Attributes</h3>
      <p>
        You can modify the SgdsTable's attributes directly within the HTML. For
        example:
      </p>
      <pre><code>
        sgds-table some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
};


export const SortingTable = {
  render: Template.bind({}),
  name: "Sorting",
  args: { sort: "true" },
  parameters: {},
  tags: ["!dev"]
};
export const RemovableSort = {
  render: Template.bind({}),
  name: "Remove Sorting",
  args: { removableSort: true },
  parameters: {},
  tags: ["!dev"]
};

export const StripedTable = {
  render: Template.bind({}),
  name: "Striped",
  args: { striped: true },
  parameters: {},
  tags: ["!dev"]
};
export const BorderedTable = {
  render: Template.bind({}),
  name: "Bordered",
  args: { bordered: true },
  parameters: {},
  tags: ["!dev"]
};
export const BorderlessTable = {
  render: Template.bind({}),
  name: "Borderless",
  args: { borderless: true },
  parameters: {},
  tags: ["!dev"]
};
export const HoverTable = {
  render: Template.bind({}),
  name: "Hover",
  args: { hover: true },
  parameters: {},
  tags: ["!dev"]
};
export const VariantTable = {
  render: Template.bind({}),
  name: "Variant",
  args: { variant: "dark" },
  parameters: {},
  tags: ["!dev"]
};
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
