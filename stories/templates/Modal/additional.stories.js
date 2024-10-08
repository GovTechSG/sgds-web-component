import { html } from "lit-html";

export const SgdsModalPlayground = {
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
              sgds-modal::part(base) {
                /* Your CSS here */
              }

              sgds-modal::part(overlay) {
                /* Your CSS here */
              }

              sgds-modal::part(panel) {
                /* Your CSS here */
              }

              sgds-modal::part(header) {
                /* Your CSS here */
              }

              sgds-modal::part(title) {
                /* Your CSS here */
              }

              sgds-modal::part(body) {
                /* Your CSS here */
              }

              sgds-modal::part(footers) {
                /* Your CSS here */
              }
            </style>

            <style>
              sgds-modal {
                --modal-panel-padding;
                --modal-panel-z-index;
                --modal-panel-width;
                --modal-panel-height;
                --modal-panel-bg;
                --modal-panel-border-radius;
                --modal-header-border-bottom;
                --modal-overlay-bg;
              }
            </style>
          </head>
          <body>
            <sgds-button id="showModal">Open Modal</sgds-button>
            <sgds-modal id="comp">
              This is a Modal
              <sgds-button
                id = "closeModal"
                slot="footer"
                variant="link"
                class="close-modal"
              >
                Close
              </sgds-button>
              <sgds-button slot="footer" variant="primary" type="submit" form="formA">
                Submit
              </sgds-button>
            </sgds-modal>
          </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener("DOMContentLoaded", () => {
          const componentElement = document.getElementById("comp");
          const opener = document.getElementById("showModal");
          const closer = document.getElementById("closeModal");

          if (opener) {
            opener.addEventListener("click", () => {
              const modal = document.querySelector("sgds-modal");
              if (modal) {
                modal.show();
              }
            });
          }

          if (closer) {
            closer.addEventListener("click", () => {
              const modal = document.querySelector("sgds-modal");
              if (modal) {
                modal.hide();
              }
            });
          }         


          if (componentElement) {
            componentElement.addEventListener("sgds-close", () => {
              console.log("sgds-close event triggered");
            });
          }
        });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the SgdsModal's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-modal {
          --modal-panel-padding: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsModal responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener("insert component event", () => {
          console.log("event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsModal Attributes</h3>
      <p>
        You can modify the SgdsModal's attributes directly within the HTML. For
        example:
      </p>
      <pre><code>
        sgds-modal some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
};

