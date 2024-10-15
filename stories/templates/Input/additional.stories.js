import { html } from "lit-html";

export const SgdsInputPlayground = {
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
          </head>
          <body>
            <sgds-input
              id="comp"
              type="text"
              label="Label"
              hinttext="This is a hint text"
              name="email"
              icon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; class=&quot;bi bi-envelope&quot; viewBox=&quot;0 0 16 16&quot;>
              <path d=&quot;M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z&quot;/>
              </svg>"
              placeholder="Placeholder"
            >
            </sgds-input>
          </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener("DOMContentLoaded", () => {
          const componentElement = document.getElementById("comp");
          if (componentElement) {
            componentElement.addEventListener("sgds-change", () => {
              console.log("sgds-change event triggered");
            });
          }
        });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Modify Event Handling</h3>
      <p>You can customize how the SgdsInput responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('insert component event', () => {
          console.log('event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsInput Attributes</h3>
      <p>You can modify the SgdsInput's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-input some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};

export const ValidationTemplate = () =>
  html` <sgds-input
    name="input1"
    id="input1"
    minlength="5"
    hasFeedback="true"
    invalidFeedback="Minimum length 5"
    hintText="At least 5 characters"
    label="Name"
  >
  </sgds-input>`;

export const InputValidation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
