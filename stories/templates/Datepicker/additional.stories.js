import { html } from "lit-html";

export const SgdsDatepickerPlayground = {
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
              sgds-datepicker {
                --datepicker-theme-color;
                --datepicker-hover-bg;
                --datepicker-bg;
                --datepicker-close-button-bg;
                --datepicker-close-button-hover-bg;
                --datepicker-close-button-color;
                --datepicker-selected-date-bg;
                --datepicker-selected-date-color;
              }
            </style>
          </head>
          <body>
            <div style="height: 400px;">
              <sgds-datepicker
                id="comp"
                mindate="1920-01-01T16:00:00.000Z"
                maxdate="2030-12-02T12:00:00.000Z"
                label="Birthdate"
                hinttext="Born after 1920"
              ></sgds-datepicker>
            </div>
          </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener("DOMContentLoaded", () => {
          const componentElement = document.getElementById("comp");
          if (componentElement) {
            componentElement.addEventListener("sgds-change-date", () => {
              console.log("sgds-change-date event triggered");
            });
          }
        });
      </script>
    </playground-ide>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Edit the Custom CSS</h3>
      <p>You can edit the SgdsDatepicker's styles by modifying its custom CSS properties. For example:</p>
      <pre><code>
        sgds-datepicker {
          --datepicker-theme-color: value;
        }
      </code></pre>
      <h3>2. Modify Event Handling</h3>
      <p>You can customize how the SgdsDatepicker responds to events. For example:</p>
      <pre><code>
        componentElement.addEventListener('sgds-change-date', () => {
          console.log('event triggered');
        });
      </code></pre>
      <h3>3. Change SgdsDatepicker Attributes</h3>
      <p>You can modify the SgdsDatepicker's attributes directly within the HTML. For example:</p>
      <pre><code>
        sgds-datepicker some-attribute="value";
      </code></pre>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};

export const RangeTemplate = () => html` <sgds-datepicker mode="range"></sgds-datepicker> `;

export const RangeSelection = {
  render: RangeTemplate.bind({}),
  name: "Range Selection",
  args: {},
  parameters: { height: "500px" }
};

export const FlipTemplate = args =>
  html`
    <div style="height:1000px;">
      <sgds-datepicker label="Flip disabled" mode="range" noFlip></sgds-datepicker>
      <sgds-datepicker label="Flip enabled" mode="range"></sgds-datepicker>
      <sgds-datepicker label="Flip disabled, Drop=up" mode="range" drop="up" noFlip></sgds-datepicker>
    </div>
  `;

export const Flip = {
  render: FlipTemplate.bind({}),
  name: "Flip",
  args: {},
  parameters: { height: "500px" }
};

export const ModeTemplate = args => {
  return html`
    <sgds-datepicker id="single-mode-example" .initialValue=${args.initialValue} mode=${args.mode}></sgds-datepicker>
    <script>
      const datepicker = document.querySelector("#single-mode-example");
      datepicker.initialValue = ["23/05/2023"];
    </script>
  `;
};

export const SingleMode = {
  render: ModeTemplate.bind({}),
  name: "Initial Value for Single mode",
  args: { initialValue: ["23/05/2023"], mode: "single" },
  parameters: { height: "500px" }
};
export const RangeMode = {
  render: ModeTemplate.bind({}),
  name: "Initial Value for Range mode",
  args: { initialValue: ["23/05/2023", "15/12/2023"], mode: "range" },
  parameters: { height: "500px" }
};

export const MinMaxTemplate = args => {
  return html`
    <sgds-datepicker
      id="min-max-example"
      label="Choose a date"
      hintText="The minimum date is 10 June 2023 and maximum date is 19 June 2023"
      .displayDate=${args.displayDate}
      minDate="2023-06-10T12:00:00.000Z"
      maxDate="2023-06-19T12:00:00.000Z"
    ></sgds-datepicker>
    <script>
      const datepicker = document.querySelector("#min-max-example");
      datepicker.displayDate = new Date(2023, 5, 10);
    </script>
  `;
};
export const MinMax = {
  render: MinMaxTemplate.bind({}),
  name: "Min and Max Date",
  args: { displayDate: new Date(2023, 5, 10) },
  parameters: { height: "500px" }
};

export const FormSubmissionTemplate = args => {
  const submitHandler = event => {
    const formData = new FormData(event.target);
    alert("Date submitted :" + formData.get("myDatepicker"));
    event.preventDefault();
  };
  return html`
    <form id="datepicker-form" @submit=${submitHandler}>
      <sgds-datepicker
        name="myDatepicker"
        id="form-submission-example"
        label="Choose a date"
        hintText="The minimum date is 10 June 2023 and maximum date is 19 June 2023"
        .displayDate=${args.displayDate}
        minDate="2023-06-10T12:00:00.000Z"
        maxDate="2023-06-19T12:00:00.000Z"
        required
      ></sgds-datepicker>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
    <script>
      const datepicker = document.querySelector("#form-submission-example");
      datepicker.displayDate = new Date(2023, 5, 10);
      const form = document.querySelector("#datepicker-form");
      form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        alert("Date submitted :" + formData.get("myDatepicker"));
      });
    </script>
  `;
};
export const FormSubmission = {
  render: FormSubmissionTemplate.bind({}),
  name: "Form Submission",
  args: { displayDate: new Date(2023, 5, 10) },
  parameters: { height: "500px" }
};
