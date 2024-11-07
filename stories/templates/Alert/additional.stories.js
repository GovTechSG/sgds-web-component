import { html } from "lit-html";

const VariantTemplate = args => {
  const variants = ["Info", "Success", "Danger", "Warning", "Neutral"];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
        <sgds-alert variant=${v.toLowerCase()} show title="${v} alert">
            <div> Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
        </sgds-alert>
    </div>    
        `
      )}
    </div>
  `;
};
const OutlinedVariantTemplate = args => {
  const variants = ["Info", "Success", "Danger", "Warning", "Neutral"];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
        <sgds-alert variant=${v.toLowerCase()} show title="${v} alert" outlined>
            <div> Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
        </sgds-alert>
    </div>    
        `
      )}
    </div>
  `;
};
const DismissableTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-alert show title="Title" dismissible>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16.5341 8.59088C16.2046 8.26137 15.6704 8.26137 15.3409 8.59088C15.3329 8.59884 15.3254 8.60726 15.3185 8.61612L11.4121 13.5938L9.05686 11.2386C8.72736 10.9091 8.19312 10.9091 7.86362 11.2386C7.53411 11.5681 7.53411 12.1024 7.86362 12.4319L10.8409 15.4091C11.1704 15.7386 11.7046 15.7386 12.0341 15.4091C12.0415 15.4018 12.0484 15.394 12.0549 15.3859L16.5461 9.77191C16.8636 9.44154 16.8596 8.91634 16.5341 8.59088Z"
            fill="white"
          />
        </svg>
        <div>A dismissable alert</div>
      </sgds-alert>
      <sgds-alert show title="Title" outlined dismissible>
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16.5341 8.59088C16.2046 8.26137 15.6704 8.26137 15.3409 8.59088C15.3329 8.59884 15.3254 8.60726 15.3185 8.61612L11.4121 13.5938L9.05686 11.2386C8.72736 10.9091 8.19312 10.9091 7.86362 11.2386C7.53411 11.5681 7.53411 12.1024 7.86362 12.4319L10.8409 15.4091C11.1704 15.7386 11.7046 15.7386 12.0341 15.4091C12.0415 15.4018 12.0484 15.394 12.0549 15.3859L16.5461 9.77191C16.8636 9.44154 16.8596 8.91634 16.5341 8.59088Z"
            fill="black"
          />
        </svg>
        <div>A non-dismissable alert</div>
      </sgds-alert>
    </div>
  `;
};
const IconTemplate = args => {
  return html`
    <div class="d-flex-column">
      <sgds-alert show title="Title">
        <div>Alert with no leading icon</div>
      </sgds-alert>
      <sgds-alert show title="Title">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16.5341 8.59088C16.2046 8.26137 15.6704 8.26137 15.3409 8.59088C15.3329 8.59884 15.3254 8.60726 15.3185 8.61612L11.4121 13.5938L9.05686 11.2386C8.72736 10.9091 8.19312 10.9091 7.86362 11.2386C7.53411 11.5681 7.53411 12.1024 7.86362 12.4319L10.8409 15.4091C11.1704 15.7386 11.7046 15.7386 12.0341 15.4091C12.0415 15.4018 12.0484 15.394 12.0549 15.3859L16.5461 9.77191C16.8636 9.44154 16.8596 8.91634 16.5341 8.59088Z"
            fill="white"
          />
        </svg>
        <div>Alert with leading icon</div>
      </sgds-alert>
    </div>
  `;
};

const TitleTemplate = args => {
  return html`
    <div class="d-flex-column">
        <sgds-alert show>
            <div> Alert with no title</sgds-alert-link></div>
        </sgds-alert>
        <sgds-alert show title="Title">
            <div> Alert with title</sgds-alert-link>
        </sgds-alert>
    </div>
    `;
};

const LinkTemplate = args => {
  return html`
    <sgds-alert variant="info" show title="Alert with link">
      <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
    </sgds-alert>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const OutlinedVariants = {
  render: OutlinedVariantTemplate.bind({}),
  name: "Outlined variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Dismissable = {
  render: DismissableTemplate.bind({}),
  name: "Dismissable",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithIcon = {
  render: IconTemplate.bind({}),
  name: "Icon",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithTitle = {
  render: TitleTemplate.bind({}),
  name: "Title",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const WithLink = {
  render: LinkTemplate.bind({}),
  name: "Link",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
