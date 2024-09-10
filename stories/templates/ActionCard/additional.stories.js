import { html } from "lit-html";
const CardAsRadioTemplate = args =>
  html`
    <form>
      <sgds-radio-group>
        <sgds-action-card type="radio" name="apple">
          <span slot="card-subtitle">Laptop</span>
          <span slot="card-title">Apple</span>
          <span slot="card-text">Macbook Pro M1</span>
        </sgds-action-card>
        <sgds-action-card type="radio" name="microsoft">
          <span slot="card-subtitle">Laptop</span>
          <span slot="card-title">Microsoft</span>
          <span slot="card-text">Microsoft Surface Pro</span>
        </sgds-action-card>
        <sgds-action-card type="radio" name="acer">
          <span slot="card-subtitle">Laptop</span>
          <span slot="card-title">Acer</span>
          <span slot="card-text">Aspire 5</span>
        </sgds-action-card>
      </sgds-radio-group>
    </form>
  `;

export const ActionCardAsRadio = {
  render: CardAsRadioTemplate.bind({}),
  name: "Action Card as radio",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

// const ActionCardPlaygroundTemplate = args =>
//   html`
//     <sgds-action-card type="radio" name="apple">
//       <span slot="card-subtitle">Laptop</span>
//       <span slot="card-title">Apple</span>
//       <span slot="card-text">Macbook Pro M1</span>
//     </sgds-action-card>
//   `;

// export const ActionCardPlayground = {
//   render: ActionCardPlaygroundTemplate.bind({}),
//   name: "Playground",
//   args: {},
//   parameters: {},
//   tags: ["dev"]
// };

export const ActionCardPlayground = {
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
        action-card::part(base) {
          /* Add styles for the base wrapper here */
        }

        action-card::part(body) {
          /* Add styles for the body here */
        }

        action-card::part(subtitle) {
          /* Add styles for the subtitle here */
        }

        action-card::part(title) {
          /* Add styles for the title here */
        }

        action-card::part(text) {
          /* Add styles for the text here */
        }
                  </style>


                </head>
                <body>
            <sgds-action-card id= "action-card">
              <span slot="card-subtitle">Laptop</span>
            </sgds-action-card>
                </body>
                </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener('DOMContentLoaded', () => {
          const action = document.getElementById('action-card');

          if (action) {
            button.addEventListener('sgds-change', () => {
              console.log('checked status changed');
            });

          } else {
            console.error('Action Card not found');
          }
        });
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the alert's shadow parts css by modifying its custom CSS properties. These can be seen in the
        documentation below. For example, you can change the background colour by editing the following code inside
        <strong>index.html</strong>:
      </p>
      <pre><code>
        action-card::part(body) {
 color: darkred;
}
      </code></pre>

      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the button responds to events by editing <strong>events.js</strong>. For instance, you can
        change the action triggered by the <code>sgds-change</code> event:
      </p>
      <pre><code>
        button.addEventListener('sgds-change', () => {
          alert('custom message');
        });
      </code></pre>
      <p>In this example, the message will appear as an alert when the button loses focus.</p>

      <h3>3. Change Action Card Attributes</h3>
      <p>
        You can modify the button's attributes directly within the HTML to change its appearance or behavior. Refer to
        the documentation below. For instance, try disabling the action cardinside <strong>index.html</strong>:
      </p>
      <pre><code>
         disabled = "true"
      </code></pre>
    </div>
  `,
  name: "ActionCard Playground",
  args: {},
  parameters: {}
};
