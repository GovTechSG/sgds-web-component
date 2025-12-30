import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const ToneTemplate = () => {
  const tones = ["Primary", "Danger", "Neutral", "Fixed-Light", "Fixed-Dark"];
  return html`
    <div class="d-flex-column">
      ${tones.map(
        tone => html`
          <sgds-link tone="${tone.toLowerCase()}">
            <a href="#">${tone} link</a>
          </sgds-link>
        `
      )}
    </div>
  `;
};
export const Tones = {
  render: ToneTemplate.bind({}),
  name: "Tone",
  args: { ...args },
  parameters: {},
  tags: ["!dev"]
};

const VariantTemplate = () => {
  const variants = ["Primary", "Danger", "Neutral", "Light", "Dark"];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        variant => html`
          <sgds-link variant="${variant.toLowerCase()}">
            <a href="#">${variant} link</a>
          </sgds-link>
        `
      )}
    </div>
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
    <div class="d-flex-column">
      <sgds-link size="xs">
        <a href="#">Extra small</a>
      </sgds-link>
      <sgds-link size="sm">
        <a href="#">Small</a>
      </sgds-link>
      <sgds-link size="md">
        <a href="#">Medium (default)</a>
      </sgds-link>
      <sgds-link size="lg">
        <a href="#">Large</a>
      </sgds-link>
    </div>
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
    <div class="d-flex-column">
      <sgds-link size="xs">
        <a href="#" target="_blank">Going to an external link</a>
      </sgds-link>
      <sgds-link size="sm">
        <a href="#" target="_blank">Going to an external link</a>
      </sgds-link>
      <sgds-link size="md">
        <a href="#" target="_blank">Going to an external link</a>
      </sgds-link>
      <sgds-link size="lg">
        <a href="#" target="_blank">Going to an external link</a>
      </sgds-link>
    </div>
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
    <div class="d-flex-column">
      <sgds-link
        ><a href="#"><sgds-icon name="placeholder"></sgds-icon>Icon on the left</a></sgds-link
      >
      <sgds-link
        ><a href="#">Icon on the right <sgds-icon name="placeholder"></sgds-icon></a
      ></sgds-link>
    </div>
  `;
};

export const Icon = {
  render: WithIconTemplate.bind({}),
  name: "Icons",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { disabled: true },
  parameters: {},
  tags: ["!dev"]
};
export const Active = {
  render: Template.bind({}),
  name: "Active",
  args: { active: true },
  parameters: {},
  tags: ["!dev"]
};
