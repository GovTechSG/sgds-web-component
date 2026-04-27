
    import { Template, args, parameters, play } from "../templates/Footer/basic.js";

    export default {
      title: 'Components/Footer',
      component: 'sgds-footer',
      argTypes: {"copyrightLiner":{"defaultValue":"Government of Singapore","control":"text"},"contactHref":{"defaultValue":"#","control":"text"},"feedbackHref":{"defaultValue":"#","control":"text"},"faqHref":{"defaultValue":"","control":"text"},"sitemapHref":{"defaultValue":"","control":"text"},"privacyHref":{"defaultValue":"#","control":"text"},"termsOfUseHref":{"defaultValue":"#","control":"text"},"hasDefaultSlot":{"defaultValue":false,"control":"boolean"},"hasTitleSlot":{"defaultValue":false,"control":"boolean"},"hasDescriptionSlot":{"defaultValue":false,"control":"boolean"},"hasItemsSlot":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  