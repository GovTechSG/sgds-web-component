import { html } from "lit-html";

export const AccordionPlayground = {
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
          sgds-accordion-item {
            
            
          }

          sgds-accordian {
          
          }
  
                    </style>
  
  
                  </head>
                  <body>
                  <sgds-accordion>
                    <sgds-accordion-item id = "item" >
                        <div slot="accordion-header">This is a solo accordion</div>
                    </sgds-accordion-item>
                  </sgds-accordion>
                  </body>
                  </html>
        </script>
  
        <script type="sample/js" filename="events.js">
          document.addEventListener('DOMContentLoaded', () => {
            const accordionItem = document.getElementById('item');
  
            if (accordionItem) {
              button.addEventListener('sgds-show', () => {
                console.log('show status changed');
              });
  
            } else {
              console.error('accordionItem not found');
            }
          });
        </script>
      </playground-ide>
      <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
        <h3>1. Edit the Custom CSS</h3>
        <p>
          You can edit the accordion's and accordion item's css by modifying its custom CSS properties. These can be seen in the
          documentation below. For example, you can change the background colour by editing the following code inside
          <strong>index.html</strong>:
        </p>
        <pre><code>
          sgds-accordion {
   --accordion-active-color: darkred;
  }
        </code></pre>
  
        <h3>2. Modify Event Handling</h3>
        <p>
          You can customize how the accordion responds to events by editing <strong>events.js</strong>. For instance, you can
          change the action triggered by the <code>sgds-show</code> event:
        </p>
        <pre><code>
          accordionItem.addEventListener('sgds-show', () => {
            alert('custom message');
          });
        </code></pre>
        <p>In this example, the message will appear as an alert when the button loses focus.</p>
  
        <h3>3. Change Accordion and Accordion Item Attributes</h3>
        <p>
          You can modify the accordion's and accordion item's attributes directly within the HTML to change its appearance or behavior. Refer to
          the documentation below. For instance, try allowing multiple items <strong>index.html</strong>:
        </p>
        <pre><code>
           allowMultiple
        </code></pre>
      </div>
    `,
    name: "Accordion Playground",
    args: {},
    parameters: {}
  };