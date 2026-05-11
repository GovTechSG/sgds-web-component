import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const ExtendedTemplate = args => html`
  <sgds-footer
    contactHref="https://form.gov.sg/"
    feedbackHref="https://form.gov.sg/"
    faqHref="https://form.gov.sg/"
    privacyHref="https://www.designsystem.tech.gov.sg/privacy/"
    termsOfUseHref="https://www.designsystem.tech.gov.sg/terms-of-use/"
    sitemapHref="#"
    tone=${ifDefined(args.tone)}
    layout=${ifDefined(args.layout)}
  >
    <h2 slot="title">Name of portal/digital service</h2>
    <p slot="description">Description of portal/digital service</p>
    <sgds-footer-item slot="items">
      <div slot="title">Application guidelines</div>
      <sgds-link><a href="#">Lorem Ipsum One</a></sgds-link>
      <sgds-link><a href="#">Second Level B</a></sgds-link>
      <sgds-link><a href="#">Lorem Ipsum Three</a></sgds-link>
    </sgds-footer-item>
    <sgds-footer-item slot="items">
      <div slot="title">Legislation</div>
      <sgds-link><a href="#">Legislation</a></sgds-link>
      <sgds-link><a href="#">External Link One</a></sgds-link>
      <sgds-link><a href="#">External Link Two</a></sgds-link>
    </sgds-footer-item>
    <sgds-footer-item slot="items">
      <div slot="title">Resources</div>
      <sgds-link><a href="#">All</a></sgds-link>
      <sgds-link><a href="#">Forms and Templates</a></sgds-link>
      <sgds-link><a href="#">Guides</a></sgds-link>
    </sgds-footer-item>
    <sgds-footer-item slot="items">
      <div slot="title">Resources</div>
      <sgds-link><a href="#">All</a></sgds-link>
      <sgds-link><a href="#">Forms and Templates</a></sgds-link>
      <sgds-link><a href="#">Guides</a></sgds-link>
    </sgds-footer-item>
    <sgds-footer-item slot="items">
      <div slot="title">Resources</div>
      <sgds-link><a href="#">All</a></sgds-link>
      <sgds-link><a href="#">Forms and Templates</a></sgds-link>
      <sgds-link><a href="#">Guides</a></sgds-link>
    </sgds-footer-item>
    <sgds-footer-item slot="items">
      <div slot="title">Resources</div>
      <sgds-link><a href="#">All</a></sgds-link>
      <sgds-link><a href="#">Forms and Templates</a></sgds-link>
      <sgds-link><a href="#">Guides</a></sgds-link>
    </sgds-footer-item>
    <a slot="social-media" href="https://www.facebook.com">
      <sgds-icon name="facebook"></sgds-icon>
    </a>
    <a slot="social-media" href="https://www.instagram.com">
      <sgds-icon name="instagram"></sgds-icon>
    </a>
    <a slot="social-media" href="https://www.linkedin.com">
      <sgds-icon name="linkedin"></sgds-icon>
    </a>
    <a slot="social-media" href="https://www.x.com">
      <sgds-icon name="twitter-x"></sgds-icon>
    </a>
    <a slot="social-media" href="https://www.youtube.com">
      <sgds-icon name="youtube"></sgds-icon>
    </a>
  </sgds-footer>
`;

export const Extended = {
  render: ExtendedTemplate.bind({}),
  name: "Extended",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: []
};

export const NeutralTone = {
  render: Template.bind({}),
  name: "Neutral Tone",
  args: { ...args, tone: "neutral" },
  parameters,
  tags: []
};

export const NeutralToneExtended = {
  render: ExtendedTemplate.bind({}),
  name: "Neutral Tone Extended",
  args: { tone: "neutral" },
  parameters: { layout: "fullscreen" },
  tags: []
};
