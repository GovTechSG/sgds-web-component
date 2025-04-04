# Migration Guide

## From version 2.x.x to 3.x.x

### Changes

In version 3, we revamped the component designs and moved away from Bootstrap designs completely, added new features and dropped some in our components.
We also setup our own naming convention for css variable tokens which is used both in our Figma and source code. Our new tokens system, enabled us to provide `night` theme in all our components in v3.

We also introduced foundational styles to allow users who want to wholistically style their app with SGDS.

### Breaking Changes

If you are migrating from v2, please take note of the breaking changes below:

#### sgds-accordion

##### Removed:

- CSS prop:
  - `--accordion-active-color`

---

#### sgds-accordion-item

##### Renamed Slots:

- `accordion-header` → `header`
- `accordion-caret` → `caret`
- `accordion-content` → `content`

##### Removed:

- CSS props:
  - `--accordion-item-padding-y`
  - `--accordion-item-padding-x`
  - `--accordion-item-border-radius`
  - `--accordion-item-font-weight`
  - `--accordion-item-line-height`
- CSS parts:
  - `base`
  - `header`
  - `content`

---

#### sgds-action-card

##### Removed:

- Component removed.

---

#### sgds-alert

##### Removed:

- `variant` options:
  - `primary`
  - `secondary`
  - `light`
- CSS props:
  - `--alert-bg`
  - `--alert-border-color`
  - `--alert-icon-margin-right`

##### Changes:

- `variant` now defaults to **filled alerts**.
- The default `variant` is now `info`.

---

#### sgds-alert-heading

##### Removed:

- Component removed.

---

#### sgds-alert-link

##### Removed:

- CSS prop:
  - `--alert-link-anchor-color`

---

#### sgds-badge

##### Removed:

- `variant` options:
  - `primary`
  - `secondary`
  - `light`
  - `dark`
- `roundedPill` prop

##### Changes:

- The default `variant` has changed from `primary` to `info`.

---

#### sgds-breadcrumb

##### Removed:

- `separator` slot
- CSS part:
  - `base`

---

#### sgds-breadcrumb-item

##### Removed:

- `href`, `target` and `rel` props
- `separator` slot
- CSS parts:
  - `base`
  - `label`

---

#### sgds-button

##### Removed:

- `variant` options:
  - `secondary`, `success`, `warning`, `info`, `light`, `dark`, `link`, `outlined`
  - `outline-primary`, `outline-secondary`, `outline-success`, `outline-danger`, `outline-warning`, `outline-info`, `outline-light`, `outline-dark`
- CSS prop:
  - `--btn-border-radius`

---

#### sgds-card

##### Renamed Slots:

- `card-title` → `title`
- `card-image` → `image`
- `card-link` → `link`
- `card-text` → `description`

##### Removed:

- `borderColor`, `bgColor` and `textColor` props
- CSS parts:
  - `base`
  - `body`
  - `title`
  - `text`

---

#### sgds-checkbox

##### Removed:

- `ariaLabel`, `isInline` and `invalidFeedback` props

---

#### sgds-combo-box

##### Removed:

- `valid` and `close` props

##### Changes:

- The `menuList` prop is now an array of objects `(SgdsComboBoxItemData { value: string; label: string; })`.

---

#### sgds-datepicker

##### Removed:

- CSS props:
  - `--datepicker-theme-color`
  - `--datepicker-hover-bg`
  - `--datepicker-bg`
  - `--datepicker-close-button-bg`
  - `--datepicker-close-button-hover-bg`
  - `--datepicker-close-button-color`
  - `--datepicker-selected-date-bg`
  - `--datepicker-selected-date-color`
- `close` prop
- Reset datepicker button

---

#### sgds-drawer

##### Removed:

- CSS props:
  - `--drawer-size`
  - `--drawer-padding`
  - `--drawer-bg`
  - `--drawer-button-gap`
- CSS parts:
  - `base`
  - `overlay`
  - `panel`
  - `header`
  - `header-actions`
  - `title`
  - `close-button`
  - `body`
  - `footer`
- `label`, `header-actions` and `footer` slots
- `label` and `noHeader` props

---

#### sgds-dropdown

##### Removed:

- `togglerId`, `togglerText`, `variant` and `close` props

---

#### sgds-dropdown-item

##### Removed:

- `href` and `target` props

---

#### sgds-file-upload

##### Removed:

- `variant`, `size`, `checkedIcon` and `cancelIcon` props

---

#### sgds-footer

##### Removed:

- CSS parts:
  - `footer-top`
  - `footer-bottom`
- `title`, `decription`, `links` and `lastUpdatedDate` props

##### Changes:

- The minimum requirement for the footer is reduced to the footer bottom.

---

#### sgds-input

##### Removed:

- `icon` and `labelId` props
- `setCustomValidity()` method

##### Changes:

- The `hasFeedback` type has changed from `boolean` to `"style"` | `"text"` | `"both"`.

---

#### sgds-mainnav

##### Removed:

