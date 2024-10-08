import { MockStepper } from "../../mocks/stepper.ts";
import { html } from "lit-html";

export const SgdsStepperPlayground = {
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
              sgds-stepper {
                --stepper-default-color;
                --stepper-theme-color;
                --stepper-theme-hover-color;
              }
            </style>
          </head>
          <body>
            <sgds-stepper id="comp" .steps=${SgdsStepperPlayground.args.steps}></sgds-stepper>
          </body>
        </html>
      </script>
    

    <script type="sample/js" filename="events.js">
      document.addEventListener("DOMContentLoaded", () => {
        const componentElement = document.getElementById("comp");
        if (componentElement) {
          componentElement.addEventListener("sgds-next-step", () => {
            console.log("sgds-next-step event triggered");
          });
        }
      });
    </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the SgdsStepper's styles by modifying its custom CSS
        properties. For example:
      </p>
      <pre><code>
        sgds-stepper {
          --stepper-default-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the SgdsStepper responds to events. For example:
      </p>
      <pre><code>
        componentElement.addEventListener("insert component event", () => {
          console.log("event triggered");
        });
      </code></pre>
      <h3>3. Change SgdsStepper Attributes</h3>
      <p>
        You can modify the SgdsStepper's attributes directly within the HTML.
        For example:
      </p>
      <pre><code>
        sgds-stepper some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {
    steps: [
      {
        stepHeader: "Personal Details",
        component: "1 test"
      },
      {
        stepHeader: "Address and Contact Information",
        component: "2 test"
      },
      {
        stepHeader: "Review",
        component: "3 test"
      }
    ]
  },
  parameters: {},
};

const MockStepperTemplate = () => Object.assign(new MockStepper());

export const StepperExample = {
  render: MockStepperTemplate.bind({}),
  name: "Stepper Example",
  args: {},
  parameters: {},
  tags: ["!dev"],
};
