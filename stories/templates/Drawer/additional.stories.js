import { html } from "lit-html";

export const SgdsDrawerPlayground = {
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

            sgds-drawer::part(base) {
              /* Your CSS here */
            }


            sgds-drawer::part(overlay) {
              /* Your CSS here */
            }


            sgds-drawer::part(panel) {
              /* Your CSS here */
            }


            sgds-drawer::part(header) {
              /* Your CSS here */
            }


            sgds-drawer::part(header-actions) {
              /* Your CSS here */
            }


            sgds-drawer::part(title) {
              /* Your CSS here */
            }


            sgds-drawer::part(close-button) {
              /* Your CSS here */
            }


            sgds-drawer::part(body) {
              /* Your CSS here */
            }


            sgds-drawer::part(footer) {
              /* Your CSS here */
            }

                       </style>
                      <style>
                           sgds-drawer {
                             --drawer-size
        --drawer-padding
        --drawer-bg
        --drawer-button-gap
                           }
                         </style>
                  </head>
                  <body>
                    <sgds-drawer id="comp">
                      <!-- Add component-specific content here -->
                    </sgds-drawer>
                  </body>
                  </html>
      </script>

      <script type="sample/js" filename="events.js">
              document.addEventListener('DOMContentLoaded', () => {
                const componentElement = document.getElementById('comp');
                if (componentElement) {

        componentElement.addEventListener('sgds-show', () => {
          console.log('sgds-show event triggered');
        });

                }
              });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsDrawer's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-drawer {
          ----drawer-size: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsDrawer responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsDrawer Attributes</h3>
      <p>You can modify the SgdsDrawer's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-drawer some-attribute="value" 
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
