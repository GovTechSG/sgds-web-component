import { PatternTemplate } from "../../patterns/Authentication/template.js";
import { defaultPattern, patternOptions, patternLabels } from "../../patterns/Authentication/patterns.js";
import { html, nothing } from "lit";
import { useArgs, useEffect } from "storybook/preview-api";

const LogoTemplate = () => html`
  <img
    data-auth-slot="logo"
    src="/authentication/logo.svg"
    alt="Singapore Government Design System"
    width="160"
    height="40"
  />
`;

const ImageTemplate = contained => html`
  <div class=${contained ? "sgds:hidden sgds:lg:flex sgds:min-w-0 sgds:py-12" : "sgds:hidden sgds:lg:block"}>
    ${contained
      ? html`
          <div class="sgds:relative sgds:w-full sgds:overflow-hidden sgds:rounded-3-xl">
            <img
              data-auth-slot="image"
              src="/placeholder-sgds.png"
              alt=""
              class="sgds:absolute sgds:inset-0 sgds:w-full sgds:h-full sgds:object-cover"
            />
          </div>
        `
      : nothing}
  </div>
`;

export const Template = ({
  image = "None",
  imageConfiguration = "Full bleed",
  logoPlacement = "Separate",
  contentPattern = defaultPattern
}) => {
  const hasSideImage = image === "Left" || image === "Right";
  const contained = imageConfiguration === "Contained";
  return html`
    <sgds-masthead fluid></sgds-masthead>
    <main class="sgds:relative sgds:bg-default">
      ${image === "Background" || (hasSideImage && !contained)
        ? html`
            <img
              data-auth-slot="image"
              src="/placeholder-sgds.png"
              alt=""
              class=${image === "Background"
                ? "sgds:hidden sgds:lg:block sgds:absolute sgds:inset-0 sgds:w-full sgds:h-full sgds:object-cover"
                : image === "Left"
                ? "sgds:hidden sgds:lg:block sgds:absolute sgds:inset-y-0 sgds:left-0 sgds:w-1/2 sgds:h-full sgds:object-cover"
                : "sgds:hidden sgds:lg:block sgds:absolute sgds:inset-y-0 sgds:right-0 sgds:w-1/2 sgds:h-full sgds:object-cover"}
            />
          `
        : nothing}
      <div
        class=${hasSideImage
          ? "sgds-container sgds:relative sgds:grid sgds:lg:grid-cols-2 sgds:gap-x-12"
          : "sgds-container sgds:relative sgds:grid"}
      >
        ${image === "Left" ? ImageTemplate(contained) : nothing}
        <div
          class="sgds:box-border sgds:relative sgds:flex sgds:min-w-0 sgds:flex-col sgds:items-center sgds:justify-center sgds:min-h-150 sgds:sm:min-h-165 sgds:md:min-h-180 sgds:lg:min-h-199.5 sgds:py-32"
        >
          ${logoPlacement === "Separate"
            ? html` <div class="sgds:absolute sgds:top-12 sgds:left-0">${LogoTemplate()}</div> `
            : nothing}
          <div
            class=${image === "Background"
              ? "sgds:flex sgds:w-full sgds:justify-center sgds:lg:box-content sgds:lg:max-w-120 sgds:lg:bg-default sgds:lg:p-12 sgds:lg:rounded-lg"
              : "sgds:flex sgds:w-full sgds:justify-center"}
          >
            <!-- Replace this content with the authentication pattern for your service. -->
            <div data-auth-slot="content" class="sgds:flex sgds:w-full sgds:max-w-120 sgds:flex-col sgds:gap-lg">
              ${logoPlacement === "Within content" ? LogoTemplate() : nothing} ${PatternTemplate({ contentPattern })}
            </div>
          </div>
        </div>
        ${image === "Right" ? ImageTemplate(contained) : nothing}
      </div>
    </main>
    <sgds-footer faqHref="#" sitemapHref="#"></sgds-footer>
  `;
};

export const parameters = {
  controls: { disable: false },
  selectedPanel: "control",
  actions: { disable: true },
  interactions: { disable: true },
  layout: "fullscreen"
};

// Storybook conditionals accept one comparison, so derive the shared left/right condition.
export const decorators = [
  Story => {
    const [args, updateArgs] = useArgs();
    const hasSideImage = args.image === "Left" || args.image === "Right";
    useEffect(() => {
      if (args.hasSideImage !== hasSideImage) updateArgs({ hasSideImage });
    }, [hasSideImage, args.hasSideImage]);
    return Story();
  }
];

export const argTypes = {
  logoPlacement: {
    name: "Logo placement",
    control: "select",
    options: ["Separate", "Within content"],
    description: "Place the logo outside or within the authentication content."
  },
  image: {
    name: "Image",
    control: "select",
    options: ["Left", "Right", "Background", "None"],
    description: "Images are hidden below the desktop breakpoint (1024px)."
  },
  imageConfiguration: {
    name: "Image configuration",
    control: "select",
    options: ["Contained", "Full bleed"],
    if: { arg: "hasSideImage", truthy: true },
    description: "Applies to left and right images."
  },
  contentPattern: {
    name: "Content pattern",
    control: { type: "select", labels: patternLabels },
    options: patternOptions,
    description: "Reuse an Authentication pattern in the content slot."
  },
  hasSideImage: { control: false, table: { disable: true } }
};
