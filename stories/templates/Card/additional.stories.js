import { html } from "lit-html";

export const CardPlayground = {
    render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
        <head>
          <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
          <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>

          <style>
          sgds-card::part(base) {
          }

          sgds-card::part(body) {
          }

          sgds-card::part(title) {
          }

          sgds-card::part(text) {
          }
          </style>


        </head>
        <body>
            <sgds-card>
                <img slot="card-image" alt="img alternate text goes here" src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80">
                 <span slot="card-title">Card</span>
                 <span slot="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</span>
                 <a slot="card-link" href="https://google.com">Go somewhere</a>
            </sgds-card>
        </body>
        </html>
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>
        You can edit the cards's custom css shadow parts styles by modifying its custom CSS properties. These can
        be seen in the documentation below. For example, you can change the margin by editing the following
        code inside
        <strong>index.html</strong>:
      </p>
      <pre><code>
          sgds-breadcrumb::part(text) {
            margin: 20px;
          }
        </code></pre>
      <p>This will apply a margin.</p>

      <h3>2. Change Card Attributes</h3>
      <p>
        You can modify the card's attributes directly within the HTML to change its appearance or behavior. Refer
        to the documentation below. For instance, try changing the borderColor inside <strong>index.html</strong>:
      </p>
      <pre><code>
           sgds-card borderColor = "primary"
        </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};