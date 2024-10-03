import { html } from "lit-html";

export const SgdsPaginationPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
                  <!doctype html>
                  <html lang="en">
                  <head>
                    <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
                    <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>


                      <script src="./events.js">&lt;/script>


                      <style>
                           sgds-pagination {
                             --pagination-color
        --pagination-bg
        --pagination-hover-bg
        --pagination-active-color
        --pagination-active-bg
        --pagination-disabled-color
        --pagination-disabled-bg
                           }
                         </style>
                  </head>
                  <body>
                  ${Template(args).strings}
                  </body>
                  </html>
      </script>

      <script type="sample/js" filename="events.js">
              document.addEventListener('DOMContentLoaded', () => {
                const componentElement = document.getElementById('comp');
                if (componentElement) {

        componentElement.addEventListener('sgds-page-change', () => {
          console.log('sgds-page-change event triggered');
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
          ----pagination-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsPagination responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsPagination Attributes</h3>
      <p>You can modify the SgdsPagination's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-pagination some-attribute="value" 
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
