import { html } from "lit-html";

export const SgdsDatepickerPlayground = {
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
                           sgds-datepicker {
                             --datepicker-theme-color
        --datepicker-hover-bg
        --datepicker-bg
        --datepicker-close-button-bg
        --datepicker-close-button-hover-bg
        --datepicker-close-button-color
        --datepicker-selected-date-bg
        --datepicker-selected-date-color
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

        componentElement.addEventListener('sgds-change-date', () => {
          console.log('sgds-change-date event triggered');
        });

                }
              });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsDatepicker's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-datepicker {
          ----datepicker-theme-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsDatepicker responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsDatepicker Attributes</h3>
      <p>You can modify the SgdsDatepicker's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-datepicker some-attribute="value" 
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
