import { html } from "lit";

export default {
  title: "Blocks/Call To Action",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

const defaultText = {
  overline: "sgds:text-label-default",
  headline: "sgds:text-display-default",
  description: "sgds:text-heading-subtle"
};

const fixedLightText = {
  overline: "sgds:text-fixed-light",
  headline: "sgds:text-fixed-light",
  description: "sgds:text-fixed-light"
};

// ─── Full Bleed left-aligned ───────────────────────────────────────────────────

const FullBleedLeftTemplate = ({ bgClass, textClasses, buttonTone }) => html`
  <section class="sgds:py-layout-lg ${bgClass}">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
        <div class="sgds:mb-xl">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:mb-xs ${textClasses.overline}"
          >
            Overline
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter ${textClasses.headline}"
          >
            Headline
          </h2>
          <h5
            class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal ${textClasses.description}"
          >
            Description
          </h5>
        </div>
        <sgds-button variant="primary" tone=${buttonTone} size="md">Button Label</sgds-button>
      </div>
    </div>
  </section>
`;

export const FullBleed = {
  render: () => FullBleedLeftTemplate({ bgClass: "sgds:bg-default", textClasses: defaultText, buttonTone: "brand" }),
  name: "Full Bleed"
};

export const FullBleedAlternate = {
  render: () => FullBleedLeftTemplate({ bgClass: "sgds:bg-alternate", textClasses: defaultText, buttonTone: "brand" }),
  name: "Full Bleed Alternate"
};

export const FullBleedPrimary = {
  render: () =>
    FullBleedLeftTemplate({
      bgClass: "sgds:bg-primary-default",
      textClasses: fixedLightText,
      buttonTone: "fixed-light"
    }),
  name: "Full Bleed Primary"
};

// ─── Full Bleed center-aligned ─────────────────────────────────────────────────

const FullBleedCenterTemplate = ({ bgClass, textClasses, buttonTone }) => html`
  <section class="sgds:py-layout-lg ${bgClass}">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
        <div class="sgds:mb-xl">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:mb-xs ${textClasses.overline}"
          >
            Overline
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter ${textClasses.headline}"
          >
            Headline
          </h2>
          <h5
            class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal ${textClasses.description}"
          >
            Description
          </h5>
        </div>
        <sgds-button variant="primary" tone=${buttonTone} size="md">Button Label</sgds-button>
      </div>
    </div>
  </section>
`;

export const FullBleedCenter = {
  render: () => FullBleedCenterTemplate({ bgClass: "sgds:bg-default", textClasses: defaultText, buttonTone: "brand" }),
  name: "Full Bleed Center"
};

export const FullBleedAlternateCenter = {
  render: () =>
    FullBleedCenterTemplate({ bgClass: "sgds:bg-alternate", textClasses: defaultText, buttonTone: "brand" }),
  name: "Full Bleed Alternate Center"
};

export const FullBleedPrimaryCenter = {
  render: () =>
    FullBleedCenterTemplate({
      bgClass: "sgds:bg-primary-default",
      textClasses: fixedLightText,
      buttonTone: "fixed-light"
    }),
  name: "Full Bleed Primary Center"
};

// ─── Contained left-aligned ───────────────────────────────────────────────────

const ContainedLeftTemplate = ({ bgClass, textClasses, buttonTone }) => html`
  <section class="sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="${bgClass} sgds:rounded-2-xl sgds:p-layout-lg">
        <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:mb-xs ${textClasses.overline}"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter ${textClasses.headline}"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal ${textClasses.description}"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone=${buttonTone} size="md">Button Label</sgds-button>
        </div>
      </div>
    </div>
  </section>
`;

export const Contained = {
  render: () =>
    ContainedLeftTemplate({ bgClass: "sgds:bg-surface-default", textClasses: defaultText, buttonTone: "brand" }),
  name: "Contained"
};

export const ContainedRaised = {
  render: () =>
    ContainedLeftTemplate({ bgClass: "sgds:bg-surface-raised", textClasses: defaultText, buttonTone: "brand" }),
  name: "Contained Raised"
};

export const ContainedPrimary = {
  render: () =>
    ContainedLeftTemplate({
      bgClass: "sgds:bg-primary-default",
      textClasses: fixedLightText,
      buttonTone: "fixed-light"
    }),
  name: "Contained Primary"
};

// ─── Contained center-aligned ─────────────────────────────────────────────────

const ContainedCenterTemplate = ({ bgClass, textClasses, buttonTone }) => html`
  <section class="sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="${bgClass} sgds:rounded-2-xl sgds:p-layout-lg">
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:mb-xs ${textClasses.overline}"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter ${textClasses.headline}"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal ${textClasses.description}"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone=${buttonTone} size="md">Button Label</sgds-button>
        </div>
      </div>
    </div>
  </section>
`;

export const ContainedCenter = {
  render: () =>
    ContainedCenterTemplate({ bgClass: "sgds:bg-surface-default", textClasses: defaultText, buttonTone: "brand" }),
  name: "Contained Center"
};

export const ContainedRaisedCenter = {
  render: () =>
    ContainedCenterTemplate({ bgClass: "sgds:bg-surface-raised", textClasses: defaultText, buttonTone: "brand" }),
  name: "Contained Raised Center"
};

export const ContainedPrimaryCenter = {
  render: () =>
    ContainedCenterTemplate({
      bgClass: "sgds:bg-primary-default",
      textClasses: fixedLightText,
      buttonTone: "fixed-light"
    }),
  name: "Contained Primary Center"
};
