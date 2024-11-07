import { MockPagination } from "../../mocks/pagination.ts";
import { html } from "lit-html";

const MockPaginationTemplate = () => Object.assign(new MockPagination());

export const PaginationWithAPI = {
  render: MockPaginationTemplate.bind({}),
  name: "API example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationSizes = {
  render: () => html`
    <sgds-pagination dataLength="50"></sgds-pagination>
    <sgds-pagination dataLength="50" size="md"></sgds-pagination>
    <sgds-pagination dataLength="50" size="lg"></sgds-pagination>
  `,
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationDirectionVariant = {
  render: () => html`
    <sgds-pagination dataLength="50"></sgds-pagination>
    <sgds-pagination dataLength="50" directionVariant="text"></sgds-pagination>
    <sgds-pagination dataLength="50" directionVariant="icon"></sgds-pagination>
  `,
  name: "Direction Variant",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const PaginationLimit = {
  render: () => html`
    <sgds-pagination dataLength="10" itemsPerPage="1" limit="3"></sgds-pagination>
    <sgds-pagination dataLength="10" itemsPerPage="1" limit="5"></sgds-pagination>
    <sgds-pagination dataLength="10" itemsPerPage="1" limit="8"></sgds-pagination>
  `,
  name: "Limit",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const EllipsisOn = {
  render: () => html`
    <sgds-pagination dataLength="50" itemsPerPage="5" limit="3"></sgds-pagination>
    <sgds-pagination dataLength="50" itemsPerPage="5" limit="5" ellipsisOn></sgds-pagination>
  `,
  name: "Ellipsis",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const EllipsisJump = {
  render: () => html`
    <sgds-pagination dataLength="50" ellipsisOn currentPage="2"></sgds-pagination>
    <sgds-pagination dataLength="50" ellipsisOn ellipsisJump="6" currentPage="2"></sgds-pagination>
    <sgds-pagination dataLength="50" ellipsisOn ellipsisJump="12" currentPage="2"></sgds-pagination>
  `,
  name: "Ellipsis Jump",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const ShowFirstPage = {
  render: () => html`
    Show first page: <sgds-pagination dataLength="50" currentPage="4" showFirstPage></sgds-pagination> Show last page:
    <sgds-pagination dataLength="50" currentPage="4" showLastPage></sgds-pagination> Show first and last
    page<sgds-pagination dataLength="50" currentPage="4" showFirstPage showLastPage></sgds-pagination>
  `,
  name: "Show First Last Page",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const SgdsPaginationPlayground = {
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
              sgds-pagination {
                --pagination-color;
                --pagination-bg;
                --pagination-hover-bg;
                --pagination-active-color;
                --pagination-active-bg;
                --pagination-disabled-color;
                --pagination-disabled-bg;
              }
            </style>
          </head>
          <body>
            <sgds-pagination id="comp" datalength="50"></sgds-pagination>
          </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener("DOMContentLoaded", () => {
          const componentElement = document.getElementById("comp");
          if (componentElement) {
            componentElement.addEventListener("sgds-page-change", () => {
              console.log("sgds-page-change event triggered");
            });
          }
        });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsPagination's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-pagination {
          --pagination-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsPagination responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener("sgds-page-change", () => {
          console.log("event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsPagination Attributes</h3>
      <p>You can modify the SgdsPagination's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-pagination some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
