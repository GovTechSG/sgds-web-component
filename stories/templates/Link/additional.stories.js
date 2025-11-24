import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

const VariantTemplate = () => {
  const variants = ["Primary", "Danger", "Neutral", "Light", "Dark"];
  return html`
    ${variants.map(
      variant => html`
        <sgds-link variant="${variant}">
          <a href="#">${variant} link</a>
        </sgds-link>
      `
    )}
  `;
};
export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variant",
  args: { ...args },
  parameters: {},
  tags: ["!dev"]
};

const SizeTemplate = () => {
  return html`
    <sgds-link size="sm">
      <a href="#">Small</a>
    </sgds-link>
    <br />
    <sgds-link size="md">
      <a href="#">Medium (default)</a>
    </sgds-link>
    <br />
    <sgds-link size="lg">
      <a href="#">Large</a>
    </sgds-link>
  `;
};

export const Size = {
  render: SizeTemplate.bind({}),
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ExternalLinkTemplate = () => {
  return html`
    <sgds-link size="sm">
      <a href="#" target="_blank">Going to an external link</a>
    </sgds-link>
  `;
};

export const ExternalLink = {
  render: ExternalLinkTemplate.bind({}),
  name: "Target _blank",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const WithIconTemplate = () => {
  return html`
    <sgds-link
      ><a href="#"><sgds-icon name="placeholder"></sgds-icon>Icon on the left</a></sgds-link
    >
    <br />
    <sgds-link
      ><a href="#">Icon on the right <sgds-icon name="placeholder"></sgds-icon></a
    ></sgds-link>
  `;
};

export const Icon = {
  render: WithIconTemplate.bind({}),
  name: "Icons",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
