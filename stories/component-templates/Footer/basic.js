import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-footer
      lastUpdatedDate=${ifDefined(args.lastUpdatedDate)}
      contactHref=${ifDefined(args.contactHref)}
      feedbackHref=${ifDefined(args.feedbackHref)}
      faqHref=${ifDefined(args.faqHref)}
      privacyHref=${ifDefined(args.privacyHref)}
      termsOfUseHref=${ifDefined(args.termsOfUseHref)}
      copyrightLiner=${ifDefined(args.copyrightLiner)}
      sitemapHref=${ifDefined(args.sitemapHref)}
      tone=${ifDefined(args.tone)}
      layout=${ifDefined(args.layout)}
    ></sgds-footer>
  `;
};

export const args = {
  contactHref: "https://form.gov.sg/",
  feedbackHref: "https://form.gov.sg/",
  faqHref: "https://form.gov.sg/",
  privacyHref: "https://www.designsystem.tech.gov.sg/privacy/",
  termsOfUseHref: "https://www.designsystem.tech.gov.sg/terms-of-use/"
};

export const parameters = {
  layout: "fullscreen"
};

export const play = undefined;