- CSS props:
  - `--mainnav-bg`
  - `--mainnav-padding-x`
  - `--mainnav-padding-y`
  - `--mainnav-mobile-padding-x`
  - `--mainnav-mobile-padding-y`
  - `--mainnav-border-bottom-width`
  - `--mainnav-border-bottom-color`
  - `--mainnav-theme-color`

---

#### sgds-mainnav-item

##### Removed:

- `href` and `target` props

---

#### sgds-mainnav-dropdown

##### Removed:

- `togglerText`, `popperOpts`, `menuIsOpen` and `close` props
- `sgds-select`, `sgds-show`, `sgds-after-show`, `sgds-hide` and `sgds-after-hide` events

---

#### sgds-masthead

##### Removed:

- `fluid` prop
- CSS props:
  - `--masthead-mobile-font-size`
  - `--masthead-mobile-padding-x`
  - `--masthead-fluid-padding-x`

---

#### sgds-modal

##### Removed:

- `title`, `titleIcon`, `noHeader`, `centered`, `centeredAlignVariant` and `noCloseButton`
- CSS props:
  - `--modal-panel-padding`
  - `--modal-panel-z-index`
  - `--modal-panel-width`
  - `--modal-panel-height`
  - `--modal-panel-bg`
  - `--modal-panel-border-radius`
  - `--modal-header-border-bottom`
  - `--modal-overlay-bg`
- CSS parts:
  - `title`
  - `base`
  - `overlay`
  - `panel`
  - `header`
  - `body`
  - `footers`

---

#### sgds-pagination

##### Removed:

- `limit`, `ellipsisOn`, `ellipsisJump`, `showFirstPage`, `showLastPage` and `directionVariant` props
- CSS props:
  - `--pagination-color`
  - `--pagination-bg`
  - `--pagination-hover-bg`
  - `--pagination-active-color`
  - `--pagination-active-bg`
  - `--pagination-disabled-color`
  - `--pagination-disabled-bg`

---

#### sgds-progress-bar

##### Removed:

- `variant` options:
  - `secondary`
  - `success`
  - `danger`
  - `warning`
  - `info`
  - `dark`

##### Changes:

- The `--sgds-progress` wrapper component is removed, use `--sgds-progress-bar` directly instead.

---

#### sgds-progress

##### Removed:

- Component removed.

##### Changes:

- The folder path has renamed from `Progress` to `ProgressBar`.

---

#### sgds-quantity-toggle

##### Removed:

- `size` and `buttonVariant` props
- CSS parts:
  - `base`
  - `button`

---

#### sgds-radio

##### Removed:

- `ariaLabel`, `isInline`, `invalidFeedback` and `hasFeedback` props

---

#### sgds-sidenav

##### Removed:

- `alwaysOpen` prop

---

#### sgds-sidenav-link

##### Removed:

- `href` and `target` props
- CSS props:
  - `--sidenav-link-font-size`
  - `-sidenav-link-padding-x`
  - `--sidenav-link-padding-y`
  - `--sidenav-link-disabled-color`

---

#### sgds-sidenav-item

##### Removed:

- `href` prop
- CSS props:
  - `--sidenav-item-button-border-left-width`
  - `--sidenav-item-padding-x`
  - `--sidenav-item-padding-y`
  - `--sidenav-item-icon-title-gap`

##### Changes:

- The `closeItem()` and `openItem()` deprecated methods is replaced with `show()` and `hide()` methods.

---

#### sgds-spinner

##### Removed:

- `type` prop
- `variant` options:
  - `secondary`
  - `success`
  - `danger`
  - `warning`
  - `info`
  - `light`
  - `dark`

##### Changes:

- The `color` prop has renamed to `variant` prop.

---

#### sgds-stepper

##### Removed:

- `defaultActiveStep` prop
- CSS props:
  - `--stepper-default-color`
  - `--stepper-theme-color`
  - `--stepper-theme-hover-color`

---

#### sgds-tab

##### Removed:

- `count` and `label` slots
- CSS part:
  - `base`

---

#### sgds-tab-panel

##### Removed:

- CSS prop:
  - `--tab-panel-padding-y`
- CSS part:
  - `base`

---

#### sgds-tab-group

##### Removed:

- CSS parts:
  - `nav`
  - `body`

##### Changes:

- The `variant` options has changed from `tabs-basic-toggle` and `tabs-info-toggle` to `underlined` and `solid`.

---

#### sgds-table

##### Removed:

- `striped`, `bordered`, `borderless`, `hover`, `size`, `variant`, `sort`, `removableSort` and `tableHeaders` props
- CSS props:
  - `--table-bg`
  - `--table-accent-bg`
  - `--table-active-color`
  - `--table-active-bg`
  - `--table-striped-color`
  - `--table-striped-bg`
  - `--table-hover-color`
  - `--table-hover-bg`

##### Changes:

- The `tableHeaders` prop is removed, use `rowHeader` and `columnHeader` instead.

---

#### sgds-textarea

##### Removed:

- `defaultValue` prop

---

#### sgds-toast

##### Removed:

- `duration` slot

---

### sgds-toast-container

##### Removed:

- CSS prop:
  - `--toast-container-slot-elements-gap`

---

#### sgds-tooltip

##### Removed:

- CSS prop:
  - `--tooltip-max-width`
