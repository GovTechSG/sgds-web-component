import { html } from "lit-html";

export const SgdsSidenavPlayground = {
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
                           sgds-sidenav {
                             --sidenav-theme-color
        --sidenav-sticky-top
                           }
                         </style>
                  </head>
                  <body>
                  ${Template(args).strings}
                  </body>
                  </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the SgdsSidenav's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-sidenav {
          ----sidenav-theme-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsSidenav responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener('insert component event'}', () => {
          console.log( event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsSidenav Attributes</h3>
      <p>
        You can modify the SgdsSidenav's attributes directly within the HTML.
        For example:
      </p>
      <pre><code>
        sgds-sidenav some-attribute="value" 
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {},
};
