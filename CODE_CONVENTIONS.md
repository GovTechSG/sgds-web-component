# `sgds-web-components` coding style guide

## Table of contents

- [sgds-web-components coding style guide](#typescript-coding-style-guide)
  - [Naming](#naming)
    - [Naming Variables](#naming-variables)
    - [Naming Conventions](#naming-conventions)
    - [Naming Booleans](#naming-booleans)
    - [Naming Methods](#naming-methods)
    - [Naming Events](#naming-events)
    - [Naming CSS custom variables](#naming-css-custom-variables)
    - [Naming slots](#naming-slots)
  - [Typescript](#typescript)
  - [Jsdocs](#jsdoc)
  - [Lit](#lit)
  - [Scoped Elements](#scoped-elements)
  - [Icons](#icons)

---

---

## Naming

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

---

### Naming Variables

**Use meaningful variable names.**

Distinguish names in such a way that the reader knows what the differences offer.

:x: Bad:

```typescript
function isBetween(a1: number, a2: number, a3: number): boolean {
  return a2 <= a1 && a1 <= a3;
}
```

:white_check_mark: Good:

```typescript
function isBetween(value: number, left: number, right: number): boolean {
  return left <= value && value <= right;
}
```

**Use pronounceable variable names**

If you can't pronounce it, you can't discuss it without sounding weird.

:x: Bad:

```typescript
class Subs {
  public ccId: number;
  public billingAddrId: number;
  public shippingAddrId: number;
}
```

:white_check_mark: Good:

```typescript
class Subscription {
  public creditCardId: number;
  public billingAddressId: number;
  public shippingAddressId: number;
}
```

**Avoid mental mapping**

Explicit is better than implicit.<br />
_Clarity is king._

:x: Bad:

```typescript
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

:white_check_mark: Good:

```typescript
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**Don't add unneeded context**

If your class/type/object name tells you something, don't repeat that in your variable name.

:x: Bad:

```typescript
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
};

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

:white_check_mark: Good:

```typescript
type Car = {
  make: string;
  model: string;
  color: string;
};

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

---

### Naming Conventions

- Use camelCase for variable and function names

:x: Bad:

```typescript
var FooVar;
function BarFunc() {}
```

:white_check_mark: Good:

```typescript
var fooVar;
function barFunc() {}
```

- Use camelCase of class members, interface members, methods and methods parameters

:x: Bad:

```typescript
class Foo {
  Bar: number;
  Baz() {}
}
```

:white_check_mark: Good:

```typescript
class Foo {
  bar: number;
  baz() {}
}
```

- Use PascalCase for class names and interface names.

:x: Bad:

```typescript
class foo {}
```

:white_check_mark: Good:

```typescript
class Foo {}
```

- Use PascalCase for enums and camelCase for enum members

:x: Bad:

```typescript
enum notificationTypes {
  Default = 0,
  Info = 1,
  Success = 2,
  Error = 3,
  Warning = 4
}
```

:white_check_mark: Good:

```typescript
enum NotificationTypes {
  default = 0,
  info = 1,
  success = 2,
  error = 3,
  warning = 4
}
```

---

### Naming Booleans

- Don't use negative names for boolean variables.

:x: Bad:

```typescript
const isNotEnabled = true;
```

:white_check_mark: Good:

```typescript
const isEnabled = false;
```

---

### Naming Methods

- Use modifiers private, protected, public appropriately. 
- All public methods must be labelled with jsdocs description 

:x: Bad:

```typescript
close() {}
```

:white_check_mark: Good:

```typescript
/** Closes the component */
public close();
```

- All internal methods, private and protected, must be prefixed with a underscore _ to differentiate from Lit native lifecycle methods and the public methods 

:x: Bad:

```typescript
handleChange() {}
```

:white_check_mark: Good:

```typescript
private _handleChange() {};
```

- Keep it simple. If the action can be understood with the least amount of words. If the method has many action and needs to be described in multiple words, then you should refactor the method to have a single responsibility

:x: Bad:

```typescript
handleCloseClick() {}
```

:white_check_mark: Good:

```typescript
close();
```

- If your class/type/object name tells you something, don't repeat that in your variable name.

:x: Bad:

```typescript
class Alert extends LitElement {
  closeAlert() {}
}
```

:white_check_mark: Good:

```typescript
class Alert extends LitElement {
  close() {}
}
```

---

### Naming Events

1. Events should be named with an action word , prefix with `sgds-`

:x: Bad: `hide`, `show`

:white_check_mark: Good: `sgds-hide, sgds-show, sgds-after-show, sgds-toggle`

2. Before creating a new event name, check if there are existing names for the same purposed.

3. Use the `emit` method of SgdsElement class to emit a custom event

---

### Naming CSS custom variables

1. Follow the naming convention from Bootstrap 5.1 `--componentname-subcomponentname-element-state-properties`.

Example with kebab case for properties with 2 or more words

```css
  --sidenav-item-btn-border-left-width;
```

Example with element state

```css
  --sidenav-item-btn-hover-color;
  --sidenav-item-btn-active-bg;
```

2. use of shortform for long words
- background --> bg
- button --> btn
---

---

### Naming slots 

Slots name should be concise and straight to the point. No need to add component prefix name. 

:white_check_mark: Good:

```html
<sgds-footer>
<h2 slot="title"></h2>
</sgds-footer>
```


:x: Bad: 

```html
<sgds-footer>
<h2 slot="footer-title"></h2>
</sgds-footer>
```

## Typescript

All variables, properties and functions should be typed. The Tscompiler can infer the type of properties when a default value is assigned but not when none is defined. If a variable does not need to have a default variable, assign a type to it.

:x: Bad:

```typescript
    @property({ type: Boolean, reflect: true }) isLight;
    @property({ type: Boolean, reflect: true }) roundedPill;
```

:white_check_mark: Good:

```typescript
    @property({ type: Boolean, reflect: true }) isLight: boolean;
    @property({ type: Boolean, reflect: true }) roundedPill = false;
```

---

---

## jsdoc

jsdoc annotations is used to generate the custom-element.json, the metadata of sgds-web-components. The metadata is then used in generating the react package and storybook documentations

1.  All main component should have a @summary description of the component that will be rendered in the storybook docs. Annotate them above the component code

```typescript
/**
 * @summary A dropdown mechanism that allow users to either show or hide related content.
 */
export class SgdsAccordion extends SgdsElement {}
```

2. Include `@slots`, `@event`, `@csspart` , `@cssproperty` and their respective name whenever present in the component.

```typescript
/**
 * @slot default - content of the accordion item
 *
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
 *
 * @csspart base - The accordion-item base wrapper
 * @csspart header - The accordion-item button header
 * @csspart content - The accordion-item content
 *
 * @cssproperty --mainnav-item-theme-color - Hover and active color for mainnav items.
 * @cssproperty --mainnav-item-color - Text color of nav item.
 * @cssproperty --mainnav-item-borderBottom-width - border bottom width for hover and active state for nav item
 */
export class SgdsAccordionItem extends SgdsElement {
```

3. Annotate Lit's property decorator, @property, with jsdocs comments. Custom-element Analyzer is able to parse Lit's @property decorator as params.

```typescript
  /** Controls whether accordion-item is open or close */
 @property({ type: Boolean, reflect: true }) open = false;
```

4.  Annotate all @query with @internal tag

```typescript
  /** @internal */
  @query(".accordion-body") body: HTMLElement;
```

5. Annotate public methods with jsdocs comments. Any methods that is meant expose for users should be marked with the "public" access modifier

```typescript
/** Shows the accordion. */
  public async show() {
  }
```

---

### Lit

1. Avoid sgds specific querying of children components to allow reusability and implementation of our Lit components by other users. [Example](https://github.com/GovTechSG/sgds-web-component/commit/2c30a4dcfab31f52074dec6dde3446356da33373)

:x: Bad:

```typescript
const children = this.querySelectorAll("sgds-sidenav-item");
```

:white_check_mark: Good:

```typescript
const children = this.shadowRoot.querySelector('slot').assignedElements({flatten: true});
 // or use Lit decorator queryAssignedElements
 @queryAssignedElements()
```

2. Boolean properties should always be `false` by default. See [reason](https://stackoverflow.com/questions/60678891/how-can-i-change-a-boolean-property-in-lit-element-to-hide-content-on-my-compone#:~:text=Answer%3A%20For%20a%20Boolean%20property%20to%20be%20configurable%20from%20markup%2C%20it%20must%20default%20to%20false.%20If%20it%20defaults%20to%20true%2C%20you%20cannot%20set%20it%20to%20false%20from%20markup%2C%20since%20the%20presence%20of%20the%20attribute%2C%20with%20or%20without%20a%20value%2C%20equates%20to%20true.%20This%20is%20the%20standard%20behavior%20for%20attributes%20in%20the%20web%20platform.)

### Dependencies

Register the dependencies when the component has a dependency on another component.
Example: In FileUpload case, SgdsButton is used within it.

```jsx
import { SgdsButton } from "../Button";

export class SgdsFileUpload extends SgdsElement {
  static dependencies = {
      "sgds-button": SgdsButton
  }
}
```
<!-- 
### Icons

In order to minimise the usage of ScopedElementsMixin dependency we try to use slots as much as possible. 

The general rule of thumb of when to use svg directly in code or sgds-icon

Use sgds-icon when: 

- Icons are prone to be changed, user can customise the type of icon to pass in 
- In that case, create a slot="icon" for user to pass in 

e.g. 

```html
<sgds-alert>
  <sgds-icon slot="icon" ...></sgds-icon>
</sgds-alert>
```

Use hard coded svg when: 

- Icons are super fixed. Example, accordion's caret, combobox caret, 
- If ever such icons are requested to be customised, should first try to create a slot for user to pass in 

Last resort is to introduce sgds-icon as an internal dependency, to avoid usage of the ScopedElementMixin as much as possible  -->
