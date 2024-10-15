import { html } from "lit-html";

export const SgdsAccordionPlayground = {
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
              sgds-accordion {
                --accordion-active-color;
              }
            </style>
          </head>
          <body>
            <sgds-accordion>
              <sgds-accordion-item>
                <div slot="accordion-header">This is a solo accordion</div>
                <span slot="accordion-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores soluta eaque fugit fuga distinctio? Eum.
                </span>
              </sgds-accordion-item>
            </sgds-accordion>
            <sgds-accordion>
              <sgds-accordion-item>
                <div slot="accordion-header">This is an accordion</div>
                <span slot="accordion-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores soluta eaque fugit fuga distinctio? Eum.
                </span>
              </sgds-accordion-item>
              <sgds-accordion-item>
                <div slot="accordion-header">Accordion 1</div>
                <span slot="accordion-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores soluta eaque fugit fuga distinctio? Eum.
                </span>
              </sgds-accordion-item>
              <sgds-accordion-item open>
                <div slot="accordion-header">Accordion 2</div>
                <span slot="accordion-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores soluta eaque fugit fuga distinctio? Eum.
                </span>
              </sgds-accordion-item>
              <sgds-accordion-item>
                <div slot="accordion-header">Accordion 3</div>
                <span slot="accordion-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores soluta eaque fugit fuga distinctio? Eum.
                </span>
              </sgds-accordion-item>
            </sgds-accordion>
          </body>
        </html>
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsAccordion's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-accordion {
          --accordion-active-color: value;
        }
      </code></pre>
      <h3>2. Change SgdsAccordion Attributes</h3>
      <p>You can modify the SgdsAccordion's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-accordion some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
