import { html } from "lit-html";

export const BreadcrumbPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
        <head>
          <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
          <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>

          <style>
          sgds-breadcrumb::part(base) {
          }
          </style>


        </head>
        <body>
          <sgds-breadcrumb>
              <sgds-breadcrumb-item>Item</sgds-breadcrumb-item>
              <sgds-breadcrumb-item>Item 2</sgds-breadcrumb-item>
          </sgds-breadcrumb>
        </body>
        </html>
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the breadcrumbs's custom css shadow parts styles by modifying its custom CSS properties. These can
        be seen in the documentation below. For example, you can change the background colour by editing the following
        code inside
        <strong>index.html</strong>:
      </p>
      <pre><code>
          sgds-breadcrumb::part(base) {
            margin: 20px; 
          }
        </code></pre>
      <p>This will apply a margin.</p>

      <h3>2. Change Breadcrumb Attributes</h3>
      <p>
        You can modify the breadcrumb's attributes directly within the HTML to change its appearance or behavior. Refer
        to the documentation below. For instance, try changing the aria label inside <strong>index.html</strong>:
      </p>
      <pre><code>
           aria-label="custom"
        </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
