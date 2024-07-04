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

### Feat

- **accordion**: allow accordion active color customisation through n… (#201)
- **accordion**: allow accordion active color customisation through new cssprop

### Fix

- *****: fix git command instead of npm push (#198)
- *****: fix git command instead of npm push

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

### Fix

- **card**: stretchedLink not applying [skip-cd]

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
