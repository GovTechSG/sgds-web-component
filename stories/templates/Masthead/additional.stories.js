import { html } from "lit-html";

export const SgdsMastheadPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
          <head>
            <link
              href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@rc/themes/day.css"
              rel="stylesheet"
              type="text/css"
            />
            <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@rc">&lt;/script>
            <style>
              sgds-masthead {
                --masthead-max-width:;
                --masthead-padding-x:;
              }
            </style>
          </head>
          <body>
            <sgds-masthead></sgds-masthead>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsMasthead's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-masthead {
          --masthead-max-width: value;
          --masthead-padding-x: value;
        }
      </code></pre>
      <h3>2. Change SgdsMasthead Attributes</h3>
      <p>You can modify the SgdsMasthead's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-masthead some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};