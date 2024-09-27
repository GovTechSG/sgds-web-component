import { html } from "lit-html";

export const SgdsTextareaPlayground = {
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
        You can edit the SgdsTextarea's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-textarea {
          --custom-css-property: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsTextarea responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsTextarea Attributes</h3>
      <p>
        You can modify the SgdsTextarea's attributes directly within the HTML.
        For example:
      </p>
      <pre><code>
        sgds-textarea some-attribute="value" 
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
};


const ValidationTemplate = () =>
  html` <sgds-textarea required hasFeedback invalidFeedback="This is required"></sgds-textarea> `;

export const Validation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const changeValue = e => {
  e.preventDefault();
  const textarea = document.querySelector("sgds-textarea#default-value-eg");
  textarea.defaultValue = "Default value has changed!";
};

const DefaultValueTemplate = () => html`
  <form>
    <sgds-textarea id="default-value-eg" value="The initial value"></sgds-textarea>
    <sgds-button type="reset" class="mt-5">Reset</sgds-button>
    <sgds-button variant="warning" @click=${e => changeValue(e)}>Click to change the default value</sgds-button>
  </form>
`;
export const DefaultValue = {
  render: DefaultValueTemplate.bind({}),
  name: "Default Value",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
