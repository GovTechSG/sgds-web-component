import { html } from "lit-html";

const ValidationTemplate = () =>
  html`
    <form>
      <sgds-checkbox required hasFeedback invalidFeedback="This is required">Check me</sgds-checkbox>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
  `;

export const CheckboxValidations = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const CheckboxPlayground = {
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
              <sgds-checkbox id = "cbox" name="check-me" value="check-me">Check me</sgds-checkbox>
          </body>
          </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener('DOMContentLoaded', () => {
          const myCbox = document.getElementById('cbox');

          if (myCbox ) {
            myCbox.addEventListener('sgds-change', () => {
              console.log('checkbox state changed');
            });

          } else {
            console.error('Checkbox not found');
          }
        });
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">

      <h3>1. Modify Event Handling</h3>
      <p>
        You can customize how the checkbox responds to events by editing <strong>events.js</strong>. For instance, you can
        change the action triggered by the <code>sgds-change</code> event:
      </p>
      <pre><code>
          myCbox.addEventListener('sgds-change', () => {
            console.log('custom message');
          });
        </code></pre>
      <p>In this example, the message will appear in browser console when checkbox state changes.</p>

      <h3>2. Change Checkbox Attributes</h3>
      <p>
        You can modify the checkbox's attributes directly within the HTML to
        change its appearance or behavior. Refer to the documentation below. For instance, try changing the button
        variant inside <strong>index.html</strong>:
      </p>
      <pre><code>
           sgds-checkbox invalid 
        </code></pre>
      <p>Changing the <code>invalid</code> attribute to <code>true</code> will make the checkbox invalid.</p>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
