import { html } from "lit-html";

export const SgdsMainnavPlayground = {
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
              sgds-mainnav {
                --mainnav-bg;
                --mainnav-padding-x;
                --mainnav-padding-y;
                --mainnav-mobile-padding-x;
                --mainnav-mobile-padding-y;
                --mainnav-border-bottom-width;
                --mainnav-border-bottom-color;
                --mainnav-theme-color;
              }
            </style>
          </head>
          <body>
            <sgds-mainnav id="comp">
              <img
                alt="sgds logo"
                width="130"
                src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg"
                slot="brand"
              />
              <sgds-mainnav-item>ArgsTable Controlled</sgds-mainnav-item>
              <sgds-mainnav-dropdown togglertext="Dropdown">
                <sgds-dropdown-item href="https://google.com">Item 1</sgds-dropdown-item>
                <sgds-dropdown-item href="#">Item 2</sgds-dropdown-item>
                <sgds-dropdown-item href="#">Item 3</sgds-dropdown-item>
              </sgds-mainnav-dropdown>
              <sgds-mainnav-item href="#">About</sgds-mainnav-item>
              <sgds-mainnav-item href="#" slot="end">Contact Us</sgds-mainnav-item>
              <sgds-button slot="end">Login</sgds-button>
              <dev-console-widget
                slot="non-collapsible"
                iconcolor="black"
                iconwidth="28px"
                iconheight="28px"
              ></dev-console-widget>
            </sgds-mainnav>
          </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener("DOMContentLoaded", () => {
          const componentElement = document.getElementById("comp");
          if (componentElement) {
            componentElement.addEventListener("sgds-show", () => {
              console.log("sgds-show event triggered");
            });
          }
        });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsMainnav's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-mainnav {
          --mainnav-bg: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsMainnav responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener("insert component event", () => {
          console.log("event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsMainnav Attributes</h3>
      <p>You can modify the SgdsMainnav's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-mainnav some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
