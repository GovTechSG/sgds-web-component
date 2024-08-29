# Migration Guide

## From version 1.x.x to 2.x.x

### Architectural Changes

In version 1, we use `@govtechsg/sgds` as a dependency to style the web components. While that saved us a lot of time building the web components and reduced maintenance overload across all our SGDS repositories, it has several drawbacks like big bundle size per component which CSS cannot be purged and customisation limitations by css properties.

In version 2, we rectified the issues by changing up the architecture of the library. Each component only carries their specific styles and any common styles that are shared are kept to a minimal. We also introduced a global css file to be imported with the components. The global css file contains all the css properties tokens and values referenced by the components.

### Package Updates

We took this opportunity to upgrade our dependency packages.

- Upgraded Lit from v2 to v3
- Upgraded Storybook documentation from v6 to v8
- Upgraded @open-wc/scoped-elements from v2 to v3

### Breaking Changes

#### Import of a global css file is now required

In version 1, only import of the entry point is required

```
import "@govtechsg/sgds-web-component"

```

In version 2, import of global css file is required

```
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component"

```

#### Removal of props \*Classes from components API

Due to the software architecture changes, props \*Classes are no longer relevant.

The following components and their respective \*Classes prop are affected in version 2

| Component           |  \*Classes prop removed  |
| ------------------- | :----------------------: |
| sgds-accordion-item |   accordionItemClasses   |
| sgds-alert          |       alertClasses       |
| sgds-badge          |       badgeClasses       |
| sgds-button         |      buttonClasses       |
| sgds-input          |       inputClasses       |
| sgds-progress       |     progressClasses      |
| sgds-spinner        |      spinnerClasses      |
| sgds-tab-group      | tabsClasses, bodyClasses |
| sgds-textarea       |     textareaClasses      |
| sgds-toast          |       toastClasses       |

#### Change in CSS properties names

We made our naming conventions for css properties stricter
Here are the css properties renamed in version 2

| Component         |          css properties in v1           |     renamed css properties in v2      |
| ----------------- | :-------------------------------------: | :-----------------------------------: |
| sgds-datepicker   |    --datepicker-closebutton-bg-color    |       --datepicker-close-btn-bg       |
|                   | --datepicker-closebutton-hover-bg-color |    --datepicker-close-btn-hover-bg    |
|                   |       --datepicker-hover-bg-color       |         --datepicker-hover-bg         |
|                   |          --datepicker-bg-color          |            --datepicker-bg            |
|                   |     --datepicker-closebutton-color      |     --datepicker-close-btn-color      |
|                   |   --datepicker-selected-date-bg-color   |     --datepicker-selected-date-bg     |
|                   |  --datepicker-selected-date-text-color  |   --datepicker-selected-date-color    |
| sgds-drawer       |           --sgds-drawer-size            |             --drawer-size             |
|                   |          --sgds-drawer-padding          |           --drawer-padding            |
|                   |     --sgds-drawer-background-color      |              --drawer-bg              |
|                   |         -sgds-drawer-button-gap         |          --drawer-button-gap          |
| sgds-file-upload  |       --fileupload-file-icon-fill       |     --file-upload-left-icon-color     |
|                   |      --fileupload-remove-icon-fill      |    --file-upload-remove-icon-color    |
| sgds-toast        |   --fileupload-remove-icon-hover-fill   | --file-upload-remove-icon-hover-color |
| sgds-mainnav-item |    --mainnav-item-borderBottom-width    |  --mainnav-item-border-bottom-width   |
| sgds-mainnav      |       --mainnav-background-color        |             --mainnav-bg              |
|                   |      --mainnav-borderBottom-width       |     --mainnav-border-bottom-width     |
|                   |      --mainnav-borderBottom-color       |     --mainnav-border-bottom-color     |
| sgds-modal        |     --modal-panel-background-color      |           --modal-panel-bg            |
|                   |    --modal-overlay-background-color     |          --modal-overlay-bg           |
| sgds-pagination   |          --pagination-bg-color          |            --pagination-bg            |
|                   |       --pagination-hover-bg-color       |         --pagination-hover-bg         |
|                   |      --pagination-active-bg-color       |        --pagination-active-bg         |
|                   |     --pagination-disabled-bg-color      |       --pagination-disabled-bg        |
| sgds-sidenav-item |        --sidenav-item-padding-x         |     --sidenav-item-btn-padding-x      |
| sgds-sidenav-item |        --sidenav-item-padding-y         |     --sidenav-item-btn-padding-y      |
| sgds-sidenav-item | --sidenav-item-button-border-left-width | --sidenav-item-btn-border-left-width  |

#### Deleted CSS properties in some components

We deleted some css properties in some components that have to maintain its style.

| Component         |  css properties removed in v2   | notes                                                 |
| ----------------- | :-----------------------------: | ----------------------------------------------------- |
| sgds-masthead     |     --masthead-font-family      |                                                       |
|                   |      --masthead-text-color      |                                                       |
|                   |      --masthead-link-color      |                                                       |
|                   |   --masthead-link-color-hover   |                                                       |
|                   |     --masthead-crest-color      |                                                       |
| sgds-mainnav-item |   --mainnav-item-theme-color    | replaced with --mainnav-theme-color in <sgds-mainnav> |
|                   |      --mainnav-item-color       |                                                       |
| sgds-pagination   | --pagination-hover-border-color |                                                       |

#### sgds-badge: Renamed isLight to outlined

`isLight` prop is now renamed to `outlined` for better naming consistency.

#### sgds-toast: Renamed status to variant

`status` prop is now renamed to `variant` for better naming consistency. The default value of `variant` is now `info`.

### Deprecations

#### sgds-button

The following types in `variant` prop are deprecated in v2 and will be removed in v3.

- All outline-\*. Instead `outlined` type button is introduced
- Success, warning, light, dark and info variants
