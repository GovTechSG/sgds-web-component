# Story Examples Reference

Real-world component examples from the codebase to use as models when writing new stories.

## Multiple Variants (Alert)

Renders all semantic variants in a single loop using a local template:

```javascript
// stories/templates/Alert/additional.stories.js
import { html } from "lit";

const VariantTemplate = args => {
  const variants = [
    { variant: "Info", icon: "info-circle-fill" },
    { variant: "Success", icon: "check-circle-fill" },
    { variant: "Danger", icon: "exclamation-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(v => html`
        <sgds-alert variant=${v.variant.toLowerCase()} show title="${v.variant} alert">
          <sgds-icon slot="icon" name=${v.icon}></sgds-icon>
          <div>Description</div>
        </sgds-alert>
      `)}
    </div>
  `;
};

export const AllVariants = {
  render: VariantTemplate.bind({}),
  name: "All Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
```

## Inline Event Listener (SystemBanner)

Uses `<script>` inside the template for interactive demos that require DOM event wiring:

```javascript
// stories/templates/SystemBanner/additional.stories.js
import { html } from "lit";

const ShowMoreHookTemplate = args => html`
  <sgds-system-banner show id="banner-example" dismissible>
    <sgds-system-banner-item>
      Long content that will be truncated...
    </sgds-system-banner-item>
  </sgds-system-banner>
  <sgds-modal></sgds-modal>

  <script>
    const banner = document.querySelector("#banner-example");
    const modal = document.querySelector("sgds-modal");
    banner.addEventListener("sgds-show-more", () => {
      modal.show();
    });
  </script>
`;

export const ShowMore = {
  render: ShowMoreHookTemplate.bind({}),
  name: "Show More",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
```

## Reusing Template from basic.js

`Template` is in scope via concatenation. Use `Template.bind({})` with custom args:

```javascript
// No import needed — Template comes from basic.js via concatenation
export const NoClampAction = {
  render: Template.bind({}),
  name: "No Clamp Action",
  args: {
    show: true,
    noClampAction: true
  },
  parameters: {},
  tags: ["!dev"]
};
```

## Documentation (additional.mdx)

Each additional story should have a matching doc section:

```mdx
## Show More

Triggered when the banner content overflows the clamped area. Connects to a modal.

**Key behaviors:**
- Event `sgds-show-more` fires when user clicks "Show more"
- Host page decides what to do in the event handler

<Canvas of={SystemBannerStories.ShowMore}>
  <Story of={SystemBannerStories.ShowMore} />
</Canvas>
```
