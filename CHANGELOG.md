## v1.0.0-rc.0 (2023-05-31)

### Feat

- **card**: write card component, unit tests and storybook
- **action-card**: watch disabled attri to update active state
- **action-card**: add form functionalities and handle radio behaviours when action-card is a radio
- **footer**: only render if description exist
- **textarea**: handle validation when value is empty and required is false
- **footer**: add copyrightLiner props, update default value
- **radio**: make validation styling optional
- **input**: add csspart for hitn and label
- **input**: make feedback optional

### Fix

- **fileupload**: rename fileList to files, update types
- **fileuploader**: add multiple and accept args
- **fileuploader**: change event name, remove unused imports
- **fileuploader**: change accept type to string, add correct type to props
- *****: linting
- **button**: storybook syntax mistake
- **button**: fix button docs in canvas mode not rendering
- **sgds-card-action**: remove extra slot
- **scripts**: fix makeArgTypes script on storybook
- **code-convention**: fix Lit anchor
- **table**: add always to responsive types, remove optional operator for props
- **accordion**: jsdocs spacing fixes aand remove optional operator for classes prop
- **input**: icon positions stylings
- **accordion**: remove top padding for accordion content
- **dropdown-element**: add type to togglerID

### Refactor

- **file-upload**: rename sgds-fileupload to sgds-file-upload
- **sgds-element**: set default custom variable to sass variable value
- **fileuploader**: update jsdocs
- **fileuploader**: add custom variable, update icon
- *****: update branch from parent
- *****: make custom is props into internals
- **button**: change the way button has a gap between icon
- **quantity-toggle**: add form features, fix stylings and jsdocs
- **footer**: revert to filled string
- **button**: remove obselete css
- **button**: add missing annotations in storybook, src file and add styling for icons
- **button**: remove hasFocus
- **input**: give placeholder a default value according to dss
- **accordion**: remove disabled accordion feature
- **accordion**: modify css prop to convention and update jsdocs
- **input**: let visual props have default empty string
- **button**: added jsdocs
- **footer**: remove vulnarability, fix code snippets not showing the correct attribute
- **footer**: update summary and description, add types and remove quotation marks
- **checkbox**: add public methods focus and blur, remove cssparts, add jsdocs
- *****: shift SgdsFormControl interface to utils folder"
- **radio**: remove unrequired css, add jsdocs
- **input**: remove default values from certain props

## v0.0.12 (2023-05-11)

### Feat

- **alert**: refactor styles
- **spinner**: add colors
- **spinner**: add spinner component
- **accordion-item**: add classes props, styling for stacked items
- **fileupload**: added fileupload comp
- **accordion**: refactor to accordion-item
- **accordion**: add accordion wrapper
- **accordion**: add accordion
- **table**: added sorting and removable sort functionality
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
- **input**: defaultFeedback to empty string, add jsdocs
- **input**: add jsdocs for props
- **input**: replace sl-icon with svg element
- **input**: implements SgdsFormControl and remove hasFocus
- **modal**: extend styls from parent class
- *****: spike reusing parent class styles to reduce css duplication
- *****: component folder
- **eslint**: add eslint rules on typescript files
- **accordion**: refactor conditional statement

## v0.0.11 (2023-03-28)

### Feat

- **table**: added comp with sorting functionality
- **button**: added refId and methodType prop for alert functionality
- **alert**: added toggleShow method for sgds-button functionality
- **toast**: add variant prop
- **toast**: added toast comp
- **breadcrumb**: minor refactor
- **alert**: added alert component
- **alert**: added alert component
- **breadcrumb**: add target attribute
- **breadcrumb**: add breadcrumb component
- **stepper**: added stepper comp with button functionality
- **stepper**: added stepper component
- **button**: added methodType and stepperId prop
- **badge**: add rounded pill variant and left/right icon slots
- **badge**: badge component

### Fix

- **button**: standardized prop stepperId to refId

## 0.0.10 (2023-02-08)

### Feat

