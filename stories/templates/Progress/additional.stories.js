import { html } from "lit-html";

export const SgdsProgressPlayground = {
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
              sgds-progress {
                --progress-height;
              }
            </style>
          </head>
          <body>
            <sgds-progress id="comp">
              <sgds-progress-bar
                label="50%"
                variant="secondary"
                value="50"
                ariamin="0"
                ariamax="100"
                arialabel="Loading in progress"
              >
              </sgds-progress-bar>
            </sgds-progress>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the SgdsProgress's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-progress {
          --progress-height: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsProgress responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener("insert component event", () => {
          console.log("event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsProgress Attributes</h3>
      <p>
        You can modify the SgdsProgress's attributes directly within the HTML.
        For example:
      </p>
      <pre><code>
        sgds-progress some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
};
