import { html } from "lit-html";

export const SgdsAlertPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
                  <!doctype html>
                  <html lang="en">
                  <head>
                    <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
                    <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>
                    <style>
                      undefined
                    </style>
                    <style>
                      --alert-bg
        --alert-border-color
        --alert-icon-margin-right
                    </style>
                  </head>
                  <body>
                    <sgds-alert>
                      <!-- Add component-specific content here -->
                    </sgds-alert>
                  </body>
                  </html>
      </script>

      <script type="sample/js" filename="events.js">
            document.addEventListener('DOMContentLoaded', () => {
              const componentElement = document.querySelector('sgds-alert');
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
      <p>
        You can edit the SgdsAlert's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-alert {
          --custom-css-property: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsAlert responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener('show', () => {
          console.log('show event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsAlert Attributes</h3>
      <p>
        You can modify the SgdsAlert's attributes directly within the HTML. For
        example:
      </p>
      <pre><code>
        <sgds-alert some-attribute="value"></sgds-alert>
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
};
