import { html } from "lit-html";

export const BadgePlayground = {
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
          <sgds-badge id="dynamic-badge">
            badge
          </sgds-badge>
        </body>
        </html>
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>Change Badge Attributes</h3>
      <p>
        You can modify the badge's attributes directly within the HTML to change its appearance or behavior. Refer to
        the documentation below. For instance, try changing the badge variant inside <strong>index.html</strong>:
      </p>
      <pre><code>
           variant="success"
        </code></pre>
      <p>Changing the <code>variant</code> attribute to <code>success</code> will apply a new style to the badge.</p>
    </div>
  `,
  name: "Badge Playground",
  args: {},
  parameters: {}
};
