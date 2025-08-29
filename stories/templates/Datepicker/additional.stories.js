import { html } from "lit-html";

const RangeTemplate = () => html`<sgds-datepicker mode="range"></sgds-datepicker> `;

export const RangeSelection = {
  render: RangeTemplate.bind({}),
  name: "Range Selection",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const FlipTemplate = args =>
  html`
    <sgds-datepicker label="Flip disabled" mode="range" noFlip></sgds-datepicker>
    <sgds-datepicker label="Flip enabled" mode="range"></sgds-datepicker>
    <sgds-datepicker label="Flip disabled, Drop=up" mode="range" drop="up" noFlip></sgds-datepicker>
  `;

export const Flip = {
  render: FlipTemplate.bind({}),
  name: "Flip",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ModeTemplate = args => {
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
  args: { value: "23/05/2023", mode: "single" },
  parameters: {},
  tags: ["!dev"]
};
export const RangeMode = {
  render: ModeTemplate.bind({}),
  name: "Initial Value for Range mode",
  args: { value: "23/05/2023 - 15/12/2023", mode: "range" },
  parameters: {},
  tags: ["!dev"]
};

const MinMaxTemplate = args => {
  return html`
    <div style="height:500px;">
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
    </div>
  `;
};
export const MinMax = {
  render: MinMaxTemplate.bind({}),
  name: "Min and Max Date",
  args: { displayDate: new Date(2023, 5, 10) },
  parameters: {},
  tags: ["!dev"]
};

const FormSubmissionTemplate = args => {
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
  parameters: {},
  tags: ["!dev"]
};
