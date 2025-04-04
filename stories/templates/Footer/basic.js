import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <div class="d-flex-column">
      <sgds-footer
        lastUpdatedDate=${ifDefined(args.lastUpdatedDate)}
        contactHref=${ifDefined(args.contactHref)}
        feedbackHref=${ifDefined(args.feedbackHref)}
        faqHref=${ifDefined(args.faqHref)}
        privacyHref=${ifDefined(args.privacyHref)}
        termsOfUseHref=${ifDefined(args.termsOfUseHref)}
        copyrightLiner=${ifDefined(args.copyrightLiner)}
      ></sgds-footer>
      <sgds-footer
        lastUpdatedDate=${ifDefined(args.lastUpdatedDate)}
        contactHref=${ifDefined(args.contactHref)}
        feedbackHref=${ifDefined(args.feedbackHref)}
        faqHref=${ifDefined(args.faqHref)}
        privacyHref=${ifDefined(args.privacyHref)}
        termsOfUseHref=${ifDefined(args.termsOfUseHref)}
        copyrightLiner=${ifDefined(args.copyrightLiner)}
      >
        <h2 slot="title">Name of portal/digital service</h2>
        <p slot="description">Description of portal/digital service</p>
        <sgds-footer-item slot="items">
          <div slot="title">Application Guidelines</div>
          <a href="/application-guidelines/lorem-ipsum-one/second-level-a/">hello world</a>
          <a href="/application-guidelines/lorem-ipsum-one/part-A/">Second Level B</a>
          <a href="/application-guidelines/lorem-ipsum-three/">Lorem Ipsum Three</a>
        </sgds-footer-item>
        <sgds-footer-item slot="items">
          <div slot="title">Legislation</div>
          <a href="#">Legislation</a>
          <a href="https://en.wikipedia.org/wiki/Year" target="_blank">External Link One</a>
          <a href="https://en.wikipedia.org/wiki/Spring_(season)" target="_blank">External Link Two</a>
        </sgds-footer-item>
        <sgds-footer-item slot="items">
          <div slot="title">Resources</div>
          <a href="/resource_room/">All</a>
          <a href="/resource_room/forms-and-templates/" target="_blank">Forms and Templates</a>
          <a href="/resource_room/guides/" target="_blank">Guides</a>
        </sgds-footer-item>
        <sgds-footer-item slot="items">
          <div slot="title">Resources</div>
          <a href="/resource_room/">All</a>
          <a href="/resource_room/forms-and-templates/" target="_blank">Forms and Templates</a>
          <a href="/resource_room/guides/" target="_blank">Guides</a>
        </sgds-footer-item>
        <sgds-footer-item slot="items">
          <div slot="title">Resources</div>
          <a href="/resource_room/">All</a>
          <a href="/resource_room/forms-and-templates/" target="_blank">Forms and Templates</a>
          <a href="/resource_room/guides/" target="_blank">Guides</a>
        </sgds-footer-item>
        <sgds-footer-item slot="items">
          <div slot="title">Resources</div>
          <a href="/resource_room/">All</a>
          <a href="/resource_room/forms-and-templates/" target="_blank">Forms and Templates</a>
          <a href="/resource_room/guides/" target="_blank">Guides</a>
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
    </div>
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
