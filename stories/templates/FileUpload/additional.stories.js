import { html } from "lit-html";

export const SgdsFileUploadPlayground = {
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
            sgds-file-upload {
              --file-upload-file-icon-color;
              --file-upload-remove-icon-color;
              --file-upload-remove-icon-hover-color;
            }
          </style>
        </head>
        <body>
          <sgds-file-upload id="comp" variant="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-upload me-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
              ></path>
              <path
                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
              ></path>
            </svg>
            Choose a File
          </sgds-file-upload>
        </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener("DOMContentLoaded", () => {
          const componentElement = document.getElementById("comp");
          if (componentElement) {
            componentElement.addEventListener("sgds-files-selected", () => {
              console.log("sgds-files-selected event triggered");
            });
          }
        });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsFileUpload's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-file-upload {
          --file-upload-file-icon-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsFileUpload responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('insert component event', () => {
          console.log('event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsFileUpload Attributes</h3>
      <p>You can modify the SgdsFileUpload's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-file-upload some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
