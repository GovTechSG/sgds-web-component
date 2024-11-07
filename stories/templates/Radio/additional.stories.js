import { html } from "lit-html";

// export const SgdsRadioPlayground = {
//   render: () => html`
//     <playground-ide editable-file-system line-numbers resizable>
//       <script type="sample/html" filename="index.html">
//         <!doctype html>
//         <html lang="en">
//           <head>
//             <link
//               href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css"
//               rel="stylesheet"
//               type="text/css"
//             />
//             <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>
//             <script src="./events.js">&lt;/script>
//           </head>
//           <body>
//             <sgds-radio-group id="comp">
//               <span slot="label">Select an option</span>
//               <sgds-radio>Option 1</sgds-radio>
//               <sgds-radio value="2">Option 2</sgds-radio>
//               <sgds-radio value="3">Option 3</sgds-radio>
//             </sgds-radio-group>
//           </body>
//         </html>
//       </script>

//       <script type="sample/js" filename="events.js">
//         document.addEventListener("DOMContentLoaded", () => {
//           const componentElement = document.getElementById("comp");
//           if (componentElement) {
//             componentElement.addEventListener("sgds-change", () => {
//               console.log("sgds-change event triggered");
//             });
//           }
//         });
//       </script>
//     </playground-ide>

//     <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
//       <h3>1. Modify Event Handling</h3>
//       <p>You can customize how the SgdsRadio responds to events. For example:</p>
//       <pre><code>
//         componentElement.addEventListener("insert component event", () => {
//           console.log("event triggered");
//         });
//       </code></pre>
//       <h3>3. Change SgdsRadio Attributes</h3>
//       <p>You can modify the SgdsRadio's attributes directly within the HTML. For example:</p>
//       <pre><code>
//         sgds-radio some-attribute="value";
//       </code></pre>
//     </div>
//   `,
//   name: "Playground",
//   args: {},
//   parameters: {}
// };

const ValidationTemplate = () =>
  html`
    <form>
      <sgds-radio-group required hasFeedback invalidFeedback="This is required">
        <span slot="label">Select an option</span>
        <sgds-radio value="1">Option 1</sgds-radio>
        <sgds-radio value="2">Option 2</sgds-radio>
        <sgds-radio value="3">Option 3</sgds-radio>
      </sgds-radio-group>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
  `;

export const Validation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Invalid = {
  render: Template.bind({}),
  name: "Invalid styles",
  args: { ...args, hasFeedback: true, invalidFeedback: "Feedback", invalid: true },
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {},
  tags: ["!dev"]
};
