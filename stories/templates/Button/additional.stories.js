import { html } from "lit-html";

const VariantTemplate = args => {
  const variants = ["primary", "outlined", "danger"];
  return html`${variants.map(v => html`<sgds-button variant=${v}>${v}</sgds-button>`)} `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const SizeTemplate = () => {
  return html`<sgds-button size="sm"> sm-button </sgds-button> <sgds-button size="lg"> lg-button </sgds-button>`;
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ActiveTemplate = () => {
  return html` <sgds-button variant="primary" active> primary-button </sgds-button>
    <sgds-button variant="secondary" active> secondary-button </sgds-button>`;
};

export const Active = {
  render: ActiveTemplate.bind({}),
  name: "Active state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: () => html`
    <sgds-button variant="primary" disabled> primary-button </sgds-button>
    <sgds-button variant="secondary" disabled> secondary-button </sgds-button>
  `,
  name: "Disabled state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ButtonWithIcon = {
  render: () => html`
    <sgds-button>
      <svg
        slot="rightIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-box"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"
        />
      </svg>
      Button with Icon
    </sgds-button>
  `,
  name: "Button with Icon",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ButtonPlayground = {
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
            sgds-button {
              --btn-border-radius: 0;
            }
          </style>


        </head>
        <body>
          <sgds-button id="dynamic-button">
            Submit Form 1
          </sgds-button>
        </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener('DOMContentLoaded', () => {
          const button = document.getElementById('dynamic-button');

          if (button) {
            button.addEventListener('sgds-blur', () => {
              console.log('Button lost focus');
            });

            button.addEventListener('sgds-focus', () => {
              console.log('Button gained focus');
            });

            console.log('Button label:', button.textContent.trim());
          } else {
            console.error('Button not found');
          }
        });
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the button's styles by modifying its custom CSS properties. These can be seen in the documentation
        below. For example, you can change the border radius by editing the following code inside
        <strong>index.html</strong>:
      </p>
      <pre><code>
        sgds-button {
          --btn-border-radius: 100px;
        }
      </code></pre>
      <p>This will apply a large, rounded border to the button.</p>

      <h3>2. Modify Event Handling</h3>
      <p>
        You can customize how the button responds to events by editing <strong>events.js</strong>. For instance, you can
        change the action triggered by the <code>sgds-blur</code> event:
      </p>
      <pre><code>
        button.addEventListener('sgds-blur', () => {
          alert('Button lost focus');
        });
      </code></pre>
      <p>In this example, the message will appear as an alert when the button loses focus.</p>

      <h3>3. Change Button Attributes</h3>
      <p>
        You can modify the button's attributes directly within the HTML to change its appearance or behavior. Refer to
        the documentation below. For instance, try changing the button variant inside <strong>index.html</strong>:
      </p>
      <pre><code>
         variant="success"
      </code></pre>
      <p>Changing the <code>variant</code> attribute to <code>success</code> will apply a new style to the button.</p>
    </div>
  `,
  name: "ButtonPlayground",
  args: {},
  parameters: {}
};
