import { html } from "lit";

const VariantTemplate = args => {
  return html`
    <sgds-button variant="primary" ariaLabel="Primary button">Primary button</sgds-button>
    <sgds-button variant="outline" ariaLabel="Outline button">Outline button</sgds-button>
    <sgds-button variant="danger" ariaLabel="Danger button">Danger button</sgds-button>
    <sgds-button variant="ghost" ariaLabel="Ghost button">Ghost button</sgds-button>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {}
};
const ToneTemplate = args => {
  return html`
    <div class="d-flex-column">
      <div class="d-flex-row">
        <sgds-button tone="brand" variant="primary" ariaLabel="Brand Primary">Brand Primary</sgds-button>
        <sgds-button tone="brand" variant="outline" ariaLabel="Brand Outline">Brand Outline</sgds-button>
        <sgds-button tone="brand" variant="ghost" ariaLabel="Brand Ghost">Brand Ghost</sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button tone="danger" variant="primary" ariaLabel="Danger Primary">Danger Primary</sgds-button>
        <sgds-button tone="danger" variant="outline" ariaLabel="Danger Outline">Danger Outline</sgds-button>
        <sgds-button tone="danger" variant="ghost" ariaLabel="Danger Ghost">Danger Ghost</sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button tone="neutral" variant="primary" ariaLabel="Neutral Primary">Neutral Primary</sgds-button>
        <sgds-button tone="neutral" variant="outline" ariaLabel="Neutral Outline">Neutral Outline</sgds-button>
        <sgds-button tone="neutral" variant="ghost" ariaLabel="Neutral Ghost">Neutral Ghost</sgds-button>
      </div>
      <div class="d-flex-row" style="padding: 12px; background-color: #333;">
        <sgds-button tone="fixed-light" variant="primary" ariaLabel="Fixed Light Primary"
          >Fixed Light Primary</sgds-button
        >
        <sgds-button tone="fixed-light" variant="outline" ariaLabel="Fixed Light Outline"
          >Fixed Light Outline</sgds-button
        >
        <sgds-button tone="fixed-light" variant="ghost" ariaLabel="Fixed Light Ghost">Fixed Light Ghost</sgds-button>
      </div>
    </div>
  `;
};

export const Tone = {
  render: ToneTemplate.bind({}),
  name: "Tone",
  args: {},
  parameters: {}
};

const FullWidthTemplate = () => {
  return html`<sgds-button fullWidth ariaLabel="Full width button">Full width button</sgds-button>`;
};

export const FullWidth = {
  render: FullWidthTemplate.bind({}),
  name: "Full width",
  args: {},
  parameters: {}
};

const SizeTemplate = () => {
  return html` <sgds-button size="xs" ariaLabel="Extra small button"> Extra small button </sgds-button>
    <sgds-button size="sm" ariaLabel="Small button"> Small button </sgds-button>
    <sgds-button ariaLabel="Medium button"> Medium button </sgds-button>
    <sgds-button size="lg" ariaLabel="Large button"> Large button </sgds-button>`;
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {}
};

const ActiveTemplate = () => {
  return html`
    <sgds-button variant="primary" active ariaLabel="Hover / Active"> Hover / Active </sgds-button>
    <sgds-button variant="outline" active ariaLabel="Hover / Active"> Hover / Active </sgds-button>
    <sgds-button variant="danger" active ariaLabel="Hover / Active"> Hover / Active </sgds-button>
    <sgds-button variant="ghost" active ariaLabel="Hover / Active"> Hover / Active </sgds-button>
  `;
};

export const Active = {
  render: ActiveTemplate.bind({}),
  name: "Hover / Active state",
  args: {},
  parameters: {}
};

export const Disabled = {
  render: () => html`
    <sgds-button variant="primary" disabled ariaLabel="Disabled"> Disabled </sgds-button>
    <sgds-button variant="outline" disabled ariaLabel="Disabled"> Disabled </sgds-button>
    <sgds-button variant="ghost" disabled ariaLabel="Disabled"> Disabled </sgds-button>
    <sgds-button variant="danger" disabled ariaLabel="Disabled"> Disabled </sgds-button>
  `,
  name: "Disabled state",
  args: {},
  parameters: {}
};

export const ButtonWithIcon = {
  render: () => html`
    <sgds-button ariaLabel="Leading icon"
      ><sgds-icon name="placeholder" slot="leftIcon"></sgds-icon>Leading icon</sgds-button
    >
    <sgds-button ariaLabel="Trailing icon">
      <sgds-icon name="placeholder" slot="rightIcon"></sgds-icon>
      Trailing icon
    </sgds-button>
  `,
  name: "Button with icon",
  args: {},
  parameters: {}
};

const FormSubmitTemplate = () => {
  return html`
    <form
      action=""
      method="get"
      @submit=${e => {
        e.preventDefault();
        const formData = new FormData(e.target, e.submitter);
        document.getElementById("form-output").textContent = "Selected: " + formData.get("subject");
      }}
    >
      <p>Choose your favourite subject:</p>
      <sgds-button name="subject" type="submit" value="fav_HTML" ariaLabel="HTML">HTML</sgds-button>
      <sgds-button name="subject" type="submit" value="fav_CSS" ariaLabel="CSS">CSS</sgds-button>
      <sgds-button name="subject" type="submit" value="fav_JS" ariaLabel="JavaScript">JavaScript</sgds-button>
    </form>
    <p id="form-output"></p>
  `;
};

export const FormSubmitValue = {
  render: FormSubmitTemplate.bind({}),
  name: "Form submit with name and value",
  args: {},
  parameters: {}
};

export const Loading = {
  render: () => html`
    <div class="d-flex-column">
      <div class="d-flex-row">
        <sgds-button variant="primary" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="outline" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="ghost" loading ariaLabel="Loading"> Loading... </sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button variant="primary" tone="danger" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="outline" tone="danger" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="ghost" tone="danger" loading ariaLabel="Loading"> Loading... </sgds-button>
      </div>
      <div class="d-flex-row">
        <sgds-button variant="primary" tone="neutral" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="outline" tone="neutral" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="ghost" tone="neutral" loading ariaLabel="Loading"> Loading... </sgds-button>
      </div>
      <div class="d-flex-row" style="padding: 12px; background-color: #333;">
        <sgds-button variant="primary" tone="fixed-light" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="outline" tone="fixed-light" loading ariaLabel="Loading"> Loading... </sgds-button>
        <sgds-button variant="ghost" tone="fixed-light" loading ariaLabel="Loading"> Loading... </sgds-button>
      </div>
    </div>
  `,
  name: "Loading state",
  args: {},
  parameters: {}
};
