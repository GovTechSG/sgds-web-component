## v3.3.1 (2025-09-01)

### Feat

- **thumbnail card**: add thumbnail card component
- **image card**: add image card component
- **card**: add icon card component
- **card**: update new card component
- **overflow menu**: update overflow menu to be public component

### Fix

- **Datepicker**: configure popper for datepicker
- **Dropdown**: select, combobox, dropdown dependencies checked
- *****: restores types definition in the library (#350)
- *****: restores types definition in the library
- **modal**: css override for sizes (#347)
- **modal**: css override for sizes
- **card**: remove pointer events for disabled card

## v3.3.0 (2025-08-29)

### Feat

- **masthead**: update styling and add scam alert notice
- **link**: add xs size and neutral variant for link component (#339)
- **link**: add xs size and neutral variant for link component
- **Badge**: added tooltip for long text in badge
- **input**: new trailing icon slot, action slot and unmask mask pass… (#299)
- **input**: new trailing icon slot, action slot and unmask mask password type input
- **MenuItem**: dropdown-item, select-item, combo-box-item remove nowrap
- **Datepicker**: value becomes a prop over initialValue, form reset context handled
- **Datepicker**: add deprecation notice to initialValue prop

### Fix

- **mainnav**: fix correct collapse breakpoint for xl and xxl
- **Datepicker**: only assess empty input when required is true
- **Input**: readonly UI (#298)
- **Input**: readonly UI

### Refactor

- **themes**: update tokens from Figma
- **Datepicker**: wip

## v3.2.0 (2025-08-13)

### Fix

- **card**: stretched link prop not working when slotting in sgds-link (#273)
- **Toast**: missing gap between title and body (#277)
- **Toast**: missing gap between title and body

## v3.1.2-rc.0 (2025-08-08)

### Fix

- **mainnav**: add reflect prop to properly reflect it in the DOM
- **subnav**: add reflect prop to properly reflect it in the DOM
- **card**: stretched link prop not working when slotting in sgds-link
- **subnav**: remove the usage of window object in default state (#270)
- **subnav**: separate logic from ui rendering
- **subnav**: remove the usage of window object in default state

## v3.1.2 (2025-08-06)

### Fix

- paddings/margins/dimensions and add new primitives
- **Badge**: remove duplicate sgds-hide sgds-after-hide
- **ComboBox**: preventDefault in badge hide event to remove duplication of badge removal
- **Badge**: event emissions sgds-hide and show to be cancellable by preventDefault

### Refactor

- use exported constants; add xs breakpoint
- mobile-first styles, spacing and button group fix

## v3.1.1 (2025-07-29)

### Fix

- **subnav**: update active selector
- **subnav**: apply gap for subnav item for external link icon
- **subnav**: update active selector

### Refactor

- **icon**: update icon component for SSR support (#265)
- **icon**: update icon component for SSR support

## v3.1.0 (2025-07-28)

### Feat

- **Dropdown**: increase max height to 480 for menu
- **Table**: added new implementation for table with dynamic columns
- **Select**: disabled typing of input
- **Select**: add Select component and refactor Combobox
- **CheckboxGroup**: handle invalid on first render
- **CheckboxGroup**: ensure that value is resetted to defaultValue when reset happens
- **CheckboxGroup**: reset checkboxgroup in form context and validity during keyboard changes

### Fix

- **Dropdown**: use height inherit and apply 100% height for dropdown in mainnav dropdown
- **Dropdown**: having a 100% height of its parent container
- **DropdownItem**: click area bug (#266)
- **DropdownItem**: click area bug

### Refactor

- **Select**: add select-item and clean up css

## v3.1.0-rc.6 (2025-07-10)

## v3.1.0-rc.5 (2025-07-07)

### Fix

- **Mainnav**: dependency changed to sgds-icon-button

## v3.1.0-rc.4 (2025-07-07)

## v3.1.0-rc.3 (2025-07-07)

## v3.1.0-rc.2 (2025-07-05)

## v3.1.0-rc.1 (2025-07-03)

### Feat

- **CheckboxGroup**: emit change event

## v3.1.0-rc.0 (2025-07-03)

### Feat

- **checkboxgroup, checkbox**: initial implementation of validation in checkboxgroup
- **subnav**: add subnav component

### Fix

- **checkbox**: value changes when checkbox is clicked, should not be the case
- **accordion**: fix flickering issue of accordion body on page load with SSR (#258)
- **accordion**: fix flickering issue of accordion body on page load with SSR
- **mainnav**: update dependency to icon-button (#252)

## v3.0.7-rc.0 (2025-07-10)

### Fix

- **mainnav**: change dependency from icon to icon-button
- **switch**: hide label to avoid flex gap issue (#251)
- **switch**: hide label to avoid flex gap issue

## v3.0.6 (2025-06-27)

### Feat

- **grid**: add new breakpoint and utilities to center grid items (#250)
- **grid**: add new breakpoint and utilities to center grid items
- **css**: update new css variable name
- **css**: add new padding variable to design tokens

### Fix

- **input**: to check validation at the blurring event , only works when required is true

## v3.0.5 (2025-06-02)

### Fix

- **card**: update image adjustment prop description
- **card**: guard against undefined childNodes in stretchedLink
- **masthead**: enable keyboard interaction for toggle visibility

## v3.0.4 (2025-05-26)

### Fix

- **grid**: correct responsive column visibility override issue (#240)
- **grid**: correct responsive column visibility override issue

## v3.0.3 (2025-05-19)

## v3.0.2 (2025-05-02)

## v3.0.1 (2025-04-14)

## v3.0.0 (2025-04-04)

### BREAKING CHANGE

- removal of css props, csspart and slot name upate

### Feat

- **table**: update v3 simple table
- **toc**: add new component
- **grid**: implement grid system
- **drawer**: remove css props, csspart and update slot name

## v3.0.0-rc.6 (2025-02-13)

## v3.0.0-rc.5 (2025-02-11)

## v3.0.0-rc.4 (2024-12-20)

## v3.0.0-rc.3 (2024-12-13)

## v3.0.0-rc.2 (2024-11-27)

### BREAKING CHANGE

- Removal of icon prop and render the icon with slot, users who previously use this
prop will find that the icon no longer appears

### Feat

- **combobox**: show empty menu when no filtering matches
- **pagination**: allow button and description variant to have button navigation
- **combobox**: show whole menu list with active items when not actively fitlering
- **combobox**: form validation
- **mainnav**: update v3 mainnav
- **combobox**: add styling
- **combobox**: add more functionality
- **sidenav**: sidenav oopen behaviour
- **datepicker**: associate datepicker with form
- **datepicker**: reset calendar when input is cleared:
- **datepicker**: stylings wip
- **datepicker**: stylings wip
- **card**: update v3 component styling
- **mainnav**: update mainnav
- **Breadcrumb**: implement logic for more than 4 breadcrumb items
- **breadcrumb**: stylings
- **accordion**: update naming convention for accordion slots
- **fileupload**: add files getter
- **validation**: reset validation during disabled
- **quantity-toggle**: validation on click of buttons
- **quantity-toggle**: implement reset form
- **checkbox**: implement reset validity and form
- **input, radio-group**: implement reset form and validity
- **validation**: encapsulate controller with mixin to hook on lifecycle
- **radio**: implement validation with element internals
- **checkbox**: implement validation by new elementintenrals
- **validation**: implement validation controller on input
- **form**: elementInternals wip
- clean up playground ide for all components
- clean up playground ide
- finish playground script and add injection point
- write playground generating script, with bug
- **card, checkbox, combobox**: finish playground set up
- **action card, accordion, alert, badge, breadcrumb**: playground ide
- **button**: create button playground with docs
- add playground ide for card and button without bugs, breadcrumb and badge with bugs

### Fix

- **datepicker**: bug due to isTouched in input handleBlur
- **tabs**: fix padding between tab group and tab panel
- **datepicker**: failing test
- fixed bugs in playground set up

### Refactor

- **ComboBox**: reset combobox when displayValue is empty in single select
- **combobox**: review combo box part 1
- **pagination**: remove following prop as they are made fixed now
- **datepicker**: update invalid state immediately upon invalid detected
- **datepicker**: using validtor mixin on datepicker
- **close-button**: use sgds-icon
- **icon**: retrieve icons through dynamic import
- **dropdown-item**: change parent clsas to SgdsElement
- **modal**: handle modal when content gets too large
- **dropdown-item**: change to sgds-icon
- **description-list**: reviewed and update changes
- **overflow-menu**: bring out as internal component and refactor breadcrumb
- **icon-button**: review
- *****: remove scoped elements mixin and implement dependency registration
- **dropdown-item**: let users pass in anchor as slots
- **text input**: removal of icon prop
- **tab, tabgroup**: review commit
- **link**: bring anchor to slot
- **dropdown**: bring out toggler as slot
- **validtormixin**: use mixin methods and encapsulate controller
- **quantity-toggle, input**: hasFeedback attribute
- **qty-toggle**: how invalid sgds-input will be styled in qty-toggle
- **radio, checkbox**: remove controller and implement mixin

## v3.0.0-rc.1 (2024-11-01)

### Feat

- **sgds**: migrate to 3.0 besides tests and focus
- **tabs**: change tabs to new version
- **modal**: update component
- **icon button**: update icon button
- **quantity toggle**: update styling
- **file upload**: update styling
- **icon**: add new icon component for dynamic svg rendering
- **footer**: change social media as a slot
- **footer**: update footer styling
- **css**: only expose tag styles

### Fix

- **footer**: remove unnecessary component to use slot

## v3.0.0-rc.0 (2024-10-28)

### Feat

- **progress**: sb docs added
- **progress**: assign default variant to primary value
- **spinner, masthead**: add sb
- **masthead**: remove --sgds prefix from componetn specific tokens

## v2.1.2 (2024-09-30)

### Fix

- **checkbox, radio**: layout of label against input

## v2.1.1 (2024-09-18)

### Fix

- **build**: restrict use client to react components only

## v2.1.0 (2024-09-16)

### Feat

- **react**: add use client directives to react components [skip-cd] (#216)

## v2.0.1 (2024-09-12)

### Feat

- **react**: add use client directives to react components

### Fix

- **masthead**: remove css nestings (#215)
- **masthead**: remove css nestings

### Refactor

- **sgds-element**: remove css nestings from sgds-element

## v2.0.0 (2024-09-03)

## v2.0.0-rc.3 (2024-09-03)

### Refactor

- **button**: outlined variant border color be primary

## v2.0.0-rc.2 (2024-09-02)

### Refactor

- *****: revert @open-wc/scoped-elements to v2

## v2.0.0-rc.1 (2024-08-29)

## v2.0.0-rc.0 (2024-08-29)

### Fix

- **toast**: variants styles not reflecting

## v2.0.0-beta.0 (2024-08-29)

### BREAKING CHANGE

- Users who previously use the css variables will find that it no longer applies and
will have styling breaks
- Removeal of variants in progress bar
- Users who previously use the props will find that it no longer applies and will
have styling breaks.
- removed <sgds-alert-heading>
- Users who previously use any of the colors will find that it no longer applies

### Feat

- **masthead**: update masthead styling
- **reboot, caption**: add more light dom css
- **accordion**: update accordion styling
- **css**: add light dom fundamental css
- **IconList**: add size prop
- **IconList**: new component sgds-icon-list
- **quantity toggle**: update quantity toggle styling in progress
- **dropdown**: fix dropdown keyboard accessibility
- **dropdown menu**: add dropdown menu styles
- **divider**: initial implementation
- **skeleton**: add sheen effect and ut
- **skeleton**: first implementation of skeleton
- **input**: update input styles
- **icon-button**: completed styles and refactored button
- **stepper**: update detail color
- **textarea**: update textarea styling
- **switch**: icon and sizes
- **radio**: add hint text and states for radio button
- **switch**: add switch wip
- **stepper**: removal of css variables
- **link**: remove href when disabled is true
- **progress bar**: removal of variant options
- **link**: new link component
- **checkbox**: updates validation of checkbox group in a form submission context
- **toast**: change close button and title padding
- **checkbox**: add checkbox group, logic and container
- **toast and checkbox**: edit toast test and revert checkbox changes
- **progress bar**: update progress bar
- **stepper**: update stepper css
- **spinner**: removal of spinner type prop and rename color prop to variant
- **toast**: update toast css, ts file, test file and docs
- **toast**: add action to toast and style layout
- **badge**: remove right icon and have no icon if dismissible
- **badge**: added light/dark modes for close button and changed dark to light, vice versa
- **alert**: update alert to figma v3
- **spinner**: remove color options
- further edits on badge
- continue updating badge
- **close button**: add size prop and update customisable variable
- update badge to 3.0
- **button**: update customisable css variables and button variants

### Fix

- **dropdown list**: handle tab event only when menu is open
- **pagination**: duplicate first page button (#207)
- **pagination**: duplicate first page button

### Refactor

- *****: remove --sgds prefix for component specific tokens
- *****: remove excess css tokens complete
- **spinner**: use label prop over slot to simplify rendering process
- **stepper**: label color during default state and remove max width from vertical stepper
- **switch**: remove form features in switch
- **switch, checkbox**: no longer sharing code
- **toast**: handle ease in and out animation of toast
- **radio**: styling changes
- **toast**: styles
- **alert**: add display none when icon slot is empty

## v1.4.0 (2024-08-01)

### Feat

- **modal**: add noCloseButton prop (#205)
- **modal**: add noCloseButton prop

### Fix

- **accordion-item**: fallback value for active color of accordion

## v1.3.1 (2024-07-04)

### Fix

- **accordion**: keyboard behaviour for allowMultiple

### Refactor

- **accordion-item**: convert background image caret to svg
- **accordion-item**: transfer accordion hidden to dynamic class
- **accordion**: remove style height and add hidden class in sequence with animation
- **accordion-item**: apply hidden class via open prop
- **accordion**: replace hidden attribute with display none class

## v1.3.0 (2024-06-26)

### BREAKING CHANGE

- Users who previously use the css variables will find that the css they passed in no
longer applies and will have styling breaks
- Users who previously use the css variables will find that the css they passed in no
longer applies and will have styling breaks
- size prop
- Users who previously use this css variable will find that the css they passed in no
longer applies and will have styling breaks
- Users who previously use this variable will find that the css they passed in no
longer applies and will have styling breaks
- Users who previously use this css variable will find that the css they passed in no
longer applies and will have styling breaks
- added --sgds prefix to existing tokens and rename to follow convention strictly
- --sgds prefix added to existing css props and certain namings are replaced to
follow convention strictly
- Users who previously use this props will find that the css tokens they passed in no
longer applies and will have styling breaks
- Users who previously use this prop will find that the css tokens they passed in no
longer applies and will have styling breaks
- Users who previously use this props will find that the values they passed in no
longer applies and will have styling breaks
- added --sgds prefix to existing cssprops , renamed --stepper-default-theme-color to
--sgds-stepper-inactive-theme-color
- Users who previously use this variant will have styling breaks
- Users who previously use the variables will find that the css they passed in no
longer applies and will have styling breaks
- Users who previously use this prop will find that the css tokens they passed in no
longer applies and will have styling breaks
- prefixed with --sgds and rename fileupload to file-upload to follow convention
- Users who previously use this variable will find that the css they passed in no
longer applies and will have styling breaks
- Users who previously use this prop will find that the css tokens they passed in no
longer applies and will have styling breaks
- Users who previously use this css variables will find that it no longer applies and
will have styling breaks
- Users who previously use the css variables will find that the css they passed in no
longer applies and will have styling breaks
- Users using inputClasses prop and type="date" or type="datetime-local" will find
that the stylings will not be applied or supported
- existing css variables in v1 has to have --sgds prefix
- css properties will require a prefix of --sgds
- Users who previously use this css variable will find that it no longer applies and
will have styling breaks
- --mainnav-borderBottom-width is replaced with --mainnav-border-bottom width for
example.
- Users who used buttonClasses prop will find that css tokens they passed in no
longer applies , breaking the styles. Users who passed in outlined variants to the variant prop will
be affected
- Users who previously use this css variable will have styling breaks as the variable
is no longer be used
- Users who previously use this props will find that the css tokens they passed in no
longer applies and will have styling breaks
- Users who previously use this prop will find that the css tokens they passed in no
longer applies and will have styling breaks

### Feat

- **accordion**: allow accordion active color customisation through n… (#201)
- **accordion**: allow accordion active color customisation through new cssprop
- **root**: update new css variables
- **tooltip**: add css variables and update click event
- **combobox**: add form validation props and pass to input
- **theme**: configure day and night theme
- **tab**: new css prop introduced
- **quantity-toggle**: new cssprop introduced, refactor the internals to reuse components,
- **Switch**: new component Switch
- **spinner**: add grow spinner type styling
- **tab**: new css props introduced
- **close-button**: componentise close button
- **modal**: new css props introduced and renamed existing
- **drawer**: new css props introduced and old ones renamed
- **tab group**: new css props introduced
- **tab group**: remove classes props
- **spinner**: new css props introduced
- **spinner**: remove classes prop
- **toast**: update and add new css props
- **toast**: remove variant and bg props
- **stepper**: added new css props, renamed existing ones
- **radio, radio-group**: new css props
- **toast**: new css added
- **progress**: remove light variant
- **textarea**: new css variables
- **toast**: remove classes prop
- **file-upload**: rename existing css variables and introduced new ones
- **progress**: new css properties added
- **progress**: remove classes prop
- **input**: new css properties added
- **button**: new css props added
- **alert**: new css props introduced and renamed isLight prop to outlined
- **breadcrumb, breadcrumb-item**: add new css prop
- **accordion, accordionitem**: remove classes prop
- **alert**: remove classes prop
- **badge**: new css props added
- **card, action-card**: new css props introduced

### Fix

- *****: accessibiliyt based on storybook accesibility addon
- **mainnav**: fix dropdown menu border and box shadow rgba value
- **pagination**: duplicate first page button
- **toast**: background of toast is visible when dismissing
- **datepicker header**: align chevron icons in the middle vertically
- **toast**: fix dismissible toast not dismissing
- **alert**: remove alert instead of hiding it when dismissed
- *****: fix git command instead of npm push (#198)
- *****: fix git command instead of npm push

### Refactor

- **tooltip**: handle click out of element to hide tooltip
- **button**: disabled styles
- *****: remove css @import rule and transfer to js import
- *****: create form semantic tokens used in form components
- **toast container**: code refactor for toast container
- **input**: extract label and hint to separate css file
- **input**: remove inputClasses and reduced scope of attribute type
- *****: add variables to root
- **button**: bring out box-shadow-color to a css variable
- *****: rename background-color to bg and button to btn
- **mainnav, mainnav-item, mainnav-dropdown**: add --sgds prefix to css variables
- **accordion, accordion-item**: add --sgds prefix to all css variables
- **mainnav, mainnavitem, mainnavdropdown**: replacement of camelCase to kebab case in cssprop
- **button**: removed buttonClasses prop and removed outlined variants from variant prop
- **close button**: refactor close button css to share across components
- **alert**: remove alert link anchor color css variable

## v1.2.3 (2024-05-31)

## v1.2.2 (2024-05-28)

### Fix

- *****: icon to appear programmatically with anchor tag target="blank"  (#196)
- **sgds-element**: modify padding right to cater to safari
- *****: set target blank icon programmatically for all components

### Refactor

- **card**: use ::before selector to avoid clash with target blank using after selector
- **file-upload**: downstream change from previous commit
- **button**: remove slot styles as it affects target blank
- **footer, masthead**: remove hard coded svg for target blank from footer

## v1.2.1 (2024-05-23)

### Feat

- **accordion, accordion-item**: style customisation
- **mainnav**: open up customisation (#192)

### Fix

- **card**: stretchedLink not applying [skip-cd]

### Refactor

- **accordion**: styles wip
- **accordion**: update styles wip

## v1.2.0 (2024-04-30)

### Feat

- **input**: add aria-labelledby for input to point to hint, invalid text and label [skip-cd]
- **sidenav**: add sticky [skip-cd] (#181)
- **pagination**: showFirstPage showLastPage (#182) [skip-cd]

### Fix

- **pagination**: add fallback values for colours css var
- **combobox**: custom filter example not showing [skip-cd] (#187)
- **combobox**: custom filter example not showing
- **stepper**: stepper example not showing [skip-cd] (#188)
- **stepper**: stepper example not showing

### Refactor

- **mainnav**: wip
- **datepicker**: replace scss
- **sidenav**: replace scss files
- *****: remove scss
- *****: wip remove scss files
- **tooltip**: replace sgdsElement.style
- **toast**: replace sgdsElement.styles
- **textarea**: replace textarea
- **table**: replace sgdsElement.style
- **tab**: replace sgdsElement.styles
- **spinner, stepper**: replace sgdsElement.style
- **sidenav**: remove sgdsElement.style
- **quantity-toggle**: replace with cs
- **progress**: replace sgdsElement.styles
- **pagination**: replace sgdsElement.style
- **modal**: replace sgdsElement.styles
- **mainnav**: replace sgdsElement.styles
- **mainnav**: replace sgdsElement.styles
- **datepicker**: remove sgdsElement.styles
- **datepicker**: wip replacing css
- **input**: reaplce css
- **footer**: replace css
- **fileupload**: replace css
- **drawer**: replace css
- **combobox, dropdown**: replace css
- **checkbox**: replace with css
- **card**: transfer to css
- **badge**: replace styles
- **badge**: replace badge styles
- **alert**: transfer to css
- **alert**: link and header, alert wip
- **action-card**: styles
- **accordion, button, radio**: add css styles
- **button, radio, radiogroup, accordion**: styling refactor

## v1.1.0 (2024-03-22)

### Feat

- **datepicker**: incomplete range date show feedback on blur
- **datepicker**: implement elementinternals for form submission
- **datepicker**: in form context wip
- **datepicker**: displayDate prop
- **datepicker**: on invalid, reset calendar to today date
- **datepicker**: query of shadowRoot input needs to be asynchronouse
- **datepicker**: wip position of buttons with hinttext and label
- **datepicker**: add invalidFeedback prop
- **datepicker**: add validation message
- **datepicker**: update mask value when calendar dates are clicked
- **datepicker**: input validations, range wip
- **datepicker**: range input mask wip
- **datepicker**: validation on input mask during typing and after completion
- **datepicker**: add input mask
- **datepicker**: add open calendar button and shift toggle fn from input to button
- **datepicker**: sync end dates navigation between months
- **mainnav-dropdown**: add missing classes for active state and drop… (#161) [skip-cd]
- **mainnav-dropdown**: add missing classes for active state and dropdown
- **datepicker**: start and end colors for dates
- **mainnav-dropdown**: add missing classes for active state and dropdown
- **datepicker**: month range highlights
- **datepicker**: change year when keyboard arrow pressed at edges
- **datepicker**: implement shift tab focus trap
- **datepicker**: complete focus trap loop with tab keypress
- **datepicker**: month and years keyboard nav
- **datepicker**: syncing focus with click handlers
- **datepicker**: focus persist wip
- **datepicker**: enter key for date view complete
- **datepicker**: see description
- **datepicker**: navigate within calendar day view in the month
- **datepicker**: wip arrowdown navigate menu poc
- **datepicker**: focusing active day when calendar shows

### Fix

- **tooltip**: console warnings
- **tooltip**: console warnings
- **test**: flaky test cases for tdEl having 2 tabindex=3
- **progress**: fix progress module exports
- **config files**: fix config files to exclude "cypress" and "cypress.config.ts"

### Refactor

- **datepicker**: rearrange hinttext and label in datepicker-input
- **input**: create functons to render template result
- **datepicker**: separate input mask component|
- **datepicker**: rendering of views

## v1.0.2 (2023-10-23)

### Fix

- **masthead**: remove trusted website title tag

## v1.0.1 (2023-10-23)

## v1.0.0-rc.8 (2023-10-23)

### Fix

- **imports**: path to Masthead:

## v1.0.0 (2023-10-23)

## v1.0.0-rc.7 (2023-10-23)

### Fix

- **ci**: update build step command

## v1.0.0-rc.6 (2023-10-04)

## v1.0.0-rc.5 (2023-10-03)

### Feat

- **combobox**: add aria-controls
- **datepicker**: add combobox role, aria-haspopup, aria-controls
- **combobox**: add listbox role, aria-expanded, aria-autocomplete
- **dropdown**: add aria-haspopup attribute

### Fix

- **combobox**: update listbox role to combobox
- **dropdown**: fix aria-expanded not read by screen-reader

## v1.0.0-rc.4 (2023-10-03)

### BREAKING CHANGE

- Refactoring of dropdown element

### Feat

- **stepper**: update tabindex, add aria-current and aria-disabled
- **accordion-item**: remove id to prevent duplication, replace summary props with accordion-header slot, replace content with accordion-content slot
- **radio**: set inner <input> to be unfocusable
- **quantitytoggle**: add aria-label to quantity input
- **mainnav**: add aria-label to brand link
- **modal**: add focus to modal heading after opening
- **quantitytoggle**: add announcer to announce count after every increment or decrement
- **quantitytoggle**: update aria-label of buttons to include number of steps
- **pagination**: added tabbable functionality
- **pagination**: added watch decorator for duplicated event
- **pagination**: fix ellipsisJump beyond first page and last page and render the active class
- **pagination**: added prop ellipsisOn functionality for prev and next ellipsis
- **pagination**: disable click for first page on prev button and last page on next button
- **pagination**: allows toggling of ellipsisOn prop for next ellipsis
- **pagination**: added disabled ellipsis for default pagination
- **pagination**: added basic pagination comp
- **combobox**: allow user to define custom filter function via filterFunction prop
- **combobox**: hide dropdown menu when filtered menuList has no items
- **combobox**: add slot to allow user to configure own form control icon
- **combobox**: emit sgds-change event when selected value changes
- **combobox**: filter menuList according to input value
- **combobox**: show selected item value in input box
- **combobox**: first commit

### Fix

- **combobox**: menu item should not be an anchor link based on a11y comments
- *****: lint fixes
- **frankBuild**: update main path to new umd entry point
- **alert**: remove default svg vertical align stylings for alert
- **breadcrumb**: add default value for aria-label
- **accordionitem**: correct accordion item padding-x
- *****: update lib endpoint in storybook
- *****: update path to combobox in components entry point
- **combobox**: update and fix failing test cases
- *****: import paths after updating branch
- *****: declare bootstrap typings for non typed boostrap src files
- **pagination**: add nav wrapper for acc, fix tabindex rendering
- **combobox**: fix bug to close menu when an item is selected
- **dropdown-element**: update _getMenuItems() to query slot#default
- **dropdown-element**: fix _getMenuItems() to correctly obtain dropdown items
- **combobox**: replace dropdown-item href="#" to href that does nothing
- **combobox**: always show dropdown when user inputs value
- **combobox**: fix position of label and hintText to be vertically on top of input box
- **dropdown**: keyboard bug
- **sidenav**: remove padding left

### Refactor

- **package.json, rollup.config.mjs**: refactor npm scripts, update rollup config
- **pagination**: refactor direction button rendering
- **pagination**: refactor mock pagination comp for sb
- **stepper**: update IStepMetaData export
- **dropdown element**: create dropdown-list-element from dropdown element
- **combobox**: remove unused styles
- **combobox**: conditional render dropdown menu

## v1.0.0-rc.3 (2023-08-17)

### Feat

- **progress**: add progress component

### Fix

- **progress-bar**: remove part
- **progress**: remove sgds prefix
- **progress**: fixed pascal case
- **footer**: see description
- **mainnav**: slot end stylings to exclude mainnav-dropdown

### Refactor

- *****: add custom elements typings to HTMLEledmentTagNameMap for typescript users
- **stepper, drawer, input, tab**: update css property naming to convention
- **datepicker**: housekeeping

## v1.0.0-rc.2 (2023-07-18)

### Fix

- *****: merge conflic

## v1.0.0-rc.1 (2023-07-04)

### Feat

- **drawer**: fix noHeader attribute
- **drawer**: add drawer component
- **datepicker**: add reset state for closebutton
- **badge**: add badgeClasses prop
- **stepper**: add method to retrieve slot elements
- **toast-container**: component to position toasts
- **toast**: add fade animation for show and hide of toast
- **link, dropdown**: add target attribute for link in dropdown item
- **alert**: add alert-link and header component
- **tooltip**: add show method, add data-sgds-tooltip attribute for a11y purpose
- **badge**: add badgeClasses prop
- **stepper**: add method to retrieve slot elements
- **toast-container**: component to position toasts
- **toast**: add fade animation for show and hide of toast
- **alert**: add alert-link and header component
- **tooltip**: add show method, add data-sgds-tooltip attribute for a11y purpose
- **link, dropdown**: add target attribute for link in dropdown item
- **stepper**: add keyboard enter for is-clickable markers
- **stepper**: add events and reset method
- **footer**: restore centeredAlignVariant
- **datepicker**: added initialValueRange prop for range mode initial load
- **datepicker**: added datepickerClasses prop
- **datepicker**: add buttonClasses and inputClasses prop respectively
- **datepicker**: added initialValue prop functionality and button reset
- **datepicker**: added new datepicker comp

### Fix

- **drawer**: add padding and center align close btn
- **drawer**: add export default
- **react**: patch react lib
- **datepicker**: initialValue calendar view render
- **tooltip**: detect attribute changes and initialize tooltip instance
- **toast-container**: position css token evaluation
- **alert**: update unit tests
- **test**: remove variant in mock dropdown
- **dropdown**: move resetMenu to child dropdowns and fix menuIsOpen on first load feature
- **tooltip**: detect attribute changes and initialize tooltip instance
- **toast-container**: position css token evaluation
- **alert**: update unit tests
- **datepicker**: refactor initialValue logic
- **datepicker**: convert initialvaluerange to initialvalue for both modes
- **test**: remove variant in mock dropdown
- **dropdown**: move resetMenu to child dropdowns and fix menuIsOpen on first load feature
- **modal**: make animation similar to react's modal
- **docs**: import slots readme in slots stories
- **mainnav**: align dropdown menu right below li
- **datepicker**: allows calendar menu to be hidden when clicked outside el
- **datepicker**: initialValue and selected date highlighting with cursor pointer
- **datepicker**: added initialValue and isCurrentDate styling
- **datepicker**: fix initialValue views rendering

### Refactor

- **drawer**: replace close button compnent with html button
- **close button**: remove component and replace dependencies with html button.btn-close.btn-sm
- **drawer, tab**: patch new components
- *****: custom element registration brought out to component.ts
- **datepicker**: allow passing of initialValue to sync with dateFormat value
- **datepicker**: added watch decorator for value prop and emit change date event
- **datepicker**: added sgds-change-date event emitter for onload and closebutton
- **datepicker**: exposed sgds-change-date event with value prop
- **datepicker**: cleanup wip
- **tab**: cleanup
- **tab**: remove activation prop and scrolling behaviour
- **tab**: file names to follow convention
- **tab-group,tab**: stylings done
- **stepper**: remove slot and expose return component method
- **tab**: establish stylings for the 3 kinds of tabs
- **tab**: refactor style wip
- **tab-group**: remove placement
- **toast**: remove arialabel prop, write static value of aria label for close button
- **toast**: replace sl-icon with slots icon
- **breadcrumb**: jsdocs, remove separator css content in favour of slot
- **dropdown**: bring dropdownButton variant prop to child class
- **dropdown**: remove style file
- **dropdown**: make noFlip a state in parent class
- **datepicker**: change text-muted to disabled class
- **stepper**: remove slot and expose return component method
- **toast**: remove arialabel prop, write static value of aria label for close button
- **toast**: replace sl-icon with slots icon
- **breadcrumb**: jsdocs, remove separator css content in favour of slot
- **dropdown**: bring dropdownButton variant prop to child class
- **dropdown**: remove style file
- **dropdown**: make noFlip a state in parent class
- **stepper**: convert step prop to array of strings
- **modal**: remove autofocus target implementation, jsdocs wip
- **modal**: cleanup

## v1.0.0-rc.0 (2023-05-31)

### Feat

- **card**: write card component, unit tests and storybook
- **action-card**: watch disabled attri to update active state
- **action-card**: add form functionalities and handle radio behaviours when action-card is a radio
- **footer**: only render if description exist
- **footer**: add copyrightLiner props, update default value
- **textarea**: handle validation when value is empty and required is false
- **input**: add csspart for hitn and label
- **input**: make feedback optional
- **spinner**: add colors
- **spinner**: add spinner component
- **radio**: make validation styling optional

### Fix

- **fileupload**: rename fileList to files, update types
- **fileuploader**: add multiple and accept args
- **fileuploader**: change event name, remove unused imports
- **fileuploader**: change accept type to string, add correct type to props
- *****: linting
- **button**: storybook syntax mistake
- **sgds-card-action**: remove extra slot
- **button**: fix button docs in canvas mode not rendering
- **scripts**: fix makeArgTypes script on storybook
- **code-convention**: fix Lit anchor
- **table**: add always to responsive types, remove optional operator for props
- **accordion**: jsdocs spacing fixes aand remove optional operator for classes prop
- **accordion**: remove top padding for accordion content
- **input**: icon positions stylings
- **dropdown-element**: add type to togglerID

### Refactor

- **file-upload**: rename sgds-fileupload to sgds-file-upload
- **fileuploader**: update jsdocs
- **fileuploader**: add custom variable, update icon
- **sgds-element**: set default custom variable to sass variable value
- *****: update branch from parent
- *****: make custom is props into internals
- **quantity-toggle**: add form features, fix stylings and jsdocs
- **button**: change the way button has a gap between icon
- **footer**: revert to filled string
- **footer**: remove vulnarability, fix code snippets not showing the correct attribute
- **footer**: update summary and description, add types and remove quotation marks
- **button**: remove obselete css
- **button**: add missing annotations in storybook, src file and add styling for icons
- **button**: remove hasFocus
- **button**: added jsdocs
- **accordion**: remove disabled accordion feature
- **accordion**: modify css prop to convention and update jsdocs
- **input**: give placeholder a default value according to dss
- **input**: let visual props have default empty string
- *****: shift SgdsFormControl interface to utils folder"
- **input**: remove default values from certain props
- **input**: defaultFeedback to empty string, add jsdocs
- **input**: add jsdocs for props
- **input**: replace sl-icon with svg element
- **input**: implements SgdsFormControl and remove hasFocus
- **checkbox**: add public methods focus and blur, remove cssparts, add jsdocs
- **radio**: remove unrequired css, add jsdocs

## v0.0.12 (2023-05-11)

### Feat

- **alert**: refactor styles
- **fileupload**: added fileupload comp
- **table**: added sorting and removable sort functionality
- **accordion-item**: add classes props, styling for stacked items
- **accordion**: refactor to accordion-item
- **accordion**: add accordion wrapper
- **accordion**: add accordion
- **accordion**: add accordion
- **tooltip**: tooltip functionality done
- **tooltip**: added closable tooltip
- **tooltip**: props done, wip for adding close btn
- **tooltip**: skeletal function figured out

### Fix

- **mainnav-dropdown**: alignment issue in desktop and mobile view
- **toast**: eslint erros
- **alert**: toggleShow func added, removed from button comp,updated sb
- **stepper**: remove stepper func in button
- **fileupload**: fix emit event to sgds-files-selected & css for file items icons
- **fileupload**: replace sl-icon to SVG icon
- **table**: fix removableSort algorithm and refactoring

### Refactor

- **sgds-mainnav**: remove offcanvas ref
- **sgds-mainnav**: remove offcanvas mode, update flex order
- **modal**: extend styls from parent class
- *****: spike reusing parent class styles to reduce css duplication
- *****: component folder
- **eslint**: add eslint rules on typescript files
- **accordion**: refactor conditional statement

## v0.0.11 (2023-03-28)

### Feat

- **stepper**: added stepper comp with button functionality
- **stepper**: added stepper component
- **button**: added methodType and stepperId prop
- **breadcrumb**: minor refactor
- **breadcrumb**: add target attribute
- **breadcrumb**: add breadcrumb component
- **table**: added comp with sorting functionality
- **toast**: add variant prop
- **toast**: added toast comp
- **badge**: add rounded pill variant and left/right icon slots
- **badge**: badge component
- **button**: added refId and methodType prop for alert functionality
- **alert**: added toggleShow method for sgds-button functionality
- **alert**: added alert component
- **alert**: added alert component

### Fix

- **button**: standardized prop stepperId to refId
- **stepper**: refactor scss

## 0.0.10 (2023-02-08)

### Feat

- **modal**: remove centered align variant
- **modal**: add modal component
- **button**: added icon variant
- **card**: added base card component
- **tab**: add tab component
- **radiogroup**: added more props and handleSlotChange method
- **radiogroup**: added native validation to radiogroup
- **quantitytoggle**: added size property
- **quantitytoggle**: set default step to 1
- **input**: validate only after value has changed
- **textarea**: parse int check to maxlength for wordcount
- **textarea**: validate only after value has changed, remove form-group wrapper
- **textarea**: add resize attribute
- **textarea**: add autocorrect and spellcheck props
- **textarea**: update form text
- **textarea**: add word count, validation
- **textarea**: replace id with textareaId
- **textarea**: add genId
- **textarea**: add textarea component
- **quantitytoggle**: add quant toggle example
- **quantityToggle**: add quantityToggle
- **checkbox**: added to component valid prop and clean state validation functionality
- **checkbox**: added dirty/clean functionality for form submission
- **checkbox**: replace inputId with checkboxId
- **checkbox**: keydown enter mimick mouseclick behaviour
- *****: added checkbox comp, unit test, sb documentation
- **dropdown**: remove all value related functionalitiy
- **sidenav**: add disabled props to sidenavlink and sidenavitem
- **mainnav**: add sgds-mainnav-dropdown
- **dropdown**: add toggle part
- **dropdown**: add close functionality with tests
- **dropdown**: rename file names and component names
- **dropdown**: add emit event on selection of items
- **dropdown**: arrowdown, arrowup, esc and enter keyboard handlers
- **dropdown**: keyboard wip
- **dropdown**: keyboard navigation wip
- **dropdown**: get bootstrap dropdown working
- **quantitytog**: add quantity toggle
- **button**: add click event

### Fix

- **checkbox**: clean/diry state
- **docs**: updated sb checkbox doc
- **test**: update checkbox unit tests
- **checkbox**: added form controller to checkbox comp, refix some props
- **input**: replace id with inputId
- **button**: add handleBlur function

### Refactor

- **radio**: replace inputId with radioId
- **link**: extract common functionalities to separate class
- **dropdown**: extract generic dropdown functionality to make it reusable
- **input**: label should show if attribute is defined
- **input**: add line height to label and text

## v0.0.8 (2022-10-17)

### Fix

- **mainnav**: reduce specificity of css selector

## v0.0.7 (2022-10-17)

### Feat

- **mainnav**: allow nav items to be added from far right and included in collapsed menu
- **input**: add focus and defaultvalue
- **util**: add defaultvalue decorator
- **button**: added form sumbit controller
- **input**: added form submission controller and custom watch decorator
- **input**: add validations, resolves conversations
- **input**: cleanups
- **input**: add validation, types

### Fix

- **mainnav**: .slot-end to match height of default slot and handle non sgds-mainnav-item elmeents

### Refactor

- **input**: change feedback prop to invalidFeedback

## v0.0.6 (2022-10-07)

### Fix

- **mainnav**: change to svg element instead of svg link for hamburger menu

## v0.0.5 (2022-10-05)

### Feat

- **mainnav**: use event listener resize for positioning of non collapisbles responsively

### Fix

- **sidenav**: query children using non specific selector instead

### Refactor

- **mainnav**: update naming conventions

## v0.0.4 (2022-09-29)

### BREAKING CHANGE

- change of component class names and element name

### Feat

- **mainnav**: use resize observer to detect and update component size change for responsivieness
- **mainnav**: add slot for non-collapsible items
- **mainnav**: add main nav and mainnav-item component
- **input**: add input
- **input**: add input
- **button**: add icon prefix slot
- **button**: add sizes, active state

### Refactor

- **button**: remove prefix
- **button**: change naming convention
- **button**: change naming convention
- *****: update scss file name convention
- *****: change naming convention and create extend a sgds base class

## v0.0.3 (2022-09-28)

### Feat

- **button**: add button component
- **button**: add button

## v0.0.2 (2022-09-22)

### Feat

- **sidenav**: add sidenav close open interactivity
- **sidenav**: wip
- **sidenav**: wip toggling close when click on another
- **sidenav**: allow toggled/untoggled on first load
- **sidenav**: wip opening and closing of sidenav
- **masthead**: standardise hidden/show classname
- **masthead**: export MastheadElement, update storybook

### Fix

- **storybook**: storybook error

### Refactor

- **sidenav**: cleanup component

## v0.0.1 (2022-09-12)

### Feat

- **footer**: export FooterElement Class
- **masthead**: add masthead
- **footer**: include part attribute for footer-top and -bottom for background color/styling changes

## v0.0.0 (2022-09-05)
