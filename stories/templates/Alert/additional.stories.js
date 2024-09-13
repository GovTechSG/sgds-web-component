import { html } from "lit-html";

export const AlertPlayground = {
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
              sgds-alert-link {

              }

              sgds-alert {

              }


            </style>


          </head>
          <body>

        <sgds-alert id = "d-alert" show = "">
        <sgds-alert-heading>Hello, nice to meet you</sgds-alert-heading>
        <p>
          Aww yeah, you successfully read this important
          <sgds-alert-link href="#">alert message</sgds-alert-link>
        </p>
        </sgds-alert>

          </body>
          </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener('DOMContentLoaded', () => {
          const myAlert = document.getElementById('d-alert');

          if (myAlert ) {
            myAlert.addEventListener('sgds-show', () => {
              console.log('alert show');
            });

            myAlert.addEventListener('sgds-hide', () => {
              console.log('alert hide');
            });


          } else {
            console.error('alert not found');
          }
        });
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the alert's styles and the alert link's styles by modifying their custom CSS properties. These can
        be seen in the documentation below. For example, you can change the background colour of alert by editing the
        following code inside
        <strong>index.html</strong>:
      </p>
      <pre><code>
          sgds-alert {
            --alert-bg: darkred;
          }
        </code></pre>

      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the alert responds to events by editing <strong>events.js</strong>. For instance, you can
        change the action triggered by the <code>sgds-blur</code> event:
      </p>
      <pre><code>
          myAlert.addEventListener('sgds-show', () => {
            console.log('message');
          });
        </code></pre>
      <p>In this example, the message will appear as an alert when the alert loses focus.</p>

      <h3>3. Change Alert Attributes</h3>
      <p>
        You can modify the alert's and the alert heading's and the alert link's attributes directly within the HTML to
        change its appearance or behavior. Refer to the documentation below. For instance, try changing the button
        variant inside <strong>index.html</strong>:
      </p>
      <pre><code>
           variant="success"
        </code></pre>
      <p>Changing the <code>variant</code> attribute to <code>success</code> will apply a new style to the button.</p>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
