import { html } from "lit-html";

export const SgdsSidenavPlayground = {
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
            <style>
              sgds-sidenav {
                --sidenav-theme-color;
                --sidenav-sticky-top;
              }
            </style>
          </head>
          <body>
            <sgds-sidenav>
              <sgds-sidenav-item>
                <span slot="title">SideNav Item #1 (control by Argstable)</span>
                <sgds-sidenav-link>sgds-sidenav-link (control by Argstable)</sgds-sidenav-link>
                <sgds-sidenav-link href="#" disabled>sgds-sidenav-link</sgds-sidenav-link>
                <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
              </sgds-sidenav-item>
              <sgds-sidenav-item>
                <span slot="title">SideNav Item #2</span>
                <span slot="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-layers-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"
                    ></path>
                    <path
                      d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"
                    ></path>
                  </svg>
                </span>
                <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
                <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
                <sgds-sidenav-link href="#">sgds-sidenav-link</sgds-sidenav-link>
              </sgds-sidenav-item>
              <sgds-sidenav-item href="#">
                <span slot="title">SideNav Item #3</span>
                <span slot="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-layers-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"
                    ></path>
                    <path
                      d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"
                    ></path>
                  </svg>
                </span>
              </sgds-sidenav-item>
            </sgds-sidenav>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsSidenav's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-sidenav {
          --sidenav-theme-color: value;
        }
      </code></pre>
      <h3>2. Change SgdsSidenav Attributes</h3>
      <p>You can modify the SgdsSidenav's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-sidenav some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
