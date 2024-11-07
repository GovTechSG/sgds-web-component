import { html } from "lit-html";

export const SgdsFooterPlayground = {
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
              sgds-footer::part(footer-top) {

              }
              sgds-footer::part(footer-bottom) {

              }
            </style>
          </head>
          <body>
            <sgds-footer
              title=""
              description=""
              lastUpdatedDate=""
              contactHref=""
              feedbackHref=""
              privacyHref=""
              termsOfUseHref=""
              .links=""
              copyrightLiner=""
            >
            </sgds-footer>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsFooter's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-footer {
          --footer-top: value;
        }
      </code></pre>
      <h3>2. Change SgdsFooter Attributes</h3>
      <p>You can modify the SgdsFooter's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-footer some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
