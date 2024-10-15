import { html } from "lit-html";

export const SgdsAlertPlayground = {
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
              sgds-alert {
                --alert-bg;
                --alert-border-color;
                --alert-icon-margin-right;
              }
            </style>
          </head>
          <body>
            <sgds-alert id="comp" variant="primary" show>
              <svg
                slot="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                ></path>
                <path
                  d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                ></path>
              </svg>
              This is an Alert component. You may add the dismissible option
            </sgds-alert>

            <sgds-button id="closeButton" variant="primary">Toggle</sgds-button>
          </body>
        </html>
      </script>

<script type="sample/js" filename="events.js">
       document.addEventListener("DOMContentLoaded", () => {

       const alertElement = document.getElementById("comp");
       const closeButton = document.getElementById("closeButton");

       if (alertElement && closeButton) {
        alertElement.addEventListener("sgds-hide", () => {
          console.log("sgds-hide event triggered");
        });
        
        closeButton.addEventListener("click", () => {
            alertElement.close(); 
          
        });
      }
    });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsAlert's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-alert {
          --alert-bg: value;
          --alert-border-color: value;
          --alert-icon-margin-right: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsAlert responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener("sgds-show", () => {
          console.log("sgds-show event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsAlert Attributes</h3>
      <p>You can modify the SgdsAlert's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-alert some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
