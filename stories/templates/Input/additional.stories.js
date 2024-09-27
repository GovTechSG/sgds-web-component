import { html } from "lit-html";

export const SgdsInputPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
        <head>
          <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
          <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>


            <script src="./events.js">&lt;/script>



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

        componentElement.addEventListener('sgds-change', () => {
          console.log('sgds-change event triggered');
        });

                }
              });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the SgdsInput's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-input {
          --custom-css-property: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsInput responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsInput Attributes</h3>
      <p>
        You can modify the SgdsInput's attributes directly within the HTML. For
        example:
      </p>
      <pre><code>
        sgds-input some-attribute="value" 
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
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


