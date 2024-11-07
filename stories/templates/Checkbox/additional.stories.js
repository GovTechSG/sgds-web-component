import { html } from "lit-html";

// export const SgdsCheckboxPlayground = {
//   render: () => html`
//     <playground-ide editable-file-system line-numbers resizable>
//       <script type="sample/html" filename="index.html">
//         <!doctype html>
//         <html lang="en">
//         <head>
//           <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
//           <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>
//           <script src="./events.js">&lt;/script>
//         </head>
//         <body>
//           <sgds-checkbox id = "comp" value="check-me">Check me</sgds-checkbox>
//         </body>
//         </html>
//       </script>
//       <script type="sample/js" filename="events.js">
//               document.addEventListener('DOMContentLoaded', () => {
//                 const componentElement = document.getElementById('comp');
//                 if (componentElement) {

//         componentElement.addEventListener('sgds-change', () => {
//           console.log('sgds-change event triggered');
//         });
//                 }
//               });
//       </script>
//     </playground-ide>

//     <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
//       <h3>1. Edit the Custom CSS</h3>
//       <p>You can edit the SgdsCheckbox's styles by modifying its custom CSS properties. For example:</p>
//       <pre><code>
//         sgds-checkbox {
//           --custom-css-property: value;
//         }
//       </code></pre>
//       <h3>2. Modify Event Handling</h3>
//       <p>You can customize how the SgdsCheckbox responds to events. For example:</p>
//       <pre><code>
//         componentElement.addEventListener('insert component event'}', () => {
//           console.log( event triggered');
//         });
//       </code></pre>
//       <h3>3. Change SgdsCheckbox Attributes</h3>
//       <p>You can modify the SgdsCheckbox's attributes directly within the HTML. For example:</p>
//       <pre><code>
//         sgds-checkbox some-attribute="value"
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
      <sgds-checkbox required hasFeedback invalidFeedback="This is required">Check me</sgds-checkbox>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
  `;

export const CheckboxValidations = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
