import { html } from "lit-html";

export const SgdsCardPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
          <head>
            <link
              href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css'
              rel='stylesheet'
              type='text/css'
            />
            <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>

            <style>
              sgds-card::part(base) {

              }

              sgds-card::part(body) {

              }

              sgds-card::part(title) {

              }

              sgds-card::part(text) {

              }
            </style>
          </head>
          <body>
            <sgds-card>
              <span slot="card-title">Card</span>
              <span slot="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </span>
              <a slot="card-link" href="https://google.com">Go somewhere</a>
            </sgds-card>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsCard's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-card {
          --custom-css-property: value;
        }
      </code></pre>
      <h3>2. Change SgdsCard Attributes</h3>
      <p>You can modify the SgdsCard's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-card some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
