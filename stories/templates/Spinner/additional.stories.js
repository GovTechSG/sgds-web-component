import { html } from "lit-html";

const VariantTemplate = () => html`
  <sgds-spinner variant="primary"></sgds-spinner>
  <sgds-spinner variant="neutral"></sgds-spinner>
`;
const SizeTemplate = () => html`
  <sgds-spinner size="sm"></sgds-spinner>
  <sgds-spinner size="md"></sgds-spinner>
  <sgds-spinner size="lg"></sgds-spinner>
`;

export const Variant = {
  render: VariantTemplate.bind({}),
  name: "Variant",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Size = {
  render: SizeTemplate.bind({}),
  name: "Size",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Label = {
  render: Template.bind({}),
  name: "Label",
  args: { label: "Label" },
  parameters: {},
  tags: ["!dev"]
};
// export const SgdsSpinnerPlayground = {
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
//           </head>
//           <body>
//             <sgds-spinner></sgds-spinner>
//           </body>
//         </html>
//       </script>
//     </playground-ide>
//     <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
//       <h3>1. Edit the Custom CSS</h3>
//       <p>You can edit the SgdsSpinner's styles by modifying its custom CSS properties. For example:</p>
//       <pre><code>
//         sgds-spinner {
//           --custom-css-property: value;
//         }
//       </code></pre>
//       <h3>2. Change SgdsSpinner Attributes</h3>
//       <p>You can modify the SgdsSpinner's attributes directly within the HTML. For example:</p>
//       <pre><code>
//         sgds-spinner some-attribute="value";
//       </code></pre>
//     </div>
//   `,
//   name: "Playground",
//   args: {},
//   parameters: {}
// };