- **card**: added base card component
- **tab**: add tab component
- **modal**: remove centered align variant
- **modal**: add modal component
- **button**: added icon variant
- **radiogroup**: added more props and handleSlotChange method
- **radiogroup**: added native validation to radiogroup
- **quantitytoggle**: added size property
- **quantitytoggle**: set default step to 1
- **quantitytoggle**: add quant toggle example
- **quantityToggle**: add quantityToggle
- **textarea**: parse int check to maxlength for wordcount
- **textarea**: validate only after value has changed, remove form-group wrapper
- **checkbox**: added to component valid prop and clean state validation functionality
- **input**: validate only after value has changed
- **quantitytog**: add quantity toggle
- **checkbox**: added dirty/clean functionality for form submission
- **textarea**: add resize attribute
- **textarea**: add autocorrect and spellcheck props
- **textarea**: update form text
- **checkbox**: replace inputId with checkboxId
- **textarea**: add word count, validation
- **checkbox**: keydown enter mimick mouseclick behaviour
- **textarea**: replace id with textareaId
- **button**: add click event
- **textarea**: add genId
- **textarea**: add textarea component
- **dropdown**: remove all value related functionalitiy

### Fix

- **stepper**: refactor scss
- **checkbox**: clean/diry state
- **docs**: updated sb checkbox doc
- **test**: update checkbox unit tests
- **checkbox**: added form controller to checkbox comp, refix some props
- **input**: replace id with inputId
- **button**: add handleBlur function
- re-fix keydown logic, remove sl comments from comp, change id prop to inputId, sb doc updated

### Refactor

- **input**: label should show if attribute is defined
- **input**: add line height to label and text
- **radio**: replace inputId with radioId

## v0.0.8 (2022-10-17)

### Feat

- **input**: add focus and defaultvalue
- **util**: add defaultvalue decorator
- **button**: added form sumbit controller

### Fix

- **mainnav**: reduce specificity of css selector

## v0.0.7 (2022-10-17)

### Feat

- added radio/radiogroup comp, unit tests, sb documentation
- **sidenav**: add disabled props to sidenavlink and sidenavitem
- **mainnav**: add sgds-mainnav-dropdown
- **dropdown**: add toggle part
- updated sb docs, component props and unit test
- **mainnav**: allow nav items to be added from far right and included in collapsed menu
- **input**: added form submission controller and custom watch decorator
- **input**: add validations, resolves conversations
- **dropdown**: add close functionality with tests
- **input**: cleanups
- **input**: add validation, types
- **input**: add input

### Fix

- **mainnav**: .slot-end to match height of default slot and handle non sgds-mainnav-item elmeents

### Refactor

- **link**: extract common functionalities to separate class
- **dropdown**: extract generic dropdown functionality to make it reusable
- **input**: change feedback prop to invalidFeedback

## v0.0.6 (2022-10-07)

## push (2022-10-07)

### Feat

- **dropdown**: rename file names and component names
- **dropdown**: add emit event on selection of items
- **dropdown**: arrowdown, arrowup, esc and enter keyboard handlers
- **input**: add input
- *****: added checkbox comp, unit test, sb documentation

### Fix

- **mainnav**: change to svg element instead of svg link for hamburger menu

## v0.0.5 (2022-10-05)

### BREAKING CHANGE

- change of component class names and element name

### Feat

- **dropdown**: keyboard wip
- **button**: add icon prefix slot
- **button**: add sizes, active state
- **button**: add button component
- **mainnav**: use event listener resize for positioning of non collapisbles responsively

### Fix

- **sidenav**: query children using non specific selector instead

### Refactor

- **button**: remove prefix
- **button**: change naming convention
- **button**: change naming convention
- **mainnav**: update naming conventions
- *****: update scss file name convention
- *****: change naming convention and create extend a sgds base class

## v0.0.4 (2022-09-29)

### Feat

- **mainnav**: use resize observer to detect and update component size change for responsivieness
- **mainnav**: add slot for non-collapsible items

## v0.0.3 (2022-09-28)

### Feat

- **mainnav**: add main nav and mainnav-item component
- **button**: add button
- **dropdown**: keyboard navigation wip
- **dropdown**: get bootstrap dropdown working

## v0.0.2 (2022-09-22)

### Feat

- **masthead**: standardise hidden/show classname
- **sidenav**: add sidenav close open interactivity
- **masthead**: export MastheadElement, update storybook
- **sidenav**: wip

### Fix

- **storybook**: storybook error

### Refactor

- **sidenav**: cleanup component

## v0.0.1 (2022-09-12)

### Feat

- **footer**: export FooterElement Class
- **sidenav**: wip toggling close when click on another
- **sidenav**: allow toggled/untoggled on first load
- **sidenav**: wip opening and closing of sidenav
- **masthead**: add masthead
- **footer**: include part attribute for footer-top and -bottom for background color/styling changes

## v0.0.0 (2022-09-05)
