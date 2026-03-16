import { html } from "lit";

export default {
  title: "Foundation/Typography/Body"
};

const BodyLgSemiboldTemplate = () => html`
  <div role="paragraph" class="sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:mb-xl">
    Body large semibold.
  </div>
`;

const BodyLgRegularTemplate = () => html`
  <div role="paragraph" class="sgds:text-body-lg sgds:font-normal sgds:leading-md sgds:tracking-normal sgds:mb-xl">
    Body large regular.
  </div>
`;

const BodyMdSemiboldTemplate = () => html`
  <div role="paragraph" class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-xl">
    Body medium semibold.
  </div>
`;

const BodyMdRegularTemplate = () => html`
  <div role="paragraph" class="sgds:text-body-md sgds:font-normal sgds:leading-xs sgds:tracking-normal sgds:mb-xl">
    Body medium regular.
  </div>
`;

const BodySmSemiboldTemplate = () => html`
  <div role="paragraph" class="sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-xl">
    Body small semibold.
  </div>
`;

const BodySmRegularTemplate = () => html`
  <div role="paragraph" class="sgds:text-body-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:mb-xl">
    Body small regular.
  </div>
`;

export const BodyLgSemibold = {
  render: BodyLgSemiboldTemplate.bind({}),
  name: "Body Large Semibold"
};

export const BodyLgRegular = {
  render: BodyLgRegularTemplate.bind({}),
  name: "Body Large Regular"
};

export const BodyMdSemibold = {
  render: BodyMdSemiboldTemplate.bind({}),
  name: "Body Medium Semibold"
};

export const BodyMdRegular = {
  render: BodyMdRegularTemplate.bind({}),
  name: "Body Medium Regular"
};

export const BodySmSemibold = {
  render: BodySmSemiboldTemplate.bind({}),
  name: "Body Small Semibold"
};

export const BodySmRegular = {
  render: BodySmRegularTemplate.bind({}),
  name: "Body Small Regular"
};
